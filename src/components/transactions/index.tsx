import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import * as React from 'react';
import { compose, graphql, ChildDataProps } from 'react-apollo';
import { withHandlers } from 'recompose';
import addTransaction from '../../mutations/add';
import removeTransaction from '../../mutations/remove';
import getTransactions from '../../queries/transactions';
import { ITransaction } from '../../types';
import Form from './form';
import './styles.css';

interface ITransactions {
  transactions: ITransaction[];
}

interface ITransactionsProps {
  transactions: ITransaction[];
  loading: boolean;
  submit: (event: React.FormEvent<HTMLInputElement>) => void;
  remove: (id: string) => any;
}

const Transactions = ({
  transactions,
  loading,
  submit,
  remove
}: ITransactionsProps) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ width: 300 }}>
      <b>Balance: {transactions.reduce((s, t) => s + t.amount, 0)}</b>
      <Form submit={submit} />
      <List className="transactions">
        {transactions.map((transaction) => (
          <ListItem key={transaction.id}>
            <Avatar>
              {transaction.amount > 0 ? '+' : '-'}
            </Avatar>
            <ListItemText
              primary={transaction.amount}
              secondary={transaction.title}
            />
            <ListItemSecondaryAction>
              <Button
                color="secondary"
                onClick={remove(transaction.id)}
              >
                del
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

type ChildProps = ChildDataProps<ITransactions>;

export default compose(
  graphql<{}, ITransactions, ChildProps>(getTransactions, {
    props: ({ data }) => ({
      ...data
    }),
  }),
  graphql(addTransaction, { name: 'addTransaction' }),
  graphql(removeTransaction, { name: 'removeTransaction' }),
  withHandlers({
    remove: (props: any) => (id: string) => (e: React.SyntheticEvent) => {
      props.removeTransaction({
        refetchQueries: [{ query: getTransactions }],
        variables: { id },
      });
    },
    submit: (props: any) => (event: React.FormEvent) => {
      event.preventDefault();
      const formData: any = event.target;
      props.addTransaction({
        refetchQueries: [{ query: getTransactions }],
        variables: {
          amount: +formData.amount.value,
          title: formData.title.value,
        },
      }).then((_: any) => {
        const form: any = document.querySelector('#add-transaction');
        form.reset();
      });
      return false;
    },

  }),
)(Transactions);
