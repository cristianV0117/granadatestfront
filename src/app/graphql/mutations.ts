import gql from 'graphql-tag';

export const DELETE_LOG = gql`
  mutation DeleteLog($id: Int!) {
    deleteLog(id: $id)
  }
`;

export const UPDATE_LOG = gql`
  mutation UpdateLog($id: Int!, $username: String!) {
    updateLog(id: $id, username: $username) {
      id
      username
      request_timestamp
      num_countries_returned
    }
  }
`;
