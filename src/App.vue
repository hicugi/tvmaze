<template>
  <div id="app">
    <AppBefore />

    <Search />
  </div>
</template>

<script>
import AppBefore from "@/components/App/Before.vue";
import Search from "@/components/Search/index.vue";

export default {
  name: "App",
  components: { AppBefore, Search },

  data: () => ({ searchModel: "" }),

  methods: {
    handleClick() {
      console.log(123);
    },
  },
};
</script>
