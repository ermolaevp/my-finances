import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import Transactions from '.';
import getTransactions from '../../queries/transactions';

const dd = (new Date).toString;

const mocks = [
  {
    request: {
      query: getTransactions,
    },
    result: {
      data: {
        transactions: { id: '1', title: 'test', amount: 1, createdAt: dd, updatedAt: dd },
      },
    },
  },
];

it('renders without errors', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Transactions />
    </MockedProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
