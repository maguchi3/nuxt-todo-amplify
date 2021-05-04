<template>
  <div>
    <v-card>
      <v-card-title>{{toDo.data.name}}</v-card-title>
      <v-card-text>{{toDo.data.due}}</v-card-text>
    </v-card>
    <v-card>
      <v-card-title>コメント</v-card-title>
      <comment-list :toDoID="id" />
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRoute, inject, onMounted } from "@nuxtjs/composition-api";
import useToDoList from '@/composables/useToDoList'
import ToDoListKey from "~/composables/keys/useToDoListKey"

export default defineComponent({
  setup() {
    const route = useRoute()
    const id = route.value.params.id
    const { toDo, getToDo } = inject(ToDoListKey, useToDoList())

    onMounted(()=> {
      getToDo(id)
    })
    
    return {
      toDo,
      id,
    }
  }
})

</script>