import { InjectionKey } from '@nuxtjs/composition-api'
import { CommentsStore } from '@/composables/useComments'

const CommentsKey: InjectionKey<CommentsStore> = Symbol('CommentsStore')
export default CommentsKey