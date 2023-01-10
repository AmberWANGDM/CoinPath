import { RouteRecordRaw } from "vue-router";
import { Welcome } from "../views/Welcome";
import { First } from "../components/Welcome/First";
import { Second } from "../components/Welcome/Second";
import { Third } from "../components/Welcome/Third";
import { FirstActions } from "../components/Welcome/FirstActions";
import { SecondActions } from "../components/Welcome/SecondActions";
import { ThirdActions } from "../components/Welcome/ThirdActions";



export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' }, {
    path: '/welcome', component: Welcome, children: [
      { path: '', redirect: '/welcome/1' },
      { path: '1', components: { main: First, footer: FirstActions }, },
      { path: '2', components: { main: Second, footer: SecondActions }, },
      { path: '3', components: { main: Third, footer: ThirdActions }, },
    ]
  }
]