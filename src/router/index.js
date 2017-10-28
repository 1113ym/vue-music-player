import Vue from "vue"
import Router from "vue-router"
import MusicList from "@/components/MusicList.vue"
import MusicPlay from "@/components/MusicPlay.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/musics",
      name: "MusicList",
      component: MusicList
    },
    {
      path: "/play/:id",
      name: "MusicPlay",
      component: MusicPlay
    },
    {
      path: "*",
      component: MusicList
    }
  ]
})
