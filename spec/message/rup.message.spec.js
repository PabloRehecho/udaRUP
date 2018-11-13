/* jslint multistr: true */

import 'jquery';
import * as testutils from '../common/specCommonUtils.js';
import 'handlebars';
import 'jasmine-jquery';
import 'rup.message';

$.when(messageTester('Ok'))
	.then(messageTester('Alert'))
	.then(messageTester('Error'))
	.then(messageTester('Confirm'));

function messageTester(msgType) {
	var def = $.Deferred();
    describe('Test Message '+ msgType, () => {
		beforeAll((done) => {
			testutils.loadCss(done);
		});
		afterAll(() => {
			def.resolve();
		});
		beforeEach(() => {
			switch(msgType){
				case 'Ok':
					$.rup_messages('msgOK', {
						title: 'Correcto',
						message: 'Todo ha ido Ok'
					});
					break;
				case 'Alert':
					$.rup_messages('msgAlert', {
						title: 'Aviso',
						message: 'Advertencia'
					});
					break;
				case 'Error':
					$.rup_messages('msgError', {
						title: 'Error',
						message: 'Fallo'
					});
					break;
				case 'Confirm':
					$.rup_messages('msgConfirm', {
						title: 'Confirmacion',
						message: 'Confirma?'
					});
					break;
			}
		});
		it('asd',() => {
			debugger;
			expect(1).toBe(1);
		});		
	});
}
/*function executeSharedTests(createInstanceFn) {


	describe('Construcción de un RUP Message', function () {
		var $message, $messageTitleDiv, $messageContentDiv, $messageButtonpaneDiv;

		beforeAll(function () {
			$message = createInstanceFn();

			$messageTitleDiv = jQuery('.ui-dialog-titlebar', $message);
			$messageContentDiv = jQuery('.ui-dialog-content', $message);
			$messageButtonpaneDiv = jQuery('.ui-dialog-buttonpane', $message);

		});

		it('deberia de existir un ui-dialog', function () {
			expect($message).toExist();
		});

		describe('Se ha construido una sección de título correcta', function () {
			it('deberia de existir una sección de título', function () {

				expect($messageTitleDiv).toExist();
			});

			it('deberia de existir una botón de cerrar', function () {
				expect($('.ui-dialog .ui-dialog-titlebar a[role=\'button\']')).toExist();
			});

			it('deberia de existir un texto de cerrar', function () {
				expect($('.ui-dialog .ui-dialog-titlebar a.ui-dialog-title span')).toExist();
				expect($('.ui-dialog .ui-dialog-titlebar a.ui-dialog-title span')).toHaveText(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_global.cerrar'));
			});
		});

		describe('Construcción de la botonera', function () {
			it('deberia de existir una sección que contenga los botones', function () {
				expect($messageButtonpaneDiv).toExist();
			});

			it('deberia de existir al menos el botón de Aceptar', function () {
				debugger;
				expect($('.ui-dialog-buttonset > button:contains('+
					jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_message.aceptar')
				+')', $messageButtonpaneDiv).length).toBe(1);
			});
		});


	});

}

describe('RUP Messages Tests', function () {


	describe('Mostrar un mensaje de error', function () {

		function createInstance() {
			$.rup_messages('msgError', {
				title: 'Error',
				message: 'Se ha producido un error.'
			});

			return jQuery('.ui-dialog').parent();
		}


		executeSharedTests(createInstance);
		afterAll(function () {
			$('.ui-dialog>.ui-dialog-content').dialog('destroy').remove();
		});

		it('debería de existir un div con el icono de error', function () {
			expect($('.ui-dialog>.ui-dialog-content > div.rup-message_icon-error')).toExist();
		});

	});

	describe('Mostrar un mensaje de alert', function () {

		function createInstance() {
			$.rup_messages('msgAlert', {
				title: 'Alerta',
				message: 'Esto es un mensaje de alerta .'
			});

			return jQuery('.ui-dialog');
		}

		afterAll(function () {
			$('.ui-dialog>.ui-dialog-content').dialog('destroy').remove();
		});

		executeSharedTests(createInstance);

		it('debería de existir un div con el icono de alerta', function () {
			expect($('.ui-dialog>.ui-dialog-content > div.rup-message_icon-alert')).toExist();
		});


	});

	describe('Mostrar un mensaje de Ok', function () {

		function createInstance() {
			$.rup_messages('msgOK', {
				title: 'Correcto',
				message: 'Todo ha ido Ok'
			});

			return jQuery('.ui-dialog');
		}

		afterAll(function () {
			$('.ui-dialog>.ui-dialog-content').dialog('destroy').remove();
		});

		executeSharedTests(createInstance);

		it('debería de existir un div con el icono de Ok', function () {
			expect($('.ui-dialog>.ui-dialog-content > div.rup-message_icon-ok')).toExist();
		});


	});

	describe('Mostrar un mensaje de confirmación', function () {
		var callbacks = {
			fncOkFunction: function () {
				alert('asdasd');
			}
		};

		function createInstance() {
			$.rup_messages('msgConfirm', {
				message: '¿Está seguro que desea cancelar?',
				title: 'Confirmación',
				OKFunction: callbacks.fncOkFunction
			});

			return jQuery('.ui-dialog');
		}



		beforeEach(function () {
			spyOn(callbacks, 'fncOkFunction');
		});

		afterAll(function () {
			$('.ui-dialog>.ui-dialog-content').dialog('destroy').remove();
		});

		executeSharedTests(createInstance);

		it('debería de existir un div con el icono de confirmación', function () {
			expect($('.ui-dialog>.ui-dialog-content > div.rup-message_icon-confirm')).toExist();
		});

		it('debería de existir un enlace en la botonera que permita cancelar', function () {
			debugger;
			expect($('.ui-dialog > .ui-dialog-buttonset > button:contains('+
				jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_global.cancel')
			+')').length).toBe(1);
		});

		// FIXME
		// it("debería de ejecutarse el callback del botón de aceptar", function(){
		//
		//     //spyOn(callbacks, 'fncOkFunction');
		//     $(".ui-dialog .ui-dialog-buttonset button:visible").trigger("click");
		//     expect(callbacks.fncOkFunction).toHaveBeenCalled();
		// });


	});

}); */