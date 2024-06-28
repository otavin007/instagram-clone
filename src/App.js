import './App.css';
import {useEffect, useState} from 'react'
import {Header} from "./components/Header";

function App() {
    const [user,  setUser] = useState()

  //
  useEffect(()=> {
    console.log(user)
  },[user])

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
    </div>
  );
}

export default App;
