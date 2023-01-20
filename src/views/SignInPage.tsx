import { defineComponent, PropType, reactive } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button/Button';
import { Form, FormItem } from '../shared/Form/Form';
import { Icon } from '../shared/Icon/Icon';
import { validate } from '../shared/validate';
import s from './SignInPage.module.scss';
export const SignInPage = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      email: '',
      code: ''
    })
    const errors = reactive({
      email: [],
      code: []
    })
    const onSubmit = (e: Event) => {
      e.preventDefault();
      Object.assign(errors, { email: [], code: [] })
      Object.assign(errors, validate(formData, [
        { key: 'email', type: 'required', message: '请输入邮箱' },
        // you can use regex to validate email
        { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '请输入正确的邮箱' },
        { key: 'code', type: 'required', message: '请输入验证码' }
      ]))
    }
    return () => (
      <MainLayout>{
        {
          title: () => '登录',
          icon: () => <Icon name='back' />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.app_wrapper}>
                <Icon name='logo' class={s.icon} />
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem label="邮箱地址" type='text' placeholder='请输入邮箱，然后点击发送验证码'
                  v-model={formData.email} error={errors.email?.[0]} />
                <FormItem label="验证码" type='validationCode' placeholder='请输入验证码'
                  v-model={formData.code} error={errors.code?.[0]} />
                <FormItem style={{ paddingTop: '16px' }}>
                  <Button>登录</Button>
                </FormItem>
              </Form>
            </div>
          )
        }
      }</MainLayout>
    )
  }
})