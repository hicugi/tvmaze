<template>
  <header :class="className">
    <form :class="`${className}__container`" @submit.prevent="handleSubmit">
      <RouterLink
        :class="`${className}__logo`"
        :to="{ name: 'home' }"
        v-text="'TV'"
      />

      <ThisInputKeywords :class="`${className}__control`" v-model="keywords" />
      <UiButton :class="`${className}__btn`" type="submit" variant="primary"
        >Submit</UiButton
      >
    </form>
  </header>
</template>

<script>
import UiButton from "@/components/Ui/Button.vue";
import ThisInputKeywords from "./inputKeywords/index.vue";

export default {
  components: { UiButton, ThisInputKeywords },

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
    handleSubmit() {
      const { keywords, $route } = this;

      if (keywords.length < 2) return;
      if ($route.name === "search" && $route.query.q === keywords) return;

      this.$router.push({ name: "search", query: { q: keywords } });
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
