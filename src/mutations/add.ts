import gql from 'graphql-tag';

export default gql`
  mutation addTransaction($title: String!, $amount: Float!) {
    addTransaction(title: $title, amount: $amount) {
      id
      title
      amount
      createdAt
    }
  }
`;
