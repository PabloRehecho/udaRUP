# RUP jqTable - Filtrado

Gestiona las operaciones de filtrado de datos sobre el origen de datos que utiliza el componente.

![Imagen 1](img/rup.jqtable.filter_1.png)

# 1. Declaración y configuración

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor “filter”. La configuración del plugin se especifica en la propiedad filter.

```js
$("#idComponente").rup_jqtable({
  url: "../jqGridUsuario",
  usePlugins:["filter"],
  filter:{
  // Propiedades de configuración del plugin filter
  }
});
```
