import { Ref } from "vue"

type RefHTMLInputElement = Ref<HTMLInputElement | undefined>

export default function useFormFocus(loginForm: LoginRequestModel, usernameRef:RefHTMLInputElement, passwordRef:RefHTMLInputElement) {
  if (loginForm.account === '') {
    usernameRef.value?.focus()
  } else if (loginForm.password === '') {
    passwordRef.value?.focus()
  }
}
