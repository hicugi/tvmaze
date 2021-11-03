<template>
  <button :class="computedClass" v-on="$listeners"><slot /></button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "default",
      validator: (v) => ["default", "primary", "secondary"].includes(v),
    },
    size: {
      type: String,
      default: "medium",
      validator: (v) => ["small", "medium", "large"].includes(v),
    },

    className: {
      type: String,
      default: "ui-button",
    },
  },

  computed: {
    computedClass() {
      return ["", `_variant-${this.variant}`, `_size-${this.size}`]
        .filter((v) => typeof v === "string")
        .map((v) => [this.className, v].join(""));
    },
  },
};
</script>

<style lang="scss">
.ui-button {
  border: none;
  font-family: inherit;
  line-height: 1.25em;

  &_size {
    &-small {
      padding: 5px 15px 6px;
      font-size: 14px;
    }
    &-medium {
      padding: 8px 20px 9px;
      font-size: 16px;
    }
    &-large {
      padding: 10px 30px 11px;
      font-size: 20px;
    }
  }

  &_variant {
    &-default {
      background-color: $color-gray;
    }
    &-primary {
      background-color: $color-primary;
      color: $color-white;
    }
    &-secondary {
      background-color: $color-secondary;
      color: $color-white;
    }
  }
}
</style>
