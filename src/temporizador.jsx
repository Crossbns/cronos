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

  // Formatear las horas, minutos y segundos para que siempre tengan al menos dos dígitos
  const horasFormateadas = String(horas).padStart(2, '0');
  const minutosFormateados = String(minutos).padStart(2, '0');
  const segundosFormateados = String(segundos).padStart(2, '0');
  const milisegundosFormateados = String(milisegundos).padStart(3, '0');

  return (
    <div className="App">
      <div className="timer-box">
        <h1 className="timer-title">Timer</h1>
        <p className="timer-display">{horasFormateadas}:{minutosFormateados}:{segundosFormateados}:{milisegundosFormateados}</p>
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
