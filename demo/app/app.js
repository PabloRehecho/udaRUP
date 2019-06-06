
import * as Marionette from 'marionette';
import MainView from 'shared/main/mainView';
import IndexView from 'pages/index/indexView';
import StyleGuideView from 'styleGuide/styleGuideView';
import Bt4StyleGuideView from 'styleGuide/bt4/styleGuideView';
import AutocompleteView from 'components/autocomplete/autocompleteView';
import FeedbackView from 'components/feedback/feedbackView';
import TooltipView from 'components/tooltip/tooltipView';
import MessageView from 'components/message/messageView';
import DialogView from 'components/dialog/dialogView';
import ProgressbarView from 'components/progressbar/progressbarView';
import ContextMenuView from 'components/contextMenu/contextMenuView';
import ButtonView from 'components/button/buttonView';
import ToolbarView from 'components/toolbar/toolbarView';
import DateView from 'components/date/dateView';
import FormView from 'components/form/formView';
import TimeView from 'components/time/timeView';
import AccordionView from 'components/accordion/accordionView';
import SliderView from 'components/slider/sliderView';
import SpinnerView from 'components/spinner/spinnerView';
import UploadView from 'components/upload/uploadView';
import ValidateView from 'components/validate/validateView';
import ChartView from 'components/chart/chartView';
import TreeView from 'components/tree/examples/treeView';
import TreeDragDropView from 'components/tree/dragDrop/treeDragDropView';
import TabsStaticView from 'components/tabs/tabsStaticView';
import WizardSimpleView from 'components/wizard/simple/wizardSimpleView';
import WizardDynamicView from 'components/wizard/dynamic/wizardDynamicView';
import ComboSimpleView from 'components/combo/comboSimple/comboSimpleView';
import TableView from 'table/tableView';
import JqtableFilterView from 'jqtable/jqtableFilterView';
import StackedHorizontalView from 'responsiveGrid/stackedHorizontal/stackedHorizontalView';
import MobileDesktopView from 'responsiveGrid/mobileDesktop/mobileDesktopView';
import MobileTabletDesktopView from 'responsiveGrid/mobileTabletDesktop/mobileTabletDesktopView';
// import DashboardView from 'dashboard/dashboardView';
import CalendarView from 'components/calendar/calendarView';

var RupResponsiveDemoApp = new Marionette.Application();

var MyRouter = Marionette.AppRouter.extend({
	appRoutes: {
		'' : 'index',
		'styleGuide' : 'styleGuide',
		'bt4StyleGuide' : 'bt4StyleGuide',
		'autocomplete' : 'autocomplete',
		'feedback' : 'feedback',
		'tooltip' : 'tooltip',
		'message' : 'message',
		'dialog' : 'dialog',
		'progressbar' : 'progressbar',
		'contextMenu' : 'contextMenu',
		'button' : 'button',
		'toolbar' : 'toolbar',
		'date' : 'date',
		'form' : 'form',
		'time' : 'time',
		'accordion' : 'accordion',
		'slider' : 'slider',
		'spinner' : 'spinner',
		'upload' : 'upload',
		'validate' : 'validate',
		'chart' : 'chart',
		'treeExamples' : 'treeExamples',
		'treeDragDrop' : 'treeDragDrop',
		'tabsStatic' : 'tabsStatic',
		'wizardSimple' : 'wizardSimple',
		'wizardDynamic' : 'wizardDynamic',
		'comboSimple' : 'comboSimple',
		'tableFilter': 'tableFilter',
		'jqtableFilter' : 'jqtableFilter',
		'stackedHorizontal': 'stackedHorizontal',
		'mobileDesktop': 'mobileDesktop',
		'mobileTabletDesktop': 'mobileTabletDesktop',
		// 'mobileTabletDesktop': 'mobileTabletDesktop',
		// 'dashboard': 'dashboard',
		'calendar': 'calendar'
	}
});

var RouteController = Marionette.Controller.extend({
	index: function() {
		RupResponsiveDemoApp.mainView.Container.show(new IndexView());
	},
	styleGuide: function() {
		RupResponsiveDemoApp.mainView.Container.show(new StyleGuideView());
	},
	bt4StyleGuide: function() {
		RupResponsiveDemoApp.mainView.Container.show(new Bt4StyleGuideView());
	},
	autocomplete: function() {
		RupResponsiveDemoApp.mainView.Container.show(new AutocompleteView());
	},
	feedback: function() {
		RupResponsiveDemoApp.mainView.Container.show(new FeedbackView());
	},
	tooltip: function() {
		RupResponsiveDemoApp.mainView.Container.show(new TooltipView());
	},
	button: function(){
		RupResponsiveDemoApp.mainView.Container.show(new ButtonView());
	},
	toolbar: function(){
		RupResponsiveDemoApp.mainView.Container.show(new ToolbarView());
	},
	date: function(){
		RupResponsiveDemoApp.mainView.Container.show(new DateView());
	},
	form: function(){
		RupResponsiveDemoApp.mainView.Container.show(new FormView());
	},
	time: function(){
		RupResponsiveDemoApp.mainView.Container.show(new TimeView());
	},
	message: function(){
		RupResponsiveDemoApp.mainView.Container.show(new MessageView());
	},
	dialog: function(){
		RupResponsiveDemoApp.mainView.Container.show(new DialogView());
	},
	progressbar: function(){
		RupResponsiveDemoApp.mainView.Container.show(new ProgressbarView());
	},
	contextMenu: function(){
		RupResponsiveDemoApp.mainView.Container.show(new ContextMenuView());
	},
	accordion: function(){
		RupResponsiveDemoApp.mainView.Container.show(new AccordionView());
	},
	slider: function(){
		RupResponsiveDemoApp.mainView.Container.show(new SliderView());
	},
	spinner: function(){
		RupResponsiveDemoApp.mainView.Container.show(new SpinnerView());
	},
	upload: function(){
		RupResponsiveDemoApp.mainView.Container.show(new UploadView());
	},
	validate: function(){
		RupResponsiveDemoApp.mainView.Container.show(new ValidateView());
	},
	chart: function(){
		RupResponsiveDemoApp.mainView.Container.show(new ChartView());
	},
	treeExamples: function(){
		RupResponsiveDemoApp.mainView.Container.show(new TreeView());
	},
	treeDragDrop: function(){
		RupResponsiveDemoApp.mainView.Container.show(new TreeDragDropView());
	},
	spinner: function(){
		RupResponsiveDemoApp.mainView.Container.show(new SpinnerView());
	},
	tabsStatic: function(){
		RupResponsiveDemoApp.mainView.Container.show(new TabsStaticView());
	},
	wizardSimple: function(){
		RupResponsiveDemoApp.mainView.Container.show(new WizardSimpleView());
	},
	wizardDynamic: function(){
		RupResponsiveDemoApp.mainView.Container.show(new WizardDynamicView());
	},
	comboSimple: function(){
		RupResponsiveDemoApp.mainView.Container.show(new ComboSimpleView());
	},
	tableFilter: function(){
		RupResponsiveDemoApp.mainView.Container.show(new TableFilterView());
	},
	jqtableFilter: function(){
		RupResponsiveDemoApp.mainView.Container.show(new JqtableFilterView());
	},
	stackedHorizontal: function(){
		RupResponsiveDemoApp.mainView.Container.show(new StackedHorizontalView());
	},
	mobileDesktop: function(){

		RupResponsiveDemoApp.mainView.Container.show(new MobileDesktopView());
	},
	mobileTabletDesktop: function(){
		RupResponsiveDemoApp.mainView.Container.show(new MobileTabletDesktopView());
	},
	// dashboard: function(){
	// 	jQuery(RupResponsiveDemoApp.mainView.Container.el).addClass('dashboard-content');
	// 	RupResponsiveDemoApp.mainView.Container.show(new DashboardView());
	// },
	calendar: function () {
		RupResponsiveDemoApp.mainView.Container.show(new CalendarView());
	}
});




RupResponsiveDemoApp.on('start', function(){
	RupResponsiveDemoApp.Controller = new RouteController();

	RupResponsiveDemoApp.router = new MyRouter({
		controller: RupResponsiveDemoApp.Controller
	});
	Backbone.history.start();
});


RupResponsiveDemoApp.mainView = new MainView();
RupResponsiveDemoApp.mainView.render();


export {RupResponsiveDemoApp};
