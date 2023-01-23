import { useState,useEffect } from 'react'
import './App.css'

let baseURL ="https://web-production-6686b.up.railway.app"

export default function App(){
  let [name,setName] = useState('Faith Mugera');
  let [ward,setWard] = useState('Ngariama');
  let [subC,setSubc] = useState('Kirinyaga East');
  let [verified,setVerified] = useState('');
  let [scanned,setScanned] = useState('');
  let [uploaded,setUploaded] = useState('');
  let [comments,setComments] = useState('');
  let [filter,setFilter] = useState('name');
  let [report, setReport] = useState([{'name':'alpha','verified':'0','scanned':'0','uploaded':'0'}]);

  let retrive = ()=>{
    fetch(baseURL + "/retrive?filter="+filter).then((response) => response.json())
    .then((data) => {
      setReport(data.report)
    })
    .catch((error) => console.log(error));
    console.log(filter)
  }
  useEffect(()=>{
    retrive();
  },[])

  let date = new Date()

  let choices = [
    ['Kirinyaga East','Kirinyaga West','Mwea West','Mwea east','Kirinyaga Central'],
    ['Ngariama','Kabare','Baragwi','Njukiini','Karumandi '],
    ['Mukure','Kariti','Kiine'],
    ['Thiba','Wamumu','Kangai','Mutithi'],
    ['Nyangati','Murinduko','Gathigiriri','Tebere '],
    ['Kerugoya','Kanyekiine','Mutira','Inoi']
  ];
  let names = ['Faith Mugera','Dorcas Kahiga','Samuel Njenga','Kefa Mugambi','Stephen Kiarie','Brian Muita','Tumaini Kimathi','Rodgers Ngunjiri']

  let update = (e) =>{
    e.preventDefault();
    let parameters = "?name="+name+"&ward="+ward+"&verified="+verified+"&scanned="+scanned+"&upload="+uploaded+"&comments="+comments;
    console.log(parameters)

    setName('');
    setWard('Ngariama')
    setSubc('Kirinyaga East')
    setVerified('')
    setScanned('')
    setUploaded('')
    setComments('')

    fetch(baseURL + "/update" + parameters).then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.alert('Sent :)');
      document.getElementById('verify').style.visibility = 'hidden'
    })
    .catch((error) => {console.log(error);window.alert('ERROR :(');});  
  }

  return(
    <main>
      <h3>NARIGP - Kirinyaga Koffax Progress Tracking Tool</h3>
      <h2>Progress Update</h2>
      <form>
        <div id='dateTime'>{date.toDateString()}</div>
        <select value={name} onChange={event =>{setName(event.target.value)}} >
            {
              names.map(
                i=>(
                  <option value={i}>{i}</option>
                )
              )
            }
        </select>
        <select value={subC} onChange={event =>{setSubc(event.target.value);setWard(choices[choices[0].indexOf(event.target.value)+1][0])}} >
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
      </form>
      <button onClick={(e)=>document.getElementById('verify').style.visibility = 'visible'}>Update</button>
      <h2>Progress Report</h2>
      <table>
        <thead>
          <tr>
            <th>
              <select value={filter} onChange={event =>{retrive();setFilter(event.target.value)}} >
                <option value="name">Name</option>
                <option value="ward">Ward</option>
              </select>
            </th>
            <th>Verified</th>
            <th>Scanned</th>
            <th>Uploaded</th>
          </tr>
        </thead>
        <tbody>
          {report.map(
            i=>(
              <tr>
                <td id='name'>{i.name}</td>
                <td>{i.verified}</td>
                <td>{i.scanned}</td>
                <td>{i.uploaded}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      
      <div className='overlay' id='verify'>
        <div className='content'>
          <h4>Confirm Details</h4>
          <p>Name {name}</p>
          <p>Ward {ward}</p>
          <p>Documents verified {verified}</p>
          <p>Documents scanned {scanned}</p>
          <p>Documents uploaded {uploaded}</p>
          <button onClick={(e)=>document.getElementById('verify').style.visibility = 'hidden'}>Cancel</button>
          <button onClick={(e)=>{update(e);}}>Submit</button>
        </div>
      </div>
    </main>
  )
}