import { useEffect, useState } from 'react';
import { generateRandomLatLong } from './App';
import './PhotoUpload.css';

function PhotoUpload() {

    const [contributions, setContributions] = useState([]);

    function addMultiple(e) {
        let files = e.target.files;
        for(let i = 0; i < files.length; i++) {
            let picReader = new FileReader();
            // this is confusing
            picReader.addEventListener('load', (event) => {
                console.log('reading');
                let picFile = event.target;
                let location = generateRandomLatLong();
                let newContribution = {'image': picFile.result, 'species': 'Polar Bear', 'latitude': location[0], 'longitude': location[1]};        
                setContributions(prevState => {
                    return [...prevState, newContribution];
                });
            });
            picReader.readAsDataURL(files[i]);
        }
    }

    useEffect(() => {
        console.log(contributions.length);
    }, [contributions]);

    return (
        <>
            <h2>Add Photos</h2>
            <form id='photo-upload' method='post'>
                <label htmlFor='photos'>Select multiple photos: </label>
                <input id='photos' type='file' multiple onChange={addMultiple}/>
                <div className='preview-box'>
                </div>
            </form>
        </>
    );
}

export default PhotoUpload;