import { InjectionKey } from '@nuxtjs/composition-api'
import { AuthStore } from '@/composables/useAuth'

const AuthKey: InjectionKey<AuthStore> = Symbol('AuthStore')

export default AuthKey