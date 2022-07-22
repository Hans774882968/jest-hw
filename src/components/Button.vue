<template>
  <button
    class="my-button"
    :class="computedClass"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop({
    default: 'button',
  }) nativeType!: 'button' | 'submit' | 'reset' | undefined;

  @Prop({
    type: String,
    default: 'primary',
  }) type!: string;

  @Prop({
    type: String,
    default: 'medium',
  }) size!: string;

  @Prop({
    type: String,
    default: 'round',
  }) shape!: string;

  @Prop({
    type: Boolean,
    default: false,
  }) disabled!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  }) loading!: boolean;

  get computedClass() {
    return {
      [`btn-type-${this.type}`]: !!this.type,
      [`btn-size-${this.size}`]: !!this.size,
      [`btn-shape-${this.shape}`]: !!this.shape,
      'btn-disabled': !!this.disabled || !!this.loading,
      'btn-loading': !!this.loading,
    };
  }

  handleClick(evt: MouseEvent) {
    this.$emit('click', evt);
  }
}
</script>
