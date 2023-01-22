import { useState,useEffect } from 'react'
import {baseURL} from './data.json'
import './App.css'

export default function App(){
  let [name,setName] = useState('');
  let [ward,setWard] = useState('Ngariama');
  let [subC,setSubc] = useState('Kirinyaga East');
  let [verified,setVerified] = useState('');
  let [scanned,setScanned] = useState('');
  let [uploaded,setUploaded] = useState('');
  let [comments,setComments] = useState('');
  let [report, setReport] = useState([{'name':'alpha','verified':'0','scanned':'0','uploaded':'0'}]);

  useEffect(()=>{
    
  },[])
  fetch(baseURL + "/retrive").then((response) => response.json())
    .then((data) => {
      setReport(data.report)
    })
    .catch((error) => console.log(error));
  let date = new Date()

  let choices = [
    ['Kirinyaga East','Kirinyaga West','Mwea West','Mwea east','Kirinyaga Central'],
    ['1. Ngariama','2. Kabare','3. Baragwi','4. Njukiini','5. Karumandi '],
    ['1. Mukure','2. Kariti','3. Kiine'],
    ['1. Thiba','2. Wamumu','3. Kangai','4. Mutithi'],
    ['1.Nyangati','2. Murinduko','3. Gathigiriri','4.Tebere '],
    ['1. Kerugoya','2. Kanyekiine','3.Mutira','4. Inoi']
  ]

  let update = (e) =>{
    e.preventDefault();

    setName('');
    setWard('Ngariama')
    setSubc('Kirinyaga East')
    setVerified('')
    setScanned('')
    setUploaded('')
    setComments('')

    let parameters = "?name="+name+"&ward="+ward+"&verified="+verified+"&scanned="+scanned+"&upload="+uploaded+"&comments="+comments;
    console.log(parameters)
    fetch(baseURL + "/update" + parameters).then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.alert('Sent :)');
    })
    .catch((error) => {console.log(error);window.alert('ERROR :(');});  
  }

  return(
    <main>
      <h2>Progress Update</h2>
      <form onSubmit={(e)=>{update(e);}}>
        <div id='dateTime'>{date.toDateString()}</div>
        <input type="text" placeholder='Name' value={name} onChange={(event)=>{setName(event.target.value)}} />
        <select value={subC} onChange={event =>{setSubc(event.target.value)}} >
            {
              choices[0].map(
                i=>(
                  <option value={i}>{i}</option>
                )
              )
            }
        </select>
        <select value={ward} onChange={event =>{setWard(event.target.value)}} >
            {
              choices[choices[0].indexOf(subC)+1].map(
                i=>(
                  <option value={i}>{i}</option>
                )
              )
            }
        </select>
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