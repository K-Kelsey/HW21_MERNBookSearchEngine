import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
// apollo provider for client request
import {ApolloClient} from '@apollo/client';
import {ApolloProvider} from '@apollo/client';
// memory for server
import {InMemoryCache} from '@apollo/client';
// make an http link
import {createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';



// gql endpoint
const http = createHttpLink({ uri: '/graphql' })



// attach the JWT token to requests
// grab token from LS
// return should have headers returned to context


const auth = setContext((_, { headers }) => {
  const jswtoken = localStorage.getItem("id_token");
return {
  headers: {
    ...headers,
    authorization: jswtoken ? `Bearer ${jswtoken}` : "",
  },
};
});



// make the request to gql

const client = new ApolloClient({
link: auth.concat(http),
cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;