import * as crypto from "crypto";

/**
 * Imprime una lista de hashes de manera ordenada y legible.
 * @param lista Lista de hashes.
 * @param titulo Título o descripción del nivel.
 */
function imprimirLista(lista: string[], titulo: string) {
  console.log(`${titulo}:`);
  lista.forEach((hash, i) => {
    console.log(`  [${i + 1}]: ${hash}`);
  });
  console.log(""); // Línea en blanco para separar niveles
}

/**
 * Calcula el hash SHA-256 de una cadena de texto.
 * @param data Cadena a hashear.
 * @returns Hash en formato hexadecimal.
 */
function hash(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

/**
 * Construye un árbol de Merkle a partir de una lista de datos y muestra cada nivel.
 * @param leaves Lista de datos (hojas) como strings.
 * @returns Raíz del árbol de Merkle (Merkle root).
 */
function construirArbolMerkle(leaves: string[]): string | null {
  if (leaves.length === 0) return null;

  // Crear los hashes de las hojas
  let nivelActual = leaves.map(hash);

  imprimirLista(nivelActual, "Nivel 0");

  let nivel = 1;
  // Iterar hasta obtener la raíz
  while (nivelActual.length > 1) {
    // Crear el siguiente nivel combinando los hashes
    const siguienteNivel: string[] = [];
    for (let i = 0; i < nivelActual.length; i += 2) {
      // Si hay un número impar de nodos, duplicar el último
      const izquierda = nivelActual[i];
      const derecha =
        i + 1 < nivelActual.length ? nivelActual[i + 1] : izquierda;
      console.log(`Combinando: ${izquierda} y ${derecha}`);
      console.log("");

      const hashPadre = hash(izquierda + derecha);
      siguienteNivel.push(hashPadre);
    }
    nivelActual = siguienteNivel;
    imprimirLista(nivelActual, `Nivel ${nivel}`);
    nivel++;
  }

  // El único elemento restante es la raíz de Merkle
  return nivelActual[0];
}

// Ejemplo de uso:
const datos = ["a", "b", "c", "d", "e", "f", "g"];
const merkleRoot = construirArbolMerkle(datos);

console.log(`Raíz del árbol de Merkle: ${merkleRoot}`);
