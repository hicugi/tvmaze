<template>
  <div :class="className">
    <div v-if="title" :class="`${className}__title`" v-text="title" />
    <div :class="`${className}__spinner`" />
  </div>
</template>

<script>
export default {
  props: {
    title: String,

    className: {
      type: String,
      default: "c-loadingBlock",
    },
  },
};
</script>

<style lang="scss">
$spinner-width: 168px;
$spinner-border: 2px;
$spinner-color: $color-primary;
$spinner-time: 1.5s;
$spinner-anim-key: loadingBlockSpinner;

.c-loadingBlock {
  margin: 40px auto;
  max-width: 600px;

  &__title {
    margin-bottom: 40px;
    font-size: 24px;
    line-height: 1.25em;
    text-align: center;
  }

  &__spinner {
    position: relative;
    margin: 0 auto;
    max-width: $spinner-width;

    &::before {
      padding-top: 100%;
      display: block;
      content: "";
    }

    &::after {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
      border: $spinner-border solid;
      border-radius: 100%;
      border-color: $spinner-color transparent transparent transparent;
      animation: $spinner-time linear $spinner-anim-key infinite;
      content: "";

      @keyframes #{$spinner-anim-key} {
        from {
          transform: translate(-50%, -50%) rotate(0deg);
        }
        to {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
    }
  }
}
</style>
