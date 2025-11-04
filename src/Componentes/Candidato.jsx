import React, { useState } from "react";
import Boton from './Boton';
import Contador from './Contador';

function Candidato() {
  const [votos, setVotos] = useState([0, 0, 0]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [votado, setVotado] = useState(false);

  const manejarVoto = (index) => {
    if (votado) return; 
    const nuevosVotos = [...votos];
    nuevosVotos[index]++;
    setVotos(nuevosVotos);
    setVotado(true); 
  };

  const revisarVotos = () => {
    setMostrarResultados(true);
  };

  const reiniciarTodo = () => {
    setVotos([0, 0, 0]);
    setMostrarResultados(false);
    setVotado(false);
  };

  return (
    <div className='casilla'>
      <div className='contenedor-principal'>
        <Contador
          nombre="Candidato 1" 
          imagen="/imagenes/candidato1.jpg"
          manejarVoto={() => manejarVoto(0)}
        />
      </div>
      </div>
);
}
export default candidato;