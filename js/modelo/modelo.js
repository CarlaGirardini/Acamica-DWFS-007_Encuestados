/*
 * Modelo
 */

// En este paso vas a tener que agregarle al modelo todas las funciones necesarias para manipular las preguntas y respuestas:
// agregar respuesta
// eliminar pregunta
// sumarle 1 al voto de una respuesta
// editar una pregunta
// borrar todas las preguntas
// o cualquier otra que te interese. Acordate que el modelo es el encargado de almacenar los datos, así que ¡a agregar funciones que se encarguen de hacer los cambios en él!

var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;
  this.cargar()

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  // Acá empieza lo que hice yo
  this.preguntaEliminada = new Evento(this);
  this.respuestaVotada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  // Acá termina lo que hice yo
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    // Acá empieza lo que hice yo
    let contadorId = 0;
    this.preguntas.forEach(preg => {
      if (preg.id >= contadorId) {
        contadorId = preg.id;
      }
    });
    return contadorId;
    // Acá termina lo que hice yo
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function () {
    // Acá empieza lo que hice yo
    localStorage.setItem('preguntas',JSON.stringify(this.preguntas));
    // Acá termina lo que hice yo
  },

  cargar: function() {
    this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
  },

  // Acá empieza lo que hice yo

  borrarPregunta: function (IDpregunta) {
    let preguntaBuscada = this.preguntas.find(preg => preg.id === IDpregunta);
    let index = this.preguntas.indexOf(preguntaBuscada);
    if (index !== -1) {
      this.preguntas.splice(index, 1);
      this.preguntaEliminada.notificar();
      return this.preguntas;
    }
    console.error('No se encuentra la pregunta');
  },

  agregarVoto: function (nombrePregunta, respuestaSeleccionada) {
    // sumarle 1 al voto de una respuesta
    respuestaSeleccionada.cantidad++;
    // nombrePregunta.cantidadPorRespuesta ++;
    this.respuestaVotada.notificar();
    return respuestaSeleccionada;
  },

  editarPregunta: function (IDPregunta) {
    // editar una pregunta
    var preguntaSeleccionada = this.preguntas.find(preg => preg.id === IDPregunta);
    nuevoTextoPregunta = prompt('Escriba la nueva pregunta');
    if (nuevoTextoPregunta) { 
      preguntaSeleccionada.textoPregunta = nuevoTextoPregunta;
      this.preguntaEditada.notificar();
    }
    return;
  },

  borrarTodo: function () {
    // borrar todas las preguntas
    this.preguntas = [];
    this.preguntaEliminada.notificar();
    return this.preguntas;
  }

  // Acá termina lo que hice yo
};
