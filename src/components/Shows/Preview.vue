<template>
  <div :class="className">
    <div :class="[`${className}__col`, `${className}__col_info`]">
      <div :class="`${className}-info`">
        <div :class="`${className}-info__row`">
          <h1 :class="`${className}__title`">{{ name }}</h1>
          <div :class="`${className}__description`" v-html="description" />
        </div>

        <div :class="`${className}-info__row`">
          <div :class="`${className}-genres`">
            <span :class="`${className}-genres__title`">Genres:</span>
            <template v-for="(item, index) in formattedGenres">
              <span
                :class="`${className}-genres__item`"
                :key="index"
                v-text="item"
              />
            </template>
          </div>

          <ul :class="`${className}-extra-info`">
            <li v-if="averageRuntime" :class="`${className}-extra-info__item`">
              <strong>Average time: </strong>
              <span v-text="formattedAverageRuntime" />
            </li>

            <li v-if="language" :class="`${className}-extra-info__item`">
              <strong>Language: </strong>
              <span v-text="language" />
            </li>

            <li v-if="website" :class="`${className}-extra-info__item`">
              <strong>Website: </strong>
              <a :href="website" target="_blank" v-text="formattedWebsite" />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div :class="[`${className}__col`, `${className}__col_image`]">
      <div :class="`${className}-image`">
        <img
          v-if="selectedImage"
          :class="`${className}-image__ready`"
          :src="selectedImage"
          :alt="name"
          width="210px"
          height="295px"
        />
        <div v-else :class="`${className}-image__undefined`" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: Number,
    name: String,
    image: Object,
    description: String,

    genres: Array,
    averageRuntime: Number,
    website: String,
    language: String,

    className: {
      type: String,
      default: "c-showsPreview",
    },
  },
  computed: {
    formattedGenres() {
      return (this.genres || []).map((v) => v.toLowerCase());
    },
    formattedAverageRuntime() {
      return [this.averageRuntime, " min"].join("");
    },
    formattedWebsite() {
      const url = new URL(this.website);
      return url.host;
    },

    selectedImage() {
      return (this.image || {}).medium;
    },
  },
};
</script>

<style lang="scss" src="./Preview.scss" />
