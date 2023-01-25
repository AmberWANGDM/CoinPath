import { RouteRecordRaw } from "vue-router";
import { Welcome } from "../views/Welcome";
import { First } from "../components/welcome/First";
import { Second } from "../components/welcome/Second";
import { Third } from "../components/welcome/Third";
import { FirstActions } from "../components/welcome/FirstActions";
import { SecondActions } from "../components/welcome/SecondActions";
import { ThirdActions } from "../components/welcome/ThirdActions";
import { StartPage } from "../views/StartPage";
import { ItemsPage } from "../views/ItemsPage";
import { ItemList } from "../components/item/ItemList";
import { CreateItem } from "../components/item/CreateItem";
import { TagPage } from "../views/TagPage";
import { TagCreate } from "../components/tag/TagCreate";
import { TagEdit } from "../components/tag/TagEdit";
import { SignInPage } from "../views/SignInPage";
import { StatisticsPage } from "../views/StatisticsPage";

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome', component: Welcome,
    beforeEnter: (to, from, next) => {
      localStorage.getItem('skipFeatures') ? next('/start') : next()
    },
    children: [
      { path: '', redirect: '/welcome/1' },
      { path: '1', name: "Welcome1", components: { main: First, footer: FirstActions }, },
      { path: '2', name: "Welcome2", components: { main: Second, footer: SecondActions }, },
      { path: '3', name: "Welcome3", components: { main: Third, footer: ThirdActions }, },
    ]
  },
  { path: '/start', component: StartPage },
  {
    path: '/items', component: ItemsPage, children: [
      { path: '', component: ItemList },
      { path: 'create', component: CreateItem },
    ]
  },
  {
    path: '/tags', component: TagPage, children: [
      { path: 'create', component: TagCreate },
      { path: ':id/edit', component: TagEdit }
    ]
  },
  {
    path: '/sign_in', component: SignInPage
  },
  {
    path: '/statistics', component: StatisticsPage
  }
]
