import { InjectionKey } from '@nuxtjs/composition-api'
import { UserStore } from '@/composables/useUser'

const UserKey: InjectionKey<UserStore> = Symbol('UserStore')

export default UserKey