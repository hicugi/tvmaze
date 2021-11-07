<template>
  <div class="p-index">
    <template v-for="(item, index) in sectionList">
      <ShowList v-bind="item" :key="index" :loading="isLoading" />
    </template>
  </div>
</template>

<script>
import api from "@/helpers/api";
import ShowList from "@/components/Shows/List.vue";

export default {
  name: 'PageHome',
  components: { ShowList },

  data: () => ({
    isLoading: true,
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
      this.isLoading = true;

      api
        .getShows()
        .then((data) => {
          this.items = data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
