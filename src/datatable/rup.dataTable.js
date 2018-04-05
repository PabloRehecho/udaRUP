/*!
 * Copyright 2014 E.J.I.E., S.A.
 *
 * Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);
 * Solo podrá usarse esta obra si se respeta la Licencia.
 * Puede obtenerse una copia de la Licencia en
 *
 *      http://ec.europa.eu/idabc/eupl.html
 *
 * Salvo cuando lo exija la legislación aplicable o se acuerde por escrito,
 * el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,
 * SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
 * Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
 * que establece la Licencia.
 */

/*global define */
/*global jQuery */

( function( factory ) {
	if ( typeof define === 'function' && define.amd ) {

		// AMD. Register as an anonymous module.
		define( ['jquery','./dataTable.request','datatables.net-bs4','datatables.net-responsive-bs4','./dataTable.multiselect','./dataTable.buttons','./dataTable.editForm','./dataTable.seeker', './addons/dataTable.buttons.custom'], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} ( function( $ , DataTableRequest) {

	//****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//****************************************************************************************************************

	var DataTable = $.fn.dataTable;
	var rup_dataTable = {};

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_dataTable', rup_dataTable));

	//*******************************
	// DEFINICIÓN DE MÉTODOS RUP
	//*******************************
	$.fn.rup_dataTable('extend',{
		getRupValue: function() {
			return null;
		},
		setRupValue: function(value) {

		}
	});

	//*******************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//*******************************
	$.fn.rup_dataTable('extend',{
		foo: function() {
			return this;
		}
	});

	//*******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************

	$.fn.rup_dataTable('extend',{

		/**
			* Inicializa ciertas opciones del componente
			* @name _initOptions
			* @function
			* @private
			* @param {object} options Opciones del componente
		*/
		_initOptions: function(options) {
			var $self = this;


			options.processing = true;
			options.serverSide = true;
			options.columns = options.columns || $self._getColumns(options);


			//filter

			// options.filterForm = $self.attr('data-filter-form');
			options.$filterForm = $(options.filterForm);

			options.$filterButton = options.$filterForm.find('button');
			options.$clearButton = options.$filterForm.find('.rup-enlaceCancelar');
			options.$filterButton.on('click', function(){ $self._doFilter(options);});
			options.$clearButton.on('click', function(){$self._clearFilter(options);});




			// Urls
			var baseUrl = options.urlBase;
			options.urls = {
				base : baseUrl,
				filter : baseUrl + '/filter'
			};

			options.ajax = this._ajaxOptions(options);

			options.language = {
				'url': $.rup.RUP + '/resources/dataTable_' + $.rup.lang + '.json'
			};




			return options;
		},

		/**
			* Obtiene las columnas
			* @name _getColumns
			* @function
			* @private
			* @param {object} options Opciones del componente
		*/
		_getColumns(options) {
			if(options.columnDefs !== undefined && options.columnDefs[0].className !== undefined && options.columnDefs[0].className === 'select-checkbox'){
				//Se crear el th thead, se añade la columnal.
				$self = this;
				var th = $("<th/>").attr('data-col-prop','');

				if($self[0].tHead !== null){
					$(th).insertBefore($self[0].tHead.rows[0].cells[0])
				}
				//se crea el th tfoot
				if($self[0].tFoot !== null){
					$('<th/>').insertBefore($self[0].tFoot.rows[0].cells[0])
				}
				//Se aseguro que no sea orderable
				options.columnDefs[0].orderable = false;
			}

			var columns = this.find('th[data-col-prop]').map((i, e) => {
				return {
					data: e.getAttribute('data-col-prop'),sidx:e.getAttribute('data-col-sidx')
				};
			});

			return columns;
		},

		/**
			* Filtrado
			* @name _doFilter
			* @function
			* @private
			* @param {object} options Opciones del componente
		*/
		_doFilter(options) {
			var $self = this;

			// $self.DataTable().settings().ajax.filter = form2object(options.$filterForm);
			$self.DataTable().ajax.reload();

		},

		/**
			* Prepara el objeto necesario para la consulta de registros al servidor
			* @name _ajaxOptions
			* @function
			* @private
			* @param {object} options Opciones del componente
		*/
		_ajaxOptions(options) {
			var ajaxData = {
				'url': options.urls.filter,
				'dataSrc': this._ajaxSuccessData,
				'type': 'POST',
				'data': this._ajaxRequestData,
				'contentType': 'application/json',
				'dataType': 'json'

			};


			return ajaxData;
		},

		/**
			* Obtiene los datos devueltos por el servidor de manera ordenada
			* @name _ajaxSuccessData
			* @function
			* @private
			* @param {object} json Información de los registros de la página actual
		*/
		_ajaxSuccessData(json) {
			var ret = {};

			json.recordsTotal = json.records;
			json.recordsFiltered = json.records;

			ret.recordsTotal = json.records;
			ret.recordsFiltered = json.records;
			ret.data = json.rows;
			DataTable.Api().multiSelect.reorderDataFromServer(json);

			return ret.data;

		},

		/**
			* Solicita los datos al servidor
			* @name _ajaxRequestData
			* @function
			* @private
			* @param {object} data Opciones del datatable
			* @param {object} options Opciones del componente
		*/
		_ajaxRequestData(data, options) {
			//PAra añadir un id de busqueda distinto al value, como por ejemplo la fecha.
			data.columns[data.order[0].column].colSidx = options.aoColumns[data.order[0].column].colSidx;
			//el data viene del padre:Jqueru.datatable y como no tiene el prefijo de busqueda se añade.
			data.filter = form2object($(options.nTable).data('settings').$filterForm[0]);
			data.multiselection = undefined;
			if(DataTable.multiSelect.multiselection !== undefined && DataTable.multiSelect.multiselection.selectedIds.length > 0){
				data.multiselection = DataTable.multiSelect.multiselection;
			}
			var datatableRequest = new DataTableRequest(data);
			var json = $.extend({}, data, datatableRequest.getData());
			options.aBaseJson = json;
			return JSON.stringify(json);


		},

		/**
			* Gestiona la paginación
			* @name _createSearchPaginator
			* @function
			* @private
			* @param {object} tabla Objeto que contiene la tabla
			* @param {object} settingsT Opciones del componente
		*/
		_createSearchPaginator(tabla,settingsT){
			//buscar la paginación.
			if($($self.selector+'_paginate').length === 1){
				var liSearch = $('<li/>').addClass('paginate_button page-item pageSearch searchPaginator');
				var textPagina = jQuery.rup.i18nTemplate(settingsT.oLanguage, 'pagina',settingsT.json.total);
				var toPagina = jQuery.rup.i18nTemplate(settingsT.oLanguage, 'toPagina',settingsT.json.total);
				var input = $('<input/>').attr({type: "text", size: "3",value:settingsT.json.page,maxlength:"3"})
							.addClass('ui-pg-input')
				liSearch.append(textPagina);
				liSearch.append(input);
				liSearch.append(toPagina);
				$($self.selector+'_paginate ul').prepend(liSearch);
				input.keypress(function (e) {
					 if(e.which === 13)  // the enter key code
					  {
						 var page = parseInt(this.value);
						 if($.isNumeric(page) && page > 0){
							 tabla.dataTable().fnPageChange( page-1 );
						 }
					    return false;
					  }
					});
			}else{
				//Sacar un error
			}

		},

		/**
			* Limpia el filtro
			* @name _clearFilter
			* @function
			* @private
			* @param {object} options Opciones del componente
		*/
		_clearFilter(options) {
			var $self = this;

			options.$filterForm.resetForm();
			$self.DataTable().ajax.reload();

		}
	});

	//*******************************
	// MÉTODO DE INICIALIZACION
	//*******************************
	$.fn.rup_dataTable('extend', {
		_init : function(args){
			var $self = this,
				settings = $.extend({}, $.fn.rup_dataTable.defaults, $self[0].dataset, args[0]);

			// Se identifica el tipo de componente RUP mediante el valor en el atributo ruptype
			$self.attr('ruptype', 'dataTable');

			$self._initOptions(settings);

			var tabla = $self.DataTable(settings);
			if(settings.searchPaginator){
				tabla.on( 'draw', function (e,settingsTable) {
					$self._createSearchPaginator($(this),settingsTable);
					//Si el seeker esta vacio ocultarlo
					if(DataTable.seeker !== undefined && DataTable.seeker.search !== undefined && DataTable.seeker.search.$searchRow !== undefined){
						if(settingsTable._iRecordsDisplay > 0){
							DataTable.seeker.search.$searchRow.show();
						}else{
							DataTable.seeker.search.$searchRow.hide();
						}
					}
				  });
			}

			// Se almacena el objeto settings para facilitar su acceso desde los métodos del componente.
			$self.data('settings', settings);

		}
	});

	//******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//******************************************************
	$.fn.rup_dataTable.defaults = {
		foobar: false,
		headerContextMenu: {
			show: true,
			selectAllPage: true,
			deselectAllPage: true,
			separator: true,
			selectAll: true,
			deselectAll: true,
			items: {}
		},
	    fixedHeader: {
	        header: false,
	        footer: true
	    },
		feedback:{
			okFeedbackConfig:{
				closeLink: true,
				delay:1000
			}
		},
    dom: 'Bitprl',
    multiplePkToken: '~',
    primaryKey:["id"],
	responsive: true,
    searchPaginator:true,
		buttons: [
        {
						text: function (dt) {
							return dt.i18n( 'toolbar.add', 'Add' );
						},
						id: 'addButton_1',
						className: 'datatable_toolbar_btnAdd',
						displayRegex: /^\d+$/, // Se muestra siempre que sea un numero positivo o neutro
						insideContextMenu: true,
						type: 'add',
						action: function (e, dt, node, config) {
							DataTable.Api().buttons.actions(dt, config);
            }
        },
				{
						text: function (dt) {
							return dt.i18n( 'toolbar.edit', 'Editar' );
						},
						id: 'editButton_1',
						className: 'datatable_toolbar_btnEdit',
						displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
						insideContextMenu: true,
						type: 'edit',
						action: function (e, dt, node, config) {
							DataTable.Api().buttons.actions(dt, config);
            }
        },
				{
						text: function (dt) {
							return dt.i18n( 'toolbar.clone', 'Clonar' );
						},
						id: 'cloneButton_1',
						className: 'datatable_toolbar_btnClone',
						displayRegex: /^1$/, // Se muestra solo cuando sea igual a 1
						insideContextMenu: true,
						type: 'clone',
						action: function (e, dt, node, config) {
							DataTable.Api().buttons.actions(dt, config);
            }
        },
				{
						text: function (dt) {
							return dt.i18n( 'toolbar.delete', 'Eliminar' );
						},
						id: 'deleteButton_1',
						className: 'datatable_toolbar_btnDelete',
						displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
						insideContextMenu: true,
						type: 'delete',
						action: function (e, dt, node, config) {
							DataTable.Api().buttons.actions(dt, config);
            }
        },
				{
						extend: 'collection',
						text: function (dt) {
							return dt.i18n( 'toolbar.reports.main', 'Informes' );
						},
						id: 'informes_01',
						className: 'align-right',
						displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
						autoClose: true,
						type: 'reports',
						buttons: [
							'copyCustom'
						]
				}
    ],
		formEdit:{//Revisar si se mete en el plugin
      detailForm: "#table_detail_div",
    }
	};

}));
