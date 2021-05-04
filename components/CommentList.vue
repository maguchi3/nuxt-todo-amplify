<template>
  <div>
    <v-text-field
      v-model="commentInput.content"
    />
    <v-btn
      @click="addComment()"
    >
      Add
    </v-btn>
  <v-list>
    <v-list-item
      v-for="comment in comments.list"
      :key="comment.id"
    >
      <v-list-item-content>
        <v-list-item-title>{{comment.content}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
  </div>
</template>j

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import useComments from '~/composables/useComments'
import useToDoList from '~/composables/useToDoList'

export default defineComponent({
  props: {
    toDoID: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const { comments, commentInput, addComment, getComments } = useComments(props.toDoID)
    onMounted(() => {
      getComments()
    })

    return {
      comments,
      commentInput,
      addComment,
    }
  }
})
</script>