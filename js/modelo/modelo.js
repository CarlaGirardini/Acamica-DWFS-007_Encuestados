/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;
  this.cargar();

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.respuestaVotada = new Evento(this);
  this.preguntaEditada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    let contadorId = 0;
    this.preguntas.forEach(preg => {
      if (preg.id >= contadorId) {
        contadorId = preg.id;
      }
    });
    return contadorId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },

  cargar: function () {
    if(localStorage.length !== 0){
      this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
    }
  },

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
    
    if(respuestaSeleccionada){
      let pregunta = this.preguntas.find(preg => preg.textoPregunta === nombrePregunta);
      let index = this.preguntas.indexOf(pregunta);

      if(index !== -1){
        let respuesta = this.preguntas[index].cantidadPorRespuesta.find(res => res.textoRespuesta === respuestaSeleccionada);
        respuesta.cantidad++;
        this.guardar;
      }
    }

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
};
