<template>
  <to-do-menu
    :title="'Edit your task'"
    :operation="updateToDo"
    :buttonText="'complete'"
    :input="updateInput"
  ></to-do-menu>
</template>

<script lang="ts">
import { defineComponent, ref, inject, useFetch, reactive, PropType } from '@nuxtjs/composition-api'
import ToDoListKey from '~/composables/keys/useToDoListKey'
import useToDoList, { ToDoListStore } from '@/composables/useToDoList'
import { UpdateTodoInput, Todo } from '~/src/API'

export default defineComponent({
  props: {
    toDo: {
      type: Object as PropType<Todo>
    }
  }
  ,
  setup(props) {
    const { updateToDo } = inject(ToDoListKey, useToDoList()) as ToDoListStore
    const updateInput: UpdateTodoInput = {
      id: props.toDo?.id || '',
      userID: props.toDo?.userID,
      name: props.toDo?.name,
      due: props.toDo?.due,
      done: props.toDo?.done
    }
    const menu = ref(false)
    const dialog= ref(false)
    const modal2 = ref(false)

    return {
      updateToDo,
      menu,
      dialog,
      modal2,
      updateInput
    }
  }
})
</script>