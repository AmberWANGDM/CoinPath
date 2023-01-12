import { RouteRecordRaw } from "vue-router";
import { Welcome } from "../views/Welcome";
import { First } from "../components/Welcome/First";
import { Second } from "../components/Welcome/Second";
import { Third } from "../components/Welcome/Third";
import { FirstActions } from "../components/Welcome/FirstActions";
import { SecondActions } from "../components/Welcome/SecondActions";
import { ThirdActions } from "../components/Welcome/ThirdActions";
import { StartPage } from "../views/StartPage";
import { ItemsPage } from "../views/ItemsPage";
import { ItemList } from "../components/item/ItemList";
import { CreateItem } from "../components/item/CreateItem";

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome', component: Welcome, children: [
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
  }
]
