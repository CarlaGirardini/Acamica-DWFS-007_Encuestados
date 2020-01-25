/*
 * Vista administrador
 */
var VistaAdministrador = function (modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function () {
    contexto.reconstruirLista();
  });
  
  // Acá empieza lo que hice yo
  this.modelo.preguntaEliminada.suscribir(() => {
    contexto.reconstruirLista();
  });
  // Acá termina lo que hice yo
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function () {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    // Acá empieza lo que hice yo
    this.reconstruirLista();
    this.configuracionDeBotones();
    // Acá termina lo que hice yo
    validacionDeFormulario();
  },


  construirElementoPregunta: function (pregunta) {
    var contexto = this;
    var nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    // Acá empieza lo que hice yo

    nuevoItem = $('<li>', {
      'class' : 'list-group-item',
      'id' : pregunta.id,
      'text' : pregunta.textoPregunta
    });

    // Acá termina lo que hice yo
    
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function (resp) {
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function () {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i = 0; i < preguntas.length; ++i) {
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function () {
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function () {
      var value = e.pregunta.val();
      var respuestas = [];
      
      $('[name="option[]"]').each(function () {
        // En la función agregarPregunta tendrás que pushear al arreglo de respuestas cada respuesta existente. Recordá como estaba formado el elemento respuesta en Cómo están representadas las preguntas y respuestas. Este arreglo de respuestas será el que le pases al controlador.
        // Tip: respuesta = $(this).val(); contiene el texto de la respuesta. La cantidad de votos deberá ser seteada en 0.
        // Acá empieza lo que hice yo
        respuestas.push({'textoRespuesta': $(this).val(), 'cantidad': 0});
        // Acá termina lo que hice yo
      })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //asociar el resto de los botones a eventos

    // Acá empieza lo que hice yo
    e.botonBorrarPregunta.click(() => {
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id);
    })
    // Acá termina lo que hice yo
  },

  limpiarFormulario: function () {
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
