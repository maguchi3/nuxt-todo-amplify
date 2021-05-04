<template>
  <v-card>
    <v-list>
      <nuxt-link
          :to="'/todos/' + toDo.id"
          class="item-link"
          v-for="(toDo) in toDos.list"
          :key="toDo.id"
      >
        <v-list-item
          :input-value="toDo.done"
          active-class="textDone"
        >
          <v-btn
            icon
            @click.prevent="toggleDone(toDo)"
          >
              <v-icon v-if="!toDo.done">mdi-checkbox-blank-outline</v-icon>
              <v-icon v-if="toDo.done">mdi-checkbox-marked-outline</v-icon>
            </v-btn>
            <v-list-item-content>
              <v-list-item-title>{{ toDo.name }}</v-list-item-title>
            </v-list-item-content>

            <v-spacer></v-spacer>

            <v-list-item-content>
              <v-list-item-title>{{ toDo.due }}</v-list-item-title>
            </v-list-item-content>
            <edit-menu
              :toDo="toDo"
            ></edit-menu>
            <v-btn
              icon
              @click.prevent="deleteToDo(toDo.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-list-item>
      </nuxt-link>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import useToDoList from '../composables/useToDoList'
import ToDoListKey from '~/composables/keys/useToDoListKey'
import { ToDoListStore } from '@/composables/useToDoList'
import EditMenu from './EditMenu.vue'

export default defineComponent({
  components: { EditMenu },
  setup() {
    const { toDos, deleteToDo, toggleDone } = inject(ToDoListKey, useToDoList()) as ToDoListStore

    return {
      toDos,
      deleteToDo,
      toggleDone
    }
  }
})
</script>


<style scoped>
  .item-link {
    text-decoration: none;
  }
  .textDone {
    color: darkgray;
  }
</style>