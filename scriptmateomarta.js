const preguntas = [
  { texto: "La salud mental se refiere únicamente al bienestar emocional, psíquico y social.", respuesta: true, explicacion: "La salud mental incluye el bienestar emocional, psíquico y social, y afecta cómo pensamos, sentimos y actuamos." },
  { texto: "La frustración nos permite identificar cuándo las cosas no salen como queremos y aprender a resolver problemas.", respuesta: true, explicacion: "La frustración es una respuesta emocional común que puede motivarnos a buscar soluciones y mejorar nuestras habilidades de resolución de problemas." },
  { texto: "Dormir adecuadamente y mantener una alimentación balanceada no influye en la salud mental.", respuesta: false, explicacion: "Dormir adecuadamente y mantener una alimentación balanceada son fundamentales para la salud mental, ya que afectan nuestro estado de ánimo y niveles de energía." },
  { texto: "El aislamiento en hospitales psiquiátricos es beneficioso para las personas con problemas de salud mental.", respuesta: false, explicacion: "El aislamiento no suele ser beneficioso para la salud mental; el apoyo social y el tratamiento adecuado son esenciales." },
  { texto: "Hacer actividades que te hagan feliz, como pintar o practicar deportes, es una forma de cuidar tu salud mental.", respuesta: true, explicacion: "Realizar actividades placenteras puede reducir el estrés y mejorar el bienestar general." },
  { texto: "Las emociones negativas, como el miedo y la tristeza, deben ser ignoradas para mantener una buena salud mental.", respuesta: false, explicacion: "Ignorar las emociones negativas puede empeorar la salud mental; es importante reconocer y manejar estas emociones de manera saludable." },
  { texto: "Hablar de tus miedos con alguien de confianza puede ayudarte a manejar mejor esas emociones.", respuesta: true, explicacion: "Hablar sobre tus miedos con alguien de confianza puede proporcionar apoyo emocional y ayudar a encontrar maneras de afrontarlos." },
  { texto: "La autocompasión y ser amable contigo mismo son importantes para mantener una buena salud mental.", respuesta: true, explicacion: "Practicar la autocompasión puede reducir el estrés y mejorar la resiliencia emocional." },
  { texto: "Los problemas de salud mental no pueden afectar los aspectos físicos y sociales de una persona.", respuesta: false, explicacion: "Los problemas de salud mental pueden tener un impacto significativo en los aspectos físicos y sociales de una persona, afectando su calidad de vida." },
  { texto: "El alcohol y la depresión son los problemas más frecuentes en salud mental en América.", respuesta: true, explicacion: "El consumo de alcohol y la depresión son problemas comunes que afectan a muchas personas en América y pueden estar interrelacionados." }
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
const botonSiguientePregunta = document.createElement("button");
botonSiguientePregunta.id = "boton-siguiente";
botonSiguientePregunta.textContent = "Siguiente Pregunta";
botonSiguientePregunta.style.display = "none";
document.querySelector(".contenedor-botones").appendChild(botonSiguientePregunta);

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
  botonSiguientePregunta.style.display = "none";
  botonVerdadero.style.display = "inline-block";
  botonFalso.style.display = "inline-block";
}

function verificarRespuesta(respuesta) {
  const pregunta = preguntas[preguntaActual];
  const retroalimentacion = document.createElement("p");
  const respuestaCorrecta = pregunta.respuesta ? "Verdadero" : "Falso";
  const esCorrecta = respuesta === pregunta.respuesta;
  retroalimentacion.textContent = esCorrecta ? `¡Correcto! La respuesta es ${respuestaCorrecta}. ${pregunta.explicacion}` : `¡Incorrecto! La respuesta correcta es ${respuestaCorrecta}. ${pregunta.explicacion}`;
  retroalimentacion.style.fontWeight = "bold";
  retroalimentacion.style.color = esCorrecta ? "#4caf50" : "#f44336";
  resultado.appendChild(retroalimentacion);
  contenedorCuestionario.style.boxShadow = esCorrecta ? "0 0 10px rgba(76, 175, 80, 0.8)" : "0 0 10px rgba(244, 67, 54, 0.8)";

  if (esCorrecta) {
    respuestasCorrectas++;
  }

  preguntaActual++;
  botonVerdadero.style.display = "none";
  botonFalso.style.display = "none";
  botonSiguientePregunta.style.display = "inline-block";

  botonSiguientePregunta.onclick = () => {
    resultado.removeChild(retroalimentacion);
    if (preguntaActual < preguntas.length) {
      mostrarPregunta();
      contenedorCuestionario.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    } else {
      calcularPuntuacion();
    }
  };
}

function calcularPuntuacion() {
  const puntuacion = (respuestasCorrectas / preguntas.length) * 100;
  finalizarCuestionario(puntuacion);
}

function finalizarCuestionario(puntuacion) {
  contenedorPregunta.textContent = "Puntuación Final";
  resultado.innerHTML = "";
  const puntuacionFinal = document.createElement("p");
  puntuacionFinal.id = "puntuacion-final";
  puntuacionFinal.textContent = `Tu puntuación es: ${puntuacion.toFixed(2)}%`;
  resultado.appendChild(puntuacionFinal);

  let mensajePuntuacion = "";
  if (puntuacion >= 90) {
    mensajePuntuacion = "¡Excelente! Tienes muy buena memoria";
    resultado.classList.add("puntuacion-excelente");
  } else if (puntuacion >= 70) {
    mensajePuntuacion = "¡Buen trabajo! Esto es lo tuyo sigue así.";
    resultado.classList.add("puntuacion-buena");
  } else if (puntuacion >= 50) {
    mensajePuntuacion = "¡Sigue intentando! Solo falta aprender un poco más";
    resultado.classList.add("puntuacion-regular");
  } else {
    mensajePuntuacion = "Necesitas mejorar. ¡No te desanimes y sigue intentándolo!";
    resultado.classList.add("puntuacion-mala");
  }

  const elementoMensajePuntuacion = document.createElement("p");
  elementoMensajePuntuacion.textContent = mensajePuntuacion;
  resultado.appendChild(elementoMensajePuntuacion);

  // Ocultar todos los botones menos "Reiniciar" y "Menú principal"
  botonVerdadero.style.display = "none";
  botonFalso.style.display = "none";
  botonSiguientePregunta.style.display = "none";
  botonReiniciar.style.display = "inline-block";
  botonMenu.style.display = "inline-block";
}

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

function irAlMenu() {
  window.location.href = "juegomateomarta.html";
}

mostrarPregunta();

botonVerdadero.addEventListener("click", function() { verificarRespuesta(true); });
botonFalso.addEventListener("click", function() { verificarRespuesta(false); });
botonReiniciar.addEventListener("click", reiniciarCuestionario);
botonMenu.addEventListener("click", irAlMenu);
