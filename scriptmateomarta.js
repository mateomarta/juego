const preguntas = [
  { texto: "la salud mental se refiere unicamente al bienestar emocional, psiquico y social.", respuesta: true },
  { texto: "La frustración nos permite identificar cuándo las cosas no salen como queremos y aprender a resolver problemas.", respuesta: true },
  { texto: "Dormir adecuadamente y mantener una alimentación balanceada no influye en la salud mental.", respuesta: false },
  { texto: "El aislamiento en hospitales psiquiátricos es beneficioso para las personas con problemas de salud mental.", respuesta: false },
  { texto: "Hacer actividades que te hagan feliz, como pintar o practicar deportes, es una forma de cuidar tu salud mental.", respuesta: true },
  { texto: "Las emociones negativas, como el miedo y la tristeza, deben ser ignoradas para mantener una buena salud mental.", respuesta: false },
  { texto: "Hablar de tus miedos con alguien de confianza puede ayudarte a manejar mejor esas emociones.", respuesta: true },
  { texto: "La autocompasión y ser amable contigo mismo son importantes para mantener una buena salud mental.", respuesta: true },
  { texto: "Los problemas de salud mental no pueden afectar los aspectos físicos y sociales de una persona.", respuesta: false },
  { texto: "El alcohol y la depresión son los problemas más frecuentes en salud mental en América.", respuesta: true }
];

let preguntaActual = 0;
let respuestasCorrectas = 0;

const contenedorPregunta = document.getElementById("contenedor-pregunta");
const contenedorCuestionario = document.querySelector(".contenedor-cuestionario");
const botonVerdadero = document.getElementById("boton-verdadero");
const botonFalso = document.getElementById("boton-falso");
const botonReiniciar = document.getElementById("boton-reiniciar");
const botonMenu = document.getElementById("boton-menu");
const resultado = document.getElementById("resultado");


//esta funcion sirve para mostrar las preguntas y darle clases
function mostrarPregunta() {
  const pregunta = preguntas[preguntaActual];
  contenedorPregunta.classList.add("fade-out");
  setTimeout(() => {
    contenedorPregunta.textContent = pregunta.texto;
    contenedorPregunta.classList.remove("fade-out");
    contenedorPregunta.classList.add("fade-in");
    setTimeout(() => {
      contenedorPregunta.classList.remove("fade-in");
    }, 500);
  }, 500);
}

//esta funcion me sirve para poder verificar que las respuestas sean verdaderas y falsas
function verificarRespuesta(respuesta) {
  const pregunta = preguntas[preguntaActual];
  const retroalimentacion = document.createElement("p");
  const esCorrecta = respuesta === pregunta.respuesta;
  //para que caudno sea b o m salga una leyenda con sus calses y estilos
  retroalimentacion.textContent = esCorrecta ? "¡Correcto! Bien hecho." : "¡Incorrecto! Suerte en la próxima.";
  retroalimentacion.style.fontWeight = "bold";
  retroalimentacion.style.color = esCorrecta ? "#4caf50" : "#f44336";
  resultado.appendChild(retroalimentacion);
//estilo del contenedor 
  contenedorCuestionario.style.boxShadow = esCorrecta ? "0 0 10px rgba(76, 175, 80, 0.8)" : "0 0 10px rgba(244, 67, 54, 0.8)";


// esto es el contador de respuestas correctas
  if (esCorrecta) {
    respuestasCorrectas++;
  }

  preguntaActual++;

//cumple la funcion de pasar de pregunta a puntuacion fuinal y la calcula
  if (preguntaActual < preguntas.length) {
    setTimeout(() => {
      resultado.removeChild(retroalimentacion);
      mostrarPregunta();
      contenedorCuestionario.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    }, 1500);
  } else {
    setTimeout(() => {
      calcularPuntuacion();
    }, 1500);
  }
}

//funcion de calcular la puntuacion
function calcularPuntuacion() {
  const puntuacion = (respuestasCorrectas / preguntas.length) * 100;
  finalizarCuestionario(puntuacion);
}



//para cuando termine el cuestionario y me figure las leyendas
function finalizarCuestionario(puntuacion) {
  contenedorPregunta.textContent = "Puntuación Final";
  resultado.innerHTML = "";
  const puntuacionFinal = document.createElement("p");
  puntuacionFinal.id = "puntuacion-final";
  puntuacionFinal.textContent = `Tu puntuación es: ${puntuacion.toFixed(2)}%`;
  resultado.appendChild(puntuacionFinal);

  let mensajePuntuacion = "";
  if (puntuacion >= 90) {
    mensajePuntuacion = "¡Excelente!. Tienes muy buena memoria";
    resultado.classList.add("puntuacion-excelente");
  } else if (puntuacion >= 70) {
    mensajePuntuacion = "¡Buen trabajo! Esto es lo tuyo sigue asi.";
    resultado.classList.add("puntuacion-buena");
  } else if (puntuacion >= 50) {
    mensajePuntuacion = "¡Sigue intentando! Solo falta parender un poco mas";
    resultado.classList.add("puntuacion-regular");
  } else {
    mensajePuntuacion = "Necesitas mejorar. ¡No te desanimes y sigue intentándolo!";
    resultado.classList.add("puntuacion-mala");
  }
  

  //para crear el mensaje de la puntuacion
  const elementoMensajePuntuacion = document.createElement("p");
  elementoMensajePuntuacion.textContent = mensajePuntuacion;
  resultado.appendChild(elementoMensajePuntuacion);

//definimos los botones
  botonVerdadero.style.display = "none";
  botonFalso.style.display = "none";
  botonReiniciar.style.display = "inline-block";
  botonMenu.style.display = "inline-block";
}


//para reiniciar el cuestionario cuando se toque el boton de restart
function reiniciarCuestionario() {
  preguntaActual = 0;
  respuestasCorrectas = 0;
  botonVerdadero.style.display = "inline-block";
  botonFalso.style.display = "inline-block";
  botonReiniciar.style.display = "none";
  botonMenu.style.display = "none";
  resultado.innerHTML = "";
  mostrarPregunta();
}

//funcion q cuando toque el boton del menu ir
function irAlMenu() {
  window.location.href = "juegomateomarta.html";
}

mostrarPregunta();

botonVerdadero.addEventListener("click", function() { verificarRespuesta(true); });
botonFalso.addEventListener("click", function() { verificarRespuesta(false); });
botonReiniciar.addEventListener("click", reiniciarCuestionario);
botonMenu.addEventListener("click", irAlMenu);

