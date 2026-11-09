/* ============================================================
   CONTENIDO EDITABLE DEL SITIO
   Edita los arreglos de este archivo. Las imágenes actuales son
   referenciales: sustitúyelas por fotografías autorizadas.

   Para usar fotos propias: guarda la foto en assets/img/ y cambia
   "src" o "imagen" por, por ejemplo, "assets/img/catequesis/01.jpg".
   Agrega o elimina objetos completos, manteniendo las comas.
   "id" debe ser único y no llevar espacios (se usa en los enlaces).
   ============================================================ */

// VIDA ESPIRITUAL: una diapositiva por objeto y sus fotos en "galeria".
// La galería cambia automáticamente al cambiar la diapositiva.
const VIDA_ESPIRITUAL = [
  {
    id: "catequesis",
    titulo: "Catequesis",
    imagen:
      "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial 1 de Encuentros de formaciÃ³n",
      },
      {
        src: "https://images.unsplash.com/photo-1771765812031-22653b4c70a6?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial 2 de Encuentros de formaciÃ³n",
      },
      {
        src: "https://images.unsplash.com/photo-1702569802639-9b90f3c21f98?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial 3 de Encuentros de formaciÃ³n",
      },
    ],
  },
  {
    id: "primera-comunion",
    titulo: "Primera Comunión",
    imagen:
      "https://images.unsplash.com/photo-1771765812031-22653b4c70a6?auto=format&fit=crop&w=1200&q=70",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1771765812031-22653b4c70a6?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial 1 de PreparaciÃ³n",
      },
      {
        src: "https://images.unsplash.com/photo-1702569802639-9b90f3c21f98?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial 2 de PreparaciÃ³n",
      },
      {
        src: "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial 3 de PreparaciÃ³n",
      },
    ],
  },
  {
    id: "bautismo",
    titulo: "Bautismo",
    imagen:
      "https://images.unsplash.com/photo-1702569802639-9b90f3c21f98?auto=format&fit=crop&w=1200&q=70",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1702569802639-9b90f3c21f98?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial 1 de PreparaciÃ³n",
      },
      {
        src: "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial 2 de PreparaciÃ³n",
      },
      {
        src: "https://images.unsplash.com/photo-1771765812031-22653b4c70a6?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial 3 de PreparaciÃ³n",
      },
    ],
  },
  {
    id: "pastoral-familiar",
    titulo: "Convivencia con padres de familia",
    imagen:
      "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial 1 de Encuentro de familias",
      },
      {
        src: "https://images.unsplash.com/photo-1771765812031-22653b4c70a6?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial 2 de Encuentro de familias",
      },
      {
        src: "https://images.unsplash.com/photo-1702569802639-9b90f3c21f98?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial 3 de Encuentro de familias",
      },
    ],
  },
  {
    id: "pastoral-juvenil",
    titulo: "Pastoral juvenil",
    imagen:
      "https://images.unsplash.com/photo-1771765812031-22653b4c70a6?auto=format&fit=crop&w=1200&q=70",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1771765812031-22653b4c70a6?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial 1 de Encuentros juveniles",
      },
      {
        src: "https://images.unsplash.com/photo-1702569802639-9b90f3c21f98?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial 2 de Encuentros juveniles",
      },
      {
        src: "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial 3 de Encuentros juveniles",
      },
    ],
  },
];

// INICIO: diapositivas de instalaciones. No tienen galería inferior.
const INSTALACIONES_INICIO = [
  {
    id: "aulas",
    titulo: "Aulas y laboratorios",
    imagen:
      "https://images.unsplash.com/photo-1771765812031-22653b4c70a6?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "biblioteca",
    titulo: "Biblioteca",
    imagen:
      "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "canchas",
    titulo: "Canchas y deportes",
    imagen:
      "https://images.unsplash.com/photo-1702569802639-9b90f3c21f98?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "patios",
    titulo: "Patios de recreación",
    imagen:
      "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
  },
];

// NUESTRO COLEGIO: cada instalación tiene diapositiva y galería propias.
const INFRAESTRUCTURA = [
  {
    id: "infra-aulas",
    titulo: "Aulas y laboratorios",
    imagen:
      "https://images.unsplash.com/photo-1771765812031-22653b4c70a6?auto=format&fit=crop&w=1200&q=70",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1771765812031-22653b4c70a6?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial: Aulas y laboratorios",
      },
      {
        src: "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial adicional: Aulas y laboratorios",
      },
    ],
  },
  {
    id: "infra-biblioteca",
    titulo: "Biblioteca",
    imagen:
      "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial: Biblioteca",
      },
      {
        src: "https://images.unsplash.com/photo-1702569802639-9b90f3c21f98?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial adicional: Biblioteca",
      },
    ],
  },
  {
    id: "infra-canchas",
    titulo: "Canchas y deportes",
    imagen:
      "https://images.unsplash.com/photo-1702569802639-9b90f3c21f98?auto=format&fit=crop&w=1200&q=70",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1702569802639-9b90f3c21f98?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial: Canchas y deportes",
      },
      {
        src: "https://images.unsplash.com/photo-1771765812031-22653b4c70a6?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial adicional: Canchas y deportes",
      },
    ],
  },
  {
    id: "infra-patios",
    titulo: "Patios de recreación",
    imagen:
      "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
    galeria: [
      {
        src: "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial: Patios de recreación",
      },
      {
        src: "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
        alt: "Imagen referencial adicional: Patios de recreación",
      },
    ],
  },
];

// VIDA ESCOLAR: cada objeto crea una tarjeta y su ventana de detalle.
// "resumen" se ve en la tarjeta; "descripcion" aparece en el modal.
// Los textos y fotografías son ejemplos y deben confirmarse con el colegio.
const VIDA_ESCOLAR = [
  {
    id: "deportes",
    titulo: "Deportes",
    resumen:
      "La actividad física, el compañerismo y el juego limpio fortalecen la convivencia.",
    descripcion:
      "En los espacios deportivos, cada estudiante puede descubrir habilidades y aprender a trabajar en equipo.",
    imagen:
      "https://images.unsplash.com/photo-1771765812031-22653b4c70a6?auto=format&fit=crop&w=1200&q=70",
    alt: "Imagen referencial de Deportes",
  },
  {
    id: "arte",
    titulo: "Arte",
    resumen:
      "La creatividad encuentra su espacio a través de distintas expresiones artísticas.",
    descripcion:
      "La pintura, el dibujo y otras expresiones invitan a imaginar, crear y compartir.",
    imagen:
      "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
    alt: "Imagen referencial de Arte",
  },
  {
    id: "cultura",
    titulo: "Cultura",
    resumen: "Celebramos la diversidad y las expresiones de nuestra comunidad.",
    descripcion:
      "Las actividades culturales permiten conocer tradiciones y compartir experiencias.",
    imagen:
      "https://images.unsplash.com/photo-1702569802639-9b90f3c21f98?auto=format&fit=crop&w=1200&q=70",
    alt: "Imagen referencial de Cultura",
  },
  {
    id: "banda",
    titulo: "Banda de música",
    resumen: "La música une a la comunidad y fomenta la disciplina.",
    descripcion:
      "La banda es un espacio para desarrollar habilidades musicales y participar en la vida escolar.",
    imagen:
      "https://images.unsplash.com/photo-1771765812031-22653b4c70a6?auto=format&fit=crop&w=1200&q=70",
    alt: "Imagen referencial de Banda de música",
  },
  {
    id: "danza",
    titulo: "Danza y expresión corporal",
    resumen:
      "El movimiento y la música permiten expresar identidad y creatividad.",
    descripcion:
      "La danza promueve la coordinación, la expresión y el trabajo en equipo.",
    imagen:
      "https://images.unsplash.com/photo-1682795773426-f4e2e3e93288?auto=format&fit=crop&w=1200&q=70",
    alt: "Imagen referencial de Danza y expresión corporal",
  },
  {
    id: "talleres",
    titulo: "Talleres",
    resumen: "Espacios para explorar intereses y desarrollar habilidades.",
    descripcion:
      "Los talleres permiten aprender haciendo, con curiosidad y colaboración.",
    imagen:
      "https://images.unsplash.com/photo-1702569802639-9b90f3c21f98?auto=format&fit=crop&w=1200&q=70",
    alt: "Imagen referencial de Talleres",
  },
];
