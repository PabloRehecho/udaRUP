/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
 * Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);
 * Solo podrá usarse esta obra si se respeta la Licencia.
 * Puede obtenerse una copia de la Licencia en
 *
 *      http://ec.europa.eu/idabc/eupl.html
 *
 * Salvo cuando lo exija la legislación aplicable o se acuerde por escrito,
 * el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,
 * SIN GARANT�?AS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
 * Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
 * que establece la Licencia.
 */

/**
 * @fileOverview Implementa el patrón RUP Feedback.
 * @author EJIE
 * @version 2.4.12
 */
(function ($) {

    /**
    * Se informa al usuario de cómo interactuar con los elementos de la aplicación y del resultado de cualquier acción que realice o cualquier problema que tenga y de cómo solucionarlo.
    *
    * @summary Componente RUP Feedback.
    * @namespace jQuery.rup_feedback
    * @memberOf jQuery
    * @tutorial rup.feedback
    * @example
    * var properties = {
    *   type: "ok",
    *   delay: 500,
    *   fadeSpeed: 600,
    *   gotoTop: false,
    *   block: false,
    *   closeLink: true
    * };
    * $("#id_capa").rup_feedback (properties);
    */
	$.widget("$.rup_feedback", {
        /**
         * @description Opciones por defecto de configuración del widget.
         *
         * @name jQuery.rup_feedback#options
         *
         * @property {string}  [type=null] - Tipo de feedback a mostrar [ok, alert, error].
         * @property {Number}  [imgClass=null] - Clase que determina el estilo que se va a aplicar en el icono del feedback.
         * @property {Number}  [delay=null] - Espera (ms) que va a aplicarse antes de ocultar el feedback.
         * @property {Number}  [fadeSpeed=null] - Tiempo (ms) que va a durar la animación de ocultación del feedback.
         * @property {boolean} [gotoTop=true] - Drmina si cuando se muestre el feedback se debe desplazar la
página hasta la parte superior de la misma.
         * @property {boolean}  [block=true] - Indica si la capa que contendrá el mensaje de feedback debe tener o
no un espacio fijo en la pantalla.
         * @property {closeLink}  [closeLink=true] - Indica si la capa de feedback tendrá un enlace para que el usuario
de la aplicación pueda cerrar la capa manualmente.
         */
		options: {
			type: null,  //[ok, alert, error]
			imgClass: null,
			delay: null,
			fadeSpeed: null,
			gotoTop: true,
			block: true,
			closeLink: true,
			//uso privado
			_idFeedback: null,
			_divClose: null
		},
        /**
         * @name jQuery.rup_feedback#_setOption
         * @function
         * @private
         * @description Modifica las opciones de configuración del componente.
         */
		_setOption: function (key, value) {
			var opciones = this.options,
				element = this.element;
			switch (key) {
				case "type":
					//Eliminar imagenes anteriores y poner el tipo indicado
					if (value !== null) {
						element.removeClass(opciones.imgClass + " rup-feedback_image_"+opciones.type);
						element.addClass("rup-feedback_image rup-feedback_image_"+value);
					} else {
						element.removeClass("rup-feedback_image rup-feedback_image_"+opciones.type);
					}
					break;
				case "imgClass":
					//Eliminar imagenes anteriores y poner la personal
					if (value !== null) {
						element.removeClass(opciones.imgClass + " rup-feedback_image rup-feedback_image_"+opciones.type);
						element.addClass(value);
					} else {
						element.removeClass(opciones.imgClass);
					}
					break;
				case "closeLink":
					//Gestionar capa enlace cierre
					if (value) {
						this._addCloseLink();
					} else {
						$("#"+this.options._idFeedback+"_closeDiv").remove();
					}
					break;
			}
			delete opciones;
			delete element;
			$.Widget.prototype._setOption.apply(this, arguments);
		},
		/**
         * @name jQuery.rup_feedback#_create
         * @function
         * @private
         * @description Crea en el DOM los elementos que conforman el componente.
         */
		_create: function () {
			var opciones = this.options;
			opciones._idFeedback =
				this.element
					.addClass("rup-feedback ui-widget ui-widget-content ui-corner-all")
					.addClass(opciones.imgClass!=null?opciones.imgClass:opciones.type!=null?"rup-feedback_image rup-feedback_image_"+opciones.type:"")
					.attr({ role: "alert" })
					.css("display", opciones.block?"block":"none")
					.css("visibility","hidden")
				.context.id;

			//Crear capa cierre
			opciones._divClose = $("<div />").html($.rup.i18nParse($.rup.i18n.base, "rup_global.cerrar"))
					.attr("id",opciones._idFeedback+"_closeDiv")
					.attr("title",$.rup.i18nParse($.rup.i18n.base,"rup_feedback.closingLiteral"))
					.addClass("rup-feedback_closeLink");

			//Si se define texto sacarlo
			if (opciones.message){
				this.set(opciones.message, opciones.type, opciones.imgClass);
			}

			delete opciones;
		},
		/**
         * @description Añade el enlace de cierre.
         *
         * @name jQuery.rup_feedback#_addCloseLink
         * @function
         * @private
         */
		_addCloseLink: function () {
			var opciones = this.options;
			opciones._divClose.click(function(){ $("#"+opciones._idFeedback).rup_feedback("close"); });
			this.element.prepend(opciones._divClose);
			delete opciones;
		},
		/**
         * Elimina las modificaciones realizadas sobre la capa para convertirla en feedback volviendo a ser una simple capa.
         *
         * @name jQuery.rup_feedback#destroy
         * @function
         * @example
         * // Elimina el feedback
         * jQuery("#feedback").rup_feedback("destroy");
         */
		destroy: function () {
			var opciones = this.options;
			this.element
				.removeClass()
				.removeAttr ("role")
				.css("cssText", "")
				.html("")
				.stop().animate({opacity:'100'}); //Por si está desapareciendo (hide)
			delete opciones;
			$.Widget.prototype.destroy.apply (this, arguments);
		},
		/**
         * Establece el texto (msg) a mostrar en el feedback, que podrá ser tanto texto plano como html. <br/><br/>
         * En caso de sólo definirse el parámetro msg, se mostrará como imagen aquella definida anteriormente ya sea de un tipo por defecto o de una imagen con estilo personalizado (si es que se había definido). <br/><br/>
         * En caso de que se envíe el parámetro type informado de modificará la capa para mostrar la imagen por defecto asociada al tipo, borrando algún posible estilos personalizado establecido anteriormente. <br/><br/>
         * Por último para realizar el cambio a un estilo personalizado se pasará como parámetro type null y como imgClass la clase con el estilo a establecer.
         * @name jQuery.rup_feedback#set
         * @function
         * @param {string} message - Texto del mensaje que se va a mostrar en el feedback.
         * @param {string} [type] - Identificador del tipo de feedback [ok, alert, error].
         * @param {string} [imgClass] - Clase que determina el estilo que se va a aplicar en el icono del feedback.
         * @example <caption>Feedback simple:</caption>
         * $("#id_capa").rup_feedback("set","Texto a mostrar");
         * @example <caption>Feedback cambiando a imagen de un tipo por defecto (Ej. error):</caption>
         * $("#id_capa").rup_feedback("set", "...", "error");
         * @example <caption>Feedback estableciendo un estilo personalizado:</caption>
         * $("#id_capa").rup_feedback("set", "...", null, "imgPropio");
         */
		set: function (message, type, imgClass){
			var element = this.element,
			 	opciones = this.options;

			//En caso de que está desapareciendo parar animación
			element.stop().animate({opacity:'100'});

			//Gestión 'type'
			if (type != undefined){
				element.removeClass(opciones.imgClass);
				//Si se recibe type xxx se eliminan posibles tipo anterior y se establece ese
				if (opciones.type != null){
					element.removeClass("rup-feedback_image_" + opciones.type);
				} else {
					element.addClass("rup-feedback_image");
				}
				element.addClass("rup-feedback_image_" + type);
				opciones.type = type;
			} else if (type === null){
				//Si se recibe type 'null' se eliminan posibles tipos anteriores
				element.removeClass("rup-feedback_image rup-feedback_image_" + opciones.type);
				opciones.type = null;
			}

			//Gestión 'imgClass'
			if (imgClass != undefined) {
				if (opciones.imgClass != null) {
					element.removeClass(opciones.imgClass);
				}
				element.addClass(imgClass);
				opciones.imgClass = imgClass;
			}

			//Sacar mensaje
			$("#"+opciones._idFeedback+"_content").remove();
			element.append($("<div/>").attr("id",opciones._idFeedback+"_content").html(message));
			//Añadir cierre (evento y capa)
			if (opciones.closeLink) {
				this._addCloseLink();
			}
			this.show();

			//Ir al inicio
			if (opciones.gotoTop){
				$('html, body').animate({ scrollTop: '0px' }, 0);
			}
			//Ocultacion mensaje
			if (opciones.delay!=null) {
				this.hide();
			};
			delete element;
			delete opciones;
		},
		/**
     * Oculta la capa del feedback con una animación. <br/><br/>
     * Si no se definen los parámetros se tomaran los definidos con anterioridad (creación del feedback por ejemplo) o si no los valores por defecto (null, null) que implica una animación sin espera con una “velocidad�? de 400 ms.
     *
     * @name jQuery.rup_feedback#hide
     * @function
     * @param {Number} [delay] - Espera (ms) que va a aplicarse antes de ocultar el feedback.
     * @param {Number} [fadeSpeed] - Tiempo (ms) que va a durar la animación de ocultación del feedback.
     *
     * @example
     * // Ocultar el feedback.
     * jQuery("#feedback").rup_feedback("hide");
     * @example
     * // Ocultar el feedback. Se realiza con una demora de 1000ms y la transición dura 500ms.
     * jQuery("#feedback").rup_feedback("hide",1000,500);
     */
		hide: function (delay, fadeSpeed){
			var opciones = this.options,
				element = this.element;

			//Si no se reciben parámetros se toman los valores de la configuración inicial
			if (delay == undefined) {
				delay = opciones.delay;
			}
			if (fadeSpeed == undefined) {
				fadeSpeed = opciones.fadeSpeed;
			}
			element.delay(delay).fadeOut(eval(fadeSpeed), function(){
				$("#"+opciones._idFeedback).rup_feedback("close", true);
			});
			delete opciones;
			delete element;
		},
		/**
     * Oculta la capa del feedback sin animación alguna.<br/>
     * Esta función será invocada por el enlace de cierre (parámetro closeLink) en caso de que se muestre.
     *
     * @name jQuery.rup_feedback#close
     * @function
     * @param {boolean} [notEmpty=false] - Determina si se debe ejecutar empty() sobre el feedback.
     *
     * @example
     * // Cierra el feedback.
     * jQuery("#feedback").rup_feedback("close");
     */
		close: function (notEmpty) {
			var element = this.element;
			element.css("display",this.options.block?"block":"none");
			element.css("visibility","hidden");
			if (notEmpty===undefined){
				element.empty();
			}
			delete element;
		},
		/**
     * Muesta la capa del feedback. <br/><br/>
     * Esta función será invocada automáticamente cada vez que se invoque la función set(…)
     *
     * @name jQuery.rup_feedback#show
     * @function
     * @fires rupFeedback_show
     * @example
     * // Muestra el feedback.
     * jQuery("#feedback").rup_feedback("show");
     */
		show: function () {
			var element = this.element;
			element.css("display","block");
			element.css("visibility","visible");

			// Se aplica el tooltip
			this.element.find("[title]").rup_tooltip({position:{at:"bottom center", my:"top center"},applyToPortal: true});

			delete element;

			jQuery(this.element).triggerHandler("rupFeedback_show");
		}

    /**
     * Permite cambiar las propiedades definidas en el feedback.<br/><br/>
     * Puede invocarase antes que la funcion set(…) para modificar cualquiera de los parámetros del mensaje a mostar: icono, imagen personalizada, tiempo de espera hasta desaparecer…
     *
     * @name jQuery.rup_feedback#option
     * @function
     * @param {(Object|string)} param1 - Primer parámetro de invocación.<br/>
     * Puede tratarse de un Object que contenga varios parámetros o un string que indica el nombre del parámetro.
     * @param {*} [param2] - Segundo parámetro de invocación.<br/>
     * En caso de que el primer parámetro sea un string este será el valor correspondiente del parámetro identificado con el nombre de param1.
     * @example
     * // Feedback cambio propiedad simple
     * $("#id_capa").rup_feedback("option","closeLink", false);
     * @example
     * //Feedback cambio varias propiedades
     * var properties = {"closeLink":false, "block":false};
     * $("#id_capa").rup_feedback("option", properties);
     */
	});
})( jQuery );
