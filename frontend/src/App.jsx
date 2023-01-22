import { useState,useEffect } from 'react'
import {baseURL} from './data.json'
import './App.css'

export default function App(){
  let [name,setName] = useState('');
  let [ward,setWard] = useState('');
  let [verified,setVerified] = useState('');
  let [scanned,setScanned] = useState('');
  let [uploaded,setUploaded] = useState('');
  let [comments,setComments] = useState('');
  let [report, setReport] = useState([{'name':'alpha','verified':'0','scanned':'0','uploaded':'0'}]);

  useEffect(()=>{
    fetch(baseURL + "/retrive").then((response) => response.json())
    .then((data) => {
      setReport(data.report)
    })
    .catch((error) => console.log(error));
  },[])
  let date = new Date()

  let update = (e) =>{
    e.preventDefault();
    let parameters = "?name="+name+"&ward="+ward+"&verified="+verified+"&scanned="+scanned+"&upload="+uploaded+"&comments="+comments;
    fetch(baseURL + "/update" + parameters).then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));  
  }

  return(
    <main>
      <h2>Progress Update</h2>
      <form onSubmit={(e)=>{update(e)}}>
        <div id='dateTime'>{date.toDateString()}</div>
        <input type="text" placeholder='Name' value={name} onChange={(event)=>{setName(event.target.value)}} />
        <input type="text" placeholder='Ward Name' value={ward} onChange={(event)=>{setWard(event.target.value)}} />
        <input type="text" placeholder='Documents Verified' value={verified} onChange={(event)=>{setVerified(event.target.value)}} />
        <input type="text" placeholder='Documents Scanned' value={scanned} onChange={(event)=>{setScanned(event.target.value)}} />
        <input type="text" placeholder='Documents Uploaded' value={uploaded} onChange={(event)=>{setUploaded(event.target.value)}} />
        <input type="text" placeholder='Comments' value={comments} onChange={(event)=>{setComments(event.target.value)}} />
        <button type='submit'>Update</button>
      </form>
      <h2>Progress Report</h2>
      <table>
        <thead>
          <tr>
            <th>Ward Name</th>
            <th>Verified</th>
            <th>Scanned</th>
            <th>Uploaded</th>
          </tr>
        </thead>
        <tbody>
          {report.map(
            i=>(
              <tr>
                <td>{i.name}</td>
                <td>{i.verified}</td>
                <td>{i.scanned}</td>
                <td>{i.uploaded}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </main>
  )
}