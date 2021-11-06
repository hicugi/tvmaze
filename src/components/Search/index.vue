<template>
  <div :class="className">
    <form :class="`${className}__container`" @submit.prevent="handleSubmit">
      <UiInput v-model="keywords" type="search" placeholder="Search" />
      <UiButton type="submit" variant="primary">Submit</UiButton>
    </form>
  </div>
</template>

<script>
import UiButton from "@/components/Ui/Button.vue";
import UiInput from "@/components/Ui/Input.vue";

export default {
  components: { UiInput, UiButton },

  props: {
    className: {
      type: String,
      default: "c-search",
    },
  },
  data: () => ({
    keywords: "",
  }),

  methods: {
    handleSubmit() {},
  },
};
</script>

<style lang="scss">
.c-search {
  padding-top: 12px;
  padding-bottom: 12px;
  background: $color-black;

  &__container {
    margin-left: auto;
    margin-right: auto;
    padding-left: $container-gap;
    padding-right: $container-gap;
    max-width: $container-width;
    display: flex;
  }

  @include breakpointMd {
    &__container {
      padding-left: $container-gap-md;
      padding-right: $container-gap-md;
    }
  }
  @include breakpointLg {
    &__container {
      padding-left: $container-gap-lg;
      padding-right: $container-gap-lg;
    }
  }
}
</style>
