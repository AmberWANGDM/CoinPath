import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { Second } from "../components/welcome/Second";
import { Third } from "../components/welcome/Third";
import { FirstActions } from "../components/welcome/FirstActions";
import { SecondActions } from "../components/welcome/SecondActions";
import { ThirdActions } from "../components/welcome/ThirdActions";
import { ItemList } from "../components/item/ItemList";
import { CreateItem } from "../components/item/CreateItem";
import { TagCreate } from "../components/tag/TagCreate";
import { TagEdit } from "../components/tag/TagEdit";
export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: () => import('../views/Welcome'),
    beforeEnter: (to, from, next) => {
      localStorage.getItem('skipFeatures') ? next('/items') : next()
    },
    children: [
      { path: '', redirect: '/welcome/1' },
      { path: '1', name: "Welcome1", components: { main: First, footer: FirstActions }, },
      { path: '2', name: "Welcome2", components: { main: Second, footer: SecondActions }, },
      { path: '3', name: "Welcome3", components: { main: Third, footer: ThirdActions }, },
    ]
  },
  {
    path: '/items',
    component: () => import('../views/ItemsPage'),
    children: [
      { path: '', component: ItemList },
      { path: 'create', component: CreateItem },
    ]
  },
  {
    path: '/tags',
    component: () => import('../views/TagPage'),
    children: [
      { path: 'create', component: TagCreate },
      { path: ':id/edit', component: TagEdit }
    ]
  },
  {
    path: '/sign_in', component: () => import('../views/SignInPage')
  },
  {
    path: '/statistics', component: () => import('../views/StatisticsPage')
  },
  {
    path: '/export', component: () => import('../views/Export')
  },
  {
    path: '/notify', component: () => import('../views/Notify')
  },
]
