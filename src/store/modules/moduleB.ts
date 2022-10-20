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
