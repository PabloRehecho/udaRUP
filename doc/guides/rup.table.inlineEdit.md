# RUP Table - Edici�n en l�nea

Permite la edici�n de los registros de la tabla utilizando un formulario dentro de la tabla. El formulario se muestra
dentro de una fila y ofrece las siguientes funcionalidades:

* A�adir un nuevo registro o modificar uno ya existente.
* Cancelar la inserci�n o edici�n de un registro.
* Navegar entre los registros mostrados en la tabla para permitir operar de manera mas �gil sobre los diferentes elementos.

![Imagen 1](img/edicionEnLinea.png)

# 1. Declaraci�n y configuraci�n

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor inlineEdit. La configuraci�n del plugin se especifica en la propiedad inlineEdit.

```js
$("#idComponente").rup_table({
    inlineEdit: {
        // Propiedades de configuraci�n del plugin inlineEdit
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
            },
            messages: {
                required: 'Campo requerido'
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

A�adir validaciones sobre los campos:
```js
inlineEdit: {
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
        },
        messages: {
            required: 'Campo requerido'
        }
    }
}
```

Habilitar la personalizaci�n de una funci�n a la hora de cancelar, cuando se va a borrar los registros de la tabla:
```js
inlineEdit: {
    cancelDeleteFunction: function () {
        console.log('Ha cancelado la acci�n de eliminar.');
    }
}
```

Permitir habilitar o deshabilitar los di�logos de confirmaci�n:
```js
inlineEdit: {
    confirmDialogs: {
        saveDialog: false,
        cancelDialog: true,
        deleteDialog: true
    }
}
```