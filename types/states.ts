import { ComputedRef } from '@nuxtjs/composition-api'

export type ToDo = {
  id: number
  name: string
  due: string
  done: boolean
}

export type ToDoInput = {
  name: string
  due: string
}