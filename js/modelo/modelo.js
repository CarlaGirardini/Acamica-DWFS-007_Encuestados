/*
 * Modelo
 */

// Llegó la hora de completar el modelo. Lo único que tendremos que hacer acá es implementar la funcionalidad para obtener un nuevo id. con obtenerUltimoId. Lo que debe hacer esta función es buscar el id más alto y asignar ese id a la nueva pregunta. Para hacerlo vas a tener que recorrer la lista de preguntas del modelo.

//     Tip: cuidado con la primer pregunta que se agrega que no tendrá ningún id con el cual compararse. Por lo que deberá tener un valor por defecto.

var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    // Acá empieza lo que hice yo
    let contadorId = 0;
    this.preguntas.forEach(preg=>{
      if(preg.id >= contadorId){
        contadorId = preg.id;
      }
    });
    return contadorId;
    // Acá termina lo que hice yo
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
  },
};
