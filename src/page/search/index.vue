<template>
  <div :class="className">
    <h1 :class="`${className}__title`" v-text="title" />

    <ul :class="`${className}-list`">
      <template v-for="(item, index) in items">
        <li :key="index" :class="`${className}-list__item`">
          <ShowsCard v-bind="item" visible />
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import ShowsCard from "@/components/Shows/Card.vue";
import api from "@/helpers/api";

export default {
  name: "PageSearch",
  components: { ShowsCard },

  props: {
    className: {
      type: String,
      default: "p-search",
    },
  },
  data: () => ({ items: [] }),
  computed: {
    searchQuery() {
      return this.$route.query.q;
    },
    title() {
      return `Search results for: ${this.searchQuery}`;
    },
  },
  watch: {
    $route(newValue, value) {
      if (newValue.fullPath !== (value || {}).fullPath) {
        this.fetchItems();
      }
    },
  },

  mounted() {
    this.fetchItems();
  },

  methods: {
    fetchItems() {
      api.getSearchedShows(this.searchQuery).then((data) => {
        this.items = data;
      });
    },
  },
};
</script>

<style lang="scss">
$items-gap: 8px;

$items-inline: 2;
$items-inline-sm: 3;
$items-inline-md: 4;
$items-inline-lg: 5;

.p-search {
  --items-inline: #{$items-inline};

  @include container;
  margin-top: 40px;

  &__title {
    margin: 0 0 20px;
    font-size: 26px;
    left: 1.25em;
  }

  &-list {
    margin: 0 #{-$items-gap};
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    list-style: none;

    &__item {
      margin-bottom: $items-gap * 2;
      padding-left: $items-gap;
      padding-right: $items-gap;
      width: calc(100% / var(--items-inline));
    }
  }

  @include breakpointSm() {
    --items-inline: #{$items-inline-sm};
  }
  @include breakpointMd() {
    --items-inline: #{$items-inline-md};
  }
  @include breakpointLg() {
    --items-inline: #{$items-inline-lg};
  }
}
</style>
