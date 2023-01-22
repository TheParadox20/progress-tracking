import { useState } from 'react'
import './App.css'

export default function App(){
  let [name,setName] = useState('');
  let [ward,setWard] = useState('');
  let [verified,setVerified] = useState('');
  let [scanned,setScanned] = useState('');
  let [uploaded,setUploaded] = useState('');
  let [comments,setComments] = useState('');
  let date = new Date()

  let update = (e) =>{
    e.preventDefault();
    let parameters = "?name="+name+"&ward="+ward+"&verified="+verified;
    fetch(baseURL + "/update" + parameters).then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));  
  }

  return(
    <main>
      <form onSubmit={(e)=>{update(e,betID,alphaStake)}}>
        <div id='dateTime'>{date.toDateString()}</div>
        <input type="text" placeholder='Name' value={name} onChange={(event)=>{setName(event.target.value)}} />
        <input type="text" placeholder='Ward Name' value={ward} onChange={(event)=>{setWard(event.target.value)}} />
        <input type="text" placeholder='Documents Verified' value={verified} onChange={(event)=>{setVerified(event.target.value)}} />
        <input type="text" placeholder='Documents Scanned' value={scanned} onChange={(event)=>{setScanned(event.target.value)}} />
        <input type="text" placeholder='Documents Uploaded' value={uploaded} onChange={(event)=>{setUploaded(event.target.value)}} />
        <input type="text" placeholder='Comments' value={comments} onChange={(event)=>{setComments(event.target.value)}} />
        <button type='submit'>Update</button>
      </form>
    </main>
  )
}