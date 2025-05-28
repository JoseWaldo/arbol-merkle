# ¿Qué es un Árbol de Merkle?

Un árbol de Merkle es una estructura de datos en forma de árbol binario utilizada para verificar y asegurar la integridad de grandes conjuntos de datos. Cada hoja del árbol contiene el hash de un bloque de datos, y cada nodo interno contiene el hash de la concatenación de los hashes de sus nodos hijos. El hash en la raíz del árbol, conocido como "Merkle root", representa de forma única todo el conjunto de datos.

Los árboles de Merkle son ampliamente utilizados en blockchain y sistemas distribuidos para verificar la integridad de los datos de manera eficiente y segura.

## Ventajas

- Permite verificar si un elemento pertenece al conjunto con solo una pequeña cantidad de información (prueba de inclusión).
- Eficiencia en la verificación y transmisión de datos.
- Seguridad criptográfica basada en funciones hash.

## Pseudocódigo para construir un Árbol de Merkle

```
function construirArbolMerkle(listaDeDatos):
    si listaDeDatos está vacía:
        retornar null

    nodos = []
    para cada dato en listaDeDatos:
        nodos.agregar(hash(dato))

    mientras longitud(nodos) > 1:
        nuevaLista = []
        para i desde 0 hasta longitud(nodos) - 1 con paso 2:
            si i + 1 < longitud(nodos):
                nuevoHash = hash(concatenar(nodos[i], nodos[i+1]))
            sino:
                nuevoHash = hash(concatenar(nodos[i], nodos[i])) // duplicar último nodo si es impar
            nuevaLista.agregar(nuevoHash)
        nodos = nuevaLista

    retornar nodos[0] // este es el Merkle root
```

## ¿Cómo ejecutar el código?

Este proyecto utiliza [Bun](https://bun.sh/) como manejador de paquetes y ejecutor de scripts, que soporta TypeScript de forma nativa.

1. Instala las dependencias (si es necesario):

   ```
   bun install
   ```

2. Ejecuta el archivo principal:

   ```
   bun run start
   ```

   O simplemente:

   ```
   bun index.ts
   ```

Esto ejecutará el código y mostrará en consola la construcción del árbol de Merkle y la raíz resultante.

## Referencias

- [Wikipedia: Árbol de Merkle](https://es.wikipedia.org/wiki/%C3%81rbol_de_Merkle)
- [Bitcoin Wiki: Merkle Trees](https://en.bitcoin.it/wiki/Merkle_trees)
