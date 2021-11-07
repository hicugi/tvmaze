import pageIndex from "@/page/index.vue";
import pageShowId from "@/page/show/_id.vue";

export default [
  { path: "", name: "home", component: pageIndex },
  { path: "/show/:id", name: "showId", component: pageShowId },
];
