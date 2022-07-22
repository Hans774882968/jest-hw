<template>
  <form @submit="onSubmit">
    <div>
      <label for="name">
        Name
        <input
          id="name"
          v-model="name"
          type="name"
          required
          name="name"
        >
      </label>
    </div>
    <div>
      <label for="email">
        Email
        <input
          id="email"
          v-model="email"
          type="email"
          required
          name="email"
        >
      </label>
    </div>
    <div>
      <label for="message">
        Your message
        <textarea
          id="message"
          v-model="message"
          name="message"
          required
        />
      </label>
    </div>
    <div>
      <button type="submit">
        SEND
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class MyForm extends Vue {
  name = 'hans';

  email='';

  message='';

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.name, this.email, this.message);
  }
}
</script>
