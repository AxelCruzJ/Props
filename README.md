# Mis propinas

PWA local para registrar propinas. No usa cuentas, servidor ni base de datos: los registros se guardan en el almacenamiento local del navegador del teléfono.

## Cómo usarla en el teléfono

1. Sube la carpeta `propinas-pwa` a un hosting estático con HTTPS, por ejemplo Netlify Drop o GitHub Pages. No necesitas configurar un backend.
2. Abre la dirección resultante en Chrome (Android) o Safari (iPhone).
3. En Android: menú del navegador → **Instalar aplicación** o **Añadir a pantalla de inicio**. En iPhone: **Compartir** → **Añadir a pantalla de inicio**.
4. Abre la app instalada y registra una cuenta. Puedes cambiar entre `%` y `$` antes de guardar.

## Regla de cálculo

- Caja: 5% del total de la cuenta, siempre.
- Propina neta: propina recibida − caja.
- Ejemplo: cuenta de $1,000 y propina de 10% → $100 recibidos, $50 para caja y $50 netos.

## Privacidad y respaldo

Los datos no salen del dispositivo, pero también significa que borrar los datos del navegador o cambiar de teléfono puede eliminarlos. La versión inicial no tiene sincronización en la nube para mantenerla privada y sin cuentas.
