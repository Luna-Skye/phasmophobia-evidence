import Vue from 'vue'

export default Vue.extend({
  mounted (): void {
    const title = this.getTitle(this)
    if (title) document.title = title
  },
  methods: {
    getTitle (vm: Vue): string | null {
      const { title } = vm.$options
      if (title) {
        return typeof title === 'function'
          ? title.call(vm)
          : title
      }
      return null
    }
  }
})
