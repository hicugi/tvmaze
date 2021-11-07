<template>
  <div :class="computedClass">
    <template v-if="visible">
      <RouterLink
        v-if="!placeholder"
        :class="`${className}__link`"
        :to="link"
        target="_blank"
        v-text="name"
      />

      <div :class="`${className}-image`">
        <div :class="`${className}-image__bg`" :style="imageStyles" />
        <img
          v-if="image"
          :class="`${className}-image__img`"
          :src="image"
          :alt="name"
        />
      </div>

      <h3
        v-if="!placeholder"
        :class="`${className}__name`"
        :title="name"
        v-text="name"
      />
      <div
        v-else
        :class="`${className}__name-placeholder`"
        :title="name"
        v-text="name"
      />
    </template>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: Number,
    name: String,
    image: String,

    placeholder: Boolean,
    visible: Boolean,

    className: {
      type: String,
      default: "c-showsCard",
    },
  },
  computed: {
    computedClass() {
      return ["", this.placeholder && "_placeholder"]
        .filter((v) => typeof v === "string")
        .map((v) => [this.className, v].join(""));
    },

    link() {
      const { id } = this;
      return { name: "showId", params: { id } };
    },

    imageStyles() {
      const { image } = this;

      if (!this.visible || !image) return;

      return { backgroundImage: `url('${image}')` };
    },
  },
};
</script>

<style lang="scss" src="./Card.scss" />
