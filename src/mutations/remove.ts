import gql from 'graphql-tag';

export default gql`
  mutation removeTransaction($id: String!) {
    removeTransaction(id: $id)
  }
`;
