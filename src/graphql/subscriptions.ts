/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCommentByTodoId = /* GraphQL */ `
  subscription OnCommentByTodoId($todoId: ID!) {
    onCommentByTodoId(todoId: $todoId) {
      id
      content
      todoID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      userID
      name
      due
      done
      comments {
        items {
          id
          content
          todoID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      userID
      name
      due
      done
      comments {
        items {
          id
          content
          todoID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      userID
      name
      due
      done
      comments {
        items {
          id
          content
          todoID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      content
      todoID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      content
      todoID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      content
      todoID
      createdAt
      updatedAt
    }
  }
`;
