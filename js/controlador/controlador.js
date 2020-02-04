/*
 * Controlador
 */


var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  // Acá empieza lo que hice yo
  borrarPregunta: function(IDpregunta) {
    this.modelo.borrarPregunta(IDpregunta);
  },

  agregarVoto: function(nombrePregunta,respuestaSeleccionada){
    this.modelo.agregarVoto(nombrePregunta,respuestaSeleccionada);
  },

  editarPregunta: function(IDPregunta){
    this.modelo.editarPregunta(IDPregunta);
  },

  borrarTodo: function(){
    this.modelo.borrarTodo();
  }
  // Acá termina lo que hice yo
};
