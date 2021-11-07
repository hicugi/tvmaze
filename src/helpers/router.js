import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/page/routes";

Vue.use(VueRouter);

export default new VueRouter({ mode: "history", routes });
