import 'jquery'
import 'jasmine-jquery'
import 'rup.tooltip'

describe('TEST Tooltip', () => {
    var $tooltip;
    beforeAll(() => {
        var html = '<div class="input-group">'
                +       '<input id="inputExample" name="inputExample" type="text" class="form-control">'
                +           '<span class="input-group-btn">'
                +               '<button id="exampleTooltip" class="btn btn-secondary" type="button">'
                +                   '<i class="fa fa-question-circle" aria-hidden="true"></i>'
                +               '</button>'
                +           '</span>'
                +   '</div>';

        $('body').append(html);
        let props = {
            content: {
                text: "Texto Prueba"
            },
            position: {
                my: 'top center',
                at: 'bottom center',
                target: $("#inputExample")
            },
            show: {
                event: 'click'
            }
        };
        $('#exampleTooltip').rup_tooltip(props);
        $tooltip = $('#exampleTooltip');
    });
    describe('Creación', () => {
        beforeAll(() => {
            $tooltip.rup_tooltip('open');
        });
        afterAll(() => {
            $tooltip.rup_tooltip('close');
        });
        it('Debe existir el elemento con clase .qtip', () => {
            //Se crea un .qtip
            expect($('.qtip').length).toBeGreaterThan(0);
        });
    });
    describe('Métodos públicos', () => {
        describe('Método open', () => {
            beforeAll(() => {
                $tooltip.rup_tooltip('open');
            });
            it('Debe ser visible', () => {
                expect($('.qtip').css('display')).toBe('block');
            });
        });
        describe('Método close', () => {
            beforeAll(() => {
                $tooltip.rup_tooltip('close');
            });
            it('No debe ser visible', () => {
                expect($('.qtip').is(':visible')).toBeFalsy();
            });
        });
        describe('Método option', () => {

            afterAll(() => {
                $tooltip.rup_tooltip('optioon', 'show', {modal:false});
            });
            it('Debe recibir los valores correctamente', () => {
                expect($tooltip.rup_tooltip('option', 'content').text).toBe('Texto Prueba');
            });
            it('Debe actualizar las propiedades', () => {
                $tooltip.rup_tooltip('optioon', 'show', {modal:true});
                expect($tooltip.rup_tooltip('option', 'show').modal).toBeTruthy();
            });
        });
        describe('Método disable', () => {
            beforeAll(() => {
              if($tooltip.is(':disabled')){
                  $tooltip.enable();
              }
              $tooltip.rup_tooltip('disable');
            });
            it('Debe poder deshabilitarse', () => {
              expect($tooltip.hasClass('qtip-disabled')).toBeTruthy();
            });
        });
        describe('Método enable', () => {
            beforeAll(() => {
              if($tooltip.is(':enabled')){
                  $tooltip.disable();
              }
              $tooltip.rup_tooltip('enable');
            });
            it('Debe poder habilitarse', () => {
              expect($tooltip).not.toBeDisabled();
            });
        });
        describe('Método destroy', () => {
            beforeAll(() => {
                $tooltip.rup_tooltip('destroy');
                $tooltip.rup_tooltip('open');
            });
            it('No debe existir', () => {
                expect($('.qtip').css('display')).toBe('none');
            });
        });
    });
});
