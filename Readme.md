<p align="center">
  <a href="http://tvmaze.webmaho.com/">
    <img src="https://static.tvmaze.com/images/tvm-header-logo.png" alt="TvMaze">
  </a>
</p>

<p align="center">
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/Node.js-v14.16.0-339933" alt="Node.js">
  </a>
  <a href="https://npmjs.com/">
    <img src="https://img.shields.io/badge/npm-v6.14.11-CB3837" alt="Npm">
  </a>
  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/Vue.js-v2.6.11-4FC08D" alt="Version">
  </a>
</p>

<h2 align="center">Test project with API from <a href="https://www.tvmaze.com/">TvMaze</a></h2>

[Live demo](http://tvmaze.webmaho.com/).

[AppBefore](src/components/App/Before.vue) made for styles which come before all other components.

Class names in components have one place of truth. Whenever you want to change class, you have to perform the change in two places (css & props). Also `className` can be replaced by parent and has new styles. `c-` stays for components and `p-` for pages.</p>

Router navigation uses `name`, `params` & `query` from `vue-router`.

[UiInput](src/components/Ui/Input.vue) component stays close to original `input` as much as possible but with `v-model` support.

## Pros

- Search autocomplete with key navigation
- CSS loading animations

## Cons

- Dropdown without portal
- Extra package for smooth scroll
- Queries without cancellation

## Ecosystem

| Package        | Status                                         | Description                     |
| -------------- | ---------------------------------------------- | ------------------------------- |
| [vue-router]   | [![vue-router-status]][vue-router-package]     | Single-page application routing |
| [sweet-scroll] | [![sweet-scroll-status]][sweet-scroll-package] | Smooth scroll                   |

[vue-router]: https://www.npmjs.com/package/vue-router
[vue-router-status]: https://img.shields.io/npm/v/vue-router.svg
[vue-router-package]: https://npmjs.com/package/vue-router
[sweet-scroll]: https://www.npmjs.com/package/sweet-scroll
[sweet-scroll-status]: https://img.shields.io/npm/v/sweet-scroll.svg
[sweet-scroll-package]: https://npmjs.com/package/sweet-scroll
