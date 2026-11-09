# Sitio web del Colegio Don Bosco Central

## Ejecutar en Visual Studio Code

1. Descomprime el archivo ZIP y abre la carpeta `proyecto_don_bosco` en Visual Studio Code.
2. Instala la extensión Live Server si todavía no la tienes.
3. Haz clic derecho en `index.html` y selecciona **Open with Live Server**.
4. Navega por las páginas usando el encabezado. Para probar el diseño en dispositivos móviles, usa las herramientas de desarrollo del navegador.

Los archivos compartidos de `partials` se cargan mediante `fetch()`, por lo que abrir un HTML directamente con doble clic (`file://`) puede impedir su carga. Es necesario utilizar Live Server u otro servidor HTTP. Desde una terminal, otra opción es ejecutar `python -m http.server 8000` dentro de la carpeta y abrir `http://localhost:8000`.

## Activar los formularios

En `js/main.js`, cambia `FORM_EMAIL` por el correo oficial que la institución autorice para recibir solicitudes. Por ejemplo: `const FORM_EMAIL = 'secretaria@ejemplo.com';`. Ambos formularios envían por POST a FormSubmit. El servicio puede solicitar la activación del correo en el primer envío; confirma la recepción haciendo una prueba real con el colegio. Hasta configurar un correo válido, los formularios informan que no están habilitados y no simulan un envío exitoso. Revisa las políticas de privacidad y el tratamiento de los datos con el colegio antes de publicarlos.

## Completar información institucional

- Cambia `VIDEO_ID` en `js/main.js` por el identificador de 11 caracteres del video institucional de YouTube.
- Sustituye las fotografías de ejemplo, incluidas las imágenes remotas de Unsplash del CSS y las secciones de inicio, por fotografías autorizadas del colegio. Las fuentes Google Fonts y las imágenes remotas necesitan conexión a Internet.
- Revisa con Dirección los textos de ejemplo y completa el mensaje y foto del director, historia, horarios, requisitos, becas, ubicación, teléfono, correo, redes sociales, promociones y demás datos oficiales. Las actividades propuestas para vida espiritual y escolar también requieren confirmación.
- Se conserva el escudo incorporado en el archivo original en `assets/img/escudo.png`. Verifica con el colegio que sea la versión oficial autorizada.
- La sección de red salesiana requiere información histórica sobre Bolivia y fuentes institucionales verificadas.
- El portal de padres es informativo y está previsto para una etapa futura.

## Estructura

- `index.html` y las demás páginas: contenido de cada apartado.
- `partials/header.html` y `partials/footer.html`: encabezado y pie compartidos.
- `css/styles.css`: estilos originales y ajustes de navegación, móviles y desplazamiento.
- `js/main.js`: carga del encabezado y pie, menú móvil, scroll y configuración de formularios/video.
- `js/contenido.js`: arreglos editables con imágenes, descripciones y actividades.
- `js/componentes.js`: crea tarjetas, carruseles, galerías y modal con los arreglos.
- `css/carruseles.css`: estilos compartidos de los carruseles y sus galerías.
- `assets/img/escudo.png`: escudo extraído de la maqueta original.

## Editar fotografías, carruseles y actividades

Abre `js/contenido.js`. Allí encontrarás los arreglos comentados `VIDA_ESPIRITUAL`, `INSTALACIONES_INICIO`, `INFRAESTRUCTURA` y `VIDA_ESCOLAR`. Cada objeto corresponde a una diapositiva o tarjeta; el orden de los objetos define el orden en pantalla. Agrega objetos completos separados por comas y usa un `id` único sin espacios.

Para poner fotos propias, crea carpetas dentro de `assets/img`, copia tus archivos y escribe la ruta desde la raíz del sitio, por ejemplo: `assets/img/catequesis/encuentro.jpg`. El campo `imagen` controla la foto principal; en `galeria`, cada objeto tiene `src` y `alt`. También puedes añadir `leyenda` a una foto. Los arreglos de infraestructura y vida espiritual muestran las imágenes del grupo correspondiente; el carrusel de inicio no tiene galería. Las imágenes de ejemplo son remotas y no representan necesariamente al colegio.

En `VIDA_ESCOLAR`, `resumen` se muestra en la tarjeta y `descripcion` es el párrafo o glosa del modal; `imagen` y `alt` definen la fotografía. Los datos son propuestas de ejemplo que deben confirmarse. Para añadir un enlace nuevo en un menú, edita `partials/header.html` usando el mismo `id` del arreglo.

`js/componentes.js` crea los carruseles, galerías, tarjetas y el modal; `js/main.js` maneja el movimiento de los carruseles y el resto de funciones compartidas. El carrusel es manual y también admite el desplazamiento táctil. El mapa está basado en el enlace compartido; los enlaces de redes siguen pendientes de confirmación.
