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
