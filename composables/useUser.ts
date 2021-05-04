import { ref, reactive } from '@nuxtjs/composition-api'
import { CognitoUser } from 'amazon-cognito-identity-js'

const useUser = () => {
  const user = ref<CognitoUser | undefined | null>(undefined)
  
  return {
    user
  }
}

export default useUser
export type UserStore = ReturnType<typeof useUser>