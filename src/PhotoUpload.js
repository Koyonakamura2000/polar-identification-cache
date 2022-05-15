import { useState } from 'react';
import { generateRandomLatLong, db, storage } from './App';
import './PhotoUpload.css';
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; 

function PhotoUpload() {

    const [contributions, setContributions] = useState([]);

    // id: string, image: base64 string (data URL), date_utc: Date object, latitude: float, longitude: float
    function addMultiple(e) {
        let files = e.target.files;
        for(let i = 0; i < files.length; i++) {
            let picReader = new FileReader();
            let timestamp = files[i].lastModified; // last modified is not very reliable - best if we could use date created but it only works for jpgs
            let date = new Date(timestamp);
            picReader.addEventListener('load', (event) => {
                let picFile = event.target;
                let location = generateRandomLatLong();
                let newContribution = {'id': 'image' + i, 'image': picFile.result, 'date': date, 'species': 'Ursus Maritimus', 'latitude': location[0], 'longitude': location[1]};        
                setContributions(prevState => {
                    return [...prevState, newContribution];
                });
            });
            picReader.readAsDataURL(files[i]);
        }
    }

    // i refers to the index in contributions array
    function remove(e) {
        let newContributions = contributions.filter(contribution => contribution.id !== e.currentTarget.id);
        setContributions(newContributions);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        for(let i = 0; i < contributions.length; i++) {
            let imgPath = contributions[i]['species'].replace(/\s+/g, '') + '/' + uuidv4();
            const imgRef = ref(storage, imgPath);
            await uploadString(imgRef, contributions[i]['image'], 'data_url').then((snapshot) => console.log('uploaded image!'));
            let imgUrl = '';
            await getDownloadURL(imgRef).then((url) => imgUrl = url).catch(console.log('error in getting image url')); //idk why this throws an error since I get a download URL correctly
            await addDoc(collection(db, 'data'), {
                species: contributions[i]['species'],
                image: imgUrl,
                date_utc: contributions[i]['date'].toISOString(),
                latitude: contributions[i]['latitude'],
                longitude: contributions[i]['longitude']
            });
        }
    }
    
    return (
        <>
            <h2>Add Photos</h2>
            <form id='photo-upload' method='post' onSubmit={e => handleSubmit(e)}>
                <label htmlFor='photos'>Select multiple photos: </label>
                <input id='photos' type='file' multiple onChange={addMultiple} />
                <div className='preview-box'>
                    {contributions.map((contribution, i) => {
                        return (
                            <div key={i} id={contribution['id']} className='contribution' onClick={remove}>
                                <img src={contribution['image']} alt={contribution['species']} />
                                <h3>{contribution['species']}</h3>
                                <h4>{contribution['latitude']}, {contribution['longitude']}</h4>
                                <p>{contribution['date'].toUTCString()}</p>
                            </div>
                        );
                    })}
                </div>
                <button id='submit' type='submit'>Submit</button>
            </form>
        </>
    );
}

export default PhotoUpload;