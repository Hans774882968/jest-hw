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
    <button @click="dispatchMessageAction">
      按钮3
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

  @moduleB.Action('dispatchMsgAction') public dispatchMsgAction!: () => void;

  // 像其他方法一样直接调用Mutation和Action即可
  changeMessage() {
    this.setMessage(`${this.message}234`);
  }

  dispatchMessageAction() {
    this.dispatchMsgAction();
  }
}
</script>
