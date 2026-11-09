// ========================================================
// PROYECTO: MI BILLETERA DIGITAL - CONTROL DE GASTOS
// UNIVERSIDAD TÉCNICA DE MANABÍ - DESARROLLO BASADO EN PLATAFORMAS
// CÓDIGO JAVASCRIPT NATIVO - ESTÁNDARES W3C Y WCAG 2.2
// ========================================================

// 1. INFORMACIÓN Y CATEGORÍAS PREDEFINIDAS
const INFO_CATEGORIAS = {
  "Otros": {
    icono: "🤑",
    descripcion: "Pagos sin motivo asignado"
  },
  "Comida": {
    icono: "🍔",
    descripcion: "Restaurantes, alimentos y súper"
  },
  "Servicios": {
    icono: "💡",
    descripcion: "Luz, agua, internet, suscripciones"
  },
  "Salud": {
    icono: "💊",
    descripcion: "Farmacia, citas y bienestar"
  },
  "Entretenimiento": {
    icono: "🎮",
    descripcion: "Cine, juegos y salidas"
  },
  "Transporte": {
    icono: "🚗",
    descripcion: "Gasolina, pasajes y viajes"
  }
};

// 2. GESTIÓN DE ALMACENAMIENTO (LOCALSTORAGE NATIVO)
function obtenerTransacciones() {
  try {
    const datos = localStorage.getItem("billetera_transacciones");
    return datos ? JSON.parse(datos) : [];
  } catch (error) {
    return [];
  }
}

function guardarTransacciones(lista) {
  try {
    localStorage.setItem("billetera_transacciones", JSON.stringify(lista));
  } catch (error) {
    // Manejo seguro si el almacenamiento está restringido
  }
}

// Cargar la lista actual en memoria
let transacciones = obtenerTransacciones();

// 3. FUNCIONES DE CÁLCULO DE TOTALES (BANCO Y EFECTIVO)
function calcularTotales() {
  let ingresosBanco = 0;
  let gastosBanco = 0;
  let ingresosEfectivo = 0;
  let gastosEfectivo = 0;

  transacciones.forEach(function (item) {
    if (item.cuenta === "banco") {
      if (item.tipo === "ingreso") ingresosBanco += item.monto;
      else gastosBanco += item.monto;
    } else {
      if (item.tipo === "ingreso") ingresosEfectivo += item.monto;
      else gastosEfectivo += item.monto;
    }
  });

  const saldoBanco = ingresosBanco - gastosBanco;
  const saldoEfectivo = ingresosEfectivo - gastosEfectivo;
  const balanceTotal = saldoBanco + saldoEfectivo;
  const totalIngresos = ingresosBanco + ingresosEfectivo;
  const totalGastos = gastosBanco + gastosEfectivo;

  return {
    saldoBanco: saldoBanco,
    saldoEfectivo: saldoEfectivo,
    balanceTotal: balanceTotal,
    totalIngresos: totalIngresos,
    totalGastos: totalGastos
  };
}

// 4. LÓGICA DE LA VISTA: INICIO (index.html)
function inicializarPaginaInicio() {
  const elBalanceTotal = document.getElementById("balance-total");
  const elSaldoBanco = document.getElementById("saldo-banco");
  const elSaldoEfectivo = document.getElementById("saldo-efectivo");
  const elTotalIngresos = document.getElementById("total-ingresos");
  const elTotalGastos = document.getElementById("total-gastos");

  if (!elBalanceTotal) return; // No estamos en index.html

  const totales = calcularTotales();

  elBalanceTotal.textContent = `$${totales.balanceTotal.toFixed(2)}`;
  elSaldoBanco.textContent = `$${totales.saldoBanco.toFixed(2)}`;
  elSaldoEfectivo.textContent = `$${totales.saldoEfectivo.toFixed(2)}`;

  if (elTotalIngresos) {
    elTotalIngresos.textContent = `📈 +$${totales.totalIngresos.toFixed(2)}`;
  }
  if (elTotalGastos) {
    elTotalGastos.textContent = `📉 -$${totales.totalGastos.toFixed(2)}`;
  }
}

// 5. LÓGICA DE LA VISTA: REGISTRAR MOVIMIENTO (registrar_movimiento.html)
function inicializarPaginaRegistrar() {
  const formulario = document.getElementById("formulario-transaccion");
  if (!formulario) return; // No estamos en registrar_movimiento.html

  const selectTipo = document.getElementById("tipo");
  const selectCuenta = document.getElementById("cuenta");
  const selectCategoria = document.getElementById("categoria");
  const grupoCategoria = document.getElementById("grupo-categoria");
  const inputMonto = document.getElementById("monto");
  const inputFecha = document.getElementById("fecha");
  const inputDescripcion = document.getElementById("descripcion");
  const alertaExito = document.getElementById("alerta-exito");
  const alertaError = document.getElementById("alerta-error");
  const errorMonto = document.getElementById("error-monto");
  const errorFecha = document.getElementById("error-fecha");

  // Colocar fecha actual por defecto (YYYY-MM-DD)
  const hoyStr = new Date().toISOString().split("T")[0];
  if (inputFecha) inputFecha.value = hoyStr;

  // Manejo de evento change: ocultar categoría si es ingreso
  selectTipo.addEventListener("change", function () {
    if (selectTipo.value === "ingreso") {
      grupoCategoria.style.display = "none";
    } else {
      grupoCategoria.style.display = "flex";
    }
  });

  // Limpiar mensajes de error en input
  inputMonto.addEventListener("input", function () {
    inputMonto.classList.remove("campo-error");
    inputMonto.removeAttribute("aria-invalid");
    if (errorMonto) errorMonto.style.display = "none";
    if (alertaError) alertaError.style.display = "none";
  });

  inputFecha.addEventListener("input", function () {
    inputFecha.classList.remove("campo-error");
    inputFecha.removeAttribute("aria-invalid");
    if (errorFecha) errorFecha.style.display = "none";
    if (alertaError) alertaError.style.display = "none";
  });

  // Manejo de evento submit con validación accesible (WCAG 3.3.1 y 3.3.2)
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let tieneErrores = false;
    const monto = parseFloat(inputMonto.value);
    const fecha = inputFecha.value;

    // Validación del monto
    if (isNaN(monto) || monto <= 0) {
      inputMonto.classList.add("campo-error");
      inputMonto.setAttribute("aria-invalid", "true");
      if (errorMonto) errorMonto.style.display = "block";
      tieneErrores = true;
    }

    // Validación de la fecha
    if (!fecha) {
      inputFecha.classList.add("campo-error");
      inputFecha.setAttribute("aria-invalid", "true");
      if (errorFecha) errorFecha.style.display = "block";
      tieneErrores = true;
    }

    if (tieneErrores) {
      if (alertaError) alertaError.style.display = "block";
      if (alertaExito) alertaExito.style.display = "none";
      return;
    }

    // Si todo es válido:
    const tipo = selectTipo.value;
    const cuenta = selectCuenta.value;
    const categoria = tipo === "gasto" ? selectCategoria.value : "Ingreso";
    const descripcion = inputDescripcion.value.trim();

    const nuevaTransaccion = {
      tipo: tipo,
      cuenta: cuenta,
      categoria: categoria,
      descripcion: descripcion || (tipo === "ingreso" ? "Ingreso" : categoria),
      monto: monto,
      fecha: fecha
    };

    transacciones.unshift(nuevaTransaccion);
    guardarTransacciones(transacciones);

    // Notificación de éxito accesible
    if (alertaError) alertaError.style.display = "none";
    if (alertaExito) {
      alertaExito.style.display = "block";
      setTimeout(function () {
        alertaExito.style.display = "none";
      }, 4000);
    }

    // Resetear formulario
    inputMonto.value = "";
    inputDescripcion.value = "";
    inputFecha.value = hoyStr;
    inputMonto.focus();
  });
}

// 6. LÓGICA DE LA VISTA: MIS GASTOS (mis_gastos.html)
function fechaDentroDePeriodo(fechaStr, filtro) {
  const fechaItem = new Date(fechaStr + "T00:00:00");
  const ahora = new Date();
  const diferenciaDias = (ahora - fechaItem) / (1000 * 60 * 60 * 24);

  if (filtro === "semana") {
    return diferenciaDias >= 0 && diferenciaDias <= 7;
  } else if (filtro === "mes") {
    return diferenciaDias >= 0 && diferenciaDias <= 30;
  } else if (filtro === "6meses") {
    return diferenciaDias >= 0 && diferenciaDias <= 180;
  } else if (filtro === "ano") {
    return fechaItem.getFullYear() === ahora.getFullYear() || (diferenciaDias >= 0 && diferenciaDias <= 365);
  }
  return true;
}

function inicializarPaginaMisGastos() {
  const elTotalGastado = document.getElementById("total-gastado-periodo");
  const elListaTopGastos = document.getElementById("lista-top-gastos");
  const botonesFiltro = document.querySelectorAll(".pildora-tiempo");
  const btnRecargar = document.getElementById("btn-recargar");

  if (!elTotalGastado) return; // No estamos en mis_gastos.html

  let filtroActual = "ano";

  function renderizarGastos() {
    const gastosFiltrados = transacciones.filter(function (item) {
      return item.tipo === "gasto" && fechaDentroDePeriodo(item.fecha, filtroActual);
    });

    let totalGastado = 0;
    gastosFiltrados.forEach(function (item) {
      totalGastado += item.monto;
    });

    elTotalGastado.textContent = `$ ${totalGastado.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;

    const sumasPorCat = {
      "Otros": 0,
      "Comida": 0,
      "Servicios": 0,
      "Salud": 0,
      "Entretenimiento": 0,
      "Transporte": 0
    };

    gastosFiltrados.forEach(function (item) {
      if (sumasPorCat.hasOwnProperty(item.categoria)) {
        sumasPorCat[item.categoria] += item.monto;
      } else {
        sumasPorCat["Otros"] += item.monto;
      }
    });

    const listaOrdenada = Object.keys(sumasPorCat).map(function (cat) {
      return {
        nombre: cat,
        monto: sumasPorCat[cat],
        icono: INFO_CATEGORIAS[cat].icono,
        descripcion: INFO_CATEGORIAS[cat].descripcion
      };
    }).sort(function (a, b) {
      return b.monto - a.monto;
    });

    elListaTopGastos.innerHTML = "";

    listaOrdenada.forEach(function (cat) {
      let porcentaje = 0;
      if (totalGastado > 0) {
        porcentaje = Math.round((cat.monto / totalGastado) * 100);
        if (cat.monto > 0 && porcentaje < 1) {
          porcentaje = "<1";
        }
      }

      const anchoNum = typeof porcentaje === "number" ? porcentaje : 1;

      const tarjeta = document.createElement("article");
      tarjeta.className = "tarjeta-categoria-gasto";
      tarjeta.setAttribute("aria-label", `${cat.nombre}: $${cat.monto.toFixed(2)}, ${porcentaje}% del total gastado`);

      tarjeta.innerHTML = `
        <div class="icono-categoria-circulo" aria-hidden="true">${cat.icono}</div>
        <div class="cuerpo-categoria">
          <div class="fila-encabezado-categoria">
            <span class="nombre-categoria">${cat.nombre}</span>
            <span class="monto-categoria">$${cat.monto.toFixed(2)}</span>
          </div>
          <div class="descripcion-categoria">${cat.descripcion}</div>
          <div class="barra-progreso-fondo" aria-hidden="true">
            <div class="barra-progreso-relleno" style="width: ${anchoNum}%;"></div>
          </div>
          <span class="porcentaje-texto">${porcentaje}% del total gastado</span>
        </div>
      `;
      elListaTopGastos.appendChild(tarjeta);
    });
  }

  // Eventos de botones de filtro con actualización de atributos ARIA
  botonesFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () {
      botonesFiltro.forEach(function (b) {
        b.classList.remove("activa");
        b.setAttribute("aria-pressed", "false");
        b.textContent = b.textContent.replace("✓ ", "");
      });

      boton.classList.add("activa");
      boton.setAttribute("aria-pressed", "true");
      boton.textContent = "✓ " + boton.textContent;
      filtroActual = boton.dataset.filtro;
      renderizarGastos();
    });
  });

  if (btnRecargar) {
    btnRecargar.addEventListener("click", function () {
      transacciones = obtenerTransacciones();
      renderizarGastos();
    });
  }

  renderizarGastos();
}

// 7. LÓGICA DE LA VISTA: HISTORIAL (historial.html)
function inicializarPaginaHistorial() {
  const elLista = document.getElementById("lista-historial");
  const elMensajeVacio = document.getElementById("mensaje-vacio");
  const elContador = document.getElementById("contador-movimientos");
  const btnLimpiar = document.getElementById("btn-limpiar-todo");

  if (!elLista) return; // No estamos en historial.html

  function renderizarHistorial() {
    elLista.innerHTML = "";

    if (transacciones.length === 0) {
      if (elMensajeVacio) elMensajeVacio.style.display = "block";
      if (elContador) elContador.textContent = "0 movimientos";
      return;
    }

    if (elMensajeVacio) elMensajeVacio.style.display = "none";
    if (elContador) elContador.textContent = `${transacciones.length} movimientos registrados`;

    transacciones.forEach(function (item, indice) {
      const li = document.createElement("li");
      li.className = item.tipo === "ingreso" ? "item-ingreso" : "item-gasto";

      const emojiTipo = item.tipo === "ingreso" ? "📈" : "📉";
      const signo = item.tipo === "ingreso" ? "+" : "-";
      const claseBadge = item.tipo === "ingreso" ? "badge-ingreso" : "badge-gasto";
      const nombreCuenta = item.cuenta === "banco" ? "🏦 Banco" : "💵 Efectivo";
      const iconoCat = INFO_CATEGORIAS[item.categoria] ? INFO_CATEGORIAS[item.categoria].icono : "💰";
      const titulo = item.tipo === "ingreso" 
        ? `${emojiTipo} ${item.descripcion || "Ingreso"}` 
        : `${emojiTipo} ${iconoCat} ${item.categoria}`;

      // En lugar de onclick inline, usamos data-index para delegación de eventos con addEventListener (W3C)
      li.innerHTML = `
        <div class="item-info">
          <span class="item-titulo">${titulo}</span>
          <span class="item-subtexto">
            <span class="badge-cuenta">${nombreCuenta}</span>
            ${item.descripcion && item.tipo === "gasto" ? `<span>• ${item.descripcion}</span>` : ""}
            <span>• ${item.fecha}</span>
          </span>
        </div>
        <div class="item-acciones">
          <span class="badge ${claseBadge}">${signo}$${item.monto.toFixed(2)}</span>
          <button type="button" class="btn-eliminar" data-index="${indice}" aria-label="Eliminar movimiento ${item.descripcion || item.categoria} de $${item.monto.toFixed(2)}">✕</button>
        </div>
      `;

      elLista.appendChild(li);
    });
  }

  // Delegación de eventos para eliminar usando addEventListener (sin manejador onclick en línea)
  elLista.addEventListener("click", function (evento) {
    const botonEliminar = evento.target.closest(".btn-eliminar");
    if (!botonEliminar) return;

    const indice = parseInt(botonEliminar.getAttribute("data-index"), 10);
    if (!isNaN(indice) && indice >= 0 && indice < transacciones.length) {
      transacciones.splice(indice, 1);
      guardarTransacciones(transacciones);
      renderizarHistorial();
    }
  });

  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", function () {
      if (confirm("¿Estás seguro de que deseas borrar todos los movimientos del historial?")) {
        transacciones = [];
        guardarTransacciones(transacciones);
        renderizarHistorial();
      }
    });
  }

  renderizarHistorial();
}

// 8. INICIALIZACIÓN GLOBAL CON ADDEVENTLISTENER
document.addEventListener("DOMContentLoaded", function () {
  inicializarPaginaInicio();
  inicializarPaginaRegistrar();
  inicializarPaginaMisGastos();
  inicializarPaginaHistorial();
});
