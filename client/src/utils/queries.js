import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  me {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        title
        description
        authors
        image
        link
      }
    }
  }
`;