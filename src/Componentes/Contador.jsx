import react, { useState } from "react";



function Contador({ numero, manejarVoto }) {
  return (
    <div className="candidato">
      <img
        src={`./imagenes/candidato${numero}.jpg`} // puedes cambiar esto según tus imágenes
        alt={`Candidato ${numero}`}
        className="foto-candidato"
      />
      <h3>Candidato {numero}</h3>
      <button className="voto"
      onClick={manejarVoto}>Votar</button>

      {/* Los votos están ocultos, pero siguen contando */}
      {/* <p>Votos: {votos}</p> */}
    </div>
  );
}

export default Contador;