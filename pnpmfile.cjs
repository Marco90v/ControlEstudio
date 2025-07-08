/** pnpmfile.cjs */
/**
 * Puedes usar este archivo para:
 * - sobrescribir versiones con resolutions
 * - aplicar parches locales
 * - modificar peerDependencies
 */
module.exports = {
  hooks: {
    readPackage(pkg) {
      // Forzar versiones consistentes
      if (pkg.dependencies?.["react"]) {
        pkg.dependencies["react"] = "^19.1.0"
      }
      if (pkg.dependencies?.["react-dom"]) {
        pkg.dependencies["react-dom"] = "^19.1.0"
      }

      // Ejemplo: Forzar tailwindcss y vite a mantenerse alineados
      if (pkg.devDependencies?.["vite"]) {
        pkg.devDependencies["vite"] = "^6.3.5"
      }

      return pkg
    },
  },
}
