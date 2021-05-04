<template>
    <v-dialog
      v-model="dialog"
      width="500"
      @click.prevent
    >
      <template v-slot:activator="{ on, attrs }">
        <template v-if="!toDoInput.id">
          <v-btn
            fab
            small
            v-on="on"
            v-bind="attrs"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>

        </template>
        <template v-else>
          <v-btn
            icon
            @click.prevent
            v-on="on"
            v-bind="attrs"
            :disabled="currentToDo.done"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
      </template>

      <v-card>
        <v-card-title class="headline">
          {{ title }}
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="toDoInput.name"
              label="task name"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-text>
        <v-menu
          v-model="menu"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="toDoInput.due"
              label="Date"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="toDoInput.due"
            no-title
            @input="menu = false"
          ></v-date-picker>
        </v-menu>

        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
            <template v-if="!toDoInput.id">
                <v-btn
                  color="primary"
                  text
                  @click="addToDo(toDoInput)"
                >
                  {{ buttonText}}
                </v-btn>
            </template>
            <template v-else>
                <v-btn
                  color="primary"
                  text
                  @click="updateToDo(toDoInput)"
                >
                  {{ buttonText}}
                </v-btn>
            </template>
      </v-card-actions>
     </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, inject, PropType } from '@nuxtjs/composition-api'
import ToDoListKey from '~/composables/keys/useToDoListKey'
import useToDoList, { ToDoListStore } from '@/composables/useToDoList'
import { CreateTodoInput, UpdateTodoInput } from '~/src/API'
import { computed, reactive } from '@vue/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    operation: {
      type: Function,
      required: true
    },
    input: {
      type: Object as PropType<CreateTodoInput | UpdateTodoInput>,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { toDos, addToDo, updateToDo } = inject(ToDoListKey, useToDoList()) as ToDoListStore
    const menu = ref(false)
    const dialog= ref(false)
    const modal2 = ref(false)
    const toDoInput = reactive({...props.input})
    const currentToDo = computed(() => {
      if (!toDoInput.id) return
      return toDos.list.find(toDo => toDo.id === toDoInput.id)
      })

    return {
      addToDo,
      updateToDo,
      toDoInput,
      menu,
      dialog,
      modal2,
      toDos,
      currentToDo
    }
  }
})
</script>