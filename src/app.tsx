import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { User } from 'firebase';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { compose, lifecycle, withHandlers, withState } from 'recompose';
import Content from './components/content';
import FirebaseAuth from './components/firebase-auth';
import Transactions from './components/transactions';
import ApolloClient from './utils/apollo-client';
import AppContext from './utils/app-context';
const { firebase }: any = window;

interface IApp {
  currentUser?: User;
  logout: () => void;
}

const App = ({ currentUser, logout }: IApp) => {
  if (!currentUser) {
    return <FirebaseAuth />;
  }
  return (
    <AppContext.Provider value={{ currentUser }}>
      <ApolloProvider client={ApolloClient}>
        <React.Fragment>
          <CssBaseline />
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
                My Finances
              </Typography>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </Toolbar>
          </AppBar>
          <Content>
            <Transactions />
          </Content>
        </React.Fragment>
      </ApolloProvider>
    </AppContext.Provider>
  );
};

export default compose(
  withState('currentUser', 'setCurrentUser', null),
  withHandlers({
    logout: () => () => firebase.auth().signOut(),
  }),
  lifecycle({
    componentDidMount() {
      const { setCurrentUser }: any = this.props;
      firebase.auth().onAuthStateChanged((user: User) => {
        if (user) {
          user.getIdToken().then((token: string) => {
            setCurrentUser(user);
            localStorage.setItem('token', token);
          });
        } else {
          setCurrentUser(null);
          localStorage.removeItem('token');
        }
      });
    },
  }),
)(App as any);
