import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [tiempo, setTiempo] = useState(0);
  const [activo, setActivo] = useState(false);
  const [pausado, setPausado] = useState(false);
  const inicio = useRef(0);

  useEffect(() => {
    let intervalId;

    if (activo) {
      inicio.current = performance.now() - tiempo;
      intervalId = setInterval(() => {
        setTiempo(performance.now() - inicio.current);
      }, 1);
    }

    return () => clearInterval(intervalId);
  }, [activo]);

  const iniciarTemporizador = () => {
    setActivo(true);
    setPausado(false);
  }

  const pausarTemporizador = () => {
    setActivo(false);
    setPausado(true);
  }

  const reiniciarTemporizador = () => {
    setActivo(false);
    setPausado(false);
    setTiempo(0);
  }

  const milisegundosTotales = Math.floor(tiempo);
  const horas = Math.floor(milisegundosTotales / (1000 * 60 * 60));
  const minutos = Math.floor((milisegundosTotales / (1000 * 60)) % 60);
  const segundos = Math.floor((milisegundosTotales / 1000) % 60);
  const milisegundos = milisegundosTotales % 1000;

  const horasFormateadas = String(parseInt(horas)).padStart(2, '0');
  const minutosFormateados = String(parseInt(minutos)).padStart(2, '0');
  const segundosFormateados = String(parseInt(segundos)).padStart(2, '0');
  const milisegundosFormateados = String(parseInt(milisegundos)).padStart(3, '0');



  return (
    <div className="App">
      <div className="timer-box">
        <h1 className="timer-title">Stopwatch</h1>
        <div className="timer-display">
          <p className="time">{horasFormateadas}</p>
          <p className="time">{minutosFormateados}</p>
          <p className="time">{segundosFormateados}</p>
          <p className="time">{milisegundosFormateados}</p>
        </div>


        <div className="timer-buttons">
          {!activo && !pausado ? (
            <button className="timer-button" onClick={iniciarTemporizador}>Start</button>
          ) : !activo && pausado ? (
            <button className="timer-button" onClick={iniciarTemporizador}>Continue</button>
          ) : (
            <button className="timer-button" onClick={pausarTemporizador}>Pause</button>
          )}
          <button className="timer-button reset-button" onClick={reiniciarTemporizador}>Restart</button>
        </div>
      </div>
    </div>
  )
}

export default App
