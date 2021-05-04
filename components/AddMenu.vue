<template>
  <to-do-menu
    :title="'Add your task'"
    :operation="addToDo"
    :buttonText="'Add'"
    :input="toDoInput"
  ></to-do-menu>
</template>

<script lang="ts">
import { defineComponent, ref, inject, useFetch } from '@nuxtjs/composition-api'
import ToDoListKey from '~/composables/keys/useToDoListKey'
import useToDoList, { ToDoListStore } from '@/composables/useToDoList'
import ToDoMenu from './ToDoMenu.vue'
import { CreateTodoInput } from '~/src/API'
import { Auth } from 'aws-amplify'
import { reactive } from '@vue/composition-api'

export default defineComponent({
  components: { ToDoMenu },
  setup() {
    const { addToDo } = inject(ToDoListKey, useToDoList()) as ToDoListStore
    const menu = ref(false)
    const dialog= ref(false)
    const modal2 = ref(false)
    const toDoInput = reactive<CreateTodoInput>({
      name: '',
      due: new Date().toISOString().substr(0, 10),
      done: false,
      userID: ''
    })
    useFetch(async () => {
      const user: {username: string} | null = await Auth.currentUserInfo()
      toDoInput.userID = user?.username || ''
    })

    return {
      addToDo,
      toDoInput,
      menu,
      dialog,
      modal2,
    }
  }
})
</script>