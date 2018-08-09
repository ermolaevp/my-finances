import { User } from 'firebase';
import * as React from 'react';

export interface IAppContext {
  currentUser?: User;
}

const defaultContext: IAppContext = {
  currentUser: undefined,
}

const AppContext = React.createContext(defaultContext);

export default AppContext;
