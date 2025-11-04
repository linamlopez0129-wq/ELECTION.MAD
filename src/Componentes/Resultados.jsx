import '../hojas-de-estilo/Resultados.css';

function Resultados({ totalVotos, ganador }) {
  return (
    <div className="resultados">
      <h1>Resultados</h1>
      <p>Total de votos: {totalVotos}</p>
      <p>Ganador: {ganador}</p>
    </div>
  );
}

export default Resultados;