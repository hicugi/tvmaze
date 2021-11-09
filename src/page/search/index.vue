<template>
  <div :class="className">
    <h1 :class="`${className}__title`" v-text="title" />

    <LoadingBlock v-if="isLoading" title="Wait a bit, it's loading" />
    <Alert v-if="error" variant="error" v-text="error" />

    <ul v-if="!isLoading && items.length" :class="`${className}-list`">
      <template v-for="(item, index) in items">
        <li :key="index" :class="`${className}-list__item`">
          <ShowsCard v-bind="item" visible />
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import LoadingBlock from "@/components/LoadingBlock.vue";
import Alert from "@/components/Alert.vue";
import ShowsCard from "@/components/Shows/Card.vue";

import api from "@/helpers/api";

export default {
  name: "PageSearch",
  components: { LoadingBlock, Alert, ShowsCard },

  props: {
    className: {
      type: String,
      default: "p-search",
    },
  },
  data: () => ({
    isLoading: true,
    error: null,
    items: [],
  }),
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
      this.isLoading = true;
      this.error = null;
      this.items = [];

      api
        .getSearchedShows(this.searchQuery)
        .then((data) => {
          this.items = data;
        })

        .catch((error) => {
          this.error = error.message;
        })

        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
