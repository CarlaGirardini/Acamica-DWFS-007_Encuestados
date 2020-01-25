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
  }
  // Acá termina lo que hice yo
};
