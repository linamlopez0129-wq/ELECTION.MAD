function Boton({ texto, manejarClick }) {
  return (
    <button className="boton" onClick={manejarClick}>
      {texto}
    </button>
  );
}

export default Boton;
