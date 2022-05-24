import { useState } from "react";

function UncategorizedAnimal(props) { // id, image, idAry
    const [species, setSpecies] = useState('Unknown');
    const [text, setText] = useState('');

    function updateDatabase(e) {
        e.preventDefault();
        console.log(species);
    }

    function handleChange(e) {
        if(e.target.type === 'radio') {
            if(e.target.value === 'Other') {
                setSpecies(text);
            } else {
                setSpecies(e.target.value);
            }
        } else if(e.target.type === 'text') {
            setText(e.target.value);
        }
    }

    return (
        <div key={props.info['id']}>
            <img src={props.info['image']} alt='Uncategorized Animal' />
            <div>
                <h4>Identify the animal</h4>
                <form onSubmit={updateDatabase}>
                    <div>
                        <input onChange={handleChange} type="radio" name="species" value='Unknown' defaultChecked />
                        <label>Unknown</label>
                    </div>
                    {props.info['idAry'].map((id, i) => 
                        <div key={i}>
                            <input onChange={handleChange} type="radio" name="species" value={id} />
                            <label>{id}</label>
                        </div>
                    )}
                    <div>
                        <input onChange={handleChange} type="radio" name="species" value='Other' />
                        <label>Other (type below)</label>
                    </div>
                    <input onChange={handleChange} type='text' name='other' />
                    <input type='submit' />
                </form>
            </div>
        </div>
    );
}

export default UncategorizedAnimal;