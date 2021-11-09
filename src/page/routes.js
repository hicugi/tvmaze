import pageIndex from "@/page/index.vue";
import pageSearch from "@/page/search/index.vue";
import pageShowId from "@/page/show/_id.vue";

export default [
  { path: "", name: "home", component: pageIndex },
  { path: "/search", name: "search", component: pageSearch },
  { path: "/show/:id", name: "showId", component: pageShowId },
];
