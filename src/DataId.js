import { useState } from 'react';
import { db } from './App';
import { collection, getDocs, query, where } from 'firebase/firestore';
import './DataId.css';
import UncategorizedAnimal from './UncategorizedAnimal';

function DataId() {
    const [data, setData] = useState([]);
    const q = query(collection(db, 'data'), where('species', '==', 'Unknown'));

    async function getData() {
        const snapshot = await getDocs(q);
        let docs = snapshot.docs;
        let newData = [];
        for(let i = 0; i < docs.length; i++) {
            // call species ID API for each image
            const imgUrl = docs[i].data().image;
            const idAry = await getId(imgUrl);
            let docInfo = {'id': docs[i].id, 'image': imgUrl, 'idAry': idAry};
            newData.push(docInfo);
        }
        console.log(newData);
        setData(newData);
    }

    /* POST: raw JSON Body e.g.,
    {
        "url": "https://firebasestorage.googleapis.com/v0/b/club-penguin-b9148.appspot.com/o/UrsusMaritimus%2Fe4580efe-8669-42da-9ff7-8e8006bf080e?alt=media&token=d103d0b3-04d5-4c26-9011-318f7a4e4a11"
    }
    */
    async function getId(imgUrl) {
        const fetchUrl = 'https://us-west1-arctic-science.cloudfunctions.net/polar-bear-detection';
        const body = {'url': imgUrl};
        const response = await fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const json = await response.json();
        console.log(json);
        return json;
    }

    return (
        <>
            <div>Data ID</div>
            <button onClick={getData}>Get Uncategorized Photos</button>
            <div className='dataid-grid'>
                {data.map((docInfo) => (
                    <UncategorizedAnimal key={docInfo['id']} info={docInfo} />
                ))}
            </div>
        </>
    );
}

export default DataId;