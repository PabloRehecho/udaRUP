import 'jquery';
import 'jasmine-jquery';
import 'rup.datatable';
const dataUrl = 'http://localhost:8081/demo/datatable/remote'; // TODO: Crear contenido en remoto
const html ='   <form id="table_filter_form">\
<div id="exampleDatatable_filter_toolbar" class="formulario_legend"></div>\
                    <fieldset>\
                        <div class="form-group form-group-sm">\
                            <label for="name_filter_table">Id:</label>\
                            <input type="text" name="id" id="name_filter_table" />\
                        </div>\
                    </fieldset>\
                </form>\
                <table id="exampleDatatable" class="table table-striped table-bordered"\
                data-url-base="'+ dataUrl +'"\
                data-filter-form="#table_filter_form"\
                cellspacing="0" width="100%">\
                    <thead>\
                        <tr>\
                            <th data-col-prop="id">Id</th>\
                            <th data-col-prop="nombre">Nombre</th>\
                            <th data-col-prop="apellidos">Apellidos</th>\
                            <th data-col-prop="edad">Edad</th>\
                        </tr>\
                    </thead>\
                    <tfoot>\
                    <tr>\
                        <th>Id</th>\
                        <th>Nombre</th>\
                        <th>Apellidos</th>\
                        <th>Edad</th>\
                    </tr>\
                    </tfoot>\
                </table>';
const plugins = [
    {
        name:'multiselect',
        opts:{
            useplugins:['multiselection'],
            multiselect:{}
        }
    }
];

function testDatatable(plugin){
    describe('Test DataTable ' + plugin.name + ' > ', () => {
        var $datatable;
        beforeEach(() => {
            $('#content').append(html);
            $('#exampleDatatable').rup_datatable({
                fixedHeader: {
                    footer: false,
                    header: true
                },
                filter:{
                    filterToolbarId: 'exampleDatatable_filter_toolbar'
                }
            });
        });
        describe('Creacion > ', () => {});
        describe('Pruebas plugins > ',() => {});
    });
}