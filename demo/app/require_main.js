requirejs.config({
	baseUrl: './app',
	//    map: {
	//        "*": {
	//            "typeahead": '../src/core/typeahead!../../bower_components/typeahead.js/dist/typeahead.jquery'
	//        }
	//    },
	packages: [
		{
			name: 'rup',
			location: '../../build/src/',
			main: 'rup.base'
		},
		{
			name: 'bootstrap',
			location: '../../node_modules/bootstrap/js/dist',
			main: 'util'
		},
		{
			name: 'jquery.ui.widget',
			location: '../../node_modules/jquery-ui/ui/',
			main: 'widget'
		}
		// {
		//     name: 'jquery-ui',
		//     location: "../../node_modules/jquery-ui/ui",
		//      main: 'widget'
		// }
	],
	paths: {
		'jquery': '../../node_modules/jquery/dist/jquery',
		'jquery-migrate': '../../node_modules/jquery-migrate/dist/jquery-migrate',
		'jquery-ui': '../../node_modules/jquery-ui-dist/jquery-ui',
		'backbone': '../../node_modules/backbone/backbone',
		'bootstrap': '../../node_modules/bootstrap/dist/js/bootstrap.min',
		'bt4': '../../dist/js/externals/bootstrap/bt4.min',
		'underscore': '../../node_modules/underscore/underscore',
		'handlebars': '../../node_modules/handlebars/dist/handlebars',
		'handlebars-i18n': '../js/handlebars-helper-i18n',
		'marionette': '../../node_modules/backbone.marionette/lib/backbone.marionette',
		'chartjs': '../../node_modules/chart.js/dist/Chart',
		'qtip2': '../../node_modules/qtip2/dist/jquery.qtip',
		'jquery.fileDownload': '../../src/core/utils/jquery.fileDownload',
		'tether': '../../node_modules/tether/dist/js/tether',
		'popper': '../../node_modules/popper.js/dist/umd/popper.min',
		'rcarousel': '../../src/core/jquery.ui.rcarousel',

		//"highlight": "../../node_modules/highlight.js/lib/highlight",
		'highlight': '../js/highlight.pack',
		'templates': '../templates',
		'block-ui': '../../node_modules/block-ui/jquery.blockUI',
		'jquery-contextMenu': '../../node_modules/jquery-contextmenu/dist/jquery.contextMenu',
		'jquery.form': '../../node_modules/jquery-form/jquery.form',
		'jquery.validate': '../../node_modules/jquery-validation/dist/jquery.validate',
		'jquery.validate.additional': '../../node_modules/jquery-validation/dist/additional-methods',
		'jquery.scrollTo': '../../node_modules/jquery.scrollto/jquery.scrollTo',

		'jquery.fileupload': '../../node_modules/blueimp-file-upload/js/jquery.fileupload',
		'jquery.fileupload-ui': '../../node_modules/blueimp-file-upload/js/jquery.fileupload-ui',
		'jquery.fileupload-jquery-ui': '../../node_modules/blueimp-file-upload/js/jquery.fileupload-jquery-ui',
		'jquery.fileupload-process': '../../node_modules/blueimp-file-upload/js/jquery.fileupload-process',
		'jquery.fileupload-image': '../../node_modules/blueimp-file-upload/js/jquery.fileupload-image',
		'jquery.fileupload-audio': '../../node_modules/blueimp-file-upload/js/jquery.fileupload-audio',
		'jquery.fileupload-video': '../../node_modules/blueimp-file-upload/js/jquery.fileupload-video',
		'jquery.fileupload-validate': '../../node_modules/blueimp-file-upload/js/jquery.fileupload-validate',
		'jquery.xdr-transport': '../../node_modules/blueimp-file-upload/js/cors/jquery.xdr-transport',
		'jquery.ui.widget': '../../node_modules/jquery-ui/ui/widget',
		'tmpl': '../../node_modules/blueimp-tmpl/js/tmpl',
		'load-image': '../../node_modules/blueimp-load-image/js/load-image',
		'load-image-meta': '../../node_modules/blueimp-load-image/js/load-image-meta',
		'load-image-exif': '../../node_modules/blueimp-load-image/js/load-image-exif',
		'canvas-to-blob': '../../node_modules/blueimp-canvas-to-blob/js/canvas-to-blob',


		// menuDeps
		// "jquery-1.7": "../../src/core/jquery-1.7.2",
		'jquery.ui.autocomplete': '../../src/core/ui/jquery.ui.autocomplete',
		//"jquery.ui.selectmenu": "../../src/core/ui/jquery.ui.selectmenu",
		//"jquery.multiselect": "../../src/core/ui/jquery.multiselect",
		'jquery-json': '../../src/core/utils/jquery.json-2.2',
		'jquery-ui-timepicker': '../../src/core/ui/jquery-ui.timepicker',
		'jquery-ui-multidatespicker': '../../src/core/ui/jquery-ui.multidatespicker',

		'form2object': '../../src/core/utils/form2object',
		'gridstack': '../../node_modules/gridstack/dist/gridstack',
		'lodash': '../../node_modules/lodash/lodash',
		'jquery-jstree': '../../src/core/utils/jquery.jstree',
		'jquery-hotkeys': '../../src/core/utils/jquery.hotkeys',


		'datatables.net': '../../node_modules/datatables.net/js/jquery.dataTables',
		'datatables.net-bs': '../../node_modules/datatables.net-bs/js/dataTables.bootstrap'




	},
	shim: {
		'free-jqgrid': {
			'deps': ['jquery'],
			'exports': 'jQuery'
		},
		'jquery-ui': {
			'deps': ['jquery', 'jquery-migrate'],
		},
		'compatibility': {
			'deps': ['base'],
		},
		'bootstrap': {
			'deps': ['jquery', 'tether', 'popper.js']
		},
		'bt3': {
			'deps': ['jquery']
		},
		'bt4': {
			'deps': ['jquery', 'tether']
		},
		'handlebars-i18n': {
			'deps': ['handlebars']
		},
		'templates': {
			'deps': ['handlebars-i18n']

		},
		'jquery-json': {
			'deps': ['jquery']
		},
		'jquery-ui-multidatespicker': {
			'deps': ['jquery-ui']
		},
		'jquery-ui-timepicker': {
			'deps': ['jquery-ui']
		},
		'jquery.fileupload': {
			'deps': ['jquery-ui']
		},
		'jquery.fileupload-ui': {
			'deps': ['jquery.fileupload']
		},
		'jquery.xdr-transport': {
			'deps': ['jquery.fileupload']
		}
	},
	map: {
		'*': {
			'jquery-ui/mouse': 'jquery-ui',
			'jquery-ui/draggable': 'jquery-ui',
			'jquery-ui/data': 'jquery-ui',
			'jquery-ui/disable-selection': 'jquery-ui',
			'jquery-ui/focusable': 'jquery-ui',
			'jquery-ui/form': 'jquery-ui',
			'jquery-ui/ie': 'jquery-ui',
			'jquery-ui/keycode': 'jquery-ui',
			'jquery-ui/labels': 'jquery-ui',
			'jquery-ui/jquery-1-7': 'jquery-ui',
			'jquery-ui/plugin': 'jquery-ui',
			'jquery-ui/safe-active-element': 'jquery-ui',
			'jquery-ui/safe-blur': 'jquery-ui',
			'jquery-ui/scroll-parent': 'jquery-ui',
			'jquery-ui/tabbable': 'jquery-ui',
			'jquery-ui/unique-id': 'jquery-ui',
			'jquery-ui/version': 'jquery-ui',
			'jquery-ui/widget': 'jquery-ui',
			'jquery-ui/widgets/mouse': 'jquery-ui',
			'jquery-ui/widgets/draggable': 'jquery-ui',
			'jquery-ui/widgets/droppable': 'jquery-ui',
			'jquery-ui/widgets/resizable': 'jquery-ui'
			// And so on for all different cases...
		}
	}
	//    ,
	//    map: {
	//We map calls to marionette to use our own "augment" module
	//we also map backbone.wreqr calls to use the Radio module.
	//        '*': {
	//             'marionette': 'marionette.radio',
	//             'backbone.wreqr': 'backbone_radio'
	//         },
	//         //For our "augment" module, we want the real Marionette
	//         'marionette.radio' : {
	//            'marionette': 'marionette'
	//         }
	//    }
});

// require(["app"], function(Escritorio){
//     Escritorio.start();
// });
