import { nextTick, Ref, ref } from "vue"

type PasswordType = 'password' | 'text'
type RefHTMLInputElement = Ref<HTMLInputElement | undefined>

const passwordType = ref<PasswordType>('password')

export default function useTogglePwdInputType(passwordRef: RefHTMLInputElement) {
  
  const showPwd = () => {
    passwordType.value === 'password'
      ? (passwordType.value = 'text')
      : (passwordType.value = 'password')
    nextTick(() => {
      passwordRef.value?.focus()
    })
  }

  return {
    showPwd,
    passwordType
  }
}