import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import LandingPage from '../LandingPage/LandingPage';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';
import MovieDetailPage from '../MovieDetailPage/MovieDetailPage';




export default function App() {
  const [user, setUser] = useState(getUser());
  
  return (
    <main className="App">
      { user ? 
        <>
          <NavBar user={user} setUser={setUser} />
          
          <Switch>
            <Route path="/orders/new">
              <NewOrderPage />
            </Route>
            <Route path="/orders">
              <OrderHistoryPage />
            </Route>
            <Route path="/home">
              <LandingPage />
            </Route>
            <Route exact path="/movies/:movieId">
              <MovieDetailPage />
            </Route>
            <Redirect to="/home" />
          </Switch>
          
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
