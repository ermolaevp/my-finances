import * as React from 'react';
import {
  Button,
  TextField,
} from '@material-ui/core';

interface IFormProps {
  submit: (event: React.FormEvent) => void;
}

const Form = ({ submit }: IFormProps) => (
  <form
    id="add-transaction"
    method="POST"
    onSubmit={submit}
  >
    <TextField
      name="amount"
      label="Amount"
      helperText="e.g. 123 or -123"
      type="number"
      fullWidth
    />
    <TextField
      name="title"
      label="Title"
      helperText="Title your transaction"
      fullWidth
    />
    <div style={{ height: 1, marginBottom: '1rem' }} />
    <Button
      type="submit"
      color="primary"
      fullWidth
    >
      add
    </Button>
  </form>
)

export default Form;
