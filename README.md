# jest-hw

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