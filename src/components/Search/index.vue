<template>
  <header :class="className">
    <form :class="`${className}__container`" @submit.prevent="handleSubmit">
      <RouterLink
        :class="`${className}__logo`"
        :to="{ name: 'home' }"
        v-text="'TV'"
      />

      <UiInput v-model="keywords" type="search" placeholder="Search" />
      <UiButton :class="`${className}__btn`" type="submit" variant="primary"
        >Submit</UiButton
      >
    </form>
  </header>
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

<style lang="scss" src="./index.scss" />
