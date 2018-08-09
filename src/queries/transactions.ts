import gql from 'graphql-tag';

export default gql`
  query {
    transactions {
      id
      title
      amount
      createdAt
      updatedAt
    }
  }
`;
