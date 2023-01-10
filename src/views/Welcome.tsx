import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import s from './Welcome.module.scss'
import logo from '../assets/icons/logo.svg'
export const Welcome = defineComponent({
  setup: (props, context) => {
    return () => (<div class={s.wrapper}>
      <header >
        <img src={logo} />
      </header>
      <main><RouterView name="main" /></main>
      <footer><RouterView name="footer" /></footer>
    </div>
    )
  }
})