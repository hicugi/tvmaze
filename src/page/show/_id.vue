<template>
  <div :class="className">
    <div :class="`${className}__container`">
      <LoadingBlock v-if="isLoading" title="Wait a bit, it's loading" />
      <Alert v-if="error" variant="error" v-text="error" />

      <ShowsPreview v-if="info" v-bind="info" />
    </div>
  </div>
</template>

<script>
import LoadingBlock from "@/components/LoadingBlock.vue";
import Alert from "@/components/Alert.vue";
import ShowsPreview from "@/components/Shows/Preview.vue";
import api from "@/helpers/api";

export default {
  name: "PageShowId",

  components: { LoadingBlock, Alert, ShowsPreview },
  props: {
    className: {
      type: String,
      default: "p-showId",
    },
  },
  data: () => ({
    isLoading: true,
    error: null,

    info: null,
  }),
  watch: {
    $route(newValue, value) {
      if (newValue.path !== (value || {}).path) {
        this.info = null;
        this.fetchInfo();
      }
    },
  },

  mounted() {
    this.fetchInfo();
  },

  methods: {
    fetchInfo() {
      this.isLoading = true;

      const { id } = this.$route.params;
      api
        .getShowInfo(id)
        .then((data) => {
          this.info = data;
        })

        .catch((error) => {
          if (error.message === "404") {
            this.error = "Resource not found";
          }
        })

        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.p-showId {
  margin: 40px 0;

  &__container {
    @include container;
  }
}
</style>
