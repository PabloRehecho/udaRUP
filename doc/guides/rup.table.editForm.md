# RUP Table - Edici�n en formulario

Permite la edici�n de los registros de la tabla utilizando un formulario de detalle. El formulario se muestra
dentro de un di�logo y ofrece las siguientes funcionalidades:

* A�adir un nuevo registro o modificar uno ya existente.
* Cancelar la inserci�n o edici�n de un registro.
* Navegar entre los registros mostrados en la tabla para permitir operar de manera mas �gil sobre los diferentes elementos.

![Imagen 1](img/rup.table.formEdit_1.png)

# 1. Declaraci�n y configuraci�n

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor formEdit. La configuraci�n del plugin se especifica en la propiedad formEdit.

```js
$("#idComponente").rup_table({
    formEdit: {
        // Propiedades de configuraci�n del plugin formEdit
        detailForm: '#example_detail_div',
        validate: {
            rules: {
                'nombre': {
                    required: true
                },
                'apellido1': {
                    required: true
                },
                'fechaAlta': {
                    required: true
                },
                'fechaBaja': {
                    date: true
                }
            }
        },
        cancelDeleteFunction: function () {
            console.log('Ha cancelado la acci�n de eliminar.');
        },
        confirmDialogs: {
            saveDialog: false,
            cancelDialog: true,
            deleteDialog: true
        }
    }
});
```
### Propiedades de configuraci�n

Identificador del formulario de edici�n:
```js
formEdit: {
    detailForm: '#example_detail_div'
}
```
&nbsp;

Endpoint que devolver� el formulario de edici�n en aquellos casos en los que se haya activado su dinamismo (m�s informaci�n sobre su activaci�n [aqu�](./rup.table.md#95-propiedades-adicionales)):
```js
formEdit: {
    // El valor por defecto es './editForm' aunque puede variar dependiendo del campo urlBase
    url: './editFormDouble'
}
```
Cabe decir que para que estos formularios funcionen correctamente, hay que llevar a cabo algunas modificaciones en las JSPs de edici�n. Los cambios a realizar ser�an los siguientes:
* Ponerle el identificador **XXX_detail_form_container** al elemento **div** que contiene la clase **dialog-content-material**. Cabe decir que las tres equises hay que sustituirlas por el identificador de la tabla, por ejemplo, en una tabla con identificador *example*, el identificador a usar en el *div* ser�a *example_detail_form_container*. Esto ser�a un ejemplo real: 
    ```html
        <!-- Formulario de detalle -->
        <div id="example_detail_div" class="rup-table-formEdit-detail d-none">
        	<!-- Barra de navegaci�n del detalle -->
        	<div id ="example_detail_navigation" class="row no-gutters"></div>
        	<!-- Separador -->
        	<hr class="m-1">
        	<div id="example_detail_form_container" class="dialog-content-material">
        		<!-- El Formulario ser� insertado mediante JavaScript a partir de la JSP tableEditForm -->
        	</div>
        	<!-- Botonera del formulario de detalle -->
        	<div class="rup-table-buttonpanel-material">
        		<div class="text-right">
        			<!-- Bot�n cancelar -->
        			<button id="example_detail_button_cancel" type="button">
        				<spring:message code="cancel" />
        			</button>
        			<!-- Bot�n guardar -->
        			<button id="example_detail_button_save" type="button">
        				<spring:message code="save" />
        			</button>
        			<!-- Bot�n guardar y continuar -->
        			<button id="example_detail_button_save_repeat" type="button">
        				<spring:message code="saveAndContinue" />
        			</button>
        		</div>
        	</div>
        </div>
    ```
* Una nueva JSP que contenga �nicamente el formulario a usar pero que genere un *action* de manera din�mica en base al *method* recibido desde la capa de cliente (puede usarse cualquier otra l�gica). La siguiente JSP puede ayudar a entender lo anteriormente descrito:
    ```html
        <!-- Formulario -->
        <c:set value="${actionType == 'POST' ? 'add': 'edit'}" var="endpoint" />
        <spring:url value="/table/${endpoint}" var="url"/>
        <form:form modelAttribute="usuario" id="example_detail_form" action="${url}">
        	<!-- Feedback del formulario de detalle -->
        	<div id ="example_detail_feedback"></div>	
        	<div class="form-row">
        		<!-- Campos del formulario de detalle -->
        		<c:if test="${endpoint == 'edit'}">
        			<form:input path="id" id="id_detail_table" type="hidden" />
        		</c:if>
        		<div class="form-groupMaterial col-sm">
        	    	<form:input path="nombre" id="nombre_detail_table" />
        	    	<label for="nombre_detail_table"><spring:message code="nombre" /></label>
        	    </div>       
        	    <div class="form-groupMaterial col-sm">
        	    	<form:input path="apellido1" id="apellido1_detail_table" />
        	    	<label for="apellido1_detail_table"><spring:message code="apellido1" /></label>
        	    </div>
        	</div>
        	<div class="form-row">
        	    <div class="form-groupMaterial col-sm">
        	    	<form:input path="apellido2" id="apellido2_detail_table" />
        	    	<label for="apellido2_detail_table"><spring:message code="apellido2" /></label>
        	    </div>       
        	    <div class="form-groupMaterial col-sm">
        	    	<form:input path="fechaBaja" id="fechaBaja_detail_table" />
        	    	<label for="fechaBaja_detail_table"><spring:message code="fechaBaja" /></label>
        	    </div>
        	</div>
        	<div class="form-row">
        	    <div class="form-groupMaterial col-sm">
        	    	<form:input path="fechaAlta" id="fechaAlta_detail_table" />
        	    	<label for="fechaAlta_detail_table"><spring:message code="fechaAlta" /></label>
        	    </div>
        	    <div class="checkbox-material col-sm">
        	    	<form:checkbox path="ejie" id="ejie_detail_table" value="1" />
        	    	<label for="ejie_detail_table"><spring:message code="ejie" /></label>
        	    </div>
        	</div>
        	<div class="form-row">
        	    <div class="form-groupMaterial col-sm">
        	    	<form:input path="rol" id="rol_detail_table" />
        	    	<label for="rol_detail_table"><spring:message code="rol" /></label>
        	    </div>
        	</div>
        </form:form>
    ```
&nbsp;

A�adir validaciones sobre los campos:
```js
formEdit: {
    validate: {
        rules: {
            'nombre': {
                required: true
            },
            'apellido1': {
                required: true
            },
            'fechaAlta': {
                required: true
            },
            'fechaBaja': {
                date: true
            }
        }
    }
}
```
&nbsp;

Habilitar la personalizaci�n de una funci�n a la hora de cancelar, cuando se va a borrar los registros de la tabla:
```js
formEdit: {
    cancelDeleteFunction: function () {
        console.log('Ha cancelado la acci�n de eliminar.');
    }
}
```
&nbsp;

Permitir habilitar o deshabilitar los di�logos de confirmaci�n:
```js
formEdit: {
    confirmDialogs: {
        saveDialog: false,
        cancelDialog: true,
        deleteDialog: true
    }
}
```
&nbsp;

Se ha creado tambi�n la posibilidad de tener listas de checkbox, din�micas y deben tener la siguiente estructura:
```xml
<c:forEach items="${usuario.lugares}" var="lugarapli" varStatus="status" >
    <div class="form-row">      
        <div class="checkbox-material col-sm">
            <form:checkbox path="lugares[${status.index}].checkeado" id="checkeado${status.index}_lugares" value="1" data-lista="lugares" data-clave="buzones" data-valor="${lugarapli.id}" />
            <label for="checkeado${status.index}_lugares">${lugarapli.email}</label>
         </div>
    </div>
</c:forEach>
```		
Destacan cuatro elementos:
1. PATH: es donde se colocar� el array y seguido un punto, despu�s del punto ser� el atributo name, en el caso del ejemplo checkeado.
2. DATA-LISTA: nombre de la entidad para mapearlo en el controller, en nuestro caso la entidad se llama 'lugares'.
3. DATA-CLAVE: clave de la entidad, en caso de ser una lista de objetos, en nuestro ejemplo la clave primaria es 'buzones', no se admitir�n claves con m�ltiples pks y en caso de ser una lista de String, este par�metro no hay que ponerlo.
4. DATA-VALOR: recoge el valor del identificador, la clave primaria.

# 2. Aspectos a tener en cuenta
Siempre que se vaya a a�adir un campo de tipo "hidden" en el formulario para su env�o al servidor, es necesario especificarlo con un identificador (id), de lo contrario, el serializador entender� que es un campo de gesti�n interna y lo ignorar� por ser el comportamiento esperado para este tipo de campos.

Tambi�n se ha de tener en cuenta que el formulario que contiene el di�logo de editForm se carga din�micamente cuando se pulsa sobre los botones de a�adir, editar o clonar (se queda cacheado cuando se repiten las acciones consecutivamente). Para inicializar los componentes de formulario de UDA como el autocomplete, combo o date, hay que hacerlo mediante el colModel de tal manera que UDA pueda encargarse de reinicializar los componentes siempre que sea necesario. Para m�s informaci�n sobre c�mo crear el colModel, leer el documento [rup.table](https://github.com/UDA-EJIE/udaRUP/blob/master/doc/guides/rup.table.md).