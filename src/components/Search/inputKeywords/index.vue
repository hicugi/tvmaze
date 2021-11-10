<template>
  <ThisAutocomplete
    v-bind="{ options }"
    :key="elmKey"
    :value="modelValue"
    :loading="isOptionsLoading"
    :options-empty="isOptionsEmpty"
    @select="handleSelectOption"
  >
    <UiInput
      ref="input"
      v-model="modelValue"
      type="search"
      placeholder="Search"
    />
  </ThisAutocomplete>
</template>

<script>
import ThisAutocomplete from "./autocomplete.vue";
import UiInput from "@/components/Ui/Input.vue";
import api from "@/helpers/api";

export default {
  components: { ThisAutocomplete, UiInput },

  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    elmKey: 0,

    options: [],
    isOptionsLoading: false,
    isOptionsEmpty: false,
  }),
  computed: {
    modelValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.fetchOptions(newValue);
        this.$emit("change", newValue);
      },
    },
  },

  methods: {
    fetchOptions(value) {
      clearTimeout(this.fetchOptionsTimer);

      if (value.length < 2) {
        this.resetOptions();
        return;
      }

      this.fetchOptionsTimer = setTimeout(() => {
        this.resetOptions();
        this.isOptionsLoading = true;

        api
          .getSearchedShows(value)

          .then(({ data }) => {
            this.options = data;
          })
          .catch(() => {
            this.isOptionsEmpty = true;
          })

          .finally(() => {
            this.isOptionsLoading = false;
          });
      }, 300);
    },
    resetOptions() {
      this.isOptionsEmpty = false;
      this.options = [];
    },

    handleSelectOption({ id }) {
      this.elmKey += 1;
      this.options = [];
      this.$emit("change", "");

      this.$router.push({ name: "showId", params: { id } });

      setTimeout(() => {
        this.$refs.input.$el.focus();
      });
    },
  },
};
</script>
