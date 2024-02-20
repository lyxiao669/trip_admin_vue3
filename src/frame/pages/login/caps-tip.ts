import { ref } from "vue"

// 输入框大小写
const capsTooltip = ref(false)

export default function useCapsTip() {
  const checkCapslock = function ({ shiftKey, key }: KeyboardEvent) {
    if (key && key.length === 1) {
      if (
        (shiftKey && key >= 'a' && key <= 'z') ||
        (!shiftKey && key >= 'A' && key <= 'Z')
      ) {
        capsTooltip.value = true
      } else {
        capsTooltip.value = false
      }
    }
    if (key === 'CapsLock' && capsTooltip.value === true) {
      capsTooltip.value = false
    }
  }

  return {
    checkCapslock,
    capsTooltip
  }
}
