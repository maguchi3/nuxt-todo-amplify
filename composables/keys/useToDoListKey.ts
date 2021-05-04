import { InjectionKey } from '@nuxtjs/composition-api'
import { ToDoListStore } from '@/composables/useToDoList'

const ToDoListKey: InjectionKey<ToDoListStore> = Symbol('ToDoListStore')
export default ToDoListKey