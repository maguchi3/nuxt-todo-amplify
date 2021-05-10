import { defineComponent, onMounted, provide, inject, useAsync, ref, Ref, useFetch } from '@nuxtjs/composition-api'
import useToDoList from '@/composables/useToDoList'
import ToDoListKey from '~/composables/keys/useToDoListKey'
import { onAuthUIStateChange, AuthState} from '@aws-amplify/ui-components'
import { Auth } from '@aws-amplify/auth'
import { CognitoUser } from 'amazon-cognito-identity-js'
import AuthKey from '@/composables/keys/useAuthKey'
import useUser from '@/composables/useUser'
import UserKey from '@/composables/keys/useUserKey'

const useAuth = () => {
  const authState = ref<AuthState | undefined>(undefined)

  const { user } = inject(UserKey, useUser())
  const { toDos, getToDoList, subscribe } = inject(ToDoListKey, useToDoList())

  onAuthUIStateChange((state) => {
    authState.value = state
    console.log(state)

    if (state === AuthState.SignedOut) toDos.list = []
    if (state === AuthState.SignedIn) {
      Auth.currentAuthenticatedUser()
        .then(result => {
          user.value = result
          if (user.value === undefined || user.value === null) return
          getToDoList(user.value.getUsername())
          subscribe()
          })
    }
  })

  return {
    authState,
  }
}

export default useAuth

export type AuthStore = ReturnType<typeof useAuth>