<template>
  <div :class="className">
    <template v-for="(item, index) in sectionList">
      <ThisList v-bind="item" :key="index" :loading="loading" />
    </template>
  </div>
</template>

<script>
import api from "@/helpers/api";
import ThisList from "./List.vue";

export default {
  components: { ThisList },

  props: {
    className: {
      type: String,
      default: "c-shows",
    },
  },

  data: () => ({
    loading: true,
    items: [],
  }),
  computed: {
    sectionList() {
      const copyOfItems = JSON.parse(JSON.stringify(this.items));
      const sortedItems = copyOfItems.sort((item1, item2) =>
        item1.rating > item2.rating ? -1 : 1
      );

      return [
        { title: "Popular shows" },
        {
          title: "Drama",
          filter: (item) => item.genres.includes("Drama"),
        },
        {
          title: "Comedy",
          filter: (item) => item.genres.includes("Comedy"),
        },
        {
          title: "Sports",
          filter: (item) => item.genres.includes("Sports"),
        },
      ].map(({ title, filter }) => ({
        title,
        items: filter ? sortedItems.filter(filter) : sortedItems,
      }));
    },
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.fetchItems();
    },
    fetchItems() {
      this.loading = true;

      api
        .getShows()
        .then((data) => {
          this.items = data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss">
// .c-shows {

// }
</style>
