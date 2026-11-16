"use strict";

function iniciarGaleriaModulo() {
  window.lucide?.createIcons();

  const mosaico = document.getElementById("obra-mosaico");

  if (!mosaico || typeof NUEVO_MODULO === "undefined") return;

  const datos = NUEVO_MODULO.filter(
    (item) => item && typeof item.imagen === "string",
  );

  const abrir = document.getElementById("obra-abrir");
  const dialogo = document.getElementById("obra-dialogo");
  const cerrar = document.getElementById("obra-cerrar");
  const visor = document.getElementById("obra-visor");
  const leyenda = document.getElementById("obra-leyenda");
  const miniaturas = document.getElementById("obra-miniaturas");
  const anterior = document.getElementById("obra-anterior");
  const siguiente = document.getElementById("obra-siguiente");

  if (
    !abrir ||
    !dialogo ||
    !cerrar ||
    !visor ||
    !leyenda ||
    !miniaturas ||
    !anterior ||
    !siguiente
  )
    return;

  const movimientoReducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  let actual = 0;
  let solicitud = 0;
  let focoAnterior = null;
  let overflowAnterior = "";
  let animacion = null;
  let toque = null;

  const botonesMiniatura = [];

  function crear(etiqueta, clase, texto) {
    const elemento = document.createElement(etiqueta);
    elemento.className = clase;

    if (texto != null) elemento.textContent = texto;

    return elemento;
  }

  function titulo(indice) {
    return datos[indice].titulo || `Vista ${indice + 1}`;
  }

  function marcador(indice, error = false) {
    const elemento = crear("div", "obra-placeholder");

    elemento.append(
      crear(
        "span",
        "obra-placeholder-numero",
        String(indice + 1).padStart(2, "0"),
      ),
      crear(
        "small",
        "",
        error ? "Imagen no disponible" : "Espacio para fotografía",
      ),
    );

    return elemento;
  }

  function crearFoto(indice, ampliada = false) {
    const item = datos[indice];

    if (!item.imagen.trim()) return marcador(indice);

    const imagen = crear("img", "");

    imagen.alt = item.alt || titulo(indice);
    imagen.loading = ampliada ? "eager" : "lazy";
    imagen.decoding = "async";
    imagen.draggable = false;
    imagen.style.objectPosition = item.posicion || "center";

    // En el mosaico y las miniaturas, reemplaza las imágenes fallidas.
    if (!ampliada) {
      imagen.addEventListener(
        "error",
        () => imagen.replaceWith(marcador(indice, true)),
        { once: true },
      );
    }

    imagen.src = item.imagen;
    return imagen;
  }

  function actualizarControles() {
    leyenda.textContent =
      `${String(actual + 1).padStart(2, "0")} / ` +
      `${String(datos.length).padStart(2, "0")} · ${titulo(actual)}`;

    botonesMiniatura.forEach((boton, indice) => {
      boton.setAttribute("aria-pressed", String(indice === actual));
    });

    // Centra la miniatura activa sin desplazar la página.
    const activa = botonesMiniatura[actual];

    if (activa) {
      miniaturas.scrollTo({
        left:
          activa.offsetLeft -
          miniaturas.clientWidth / 2 +
          activa.offsetWidth / 2,
        behavior: movimientoReducido.matches ? "auto" : "smooth",
      });
    }
  }

  async function mostrar(indice, direccion = 0) {
    actual = (indice + datos.length) % datos.length;

    const indiceSolicitado = actual;
    const solicitudActual = ++solicitud;

    actualizarControles();

    visor.setAttribute("aria-busy", "true");
    visor.classList.add("esta-cargando");

    let contenido = crearFoto(indiceSolicitado, true);

    // Mantiene la foto anterior hasta que la siguiente esté lista.
    if (contenido instanceof HTMLImageElement) {
      try {
        await contenido.decode();
      } catch {
        contenido = marcador(indiceSolicitado, true);
      }
    }

    // Evita mostrar una imagen atrasada si se pulsa varias veces.
    if (solicitudActual !== solicitud || !dialogo.open) return;

    animacion?.cancel();
    visor.replaceChildren(contenido);
    visor.classList.remove("esta-cargando");
    visor.setAttribute("aria-busy", "false");

    if (!movimientoReducido.matches) {
      animacion = contenido.animate(
        [
          {
            opacity: 0,
            transform: `translateX(${direccion * 14}px)`,
          },
          {
            opacity: 1,
            transform: "translateX(0)",
          },
        ],
        {
          duration: 240,
          easing: "cubic-bezier(.2,.7,.2,1)",
          fill: "none",
        },
      );
    }
  }

  function abrirGaleria(indice) {
    if (dialogo.open) return;

    focoAnterior = document.activeElement;
    overflowAnterior = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    visor.replaceChildren();

    dialogo.showModal();
    cerrar.focus({ preventScroll: true });

    mostrar(indice);
  }

  function cambiar(paso) {
    if (datos.length > 1) mostrar(actual + paso, paso);
  }

  mosaico.replaceChildren();
  miniaturas.replaceChildren();

  if (!datos.length) {
    abrir.hidden = true;
    mosaico.append(
      crear("p", "", "Próximamente compartiremos las vistas del proyecto."),
    );
    return;
  }

  abrir.hidden = false;
  abrir.setAttribute("aria-haspopup", "dialog");
  abrir.setAttribute("aria-controls", "obra-dialogo");

  const flecha = crear("span", "", "→");
  flecha.setAttribute("aria-hidden", "true");

  abrir.replaceChildren(
    document.createTextNode(
      datos.length === 1
        ? "Ver fotografía "
        : `Ver las ${datos.length} vistas `,
    ),
    flecha,
  );

  datos.slice(0, 3).forEach((item, indice) => {
    const boton = crear("button", "obra-tarjeta");

    boton.type = "button";
    boton.setAttribute("aria-label", `Ampliar ${titulo(indice)}`);
    boton.setAttribute("aria-haspopup", "dialog");
    boton.setAttribute("aria-controls", "obra-dialogo");
    boton.append(crearFoto(indice));

    if (indice === 2 && datos.length > 3) {
      boton.append(
        crear("span", "obra-tarjeta-mas", `+${datos.length - 3} vistas`),
      );
    }

    boton.addEventListener("click", () => abrirGaleria(indice));
    mosaico.append(boton);
  });

  datos.forEach((item, indice) => {
    const boton = crear("button", "obra-miniatura");

    boton.type = "button";
    boton.title = titulo(indice);
    boton.setAttribute("aria-label", `Ver ${titulo(indice)}`);
    boton.setAttribute("aria-pressed", "false");
    boton.append(crearFoto(indice));

    boton.addEventListener("click", () => {
      if (indice !== actual) {
        mostrar(indice, indice > actual ? 1 : -1);
      }
    });

    botonesMiniatura.push(boton);
    miniaturas.append(boton);
  });

  anterior.disabled = datos.length < 2;
  siguiente.disabled = datos.length < 2;

  abrir.addEventListener("click", () => abrirGaleria(0));
  cerrar.addEventListener("click", () => dialogo.close());
  anterior.addEventListener("click", () => cambiar(-1));
  siguiente.addEventListener("click", () => cambiar(1));

  dialogo.addEventListener("keydown", (evento) => {
    if (evento.altKey || evento.ctrlKey || evento.metaKey) return;

    if (evento.key === "ArrowLeft" || evento.key === "ArrowRight") {
      evento.preventDefault();
      cambiar(evento.key === "ArrowRight" ? 1 : -1);
    }
  });

  // Escape cierra el <dialog> de forma nativa.
  dialogo.addEventListener("close", () => {
    ++solicitud;
    animacion?.cancel();

    visor.classList.remove("esta-cargando");
    visor.setAttribute("aria-busy", "false");

    document.body.style.overflow = overflowAnterior;
    focoAnterior?.focus({ preventScroll: true });
  });

  // Cierra únicamente al pulsar fuera del contenido del modal.
  dialogo.addEventListener("click", (evento) => {
    if (evento.target !== dialogo) return;

    const limite = dialogo.getBoundingClientRect();

    const fuera =
      evento.clientX < limite.left ||
      evento.clientX > limite.right ||
      evento.clientY < limite.top ||
      evento.clientY > limite.bottom;

    if (fuera) dialogo.close();
  });

  // Desliza sobre la foto para avanzar o retroceder en celular.
  visor.addEventListener(
    "touchstart",
    (evento) => {
      toque =
        evento.touches.length === 1
          ? {
              x: evento.touches[0].clientX,
              y: evento.touches[0].clientY,
            }
          : null;
    },
    { passive: true },
  );

  visor.addEventListener(
    "touchend",
    (evento) => {
      if (!toque) return;

      const dx = evento.changedTouches[0].clientX - toque.x;
      const dy = evento.changedTouches[0].clientY - toque.y;

      toque = null;

      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        cambiar(dx < 0 ? 1 : -1);
      }
    },
    { passive: true },
  );

  visor.addEventListener(
    "touchcancel",
    () => {
      toque = null;
    },
    { passive: true },
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarGaleriaModulo, {
    once: true,
  });
} else {
  iniciarGaleriaModulo();
}
