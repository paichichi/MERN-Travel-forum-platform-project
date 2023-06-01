import { RouterProvider, useLocation } from 'react-router-dom';
import Header from './components/shared/Header/Header';
import Footer from './components/footer/Footer';
import Privacy from './components/T&C/privacy/Privacy';
import styles from './App.module.css';
import { createBrowserRouter } from 'react-router-dom';
import Travel from './pages/Travel/Travel';
import MapView from './components/travel/MapView/MapView';
import Forum from './pages/Forum/Forum';
import Home from './pages/Home/Home';
import InvalidPage from './pages/InvalidPage/InvalidPage';
import PlanView from './components/travel/PlanView/PlanView';
import AccomodationView from './components/travel/AccomodationView/AccomodationView';
import AccommodationDetails from './components/travel/AccomodationView/AccomodationDetail';
import WeatherView from './components/travel/WeatherView/WeatherView';
import Profile from './pages/profile/userprofile';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import { AppContext } from './service/contexts/context';
import { useContext } from 'react';
import Cookies from './components/T&C/cookies/cookies';

function App() {
  const { plans, forumService } = useContext(AppContext);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <InvalidPage />,
    },
    {
      path: '/forum',
      element: <Forum forumService={forumService} />,
    },
    {
      path: '/travel',
      element: <Travel />,
      children: [
        {
          path: 'accomodations',
          element: <AccomodationView />,
        },
        {
          path: 'map-view',
          element: <MapView />,
        },
        {
          path: 'plan',
          element: <PlanView plans={plans} />,
        },
        {
          // an example
          path: 'weather',
          element: <WeatherView city="Auckland" height="30%" width="80%" />,
        },
      ],
    },
    {
      path: '/login',
      element: localStorage.getItem('user') ? <Home /> : <Login />,
    },
    {
      path: '/signup',
      element: localStorage.getItem('user') ? <Home /> : <Signup />,
    },
    {
      path: '/profile/:id',
      element: localStorage.getItem('user') ? <Profile /> : <Login />,
    },
    {
      path: '/details', // accomodation detail page...
      element: <AccommodationDetails />,
    },
    {
      path: '/privacy',
      element: <Privacy />,
    },
    {
      path: '/cookies',
      element: <Cookies />,
    },
  ]);

  return (
    <div className={styles.container}>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
