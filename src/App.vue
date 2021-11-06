<template>
  <div id="app">
    <AppBefore />

    <Search />
    <Shows />
  </div>
</template>

<script>
import AppBefore from "@/components/App/Before.vue";
import Search from "@/components/Search/index.vue";
import Shows from "@/components/Shows/index.vue";

export default {
  name: "App",
  components: { AppBefore, Search, Shows },

  data: () => ({ searchModel: "" }),

  methods: {
    handleClick() {
      console.log(123);
    },
  },
};
</script>
