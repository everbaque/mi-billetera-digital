# 💰 Mi Billetera Digital - Control de Gastos Personales

> **Proyecto de Medio Ciclo: Desarrollo Basado en Plataformas**  
> **Docente:** Ing. Tatiana Zambrano, Ph.D  
> **Universidad Técnica de Manabí (UTM)**  
> **Estándares:** HTML5 Living Standard (WHATWG), CSS3, WCAG 2.2 Nivel AA

---

## 📋 Descripción del Proyecto
**Mi Billetera Digital** es una aplicación web ligera y accesible desarrollada exclusivamente con **HTML5 semántico, CSS3 y JavaScript nativo (Vanilla JS)**, sin el uso de librerías ni frameworks externos. Permite el control eficiente de finanzas cotidianas mediante el registro y seguimiento dinámico de ingresos y gastos, divididos entre dinero en banco (transferencia) y dinero en efectivo.

---

## 🚀 Despliegue en GitHub Pages
Para publicar esta aplicación web en GitHub Pages:
1. Crear un repositorio en GitHub (ejemplo: `mi-billetera-digital`).
2. Subir los archivos del proyecto (`index.html`, `registrar_movimiento.html`, `mis_gastos.html`, `historial.html`, `style.css`, `app.js`).
3. Ir a **Settings** > **Pages** en GitHub.
4. En **Branch**, seleccionar `main` (o `master`), carpeta `/ (root)` y guardar (**Save**).
5. Tu aplicación estará disponible en: `https://<tu-usuario>.github.io/<tu-repositorio>/`

---

## 📂 Estructura del Proyecto
```text
PROYECTO DESARROLLO/
├── index.html                   # Vista 1: Inicio y Resumen Financiero (Balance, Banco, Efectivo)
├── registrar_movimiento.html    # Vista 2: Formulario de Registro con Validación accesible
├── mis_gastos.html              # Vista 3: Análisis de Gastos por Categoría y Filtros de Tiempo
├── historial.html               # Vista 4: Historial de Transacciones con eliminación y recálculo
├── style.css                    # Hoja de estilos externa responsive y accesible (WCAG 2.2 AA)
├── app.js                       # Lógica JS nativa (eventos, manipulación del DOM, localStorage)
├── INFORME_PROYECTO_MEDIO_CICLO.md # Informe formal para la evaluación
└── README.md                    # Documentación técnica
```

---

## ♿ Cumplimiento de Estándares W3C y WCAG 2.2 AA
- **HTML Semántico:** Uso de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` y `<footer>`.
- **Accesibilidad con teclado (WCAG 2.1.1):** Operación completa usando `Tab`, `Shift + Tab`, `Enter` y `Espacio`.
- **Foco visible (WCAG 2.4.7):** Indicador visual de 3px con alto contraste (`:focus-visible`).
- **Contraste de color (WCAG 1.4.3):** Relación superior a 4.5:1 en todos los textos normales y 3:1 en textos grandes.
- **Formularios accesibles (WCAG 1.3.1 y 3.3.2):** Etiquetas `<label>` asociadas explícitamente mediante `for` e `id`, validación con texto y atributos ARIA (`aria-invalid`, `aria-describedby`, `role="alert"`).
- **Sin estilos ni eventos en línea:** Cero atributos `style` y cero `onclick` en el HTML. Registro mediante `addEventListener`.
