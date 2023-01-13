import s from './welcome.module.scss'

export const Third = () => {
  return <div class={s.card}>
    <svg>
      <use xlinkHref='#welcome3'></use>
    </svg>
    <div class={s.intro}>
      <span>清晰图表</span><br />
      <span>收支一目了然</span>
    </div>
  </div>
}

Third.displayName = 'Third'