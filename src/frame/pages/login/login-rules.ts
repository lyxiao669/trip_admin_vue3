import { reactive } from "vue"

const validateUsername = (
  rule: unknown,
  value: string,
  callback: (e?: Error) => void
) => {
  if (value.length < 3) {
    callback(new Error('请输入正确的账号'))
  } else {
    callback()
  }
}

const validatePassword = (
  rule: unknown,
  value: string,
  callback: (e?: Error) => void
) => {
  if (value.length < 3) {
    callback(new Error('密码不能小于3位'))
  } else {
    callback()
  }
}

const loginRules = reactive({
  account: [
    { required: true, trigger: 'blur', validator: validateUsername },
  ],
  password: [
    { required: true, trigger: 'blur', validator: validatePassword },
  ],
})

export default loginRules
