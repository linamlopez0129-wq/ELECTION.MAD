import { useState } from "react";
import Boton from "./Componentes/Boton";
import "./App.css";
import logo from "./imagenes/logo.jpg";
import muñequito from "./imagenes/muñequito.jpg";
import voto from "./imagenes/voto.jpg";

function App() {
  const [usuario, setUsuario] = useState("");
  const [ingresado, setIngresado] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mostrarLoginAdmin, setMostrarLoginAdmin] = useState(false);
  const [claveAdmin, setClaveAdmin] = useState("");
  const [ganador, setGanador] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarCandidatos, setMostrarCandidatos] = useState(true);

  // 🔸 nuevos estados para formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoLema, setNuevoLema] = useState("");
  const [nuevaImagen, setNuevaImagen] = useState(null);

  const [candidatos, setCandidatos] = useState([
    { id: 1, nombre: "Candidato 1", votos: 0, lema: "¡Tu voz cuenta!" },
    { id: 2, nombre: "Candidato 2", votos: 0, lema: "¡Participa con alegría!" },
    { id: 3, nombre: "Candidato 3", votos: 0, lema: "¡Juntos somos más!" },
    { id: 4, nombre: "Voto en blanco", votos: 0, imagen: voto, lema: "Voto en blanco" },
  ]);

  // 🩷 Ingreso
  const ingresar = () => {
    if (usuario.trim() !== "") setIngresado(true);
  };

  // 🗳️ Votar
  const manejarVoto = (id) => {
    setCandidatos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, votos: c.votos + 1 } : c))
    );
    setMostrarCandidatos(false);
    setMensaje("✅ Tu voto fue registrado, gracias por participar 💕");
    setTimeout(() => {
      setMensaje("");
      setMostrarCandidatos(true);
    }, 3000);
  };

  // 📸 Cambiar imagen existente
  const cambiarImagen = (id) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", (e) => {
      const archivo = e.target.files[0];
      if (archivo) {
        const urlImagen = URL.createObjectURL(archivo);
        setCandidatos((prev) =>
          prev.map((c) => (c.id === id ? { ...c, imagen: urlImagen } : c))
        );
      }
    });
    document.body.appendChild(input);
    input.click();
    input.remove();
  };

  // ➕ Mostrar / ocultar formulario
  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  // ✅ Agregar candidato nuevo
  const agregarCandidato = () => {
    if (nuevoNombre.trim() === "") {
      alert("Por favor ingresa un nombre");
      return;
    }

    const nuevo = {
      id: candidatos.length + 1,
      nombre: nuevoNombre,
      votos: 0,
      imagen: nuevaImagen,
      lema: nuevoLema || "Sin lema",
    };

    setCandidatos((prev) => [...prev, nuevo]);
    setNuevoNombre("");
    setNuevoLema("");
    setNuevaImagen(null);
    setMostrarFormulario(false);
  };

  // 🩶 Reiniciar votos
  const reiniciarTodo = () => {
    setCandidatos((prev) => prev.map((c) => ({ ...c, votos: 0 })));
    setMostrarResultados(false);
    setGanador("");
  };

  // 🔐 Mostrar login admin
  const revisarVotos = () => setMostrarLoginAdmin(true);

  // 🔎 Verificar clave
  const verificarClave = () => {
    if (claveAdmin === "1234") {
      mostrarGanador();
      setMostrarResultados(true);
      setMostrarLoginAdmin(false);
    } else alert("❌ Contraseña incorrecta");
  };

  // 🏆 Calcular ganador
  const mostrarGanador = () => {
    const maxVotos = Math.max(...candidatos.map((c) => c.votos));
    const ganadorCandidato = candidatos.find((c) => c.votos === maxVotos);
    setGanador(ganadorCandidato ? ganadorCandidato.nombre : "Nadie");
  };

  // ❌ Eliminar candidato
  const eliminarCandidato = (id) => {
    setCandidatos(candidatos.filter((c) => c.id !== id));
  };

  // 🔁 Volver al inicio
  const volverAlInicio = () => {
    setUsuario("");
    setIngresado(false);
    setMostrarResultados(false);
    setMostrarLoginAdmin(false);
    setGanador("");
  };

  return (
    <div className="contenedor-principal">
      {!ingresado && (
        <div className="pantalla-inicial">
          <img src={logo} alt="votaciones estudiantiles" className="logo" />
          <h1 className="titulo">🩷 Bienvenido al Sistema de Votación Escolar LYZ 🩷</h1>
          <p>Por favor ingresa el nombre de tu institución para continuar:</p>
          <input
            type="text"
            className="input-nombre"
            placeholder="Tu institución..."
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <Boton texto="Ingresar" manejarClick={ingresar} />
        </div>
      )}

      {ingresado && !mostrarResultados && (
        <div>
          <h2 className="saludo">Hola {usuario} 💫 ¡Elige tu voto!</h2>

          {mensaje && (
            <div className="mensaje-con-muñequito">
              <p className="mensaje-voto">{mensaje}</p>
              <img src={muñequito} alt="muñequito" className="muñequito" />
            </div>
          )}

          {mostrarCandidatos && (
            <div className="candidatos">
              {candidatos.map((candidato) => (
                <div key={candidato.id} className="candidato-card">
                  <img
                    src={candidato.imagen}
                    alt={candidato.nombre}
                    className="imagen-candidato"
                    onClick={() => cambiarImagen(candidato.id)}
                  />
                  <h3>{candidato.nombre}</h3>
                  <p className="lema-candidato">"{candidato.lema}"</p>

                  {candidato.nombre !== "Voto en blanco" && (
                    <>
                      <button className="votar" onClick={() => manejarVoto(candidato.id)}>
                        votar
                      </button>
                      <button className="eliminar" onClick={() => eliminarCandidato(candidato.id)}>
                        ✖
                      </button>
                    </>
                  )}

                  {candidato.nombre === "Voto en blanco" && (
                    <button className="votar" onClick={() => manejarVoto(candidato.id)}>
                      votar
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 📋 FORMULARIO NUEVO */}
          {mostrarFormulario && (
            <div className="formulario-candidato">
              <input
                type="text"
                placeholder="Nombre del candidato"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
              />
              <input
                type="text"
                placeholder="Lema del candidato"
                value={nuevoLema}
                onChange={(e) => setNuevoLema(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const archivo = e.target.files[0];
                  if (archivo) {
                    setNuevaImagen(URL.createObjectURL(archivo));
                  }
                }}
              />
              <button className="boton-agregar" onClick={agregarCandidato}>
                ➕ Agregar candidato
              </button>
            </div>
          )}

          {mostrarCandidatos && (
            <div className="botones-finales">
              <Boton texto="Agregar Candidato ➕" manejarClick={toggleFormulario} />
              <Boton texto="Revisar Votos 📊" manejarClick={revisarVotos} />
            </div>
          )}

          {mostrarLoginAdmin && (
            <div className="ventana-clave">
              <h3>🔐 Ingreso administrador</h3>
              <input
                type="password"
                placeholder="Contraseña..."
                value={claveAdmin}
                onChange={(e) => setClaveAdmin(e.target.value)}
              />
              <Boton texto="Ver resultados" manejarClick={verificarClave} />
              <Boton texto="Cancelar" manejarClick={() => setMostrarLoginAdmin(false)} />
            </div>
          )}
        </div>
      )}

      {mostrarResultados && (
        <div className="resultados">
          <h2>Resultados Finales 💕</h2>
          {candidatos.map((c) => (
            <p key={c.id}>
              {c.nombre}: {c.votos} votos
            </p>
          ))}
          <div className="resultado-final">
            <h2>
              🏆 El personer@ es <span>{ganador}</span> 🎉
            </h2>
            <p>💖 Gracias por participar en las elecciones estudiantiles LYZ 💖</p>
          </div>
          <div className="botones-resultados">
            <Boton texto="🔁 Reiniciar Todo" manejarClick={reiniciarTodo} />
            <Boton texto="🏠 Volver al Inicio" manejarClick={volverAlInicio} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
