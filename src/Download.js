import { db } from './App';
import { collection, getDocs } from "firebase/firestore";

function Download() {

    async function downloadCsv() {
        const dataRef = collection(db, 'data');
        const dataSnapshot = await getDocs(dataRef);
        const dataList = dataSnapshot.docs.map(doc => doc.data());
        let rows = [];
        let rowHeader = ['species', 'date_utc', 'latitude', 'longitude', 'image']
        rows.push(rowHeader);
        for(let i = 0; i < dataList.length; i++) {
            let newRow = [];
            for(let j = 0; j < rowHeader.length; j++) {
                newRow.push(dataList[i][rowHeader[j]]);
            }
            rows.push(newRow);
        }
        // convert to CSV, following https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
        let csvContent = "data:text/csv;charset=utf-8," + rows.map(row => row.join(",")).join("\n");
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "polar_identification_cache.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
    }

    return (
        <button onClick={downloadCsv}>Download</button>
    );
}

export default Download;