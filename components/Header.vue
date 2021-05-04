<template>
    <v-app-bar
      color="white"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        <nuxt-link to="/">
        Nuxt-ToDo
        </nuxt-link>
      </v-toolbar-title>

      <add-menu class="fab" v-if="signedIn"></add-menu>

      <v-spacer></v-spacer>

    </v-app-bar>
</template>

<script lang='ts'>
import { defineComponent, inject, computed } from '@nuxtjs/composition-api'
import { AuthState } from '@aws-amplify/ui-components'
import useAuth from '@/composables/useAuth'
import AuthKey from '@/composables/keys/useAuthKey'

export default defineComponent({
  setup() {
    const { authState } = inject(AuthKey, useAuth())
    const signedIn = computed(() => authState.value === AuthState.SignedIn)
    return {
      authState,
      signedIn
    }
  }
  }
)

</script>

<style>
  .v-btn--fab {
    margin-left: 20px;
  }
  .nuxt-link-active {
    text-decoration: none;
    color: black;
  }
</style>