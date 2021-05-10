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
import useAuth from '@/composables/useAuth'
import useUser from '@/composables/useUser'
import UserKey from '@/composables/keys/useUserKey'
import useToDoList from '@/composables/useToDoList'
import ToDoListKey from '~/composables/keys/useToDoListKey'

export default defineComponent({
  setup() {
    provide(UserKey, useUser())
    provide(ToDoListKey, useToDoList())
    useAuth()
  }
})

</script>

