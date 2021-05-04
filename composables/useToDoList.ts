import { reactive } from '@nuxtjs/composition-api'
import { API } from 'aws-amplify'
import { getTodo, listTodos } from '~/src/graphql/queries'
import { createTodo, deleteTodo, updateTodo } from '~/src/graphql/mutations'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { 
  ListTodosQuery,
  Todo,
  CreateTodoInput,
  GetTodoQuery,
  ModelTodoFilterInput,
  ListTodosQueryVariables,
  UpdateTodoInput,
  UpdateTodoMutationVariables,
} from '~/src/API'
import { onCreateTodo, onDeleteTodo, onUpdateTodo } from '~/src/graphql/subscriptions' 
import Auth from '@aws-amplify/auth'

const useToDoList = () => {
    const toDos = reactive<{list: Todo[]}>({
      list: []
    })
    const toDo = reactive<{data: Todo}>({
      data: {__typename: "Todo"}
    })

    const getToDoList = async (userID: string) => {
      try {
        const input: ModelTodoFilterInput = {
          userID: {
            eq: userID
          }
        }
        const variables: ListTodosQueryVariables = {
          filter: input
        }
        const toDoList = await API.graphql({
          query: listTodos,
          variables
        }) as GraphQLResult<ListTodosQuery>
        
        toDos.list = toDoList.data?.listTodos?.items as Todo[]
      } catch (err) {
        console.error(err)
      }
    }

    const getToDo = async (id: string) => {
      toDo.data = { __typename: "Todo" }
      try {
        const toDoQuery = await API.graphql({
          query: getTodo,
          variables: { id }
        }) as GraphQLResult<GetTodoQuery>

        toDo.data = {...toDoQuery.data?.getTodo} as Todo
      } catch (err) {
        console.error(err)
      }
    }

    const addToDo = async (input: CreateTodoInput) => {
      const user = await Auth.currentAuthenticatedUser()
      input.userID = user.username
      try {
        await API.graphql({
          query: createTodo,
          variables: { input: input}
        })
        input.name = ''
        input.due = new Date().toISOString().substr(0, 10)
      } catch (err) {
        console.error(err)
      }
   }

    const deleteToDo = async (id: string) => {
      try {
        await API.graphql({
          query: deleteTodo,
          variables: { input: {id}}
        })
      } catch (err) {
        console.error(err)
      }
   }

   const updateToDo = async (input: UpdateTodoInput) => {
     const variables: UpdateTodoMutationVariables = { input: input }
     try {
       await API.graphql({
         query: updateTodo,
         variables
       })
     } catch (err) {
       console.error(err)
     }
   }

   const toggleDone = (toDo: Todo) => {
    if (!toDo.id) return
    updateToDo({id: toDo.id, done: !toDo.done})
  }

    const subscribe = () => {
      API.graphql({ query: onCreateTodo })
        // @ts-ignore
        .subscribe({
          // @ts-ignore
          next: (eventData) => {
            let todo = eventData.value.data.onCreateTodo
            if (toDos.list.some(item => item.name === todo.name)) return
            toDos.list = [...toDos.list, todo]
          }
        })
      API.graphql({ query: onDeleteTodo })
        // @ts-ignore
        .subscribe({
          // @ts-ignore
          next: (eventData) => {
            let todo = eventData.value.data.onDeleteTodo
            toDos.list = toDos.list.filter(item => item.id !== todo.id)
          }
        })
      API.graphql({ query: onUpdateTodo })
        // @ts-ignore
        .subscribe({
          // @ts-ignore
          next: (eventData) => {
            const newTodo = eventData.value.data.onUpdateTodo
            const oldTodo = toDos.list.find(todo => todo.id === newTodo.id)
            if (!oldTodo) return
            const targetIndex = toDos.list.indexOf(oldTodo)
            toDos.list.splice(targetIndex, 1, newTodo)
          }
        })
    }

    return {
      toDos,
      toDo,
      addToDo,
      deleteToDo,
      getToDoList,
      getToDo,
      updateToDo,
      toggleDone,
      subscribe
    }
}

export default useToDoList

export type ToDoListStore = ReturnType<typeof useToDoList>