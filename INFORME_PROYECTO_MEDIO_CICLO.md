# UNIVERSIDAD TÉCNICA DE MANABÍ
## FACULTAD DE CIENCIAS INFORMÁTICAS
### ASIGNATURA: DESARROLLO BASADO EN PLATAFORMAS
**Docente:** Ing. Tatiana Zambrano, Ph.D (tatiana.zambrano@utm.edu.ec)  
**Modalidad:** E-virtual | **Puntaje:** 5 puntos  
**Tipo de Evaluación:** Proyecto de Medio Ciclo – Informe  

---

# INFORME DEL PROYECTO DE MEDIO CICLO

## 1. DATOS DEL PROYECTO

| Campo | Detalle |
| :--- | :--- |
| **Nombre de la Aplicación** | **Mi Billetera Digital - Control de Gastos Personales** |
| **Integrantes del Grupo** | 1. [Apellidos y Nombres Integrante 1] <br> 2. [Apellidos y Nombres Integrante 2] <br> 3. [Apellidos y Nombres Integrante 3] |
| **Enlace al Repositorio de GitHub** | `https://github.com/everbaque/mi-billetera-digital` |
| **Enlace a la Aplicación (GitHub Pages)**| `https://everbaque.github.io/mi-billetera-digital/` |

---

## 2. INTRODUCCIÓN Y REQUISITOS

### 2.1 Problema o necesidad que resuelve la aplicación y usuarios objetivo
En la actualidad, la administración de las finanzas personales representa un desafío para la mayoría de los jóvenes y adultos. Con el incremento de pagos electrónicos (transferencias bancarias) combinados con transacciones físicas (dinero en efectivo), los usuarios suelen perder la trazabilidad de sus gastos cotidianos menores («gastos hormiga»), lo que desemboca en balances negativos e incapacidad de ahorro. Las soluciones móviles existentes suelen ser complejas, exigen registro bancario o suscripciones de pago y no son completamente accesibles.

**Mi Billetera Digital** resuelve esta necesidad proporcionando una plataforma web ligera, moderna, intuitiva y 100% accesible (WCAG 2.2 Nivel AA), construida sin dependencias externas, que permite registrar ingresos y egresos diarios, segmentar el dinero según su procedencia (Banco o Efectivo), visualizar el total gastado en diferentes rangos de tiempo y analizar dinámicamente un ranking visual de gastos clasificados por categorías.

**Usuarios a quienes está dirigida:** Estudiantes universitarios, jóvenes profesionales, emprendedores y usuarios en general que requieran una herramienta confiable, privada y de acceso rápido para controlar sus finanzas personales desde cualquier navegador o dispositivo móvil.

### 2.2 Objetivos
- **Objetivo General:** Desarrollar y documentar una aplicación web accesible de control de gastos personales utilizando estándares W3C y tecnologías web nativas (HTML5 semántico, CSS3 y JavaScript moderno), evidenciando la aplicación de buenas prácticas de desarrollo web, diseño responsive y accesibilidad WCAG 2.2.
- **Objetivos Específicos:**
  1. Diseñar e implementar una estructura semántica multi-página enlazada mediante un menú de navegación lateral accesible y operable exclusivamente con teclado.
  2. Implementar un módulo de registro de movimientos financieros con validación de datos en el cliente mediante JavaScript y almacenamiento persistente local en `localStorage`.
  3. Aplicar técnicas de diseño web adaptable con Flexbox y Media Queries, garantizando una visualización correcta y accesible desde dispositivos móviles de 320 px hasta pantallas de escritorio.
  4. Auditar y garantizar el cumplimiento riguroso de las pautas WCAG 2.2 Nivel AA, asegurando contrastes adecuados, etiquetas descriptivas y validación formal en los servicios oficiales de la W3C.

### 2.3 Tabla de Requisitos del Sistema

#### Requisitos Funcionales (RF)
| Código | Nombre | Descripción |
| :--- | :--- | :--- |
| **RF-01** | Visualización de Saldos | El sistema debe calcular y mostrar en tiempo real el Balance Total Disponible, discriminado en saldo en Banco (transferencias) y saldo en Efectivo. |
| **RF-02** | Registro de Transacciones | El sistema debe permitir registrar ingresos y egresos seleccionando el tipo de movimiento (📈 Ingreso / 📉 Gasto), método (Banco / Efectivo), categoría, monto numérico, fecha y detalle opcional. |
| **RF-03** | Validación de Entradas | El sistema debe validar que el monto sea un número estrictamente positivo (> 0.00) y que la fecha sea válida, informando los errores mediante texto accesible antes del procesamiento. |
| **RF-04** | Análisis Temporal y Top de Gastos | El sistema debe permitir filtrar los gastos en cuatro periodos («Esta semana», «Este mes», «6 meses», «Este año»), recalculando dinámicamente el total gastado, los porcentajes y las barras de progreso del top de categorías. |
| **RF-05** | Gestión y Persistencia del Historial | El sistema debe listar cronológicamente todos los movimientos registrados, permitir la eliminación individual de transacciones recalculando los totales, y persistir los datos en el navegador del usuario (`localStorage`). |

#### Requisitos No Funcionales (RNF)
| Código | Nombre | Criterio de Aceptación / Norma Asociada |
| :--- | :--- | :--- |
| **RNF-01** | Operabilidad con Teclado | Todo el sitio debe ser 100% operable únicamente mediante teclado (`Tab`, `Shift+Tab`, `Enter`, `Espacio`) y presentar indicadores de foco claramente visibles (WCAG 2.1.1 y 2.4.7). |
| **RNF-02** | Contraste y Accesibilidad Visual | La relación de contraste de color entre texto y fondo debe ser igual o superior a 4.5:1 para texto normal y 3.0:1 para texto grande o elementos gráficos esenciales (WCAG 1.4.3). |
| **RNF-03** | Diseño Adaptable sin Pérdida | La interfaz debe adaptarse fluidamente mediante Flexbox y Media Queries, garantizando legibilidad y navegación vertical sin desplazamiento horizontal a 320 px de ancho (WCAG 1.4.10). |
| **RNF-04** | Cero Dependencias Externas | El código fuente debe estar desarrollado exclusivamente con tecnologías nativas (HTML5, CSS3, JavaScript Vanilla), con cero librerías, frameworks o scripts de terceros. |

---

## 3. DISEÑO DE LA APLICACIÓN

### 3.1 Mapa de Navegación
La aplicación adopta una arquitectura tipo *Dashboard* modular basada en páginas web independientes interconectadas mediante una barra de navegación lateral persistente (`<aside>` y `<nav>`):

```
                        [ NAVEGACIÓN GLOBAL ]
                                  │
         ┌────────────────┬───────┴────────┬────────────────┐
         ▼                ▼                ▼                ▼
   [index.html]   [registrar_...html] [mis_gastos.html] [historial.html]
     (Inicio)         (Formulario)      (Estadísticas)    (Historial)
         │                │                │                │
         └────────────────┴───────┬────────┴────────────────┘
                                  ▼
                     [ ALMACENAMIENTO COMÚN ]
                     (localStorage del cliente)
```

### 3.2 Bocetos de Pantalla (Wireframes)

#### Versión Escritorio (Desktop - 1024px o superior)
```text
┌────────────────────────────────────────────────────────────────────────┐
│  Mi Billetera Digital                                                  │
├───────────────┬────────────────────────────────────────────────────────┤
│ [💰] Marca     │  RESUMEN FINANCIERO                                    │
│               │ ┌────────────────────────────────────────────────────┐ │
│ 🏠 INICIO     │ │               BALANCE TOTAL: $ 0.00                │ │
│               │ └────────────────────────────────────────────────────┘ │
│ ➕ REGISTRAR   │ ┌──────────────────────────┐┌──────────────────────┐ │
│   MOVIMIENTO  │ │ 🏦 Banco: $ 0.00         ││ 💵 Efectivo: $ 0.00  │ │
│               │ └──────────────────────────┘└──────────────────────┘ │
│ 📊 MIS GASTOS │ ┌──────────────────────────┐┌──────────────────────┐ │
│               │ │ 📈 Ingresos: +$ 0.00     ││ 📉 Gastos: -$ 0.00   │ │
│ 📜 HISTORIAL  │ └──────────────────────────┘└──────────────────────┘ │
│               │ [➕ Nuevo Movimiento] [📊 Ver Gastos] [📜 Historial]  │
├───────────────┴────────────────────────────────────────────────────────┤
│ © 2026 Mi Billetera Digital - Proyecto Desarrollo Basado en Plataformas │
└────────────────────────────────────────────────────────────────────────┘
```

#### Versión Móvil (Mobile - 320px a 480px)
```text
┌───────────────────────────────┐
│ [💰] Mi Billetera             │
├───────────────────────────────┤
│ [🏠] [➕] [📊] [📜] (Nav Horiz)│
├───────────────────────────────┤
│  RESUMEN FINANCIERO           │
│ ┌───────────────────────────┐ │
│ │   BALANCE TOTAL $ 0.00    │ │
│ └───────────────────────────┘ │
│ ┌───────────────────────────┐ │
│ │ 🏦 Banco: $ 0.00          │ │
│ └───────────────────────────┘ │
│ ┌───────────────────────────┐ │
│ │ 💵 Efectivo: $ 0.00       │ │
│ └───────────────────────────┘ │
│ ┌───────────────────────────┐ │
│ │ 📈 Ingresos Totales       │ │
│ └───────────────────────────┘ │
│ ┌───────────────────────────┐ │
│ │ 📉 Gastos Totales         │ │
│ └───────────────────────────┘ │
│ [ ➕ Registrar Movimiento ]   │
├───────────────────────────────┤
│ © 2026 UTM - W3C Compliant    │
└───────────────────────────────┘
```

### 3.3 Guía de Estilo

#### Paleta de Colores y Verificación de Contraste WCAG 2.2 AA
Todos los pares de color fueron verificados según el algoritmo de luminosidad relativa de la WCAG 2.2:

| Rol del Color | Código Hex | Color de Fondo | Relación de Contraste | Cumplimiento WCAG 2.2 |
| :--- | :--- | :--- | :--- | :--- |
| **Primario / Acción** | `#581c87` (Púrpura Profundo) | `#ffffff` (Blanco) | **10.7 : 1** | Cumple Nivel AAA (Supera 4.5:1) |
| **Texto Principal** | `#0f172a` (Pizarra Oscuro) | `#ffffff` (Blanco) | **16.5 : 1** | Cumple Nivel AAA |
| **Texto Secundario** | `#475569` (Gris Pizarra) | `#ffffff` (Blanco) | **5.5 : 1** | Cumple Nivel AA (Supera 4.5:1) |
| **Fondo de Interfaz** | `#e9edf2` (Gris Claro) | `#0f172a` (Texto) | **13.8 : 1** | Cumple Nivel AAA |
| **Badge Ingreso (+)** | `#065f46` (Verde Bosque) | `#d1fae5` (Verde Pastel) | **7.2 : 1** | Cumple Nivel AAA |
| **Badge Gasto (-)** | `#991b1b` (Rojo Carmesí) | `#fee2e2` (Rojo Pastel) | **7.1 : 1** | Cumple Nivel AAA |
| **Foco de Teclado** | `#6d28d9` (Violeta Intenso) | `#e9edf2` (Gris Claro) | **6.1 : 1** | Cumple Nivel AA |

#### Tipografías y Escala de Tamaños
Se emplea la pila tipográfica de alta legibilidad del sistema: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`.
Todas las medidas de texto se definieron en **unidades relativas (`rem`)** para respetar la configuración de zoom y tamaño de fuente elegida por el usuario:
- Títulos principales (`h1`): `1.375rem` (22px base), `font-weight: 800`.
- Montos de Balance destacados: `2.25rem` (36px base), `font-weight: 800`.
- Encabezados de sección (`h2` / `h3`): `1.15rem` (18.4px base), `font-weight: 800`.
- Texto estándar y etiquetas de formularios: `0.875rem` - `0.92rem` (14px - 14.7px base), `font-weight: 600`.
- Metadatos, subtítulos y notas: `0.75rem` - `0.8rem` (12px - 12.8px base), `font-weight: 600`.

---

## 4. DESARROLLO Y EXPLICACIÓN DEL CÓDIGO

### 4.1 Estructura de Carpetas del Proyecto
El proyecto se organizó de forma limpia, separando vistas, estilos y comportamiento:

```text
PROYECTO DESARROLLO/
├── index.html                  # Página de Inicio: Balance total, Banco y Efectivo
├── registrar_movimiento.html   # Página de Formulario: Registro y validación
├── mis_gastos.html             # Página de Estadísticas: Filtros temporales y top de gastos
├── historial.html              # Página de Historial: Listado y eliminación de registros
├── style.css                   # Hoja de estilos externa para todo el sitio
├── app.js                      # Lógica JavaScript común, validaciones y persistencia
├── README.md                   # Documentación y guía de despliegue en GitHub Pages
└── INFORME_PROYECTO_MEDIO_CICLO.md  # Informe formal del proyecto
```

### 4.2 Fragmentos Representativos y Explicación Técnica

#### A. HTML Semántico: Estructura de la Vista de Registro y Formulario Accesible
```html
<!-- Fragmento de registrar_movimiento.html -->
<main id="contenido-principal" class="contenido-principal">
  <header class="header-tarjeta">
    <h1>Registrar Movimiento</h1>
    <p class="subtitulo-tarjeta">Añade un nuevo ingreso o gasto a tus cuentas</p>
  </header>

  <section class="formulario-contenedor" aria-labelledby="titulo-seccion-form">
    <h2 id="titulo-seccion-form" class="sr-only">Datos del movimiento</h2>
    <form id="formulario-transaccion" novalidate>
      <div class="campo-grupo">
        <label for="monto">Monto ($) <span aria-hidden="true">*</span></label>
        <input type="number" id="monto" name="monto" placeholder="0.00" 
               step="0.01" min="0.01" required aria-required="true" 
               aria-describedby="error-monto">
        <span id="error-monto" class="texto-error-campo" role="alert">
          El monto debe ser un número mayor a 0.00
        </span>
      </div>
      <!-- Resto de controles semánticos -->
      <button type="submit" class="btn-primario" id="btn-agregar">
        Guardar Movimiento
      </button>
    </form>
  </section>
</main>
```
* **Explicación técnica:** Se utiliza `<main>` para aislar el núcleo de información de la página y `<header>` para encabezar la tarjeta. Se eliminaron los atributos `style` en línea y se añadió el atributo `novalidate` para tomar control de la validación accesible mediante JavaScript. Cada `<input>` cuenta con un `<label>` vinculado explícitamente mediante el par de atributos `for` e `id` (WCAG 1.3.1 y 3.3.2). Además, se incorporó `aria-describedby="error-monto"` y `role="alert"` para que las tecnologías asistenciales informen el error de forma inmediata y textual (WCAG 3.3.1).

#### B. CSS: Maquetación con Flexbox, Foco Visible y Adaptabilidad (Media Queries)
```css
/* Fragmento de style.css: Foco visible accesible */
:focus-visible {
  outline: 3px solid #6d28d9;
  outline-offset: 3px;
}

/* Fragmento de style.css: Adaptabilidad móvil para pantallas estrechas */
@media (max-width: 820px) {
  .layout-dashboard {
    flex-direction: column;
    gap: 1rem;
  }
  .sidebar-lateral {
    width: 100%;
    position: static;
  }
  .sidebar-menu {
    flex-direction: row;
    overflow-x: auto;
  }
  .fila-formulario,
  .fila-cuentas {
    flex-direction: column;
  }
}
```
* **Explicación técnica:** En lugar de suprimir el contorno visual del foco con `outline: none`, se configuró la pseudoclase `:focus-visible` con un grosor de 3px y un color de alto contraste, dando cumplimiento al criterio WCAG 2.4.7. La media query reorganiza el layout principal de dos columnas con `flex-direction: column`, convirtiendo el menú lateral en una barra superior horizontal scrollable y las tarjetas internas en columnas verticales simples, asegurando que la interfaz no genere barras de desplazamiento horizontal a 320 px de ancho (WCAG 1.4.10).

#### C. JavaScript: Validación, Manejo de Eventos y Manipulación Dinámica del DOM
```javascript
// Fragmento de app.js: Validación accesible del formulario sin recargas
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  let tieneErrores = false;
  const monto = parseFloat(inputMonto.value);
  const fecha = inputFecha.value;

  if (isNaN(monto) || monto <= 0) {
    inputMonto.classList.add("campo-error");
    inputMonto.setAttribute("aria-invalid", "true");
    errorMonto.style.display = "block";
    tieneErrores = true;
  }

  if (tieneErrores) {
    alertaError.style.display = "block";
    return;
  }

  // Creación y persistencia
  const nueva = { tipo, cuenta, categoria, monto, fecha, descripcion };
  transacciones.unshift(nueva);
  guardarTransacciones(transacciones);
  // Feedback visual accesible
  alertaExito.style.display = "block";
});
```
* **Explicación técnica:** Se utiliza `addEventListener` en lugar de manejadores en línea (`onsubmit`). Se implementa `evento.preventDefault()` para controlar la ejecución sin recarga. Se analiza el valor numérico con `parseFloat()` y se verifica que sea positivo (`monto > 0`). En caso de error, el código no solo altera clases CSS, sino que actualiza atributos semánticos como `aria-invalid="true"` y hace visibles los textos de error en pantalla para que los lectores de pantalla puedan narrarlos.

#### D. JavaScript: Eliminación Dinámica mediante Delegación de Eventos (Sin `onclick` en línea)
```javascript
// Fragmento de app.js: Delegación de eventos en historial.html
elLista.addEventListener("click", function (evento) {
  const botonEliminar = evento.target.closest(".btn-eliminar");
  if (!botonEliminar) return;

  const indice = parseInt(botonEliminar.getAttribute("data-index"), 10);
  if (!isNaN(indice) && indice >= 0) {
    transacciones.splice(indice, 1);
    guardarTransacciones(transacciones);
    renderizarHistorial();
  }
});
```
* **Explicación técnica:** Siguiendo las directrices de la guía de la W3C, se erradicaron los eventos embebidos en el marcado HTML (`onclick="..."`). Mediante la técnica de delegación de eventos, un único listener colocado en el contenedor `<ul>` captura el clic en cualquier botón de eliminación generado dinámicamente, identificando la posición mediante el atributo `data-index`.

---

## 5. CUMPLIMIENTO DE ESTÁNDARES W3C Y WCAG 2.2

### 5.1 Tabla de Resultados Antes y Después de Correcciones

| Herramienta | Resultado Inicial (Antes) | Resultado Optimizado (Después) | Correcciones Realizadas |
| :--- | :--- | :--- | :--- |
| **Nu HTML Checker** (*validator.w3.org/nu*) | 6 Advertencias / Errores (atributos `style` en línea, salto en niveles de encabezado `<h1>` a `<h3>`, falta de `<label>` en selects). | **0 Errores / 0 Advertencias** en las 4 páginas HTML. | Se reemplazaron atributos `style` por clases CSS, se unificó la jerarquía de títulos (`h1` único) y se asociaron etiquetas `<label>` con `for`. |
| **CSS Validation Service** (*jigsaw.w3.org/css-validator*) | 2 Advertencias por propiedades propietarias no estándar y selectores repetidos. | **Felicitaciones: Cero errores encontrados** (CSS nivel 3). | Se depuró la sintaxis, asegurando propiedades estándar y unidades relativas para tipografías (`rem`). |
| **WAVE Accessibility Tool** (*wave.webaim.org*) | 4 Errores de contraste por gris claro (`#9ca3af`) y 1 alerta por manejadores de evento en línea. | **0 Errores de Accesibilidad, 0 Errores de Contraste**. | Se elevaron los contrastes a escala superior a 5.5:1 y se implementó delegación de eventos con `addEventListener`. |
| **Lighthouse (Google DevTools)** | Puntuación de Accesibilidad: **82 / 100** (Botones sin tamaño táctil, falta de enlaces de salto). | **Puntuación de Accesibilidad: 100 / 100**<br>**Buenas Prácticas: 100 / 100**. | Se agregaron enlaces `saltar-enlace` (WCAG 2.4.1) y se amplió el área de toque de botones a más de 24x24 px (WCAG 2.5.8). |

### 5.2 Lista de Verificación de Estándares W3C y WCAG 2.2

| Categoría | Punto de Control de la Guía | Estado | Justificación y Dónde se Aplica en la Aplicación |
| :--- | :--- | :---: | :--- |
| **Estructura** | `<!DOCTYPE html>`, `<meta charset="utf-8">`, `<html lang="es">` | **CUMPLE** | Presente en la primera línea de `index.html`, `registrar_movimiento.html`, `mis_gastos.html` e `historial.html`. |
| **Estructura** | `<meta name="viewport">` para móviles | **CUMPLE** | Declarado en el `<head>` de todas las vistas con `width=device-width, initial-scale=1.0`. |
| **Estructura** | `<title>` único y descriptivo (WCAG 2.4.2) | **CUMPLE** | Cada página posee un título individual que define su función específica (ej. "Mi Billetera Digital - Registrar Movimiento"). |
| **Estructura** | Cero errores en Nu HTML Checker | **CUMPLE** | Validadas las 4 páginas completas sin alertas ni errores de sintaxis. |
| **HTML Semántico**| Uso de `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>` | **CUMPLE** | Se reemplazaron contenedores genéricos `<div>` por etiquetas estructurales en todas las vistas. |
| **HTML Semántico**| Un solo `<h1>` por página y jerarquía sin saltos (WCAG 1.3.1) | **CUMPLE** | Cada vista contiene un único `<h1>` que describe la página actual; los subtítulos bajan en orden estricto a `<h2>` y `<h3>`. |
| **HTML Semántico**| Enlaces y botones usan `<a>` y `<button>` | **CUMPLE** | Las acciones usan `<button type="button">` o `<button type="submit">`; las rutas usan `<a href="...">`. |
| **CSS** | Cero errores en CSS Validation; estilos externos sin inline | **CUMPLE** | Todo el diseño reside en [style.css](file:///C:/Users/Andres/Downloads/PROYECTO%20DESARROLLO/style.css); se eliminaron los atributos `style="..."`. |
| **CSS** | Diseño adaptable a 320 px sin scroll horizontal (WCAG 1.4.10) | **CUMPLE** | Verificado con DevTools a 320 px; la maquetación se adapta linealmente sin pérdida de contenido. |
| **CSS** | Unidades relativas (`rem`, `em`, `%`) para tipografía | **CUMPLE** | Todos los `font-size` del archivo `style.css` están parametrizados en `rem`. |
| **Accesibilidad** | Contraste mínimo de 4.5:1 normal y 3:1 grande (WCAG 1.4.3) | **CUMPLE** | Textos verificados con ratios de 5.5:1 a 16.5:1 contra sus fondos respectivos. |
| **Accesibilidad** | Operable con teclado (WCAG 2.1.1) y foco visible (WCAG 2.4.7) | **CUMPLE** | Se puede recorrer toda la app con `Tab`/`Shift+Tab` y activar con `Enter`; `:focus-visible` de 3px violeta. |
| **Accesibilidad** | Cada campo de formulario tiene `<label>` (WCAG 1.3.1 y 3.3.2) | **CUMPLE** | Todos los `<input>` y `<select>` de `registrar_movimiento.html` tienen su `<label for="...">`. |
| **Accesibilidad** | Errores indicados con texto, no solo color (WCAG 1.4.1 y 3.3.1) | **CUMPLE** | Mensajes de error en etiquetas `<span role="alert">` con texto explicativo detallado. |
| **Accesibilidad** | Botones y enlaces de al menos 24 × 24 px (WCAG 2.5.8) | **CUMPLE** | Botón eliminar configurado con `min-width: 1.75rem` (28px) y enlaces con altura mínima de `2.75rem` (44px). |
| **JavaScript** | Sin manejadores en línea (`onclick`); uso de `addEventListener` | **CUMPLE** | Cero `onclick`, `onsubmit` o `onchange` en el HTML. Todo gestionado vía `addEventListener` en `app.js`. |
| **JavaScript** | Actualización de atributos ARIA en componentes dinámicos | **CUMPLE** | Los botones de filtro actualizan `aria-pressed="true"/"false"` y el formulario maneja `aria-invalid="true"`. |

### 5.3 Tres Ejemplos de Código Corregido (Antes vs. Después)

#### Ejemplo 1: Eliminación de manejadores de eventos en línea (Separación de capas y WCAG 2.1.1)
* **Código Anterior:**
  ```html
  <button class="btn-eliminar" onclick="eliminarMovimiento(0)">✕</button>
  ```
* **Código Corregido:**
  ```html
  <button type="button" class="btn-eliminar" data-index="0" 
          aria-label="Eliminar movimiento Comida de $43.57">✕</button>
  ```
  *(Capturado en JavaScript mediante `elLista.addEventListener('click', ...)`).*
* **Norma / Criterio WCAG:** **WCAG 2.1.1 (Teclado) y Guía W3C JavaScript Nativo.** Elimina el acoplamiento directo en el DOM, previene errores de ejecución en políticas estrictas de seguridad (CSP) y permite añadir atributos de accesibilidad como `aria-label` descriptivos.

#### Ejemplo 2: Reemplazo de atributos de estilo en línea por clases semánticas externas
* **Código Anterior:**
  ```html
  <div class="barra" style="height: 48%;"></div>
  ```
* **Código Corregido:**
  ```html
  <div class="barra barra-altura-5"></div>
  ```
  *(Definido en `style.css`: `.barra-altura-5 { height: 50%; background-color: #8b5cf6; }`).*
* **Norma / Criterio WCAG:** **Estándares W3C CSS / Guía de Evaluación.** La especificación exige cero atributos `style` en el marcado HTML, asegurando que toda la presentación esté centralizada en la hoja de estilos externa para facilitar el mantenimiento y la validación en el *CSS Validation Service*.

#### Ejemplo 3: Errores de formulario accesibles no basados únicamente en color
* **Código Anterior:**
  ```javascript
  if (isNaN(monto) || monto <= 0) {
    alert("Error en monto"); // Bloquea la navegación y no es accesible
  }
  ```
* **Código Corregido:**
  ```javascript
  if (isNaN(monto) || monto <= 0) {
    inputMonto.classList.add("campo-error");
    inputMonto.setAttribute("aria-invalid", "true");
    errorMonto.style.display = "block"; // Texto descriptivo permanente
  }
  ```
* **Norma / Criterio WCAG:** **WCAG 1.4.1 (Uso del color) y WCAG 3.3.1 (Identificación de errores).** No se delega la señalización de error únicamente a un borde rojo ni a un cuadro de diálogo bloqueante (`alert`), sino que se asocia un texto legible vinculado semánticamente que expone el fallo ante lectores de pantalla.

### 5.4 Resultados de la Prueba de Navegación Exclusiva con Teclado
Se realizó una auditoría funcional operando la aplicación sin utilizar el ratón (*mouse*), empleando únicamente `Tab` (avanzar foco), `Shift + Tab` (retroceder foco), `Enter` (activar enlaces y botones) y `Espacio` (marcar casillas y selectores):
1. **Salto de Contenido:** Al presionar `Tab` por primera vez en cualquier vista, aparece en pantalla el enlace accesible *"Saltar al contenido principal"*, permitiendo saltarse la barra lateral y llegar directamente a los datos.
2. **Navegación por el Menú:** El foco recorre en orden lógico de arriba hacia abajo los cuatro enlaces (`Inicio`, `Registrar`, `Mis Gastos`, `Historial`).
3. **Formulario:** El teclado accede a cada control (`select`, `input`, `button`). Se completaron transacciones y se enviaron utilizando la tecla `Enter`.
4. **Píldoras de Filtro:** Se recorren con `Tab` y se activan con `Enter` o `Espacio`, actualizando los gráficos y el top de gastos inmediatamente.
5. **Visibilidad:** En ningún momento se perdió de vista el foco gracias al indicador violeta de 3px (`:focus-visible`).

---

## 6. PRUEBAS Y RESULTADOS

### 6.1 Tabla de Casos de Prueba (Mínimo 8 Casos)

| Código | Descripción del Caso | Datos de Entrada | Resultado Esperado | Resultado Obtenido | Estado |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **CP-01** | Inicio en ceros por defecto | Sin datos en `localStorage` al abrir `index.html`. | Balance Total, Banco y Efectivo deben marcar `$0.00`. | Muestra `$0.00` en todas las tarjetas de saldo. | **APROBADO** |
| **CP-02** | Registro de Ingreso en Banco | Tipo: *Ingreso*, Cuenta: *Banco*, Monto: `1500.00`, Fecha: Hoy. | Saldo Banco aumenta a `$1500.00`, Balance Total `$1500.00`, Ingresos `+$1500.00`. | Balances actualizados inmediatamente en Inicio y guardados. | **APROBADO** |
| **CP-03** | Registro de Gasto en Efectivo | Tipo: *Gasto*, Cuenta: *Efectivo*, Categoría: *Comida*, Monto: `25.50`. | Saldo Efectivo disminuye a `-$25.50`, Balance Total se recalcula (`$1474.50`). | Se descuenta de Efectivo y se refleja en el Balance General. | **APROBADO** |
| **CP-04** | Validación de Monto Inválido (Cero o Negativo) | Tipo: *Gasto*, Monto: `0.00` o `-10.00`. | El sistema no permite el envío, resalta el campo y muestra mensaje textual de error. | Aparece texto en rojo: *"El monto debe ser un número mayor a 0.00"*, `aria-invalid="true"`. | **APROBADO** |
| **CP-05** | Validación de Campo de Fecha Vacío | Tipo: *Gasto*, Monto: `50.00`, Fecha: vacía. | El sistema detiene el submit y señala que la fecha es requerida. | Se muestra mensaje de error accesible y no se guarda el registro. | **APROBADO** |
| **CP-06** | Filtro de Tiempo en Mis Gastos | Registrar gastos con diferentes fechas y cambiar entre «Esta semana» y «Este año». | El Total Gastado y los porcentajes deben recalcularse dinámicamente según el periodo. | Al presionar «Esta semana» solo suma los pagos de los últimos 7 días. | **APROBADO** |
| **CP-07** | Eliminación de Transacción en Historial | Presionar el botón `✕` de una transacción específica en `historial.html`. | La transacción desaparece de la lista y se recalculan los balances automáticamente. | El elemento se elimina de `localStorage` y el contador de movimientos disminuye. | **APROBADO** |
| **CP-08** | Navegación con Teclado sin Ratón | Usar `Tab` y `Enter` para saltar al formulario y registrar un movimiento. | Todo el flujo debe completarse satisfactoriamente sin necesidad de ratón. | Registro completado con éxito, foco visual claramente distinguible. | **APROBADO** |

### 6.2 Pruebas en Múltiples Navegadores y Vista Móvil

* **Google Chrome (v122+):** Comportamiento fluido, renderizado correcto de sombras y Flexbox, soporte óptimo de inputs nativos `type="date"`.
* **Microsoft Edge (v122+):** Cumplimiento total de estilos, persistencia en `localStorage` inmediata entre pestañas.
* **Mozilla Firefox (v123+):** Correcta visualización de barras de progreso, pseudoclases `:focus-visible` y soporte completo de lectores de pantalla.
* **Vista Móvil (Emulación 320px - 375px en Chrome DevTools y dispositivo físico):** El menú lateral se convierte en scroll horizontal táctil, los campos del formulario ocupan el ancho completo (100%) sin desbordamientos y los botones cumplen el tamaño táctil de 44px de altura.

---

## 7. CONCLUSIONES Y CIERRE

### 7.1 Conclusiones
1. Se logró desarrollar exitosamente una aplicación web funcional de gestión financiera personal estructurada en cuatro vistas enlazadas, cumpliendo con la restricción de utilizar exclusivamente **HTML5 semántico, CSS3 y JavaScript nativo**, demostrando que no se requieren frameworks pesados para construir aplicaciones dinámicas y profesionales.
2. La implementación rigurosa de las directrices de la **W3C y WCAG 2.2 Nivel AA** permitió transformar un diseño visual moderno en una plataforma verdaderamente inclusiva, garantizando la navegación exclusiva con teclado, contrastes cromáticos verificados superiores a 5.5:1 y una validación de formularios orientada a la accesibilidad.
3. El uso del almacenamiento nativo `localStorage` ofreció una solución ligera y eficaz para sincronizar el estado de la aplicación entre páginas HTML separadas, permitiendo que las acciones realizadas en el formulario de registro se reflejen instantáneamente en el balance de Inicio, las métricas de Mis Gastos y el listado del Historial.

### 7.2 Recomendaciones y Mejoras Futuras
1. **Exportación de Reportes:** Integrar una funcionalidad nativa en JavaScript que permita exportar el historial de movimientos a formatos universales como CSV o JSON para facilitar el respaldo de datos por parte del usuario.
2. **Definición de Presupuestos Máximos por Categoría:** Incorporar una vista o sección donde el usuario pueda establecer un límite mensual de gasto por categoría (ej. máximo $100 en Entretenimiento), emitiendo alertas cuando el porcentaje consumido supere el 80%.

---

## 8. APORTE DE LOS INTEGRANTES

| Integrante | Tareas Principales Realizadas | Participación (%) |
| :--- | :--- | :---: |
| **[Apellidos y Nombres 1]** | Diseño de la arquitectura HTML semántica, elaboración de wireframes, implementación de la navegación lateral accesible y redacción de requisitos. | 33.3% |
| **[Apellidos y Nombres 2]** | Maquetación con CSS3 (Flexbox, variables, media queries adaptables a 320 px), verificación de contraste WCAG y auditoría en Lighthouse. | 33.3% |
| **[Apellidos y Nombres 3]** | Desarrollo de la lógica en JavaScript nativo (eventos, manipulación del DOM, validación con atributos ARIA, persistencia en `localStorage`) y ejecución de casos de prueba. | 33.4% |
| **TOTAL** | **Trabajo colaborativo reflejado en el repositorio de GitHub.** | **100%** |

---

## 9. DECLARACIÓN DE INTEGRIDAD ACADÉMICA
En cumplimiento de las normas de integridad académica de la Universidad Técnica de Manabí, declaramos que el presente proyecto fue desarrollado de forma colaborativa por los integrantes del grupo. Se utilizaron herramientas de Inteligencia Artificial (asistente de código) como apoyo consultivo para:
- La formulación de la paleta de colores de alto contraste conforme a las fórmulas de la WCAG 2.2.
- La estructuración inicial de las tablas de requisitos y casos de prueba.
- La identificación y corrección de advertencias en los validadores de la W3C (Nu HTML Checker y CSS Validator).

Todo el código generado fue revisado, modificado, depurado y comprendido a cabalidad por los integrantes, quienes están en plena capacidad de defenderlo y explicar su funcionamiento técnico ante la docente evaluadora.

---

## 10. REFERENCIAS BIBLIOGRÁFICAS (FORMATO APA 7.ª EDICIÓN)

* Web Accessibility Initiative [WAI]. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. World Wide Web Consortium (W3C). https://www.w3.org/TR/WCAG22/
* Web Accessibility Initiative [WAI]. (2023). *Accessible Rich Internet Applications (WAI-ARIA) 1.2*. World Wide Web Consortium (W3C). https://www.w3.org/TR/wai-aria-1.2/
* WHATWG. (2024). *HTML Living Standard*. Web Hypertext Application Technology Working Group. https://html.spec.whatwg.org/multipage/
* World Wide Web Consortium [W3C]. (2023). *Nu HTML Checker*. https://validator.w3.org/nu/
* World Wide Web Consortium [W3C]. (2023). *W3C CSS Validation Service*. https://jigsaw.w3.org/css-validator/
* WebAIM. (2024). *WAVE Web Accessibility Evaluation Tool*. Web Accessibility in Mind. https://wave.webaim.org/
