<template>
  <div :class="[className, isActive && `${className}--active`]">
    <slot />

    <ul v-if="options.length" ref="options" :class="`${className}-options`">
      <template v-for="(item, index) in options">
        <li :key="index" :class="getItemClass(index)">
          <button
            :class="`${className}-options__btn`"
            type="button"
            tabindex="-1"
            @click="handleOptionClick(item)"
            v-text="getItemText(item)"
          />
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },

    itemLabelKey: String,

    className: {
      type: String,
      default: "ui-autocomplete",
    },
  },
  data: () => ({
    isActive: false,
    focusIndex: null,
  }),
  watch: {
    $route(newValue, value) {
      if (newValue.path !== (value || {}).path) {
        this.isActive = false;
      }
    },
    options() {
      this.focusIndex = null;
    },
  },

  mounted() {
    this.initEvents();
  },
  beforeUnmount() {
    this.removeEvents();
  },

  methods: {
    getItemClass(index) {
      const { focusIndex } = this;
      return ["", focusIndex !== null && focusIndex === index && "--focused"]
        .filter((v) => typeof v === "string")
        .map((v) => [this.className, "-options__item", v].join(""));
    },
    getItemText(item) {
      const { itemLabelKey } = this;
      if (itemLabelKey) return item[itemLabelKey];
      return item;
    },

    getInput() {
      return this.$el.querySelector("input");
    },

    getFieldEvents() {
      return {
        focus: this.showDropdown,
        blur: this.handleFieldBlur,
        keydown: this.handleFieldKeypdown,
      };
    },
    initEvents() {
      const field = this.getInput();
      if (!field) return;

      document.body.addEventListener("click", this.handleBodyClick);

      Object.entries(this.getFieldEvents()).forEach(([eventName, fn]) => {
        field.addEventListener(eventName, fn);
      });
    },
    removeEvents() {
      const field = this.getInput();
      if (!field) return;

      document.body.removeEventListener("click", this.handleBodyClick);

      Object.entries(this.getFieldEvents()).forEach(([eventName, fn]) => {
        field.removeEventListener(eventName, fn);
      });
    },

    handleBodyClick({ target }) {
      let elm = target;
      while (elm && elm !== document.body) {
        if (elm === this.$el) {
          return;
        }

        elm = elm.parentNode;
      }

      this.isActive = false;
    },
    handleFieldBlur() {
      setTimeout(() => {
        this.hideDropdown();
      }, 160);
    },
    handleFieldKeypdown(e) {
      const { code } = e;
      let index = this.focusIndex;

      if (["Escape", "Tab"].includes(code)) {
        this.isActive = false;
        return;
      }

      if (code === "Enter" && index !== null) {
        const item = this.options[index];
        if (!item) return;

        this.handleOptionClick(item);
        e.preventDefault();
        return;
      }

      if (["ArrowDown", "ArrowUp"].includes(code)) {
        const optionsLength = this.options.length;

        if (code === "ArrowDown") {
          if (index === null || index + 1 >= optionsLength) index = 0;
          else index += 1;
        }
        if (code === "ArrowUp") {
          if (index === null || index <= 0) index = optionsLength - 1;
          else index -= 1;
        }

        this.focusIndex = index;
        e.preventDefault();
        return;
      }
    },

    showDropdown() {
      this.isActive = true;
    },
    hideDropdown() {
      this.isActive = false;
      this.focusIndex = null;
    },

    handleOptionClick(item) {
      this.$emit("select", item);
    },
  },
};
</script>

<style lang="scss" src="./Autocomplete.scss" />
