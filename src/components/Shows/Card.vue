<template>
  <div :class="computedClass">
    <div :class="`${className}-image`" :style="imageStyles">
      <img
        v-if="visible"
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
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
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

    imageStyles() {
      const { image } = this;

      if (!this.visible || !image) return;

      return { backgroundImage: `url('${image}')` };
    },
  },
};
</script>

<style lang="scss">
.c-showsCard {
  $name-height: 24px;

  position: relative;
  width: calc(#{$container-width} / 5 - 140px / 5);

  &-image {
    position: relative;
    background: $color-gray no-repeat center;
    background-size: cover;

    &::before {
      content: "";
      padding-top: calc(100% * (12 / 9));
      display: block;
    }

    &__img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0.00001;
    }
  }

  &__name,
  &__name-placeholder {
    margin: 8px 0 0;
  }
  &__name {
    font-size: 18px;
    line-height: $name-height;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &__name-placeholder {
    position: relative;
    height: $name-height;
    background-color: $color-gray;
    overflow: hidden;
  }
  &_placeholder &-image::after {
    $size: 100px;
    $animKey: cShowsCardImage;

    position: absolute;
    left: 50%;
    top: 50%;
    border: 5px solid;
    border-color: transparent transparent transparent $color-white;
    border-radius: 100%;
    width: $size;
    height: $size;
    animation: linear 1.5s $animKey infinite;
    content: "";

    @keyframes #{cShowsCardImage} {
      from {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
  }

  @media (max-width: #{$container-width}) {
    width: calc(100vw / 5 - 140px / 5);
  }
}
</style>
