<template>
  <div :class="className">
    <LoadingBlock v-if="isLoading" title="Wait a bit, it's loading" />
  </div>
</template>

<script>
import LoadingBlock from "@/components/LoadingBlock.vue";
import api from "@/helpers/api";

export default {
  name: "PageShowId",

  components: { LoadingBlock },
  props: {
    className: {
      type: String,
      default: "p-showId",
    },
  },
  data: () => ({
    isLoading: true,
  }),

  mounted() {
    // this.fetchInfo();
  },

  methods: {
    fetchInfo() {
      this.isLoading = true;

      const { id } = this.$route.params;
      api
        .getShowInfo(id)
        .then(console.log)
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
