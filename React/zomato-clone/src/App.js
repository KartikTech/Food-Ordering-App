import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './home/home/home';
import RestaurantDetails from './restaurant/restaurant-details/restaurant-details';
import HomepageDetails from './homepage/homepage-details/homepage-details';

function App() {
  return (
    <div>
      <Routes>
        <Route path="" element={<HomepageDetails />}></Route>
        <Route path="/:mealtype" element={<Home />}></Route>
        <Route path="/:location/:mealtype" element={<Home />}></Route>
        <Route path="/restaurant/:id" element={<RestaurantDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
