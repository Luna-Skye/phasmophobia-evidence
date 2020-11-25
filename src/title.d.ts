// 1. Make sure to import 'vue' before declaring augmented types
import Vue, { ComponentOptions } from 'vue'

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/options' {
  // 3. Declare augmentation for Vue
  interface ComponentOptions<V extends Vue> {
    title?: string | Function;
  }
}
