'use strict';

/* Componentes visuales compartidos.
   Edita los datos de imágenes y textos en js/contenido.js, no aquí. */

// Crea un elemento y añade texto de forma segura, sin interpretar etiquetas HTML.
function crearElemento(tipo, clase, texto) {
  const elemento = document.createElement(tipo);
  if (clase) elemento.className = clase;
  if (texto != null) elemento.textContent = texto;
  return elemento;
}

// Construye un carrusel y, opcionalmente, una galería por diapositiva.
function crearCarrusel(idContenedor, datos, opciones) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;
  if (!Array.isArray(datos) || datos.length === 0) {
    contenedor.append(crearElemento('p', 'contenido-vacio', 'Próximamente compartiremos fotografías.'));
    return;
  }
  const slider = crearElemento('div', 'spirit-slider');
  slider.setAttribute('role', 'region');
  slider.setAttribute('aria-roledescription', 'carrusel');
  slider.setAttribute('aria-label', opciones.titulo);
  const track = crearElemento('div', 'spirit-track');
  track.tabIndex = 0;
  const controles = crearElemento('div', 'spirit-controls');
  const anterior = crearElemento('button', '', '←');
  anterior.type = 'button'; anterior.dataset.slide = 'prev'; anterior.setAttribute('aria-label', 'Anterior: ' + opciones.titulo);
  const contador = crearElemento('p', 'spirit-counter');
  contador.setAttribute('aria-live', 'polite');
  const siguiente = crearElemento('button', '', '→');
  siguiente.type = 'button'; siguiente.dataset.slide = 'next'; siguiente.setAttribute('aria-label', 'Siguiente: ' + opciones.titulo);
  controles.append(anterior, contador, siguiente);

  // Cada entrada genera una diapositiva y su grupo de fotografías.
  const galeria = crearElemento('div', 'spirit-gallery');
  const grupos = crearElemento('div', 'spirit-gallery-stack');
  datos.forEach((item, indice) => {
    const diapositiva = crearElemento('article', 'spirit-slide');
    if (item.id) diapositiva.id = item.id;
    diapositiva.dataset.index = String(indice);
    diapositiva.setAttribute('aria-label', `${indice + 1} de ${datos.length}`);
    if (item.imagen) diapositiva.style.setProperty('--slide-image', `url(${JSON.stringify(item.imagen)})`);
    const informacion = crearElemento('div', 'spirit-info');
    informacion.append(crearElemento('span', '', `${opciones.etiqueta} · ${String(indice + 1).padStart(2, '0')}`));
    informacion.append(crearElemento('h2', '', item.titulo || 'Sin título'));
    if (item.descripcion) informacion.append(crearElemento('p', '', item.descripcion));
    diapositiva.append(informacion); track.append(diapositiva);

    if (!opciones.galeria) return;
    const grupo = crearElemento('div', 'spirit-gallery-group' + (indice === 0 ? ' is-active' : ''));
    grupo.dataset.gallery = String(indice);
    grupo.setAttribute('aria-hidden', String(indice !== 0));
    grupo.append(crearElemento('h4', '', item.titulo || 'Galería'));
    const cuadricula = crearElemento('div', 'spirit-gallery-grid');
    const fotos = Array.isArray(item.galeria) ? item.galeria : [];
    fotos.forEach(foto => {
      const figura = crearElemento('figure');
      const imagen = crearElemento('img');
      imagen.src = foto.src; imagen.alt = foto.alt || item.titulo || 'Fotografía'; imagen.loading = 'lazy';
      figura.append(imagen);
      if (foto.leyenda) figura.append(crearElemento('figcaption', '', foto.leyenda));
      cuadricula.append(figura);
    });
    if (!fotos.length) cuadricula.append(crearElemento('p', 'contenido-vacio', 'Próximamente compartiremos fotografías.'));
    grupo.append(cuadricula); grupos.append(grupo);
  });
  slider.append(track, controles);
  if (opciones.galeria) {
    galeria.append(crearElemento('h3', '', 'Galería'), grupos);
    slider.append(galeria);
  }
  contenedor.replaceChildren(slider);
}

// Un carrusel para vida espiritual, uno de inicio y otro para infraestructura.
crearCarrusel('carrusel-espiritual', VIDA_ESPIRITUAL, {titulo: 'Vida espiritual', etiqueta: 'VIDA ESPIRITUAL', galeria: true});
crearCarrusel('carrusel-instalaciones', INSTALACIONES_INICIO, {titulo: 'Nuestras instalaciones', etiqueta: 'INSTALACIONES', galeria: false});
crearCarrusel('carrusel-infraestructura', INFRAESTRUCTURA, {titulo: 'Infraestructura', etiqueta: 'INFRAESTRUCTURA', galeria: true});

// Genera las tarjetas de vida escolar y usa un único diálogo para todas.
function crearActividadesEscolares() {
  const lista = document.getElementById('actividades-escolares');
  const modal = document.getElementById('modal-actividad');
  if (!lista || !modal) return;
  const imagen = modal.querySelector('.school-dialog-image');
  const titulo = document.getElementById('modal-titulo');
  const descripcion = document.getElementById('modal-descripcion');
  const cerrar = modal.querySelector('.school-dialog-close');
  let ultimaTarjeta = null;

  VIDA_ESCOLAR.forEach(item => {
    const boton = crearElemento('button', 'school-card');
    boton.type = 'button';
    if (item.id) boton.id = item.id;
    if (item.imagen) boton.style.setProperty('--school-image', `url(${JSON.stringify(item.imagen)})`);
    boton.setAttribute('aria-haspopup', 'dialog');
    boton.setAttribute('aria-label', `Conocer ${item.titulo}`);
    const texto = crearElemento('div');
    texto.append(crearElemento('span', '', 'VIDA ESCOLAR'), crearElemento('h2', '', item.titulo), crearElemento('p', '', item.resumen));
    boton.append(texto);
    boton.addEventListener('click', () => {
      ultimaTarjeta = boton;
      titulo.textContent = item.titulo;
      descripcion.textContent = item.descripcion;
      imagen.src = item.imagen || '';
      imagen.alt = item.alt || item.titulo;
      modal.showModal();
    });
    lista.append(boton);
  });
  cerrar.addEventListener('click', () => modal.close());
  // Cerrar al pulsar en el fondo exterior; Escape funciona mediante <dialog>.
  modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
  modal.addEventListener('close', () => { if (ultimaTarjeta) ultimaTarjeta.focus(); });
}
crearActividadesEscolares();
