import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import LandingPage from '../LandingPage/LandingPage';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';
import MovieDetailPage from '../MovieDetailPage/MovieDetailPage';
import "antd/dist/antd.css";
import FavoritePage from '../FavoritePage/FavoritePage';




export default function App() {
  const [user, setUser] = useState(getUser());
  
  return (
    <main className="App">
      { user ? 
        <>
          <NavBar user={user} setUser={setUser} />
          
          <Switch>
            <Route path="/home">
              <LandingPage />
            </Route>
            <Route exact path="/movies/:movieId">
              <MovieDetailPage user={user}/>
            </Route>
            <Route exact path="/favorite">
              <FavoritePage user={user}/>
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
