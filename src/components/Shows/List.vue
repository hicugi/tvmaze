<template>
  <section :class="className">
    <div :class="`${className}__container`">
      <h2 :class="`${className}__title`" v-text="title" />

      <div :class="listClass">
        <ul :class="`${className}-list__container`">
          <!-- loading -->
          <template v-if="loading">
            <template v-for="(item, index) in Array(maxVisibleItems).fill()">
              <li :key="index" :class="`${className}-list__item`">
                <ThisCard placeholder />
              </li>
            </template>
          </template>

          <!-- items -->
          <template v-else v-for="(item, index) in items">
            <li :key="index" :class="`${className}-list__item`">
              <ThisCard v-bind="item" :visible="getCardVisibleProp(index)" />
            </li>
          </template>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import ThisCard from "./Card.vue";

export default {
  components: { ThisCard },

  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },

    loading: Boolean,

    className: {
      type: String,
      default: "c-showsList",
    },
  },
  data: () => ({
    maxVisibleItems: 6,
    scrollIndex: 0,
  }),
  computed: {
    listClass() {
      return ["", this.loading && "--loading"]
        .filter((v) => typeof v === "string")
        .map((v) => [this.className, "-list", v].join(""));
    },
  },

  methods: {
    getCardVisibleProp(index) {
      return (this.scrollIndex + 1) * this.maxVisibleItems > index;
    },
  },
};
</script>

<style lang="scss">
.c-showsList {
  margin-bottom: 10px;
  overflow: hidden;

  &__container {
    margin-left: auto;
    margin-right: auto;
    padding-left: $container-gap;
    padding-right: $container-gap;
    max-width: $container-width;
  }

  &__title {
    margin: 40px 0 15px;
    font-size: 26px;
    left: 1.25em;
  }

  &-list {
    $gap: 20px;

    max-width: #{$container-width - $container-gap * 2};
    display: block;

    &__container {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
    }

    &__item {
      & + & {
        margin-left: $gap;
      }
    }
  }
}
</style>
