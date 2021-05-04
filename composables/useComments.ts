import { reactive, computed, ComputedRef } from '@nuxtjs/composition-api'
import { Comment, CreateCommentInput, ListCommentsQuery } from '@/src/API'
import { createComment } from '~/src/graphql/mutations'
import { API } from 'aws-amplify'
import { listComments } from '~/src/graphql/queries'
import { GraphQLResult } from '@aws-amplify/api-graphql'

const useComments = (todoID: string) => {
  const comments = reactive<{list: Comment[]}>({
    list: []
  })
  
  const commentInput = reactive<CreateCommentInput>({
    content: '',
    todoID,
  })

  const addComment = async () => {
    try {
      await API.graphql({
        query: createComment,
        variables: {input: {...commentInput}}
      })
      commentInput.content = ''
      getComments()
    } catch (err) {
      console.error(err)
    }
 }

  const getComments = async () => {
    try {
      const commentsQuery = await API.graphql({
        query: listComments,
        variables: {
          filter: {
            todoID: { eq: todoID }
          }
        }
      }) as GraphQLResult<ListCommentsQuery>

      comments.list = commentsQuery.data?.listComments?.items as Comment[]
    } catch (err) {
      console.error(err)
    }
  }

  return {
    comments,
    commentInput,
    addComment,
    getComments
  }
}

export default useComments

export type CommentsStore = ReturnType<typeof useComments>