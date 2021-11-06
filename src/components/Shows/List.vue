<template>
  <section :class="className">
    <div :class="`${className}__container`">
      <h2 :class="`${className}__title`" v-text="title" />

      <div :class="`${className}-list`">
        <ul :class="`${className}-list__container`" ref="sliderContainer">
          <!-- loading -->
          <template v-if="loading">
            <template v-for="(item, index) in Array(visibleItemsLength).fill()">
              <li :key="index" :class="listItemClass">
                <ThisCard placeholder :visible="getCardVisibleProp(index)" />
              </li>
            </template>
          </template>

          <!-- items -->
          <template v-else v-for="(item, index) in items">
            <li :key="index" :class="listItemClass">
              <ThisCard v-bind="item" :visible="getCardVisibleProp(index)" />
            </li>
          </template>
        </ul>

        <div v-if="!loading">
          <button
            v-show="scrollIndex > 0"
            :class="[`${className}__arrow`, `${className}__arrow_prev`]"
            type="button"
            v-text="'next shows'"
            @click="handlePrevClick"
          />
          <button
            v-show="isNextBtnVisible"
            :class="[`${className}__arrow`, `${className}__arrow_next`]"
            v-text="'previous shows'"
            @click="handleNextClick"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ThisCard from "./Card.vue";
import cssExport from "./List.scss";

export default {
  components: { ThisCard },

  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },

    loading: Boolean,

    className: {
      type: String,
      default: "c-showsList",
    },
  },
  data: () => ({
    visibleItemsLength: 5,
    containerGap: 76,
    scrollIndex: 0,
  }),
  computed: {
    listItemClass() {
      return `${this.className}-list__item`;
    },

    isNextBtnVisible() {
      return (
        this.items.length > (this.scrollIndex + 1) * this.visibleItemsLength
      );
    },
    minMaxScrollIndexes() {
      const maxItems = this.visibleItemsLength;
      const { scrollIndex } = this;

      const min =
        (scrollIndex ? scrollIndex - 1 : scrollIndex * (maxItems + 1)) - 2;
      const max = (scrollIndex + 2) * maxItems;

      return [min, max];
    },
  },

  mounted() {
    this.initResizeEvent();
  },
  beforeDestroy() {
    this.destroyResizeEvent();
  },

  methods: {
    initResizeEvent() {
      this.handleResize();
      window.addEventListener("resize", this.handleResize);
    },
    destroyResizeEvent() {
      window.removeEventListener("resize", this.handleResize);
    },

    handleResize() {
      const w = window.innerWidth;
      const getValue = (key) => parseInt(cssExport[key].replace("px", ""));

      const breakpointIndex = [
        w >= getValue("breakpointXlg"),
        w >= getValue("breakpointLg"),
        w >= getValue("breakpointMd"),
        w >= getValue("breakpointSm"),
        true,
      ].findIndex((condition) => condition);

      this.visibleItemsLength = [
        "visibleItemsLengthXlg",
        "visibleItemsLengthLg",
        "visibleItemsLengthMd",
        "visibleItemsLengthSm",
        "visibleItemsLength",
      ].map(getValue)[breakpointIndex];

      this.containerGap = [
        ["arrowWidthLg", "itemGapLg"],
        ["arrowWidthLg", "itemGapLg"],
        ["arrowWidthMd", "itemGapMd"],
        ["arrowWidth", "itemGap"],
        ["arrowWidth", "itemGap"],
      ].map(([v1, v2]) => getValue(v1) + getValue(v2))[breakpointIndex];

      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.scrollSlider(this.scrollIndex);
      }, 300);
    },

    getCardVisibleProp(index) {
      const [min, max] = this.minMaxScrollIndexes;
      return min <= index && index < max;
    },

    getNextSlideItem(index) {
      const { sliderContainer } = this.$refs;
      if (!sliderContainer) return;

      const { visibleItemsLength } = this;

      const nthIndex = index * visibleItemsLength + 1;
      const selector = `.${this.listItemClass}:nth-child(${nthIndex})`;

      return sliderContainer.querySelector(selector);
    },
    scrollSlider(newIndex) {
      const { sliderContainer } = this.$refs;
      const { containerGap } = this;

      const scrollToItem = this.getNextSlideItem(newIndex);
      const scrollToX = scrollToItem.offsetLeft - containerGap;

      sliderContainer.scrollTo(scrollToX, 0);

      this.scrollIndex = newIndex;
    },
    handlePrevClick() {
      const nextIndex = this.scrollIndex - 1;
      this.scrollSlider(nextIndex);
    },
    handleNextClick() {
      const prevIndex = this.scrollIndex + 1;
      this.scrollSlider(prevIndex);
    },
  },
};
</script>
