import { useState } from 'react'
import Temporizador from './temporizador';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Temporizador />
    </div>
  );
}

export default App
