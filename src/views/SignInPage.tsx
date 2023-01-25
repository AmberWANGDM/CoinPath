import { defineComponent, PropType, reactive, ref } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button/Button';
import { Form, FormItem } from '../shared/Form/Form';
import { Icon } from '../shared/Icon/Icon';
import { hasError, validate } from '../shared/validate';
import s from './SignInPage.module.scss';
import { http } from '../shared/Http';
import { useBool } from '../hooks/useBool';
import { useRoute, useRouter } from 'vue-router';
import { refreshMe } from '../shared/me';
export const SignInPage = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      email: 'wangdanmeng98@163.com',
      code: ''
    })
    const errors = reactive({
      email: [],
      code: []
    })
    const refValidationCode = ref<any>()
    const { ref: refDisabled, on: disable, off: enable } = useBool(false)
    const router = useRouter()
    const route = useRoute()
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      Object.assign(errors, { email: [], code: [] })
      Object.assign(errors, validate(formData, [
        { key: 'email', type: 'required', message: '请输入邮箱' },
        // you can use regex to validate email
        { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '请输入正确的邮箱' },
        { key: 'code', type: 'required', message: '请输入验证码' }
      ]))
      if (!hasError(errors)) {
        const response = await http.post<{ jwt: string }>('/session', formData)
          .catch(onError)
        localStorage.setItem('jwt', response.data.jwt)
        // 1 const returnTo = localStorage.getItem('returnTo')
        // 2 在任何跳转到登录界面的地方使用 query 参数 return_to 来指定登录成功后跳转的页面 router.push('/sign_in?return_to='+encodeURIComponent(route.fullPath))
        const returnTo = route.query.return_to?.toString()
        // 更新用户信息
        refreshMe()
        router.push(returnTo || '/')
      }
    }
    const onError = (error: any) => {
      Object.assign(errors, error.response.data.errors)
    }
    const onClickSendValidationCode = async () => {
      enable()
      const response = await http.post('/validation_codes', { email: formData.email })
        .catch(onError)
        .finally(disable)
      // 请求验证码成功后，调用子组件的函数，开始倒计时
      refValidationCode.value?.startCount()
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
                  v-model={formData.code} error={errors.code?.[0]}
                  countFrom={60}
                  ref={refValidationCode}
                  onClick={onClickSendValidationCode}
                  disabled={refDisabled.value}
                />
                <FormItem style={{ paddingTop: '16px' }}>
                  <Button type='submit'>登录</Button>
                </FormItem>
              </Form>
            </div>
          )
        }
      }</MainLayout>
    )
  }
})