# RUP Table - Búsqueda

Permite al usuario realizar una búqueda entre el conjunto de resultados que se le muestran. Mediante una serie de criterios de búsqueda permite al usuario posicionarse entre los diferentes registros que se ajustan a dichos criterios.

![Imagen 1](img/rup.table.search_1.png)

## 1. Declaración y configuración

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor seeker. La configuración del plugin se especifica en la propiedad seeker.

```js
$("#idComponente").rup_table({
  seeker:{
    // Propiedades de configuración del plugin seeker
  }
});
```
