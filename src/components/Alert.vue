<template>
  <p :class="computedClass" v-text="text" />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    text: String,
    variant: {
      type: String,
      default: "default",
      validator: (v) => ["default", "warning", "error"].includes(v),
    },
  },
  computed: {
    computedClass() {
      return ["", `_${this.variant}`].map((v) => ["c-alert", v].join(""));
    },
  },
};
</script>

<style lang="scss">
.c-alert {
  margin: 0 auto;
  padding: 12px 20px 12px;
  max-width: 440px;

  &_default {
    background-color: $color-gray;
  }
  &_warning {
    background-color: $color-warning;
    color: $color-white;
  }
  &_error {
    background-color: $color-error;
    color: $color-white;
  }
}
</style>
