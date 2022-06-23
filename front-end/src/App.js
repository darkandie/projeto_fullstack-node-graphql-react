import { ApolloProvider } from '@apollo/client';
import client from './service';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';

import AppRouter from './pages/AppRouter';

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Header />
        <div className='container'>
          <AppRouter />
        </div>  
      </ApolloProvider>
    </Router>  
  );
}

export default App;
