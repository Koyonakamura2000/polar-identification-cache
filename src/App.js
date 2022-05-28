import './App.css';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Link, Outlet } from 'react-router-dom';
import picLogo from './images/pic-logo.png';

const firebaseConfig = {
  apiKey: "AIzaSyCJpWqNM-NPGFCr_BFoRVycsAi093ySP0Q",
  authDomain: "club-penguin-b9148.firebaseapp.com",
  projectId: "club-penguin-b9148",
  storageBucket: "club-penguin-b9148.appspot.com",
  messagingSenderId: "680124655344",
  appId: "1:680124655344:web:85b02a23c8ee66432d8435",
  measurementId: "G-C75SV6JF0D"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const storage = getStorage(app);

const testTrips = [{"startLocation":"Longyearbyen, Svalbard","endLocation":"Reykjavik, Iceland","startTime":"02/02/2020","endTime":"02/15/2020"},{"startLocation":"Longyearbyen, Svalbard","endLocation":"Tromso, Norway","startTime":"02/02/2020","endTime":"02/15/2020"},{"startLocation":"Longyearbyen, Svalbard","endLocation":"Reykjavik, Iceland","startTime":"01/13/2021","endTime":"01/24/2021"},{"startLocation":"Oslo, Norway","endLocation":"Kangerlussuaq, Greenland","startTime":"02/24/2022","endTime":"03/05/2022"},{"startLocation":"Reykjavik, Iceland","endLocation":"Reykjavik, Iceland","startTime":"01/02/2020","endTime":"01/15/2020"},{"startLocation":"Tromso, Norway","endLocation":"Tromso, Norway","startTime":"01/02/2020","endTime":"01/09/2020"},{"startLocation":"Tromso, Norway","endLocation":"Longyearbyen, Svalbard","startTime":"02/24/2022","endTime":"03/05/2022"},{"startLocation":"Longyearbyen, Svalbard","endLocation":"Oslo, Norway","startTime":"01/02/2020","endTime":"01/15/2020"},{"startLocation":"Oslo, Norway","endLocation":"Reykjavik, Iceland","startTime":"02/02/2020","endTime":"02/15/2020"},{"startLocation":"Reykjavik, Iceland","endLocation":"Oslo, Norway","startTime":"01/02/2020","endTime":"01/15/2020"}];

const testGeolocation = {'latitude': [59, 73.1], 'longitude': [-142, 12]};

// returns [lat, long] based on boundaries set in testGeolocation
export function generateRandomLatLong() {
  let randomLatitude = testGeolocation['latitude'][0] + Math.random()*(testGeolocation['latitude'][1] - testGeolocation['latitude'][0]);
  let randomLongitude = testGeolocation['longitude'][0] + Math.random()*(testGeolocation['longitude'][1] - testGeolocation['longitude'][0]);
  return [randomLatitude, randomLongitude];
}

// v1 flow: privacy policy -> add photos -> randomly generate location
// eventually, it should first allow the user to choose the trip they went on and if the photo timestamps don't match with the tour dates, reject or reformat (quality control)
function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <div className='logo'>
            <img src={picLogo} alt='Polar Identification Cache logo' />
            <h3>Polar Identification Cache</h3>
          </div>
          <div className='links'>
            <Link to='/'>Home</Link>
            <Link to='/data'>View Data</Link>
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
