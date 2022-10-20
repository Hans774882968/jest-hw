# jest-hw

[toc]

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Vuex + TS的使用
简单来说Vuex主要就这些东西：

- State：变量
- Getter：getter
- Mutation：修改变量，但只支持同步
- Action：支持异步地修改变量。

Action修改变量不能直接改，只能通过`this.context.commit`来触发Mutation。

下面是一个demo。我们看看src目录的结构：

```
.
├── App.vue
├── assets
│   └── logo.png
├── components
│   ├── Button.vue
│   ├── HelloWorld.vue
│   ├── MyForm.vue
│   └── VuexDemo.vue
├── main.ts
├── shims-tsx.d.ts
├── shims-vue.d.ts
└── store
    ├── index.ts
    └── modules
        ├── moduleA.ts
        └── moduleB.ts
```

首先是`main.ts`：

```ts
import store from './store';

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
```

因为我们import的写法是`from './store'`所以要建立store文件夹，并给出`store/index.ts`。

```ts
import Vue from 'vue';
import Vuex from 'vuex';
import moduleA from './modules/moduleA';
import moduleB from './modules/moduleB';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    moduleA,
    moduleB,
  },
});
export default store;
```

然后是两个module的实现：

- Action只能通过`this.context.commit`触发Mutation来修改变量。
- Action后带个commit属性来触发一次后置的Mutation，这个会在CRUD的时候方便一点。
- Mutation可以直接改变量。

```ts
import {
  VuexModule, Module, Mutation, Action,
} from 'vuex-module-decorators';

@Module({ namespaced: true })
class ModuleA extends VuexModule {
  user = { name: '', age: 0 };

  name = '';

  loaded = false;

  get username() {
    return `user.name = ${this.user.name}`;
  }

  get userAge() {
    return this.user.age;
  }

  @Mutation
  setUser(data = { name: '', age: 0 }): void {
    const finalData = { ...data };
    this.user = finalData;
  }

  @Mutation
  setLoaded(loaded: boolean) {
    this.loaded = loaded;
  }

  @Mutation
  setName(name: string) {
    this.name = name;
  }

  @Action({ commit: 'setUser' })
  async loadUser() {
    return new Promise((resolve) => {
      this.context.commit('setLoaded', !this.loaded);
      this.context.commit('setName', this.loaded ? 'hans7' : '');
      const user = this.loaded ? { name: this.name, age: 18 } : { name: '', age: 0 };
      resolve(user);
    });
  }
}
export default ModuleA;

import {
  VuexModule, Module, Mutation,
} from 'vuex-module-decorators';

@Module({ namespaced: true })
class ModuleB extends VuexModule {
  msg = '123';

  get message() {
    return this.msg;
  }

  @Mutation
  setMessage(message: string): void {
    this.msg = message;
  }
}
export default ModuleB;
```

最后看vue组件怎么用，`VuexDemo.vue`：

- 注意一下`namespace`的写法。写法不唯一但这种写法还是不错的。
- 用装饰器声明成员`setMessage`以后，在方法里就可以直接调用`this.setMessage`。

```vue
<template>
  <div>
    <p>{{ username }}</p>
    <p>age = {{ userAge }}</p>
    <p>{{ message }}</p>
    <button @click="loadUser">
      按钮1
    </button>
    <button @click="changeMessage">
      按钮2
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const moduleA = namespace('moduleA');
const moduleB = namespace('moduleB');

@Component
export default class Button extends Vue {
  @moduleA.Getter('username') public username!: string;

  @moduleA.Getter('userAge') public userAge!: number;

  @moduleA.Action('loadUser') public loadUser!: () => Promise<unknown>;

  @moduleB.Getter('message') public message!: string;

  @moduleB.Mutation('setMessage') public setMessage!: (msg: string) => void;

  changeMessage() {
    this.setMessage(`${this.message}234`);
  }
}
</script>
```

效果：支持点击按钮来修改属性。

### 解决冲突
今天叕忘记了GitHub首次提交不能先新建readme，导致要走一遍冲突解决的流程，在此记录。

```
git branch -m main        
git push
fatal: 当前分支 main 没有对应的上游分支。
为推送当前分支并建立与远程上游的跟踪，使用
    git push --set-upstream jest-hw main
于是执行以上命令，但报错：
error: 无法推送一些引用到 'https://github.com/Hans774882968/jest-hw'
提示：更新被拒绝，因为您当前分支的最新提交落后于其对应的远程分支。
提示：再次推送前，先与远程变更合并（如 'git pull ...'）。详见
提示：'git push --help' 中的 'Note about fast-forwards' 小节。
```
那么做法是：
```
git pull jest-hw main --allow-unrelated-histories --no-rebase
```
然后在vscode（注：在idea上步骤差不多的）上解决冲突，并在“源代码管理”上选择“Stash changes”把文件添加到暂存区。后面就再commit一次，产生一个提交，再正常push即可。

注：参考链接1是冲突解决方法。

### 参考链接
1. https://juejin.cn/post/7028487889864851469
2. https://juejin.cn/post/6928468842377117709