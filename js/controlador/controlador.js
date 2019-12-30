/*
 * Controlador
 */

// En la función agregarPregunta tendrás que pushear al arreglo de respuestas cada respuesta existente. Recordá como estaba formado el elemento respuesta en Cómo están representadas las preguntas y respuestas. Este arreglo de respuestas será el que le pases al controlador.

// Tip: respuesta = $(this).val(); contiene el texto de la respuesta. La cantidad de votos deberá ser seteada en 0.



var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
      // Acá empieza lo que hice yo
      respuestas.push($(this).val());
      // Acá termina lo que hice yo
  },
};
