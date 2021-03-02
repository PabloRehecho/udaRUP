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

Habilitar la personalizaci�n de una funci�n a la hora de cancelar, cuando se va a borrar los registros de la tabla:
```js
formEdit: {
    cancelDeleteFunction: function () {
        console.log('Ha cancelado la acci�n de eliminar.');
    }
}
```

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

Donde destacan 3 elementos:

PATH ->	Es donde se colocar� el array y seguido un punto, despu�s del punto ser� el atributo name, en el caso del ejemplo checkeado.

DATA-LISTA-> Es el nombre de la entidad para mapearlo en el controller, en nuestro caso la entidad se llama 'lugares'.

DATA-CLAVE-> Es la clave de la entidad, en caso de ser una lista de objetos, en nuestro ejemplo la clave primaria es 'buzones', no se 
admitir�n claves con m�ltiples pks y en caso de ser una lista de String, este par�metro no hay que ponerlo.

DATA-VALOR-> Es donde se recoge el valor del identificador, la clave primaria.