import {
  VuexModule, Module, Mutation, Action,
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

  @Action
  dispatchMsgAction() {
    setTimeout(() => this.context.commit('setMessage', `${this.message}xyz`), 500);
  }
}
export default ModuleB;
