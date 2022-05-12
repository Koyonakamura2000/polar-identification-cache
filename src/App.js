import './App.css';
import PrivacyPolicy from './PrivacyPolicy';
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const db = getFirestore(app);
const dataRef = collection(db, 'data');
loadData(dataRef);

const storage = getStorage(app);

async function loadData(ref) {
  const dataSnapshot = await getDocs(ref);
  console.log(dataSnapshot);
  const dataList = dataSnapshot.docs.map(doc => doc.data());
  console.log(dataList);
}

/* 

In case we need to make different test data

const locations = ['Reykjavik, Iceland', 'Oslo, Norway', 'Kangerlussuaq, Greenland', 'Longyearbyen, Svalbard', 'Tromso, Norway'];
const times = [['01/02/2020', '01/09/2020'], ['01/02/2020', '01/15/2020'], ['02/02/2020', '02/15/2020'], ['01/13/2021', '01/24/2021'], ['02/24/2022', '03/05/2022']];
let testTrips = [];
for(let i = 0; i < 10; i++) {
  let mockTrip = {};
  mockTrip['startLocation'] = locations[Math.floor(Math.random() * locations.length)];
  mockTrip['endLocation'] = locations[Math.floor(Math.random() * locations.length)];
  const mockTimes = times[Math.floor(Math.random() * times.length)];
  mockTrip['startTime'] = mockTimes[0];
  mockTrip['endTime'] = mockTimes[1];
  testTrips.push(mockTrip);
}
console.log(testTrips);
console.log(JSON.stringify(testTrips));
*/

const testTrips = [{"startLocation":"Longyearbyen, Svalbard","endLocation":"Reykjavik, Iceland","startTime":"02/02/2020","endTime":"02/15/2020"},{"startLocation":"Longyearbyen, Svalbard","endLocation":"Tromso, Norway","startTime":"02/02/2020","endTime":"02/15/2020"},{"startLocation":"Longyearbyen, Svalbard","endLocation":"Reykjavik, Iceland","startTime":"01/13/2021","endTime":"01/24/2021"},{"startLocation":"Oslo, Norway","endLocation":"Kangerlussuaq, Greenland","startTime":"02/24/2022","endTime":"03/05/2022"},{"startLocation":"Reykjavik, Iceland","endLocation":"Reykjavik, Iceland","startTime":"01/02/2020","endTime":"01/15/2020"},{"startLocation":"Tromso, Norway","endLocation":"Tromso, Norway","startTime":"01/02/2020","endTime":"01/09/2020"},{"startLocation":"Tromso, Norway","endLocation":"Longyearbyen, Svalbard","startTime":"02/24/2022","endTime":"03/05/2022"},{"startLocation":"Longyearbyen, Svalbard","endLocation":"Oslo, Norway","startTime":"01/02/2020","endTime":"01/15/2020"},{"startLocation":"Oslo, Norway","endLocation":"Reykjavik, Iceland","startTime":"02/02/2020","endTime":"02/15/2020"},{"startLocation":"Reykjavik, Iceland","endLocation":"Oslo, Norway","startTime":"01/02/2020","endTime":"01/15/2020"}];

const testGeolocation = {'latitude': [59, 73.1], 'longitude': [-142, 12]};


function App() {
  return (
    <div className="App">
      <PrivacyPolicy />
      Club Penguin
    </div>
  );
}

export default App;
