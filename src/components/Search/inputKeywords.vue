<template>
  <UiAutocomplete
    v-bind="{ options }"
    :key="elmKey"
    :value="modelValue"
    item-label-key="name"
    @select="handleSelectOption"
  >
    <UiInput v-model="modelValue" type="search" placeholder="Search" />
  </UiAutocomplete>
</template>

<script>
import UiAutocomplete from "@/components/Ui/Autocomplete.vue";
import UiInput from "@/components/Ui/Input.vue";
import api from "@/helpers/api";

export default {
  components: { UiAutocomplete, UiInput },

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
        this.options = [];
        return;
      }

      this.fetchOptionsTimer = setTimeout(() => {
        api.getSearchedShows(value).then((data) => {
          this.options = data;
        });
      }, 300);
    },

    handleSelectOption({ id }) {
      this.elmKey += 1;
      this.options = [];
      this.$emit("change", "");

      this.$router.push({ name: "showId", params: { id } });
    },
  },
};
</script>
