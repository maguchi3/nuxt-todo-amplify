<template>
  <v-app>
  <div>
    <Header />
    <amplify-authenticator>
      <Nuxt />
      <amplify-sign-out></amplify-sign-out>
    </amplify-authenticator>
  </div>
  </v-app>
</template>

<script lang='ts'>
import { defineComponent, onMounted, provide, inject, useAsync, ref, Ref, useFetch } from '@nuxtjs/composition-api'
import useToDoList from '@/composables/useToDoList'
import ToDoListKey from '~/composables/keys/useToDoListKey'
import { onAuthUIStateChange, AuthState} from '@aws-amplify/ui-components'
import { Auth } from '@aws-amplify/auth'
import { CognitoUser } from 'amazon-cognito-identity-js'
import useAuth from '@/composables/useAuth'
import AuthKey from '@/composables/keys/useAuthKey'
import useUser from '@/composables/useUser'
import UserKey from '@/composables/keys/useUserKey'

export default defineComponent({
  setup() {
    provide(ToDoListKey, useToDoList())
    provide(AuthKey, useAuth())
    provide(UserKey, useUser())
    const { toDos, getToDoList, subscribe } = inject(ToDoListKey, useToDoList())
    const { authState } = inject(AuthKey, useAuth())
    const { user } = inject(UserKey, useUser())

    onAuthUIStateChange((state) => {
      authState.value = state

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

    // onAuthUIStateChange(async (authState) => {
    //   if (authState === AuthState.SignOut) toDos.list = []
    //   const user = await Auth.currentUserInfo()
    //   if (user === null) return
    //   await getToDoList(user.username)
    //   console.log(toDos)
    //   subscribe()
    // })

    return {
      toDos
    }
  }
})

</script>

