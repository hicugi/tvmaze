<template>
  <div id="app">
    <AppBefore />

    <Search />
    <RouterView />
  </div>
</template>

<script>
import AppBefore from "@/components/App/Before.vue";
import Search from "@/components/Search/index.vue";

export default {
  name: "App",
  components: { AppBefore, Search },

  methods: {
    handleClick() {
      console.log(123);
    },
  },
};
</script>
