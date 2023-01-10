import welcome3 from '../../assets/icons/welcome3.svg'
import s from './welcome.module.scss'

export const Third = () => {
  return <div class={s.card}>
    <img src={welcome3} />
    <div class={s.intro}>
      <span>清晰图表</span><br />
      <span>收支一目了然</span>
    </div>
  </div>
}

Third.displayName = 'Third'