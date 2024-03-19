<script lang="tsx">
import { defineComponent, reactive, toRefs } from 'vue'
import './iconfont.js'

export default defineComponent({
  name: 'JzIcon',
  props: {
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 16
    }
  },
  setup(props) {
    const { icon, size } = toRefs(props)

    const useStyle = reactive({
      fontSize: size.value + 'px'
    })

    return () => {
      return (
        <svg class="icon" aria-hidden="true" style={ useStyle }>
          <use xlinkHref={ '#icon-' + icon.value }></use>
        </svg>
      )
    }
  }
})
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>