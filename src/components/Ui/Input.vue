<template>
  <input
    class="ui-input"
    v-bind="{ value }"
    v-on="$listeners"
    @input="handleInput"
  />
</template>

<script>
export default {
  props: {
    value: String,
  },
  model: {
    prop: "value",
    event: "modelInput",
  },

  methods: {
    handleInput({ target }) {
      this.$emit("modelInput", target.value);
    },
  },
};
</script>

<style lang="scss">
.ui-input {
  padding: 7px 8px 8px;
  border: 1px solid $color-gray;
  border-radius: 0;
  width: 100%;
  height: auto;
  display: block;
  font-size: 16px;
  line-height: 1.25em;

  &[type="search"] {
    -webkit-appearance: none;
  }
}
</style>
