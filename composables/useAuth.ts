import { ref } from '@nuxtjs/composition-api'
import { AuthState } from '@aws-amplify/ui-components' 

const useAuth = () => {
  const authState = ref<AuthState | undefined>(undefined)

  return {
    authState
  }
}

export default useAuth

export type AuthStore = ReturnType<typeof useAuth>