# 🐉 Mundo Dragón · Tienda de Tesoros Dracónicos


**Proyecto - Programación Web · Tienda temática dragón con carrusel interactivo, gestión de pedidos y diseño épico responsive.**

---

## 📋 Tabla de Contenidos

1. [Descripción del Proyecto](#-descripción-del-proyecto)
2. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
3. [Estructura del Proyecto](#-estructura-del-proyecto)
4. [Uso de Inteligencia Artificial](#-uso-de-inteligencia-artificial)
5. [Mejoras Implementadas con IA](#-mejoras-implementadas-con-ia)
6. [Prompts Utilizados](#-prompts-utilizados)
7. [Buenas Prácticas Aplicadas](#-buenas-prácticas-aplicadas)

---

## 🎯 Descripción del Proyecto

**Mundo Dragón** es una tienda online temática con estética dracónica que permite a los usuarios:

- 🛒 **Seleccionar productos** desde un carrusel flotante interactivo
- 📝 **Realizar pedidos** con validación de formulario completa
- 📜 **Visualizar pedidos** en cards independientes con diseño épico
- ❌ **Cancelar pedidos** con ventana de confirmación
- 💰 **Ver total recaudado** por el reino en tiempo real

El diseño incluye ambientación completa con partículas brillantes, hojas flotantes, alas de dragón, 
brasas de fuego y dragones ASCII decorativos.

---

## 💻 Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| **HTML5** | Estructura semántica del sitio web |
| **CSS3** | Diseño responsive, animaciones, variables CSS, backdrop-filter |
| **JavaScript (Vanilla)** | Lógica de negocio, manipulación del DOM, carrusel interactivo |
| **Google Fonts** | Fuentes Cinzel (títulos) e Inter (textos) |
| **GitHub Pages** | Despliegue del sitio estático |
| **Python (http.server)** | Pruebas en entorno local |

---

## 📁 Estructura del Proyecto

mundo-dragon/
├── index.html # Página principal con formulario y carrusel
├── estilos.css # Estilos completos con diseño responsive
├── script.js # Lógica de pedidos y carrusel interactivo
└── Apoyo de Inteligencia Artificial & Buenas Prácticas.md # Documentación completa del proyecto

---

## 🤖 Uso de Inteligencia Artificial

### Herramienta Utilizada

**DeepSeek** (Modelo de lenguaje avanzado) fue utilizado como asistente de desarrollo durante todo el proyecto para:

- **Generación de código CSS/JS** con diseños complejos y temáticos
- **Refactorización y optimización** del código existente
- **Resolución de problemas** de responsive design y compatibilidad
- **Implementación de validaciones** y buenas prácticas de seguridad
- **Documentación** completa del proyecto

### Metodología de Trabajo con IA

1. **Prompt inicial** → Solicitud de funcionalidad o diseño específico
2. **Análisis de respuesta** → Revisión y comprensión del código generado
3. **Iteración** → Ajustes y refinamiento mediante prompts adicionales
4. **Integración** → Incorporación al proyecto con pruebas locales
5. **Validación** → Verificación en entorno local (Python) y producción (GitHub Pages)

---

## ✨ Mejoras Implementadas con IA

### 1. Sistema de Validaciones Robusto

**Antes:** Solo validación básica de campos vacíos

**Después:** Validación completa con sanitización y expresiones regulares

```javascript
// Validación de correo electrónico
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sanitización de entradas para prevenir XSS
function sanitizarTexto(texto) {
    return texto.trim()
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Validación completa del formulario con mensajes específicos
function validarFormulario(nombre, correo, producto, cantidad) {
    if (nombre === '' || correo === '') {
        mostrarMensaje('¡Oh, Guardián! Debes completar tu nombre y correo.');
        return false;
    }
    if (nombre.length < 3) {
        mostrarMensaje('El nombre debe tener al menos 3 caracteres.');
        return false;
    }
    if (!regexCorreo.test(correo)) {
        mostrarMensaje('El correo no tiene un formato válido para el reino.');
        return false;
    }
    if (producto === '') {
        mostrarMensaje('Debes seleccionar un tesoro del carrusel.');
        return false;
    }
    if (cantidad < 1 || isNaN(cantidad)) {
        mostrarMensaje('La cantidad debe ser al menos 1.');
        return false;
    }
    return true;
}
2. Carrusel Flotante Interactivo
Antes: El carrusel se abría encima del formulario tapando los campos

Después: Carrusel lateral con transición suave y formulario desplazable

javascript
function abrirCarrusel() {
    carruselFlotante.style.display = 'block';
    void carruselFlotante.offsetWidth;
    carruselFlotante.classList.add('abierto');
    container.classList.add('desplazado');  // Mueve el formulario
    indiceCarrusel = 0;
    irASlide(0);
}

function cerrarCarrusel() {
    carruselFlotante.classList.remove('abierto');
    container.classList.remove('desplazado');
    setTimeout(() => {
        if (!carruselFlotante.classList.contains('abierto')) {
            carruselFlotante.style.display = 'none';
        }
    }, 500);
}
CSS de transición:

css
.container {
    transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1), 
                max-width 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.container.desplazado {
    transform: translateX(260px);
    max-width: 450px;
}
3. Pedidos como Cards Independientes
Antes: Lista simple de pedidos sin formato destacado

Después: Cards con efectos hover, pseudo-elementos decorativos y diseño inmersivo

css
#listaPedidos li {
    background: linear-gradient(145deg, rgba(20, 10, 5, 0.9), rgba(40, 20, 10, 0.95));
    border: 1px solid rgba(246, 216, 154, 0.3);
    border-left: 4px solid var(--lava);
    border-radius: 16px;
    padding: 1.2rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 90, 31, 0.1);
    transition: all 0.3s ease;
}

#listaPedidos li:hover {
    transform: translateX(8px) scale(1.02);
    border-left: 4px solid var(--dorado);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 90, 31, 0.2);
}
4. Diseño Responsive Completo
Antes: La página no se adaptaba a laptops y elementos se salían de la pantalla

Después: 5 breakpoints para adaptabilidad total

css
/* 5 breakpoints para diferentes dispositivos */
@media (max-width: 1200px) { /* Laptops grandes - 700px carrusel */ }
@media (max-width: 1100px) { /* Laptops estándar - 480px carrusel */ }
@media (max-width: 900px)  { /* Tablets - 420px carrusel */ }
@media (max-width: 767px)  { /* Móviles - carrusel full width */ }
@media (max-width: 480px)  { /* Móviles pequeños - ajustes finos */ }
5. Refactorización del Código
Principios aplicados:

Funciones modulares: Cada función tiene una responsabilidad única

Variables CSS: Colores y sombras centralizados en :root

Nombres descriptivos: actualizarPrecioYTotal(), sanitizarTexto(), cancelarPedido()

Separación de concerns: HTML (estructura), CSS (presentación), JS (lógica)

css
:root {
    --dorado: #f6d89a;
    --dorado-oscuro: #d4a85a;
    --rojo-fuego: #b63a1b;
    --naranja-fuego: #ff7a2f;
    --lava: #ff5a1f;
    --lava-suave: #ffb36b;
    --ceniza: #0f0908;
    --glow-fuego: 0 0 20px rgba(255,90,31,0.3);
    --glow-dorado: 0 0 20px rgba(246,216,154,0.3);
    --sombra-boton: 0 4px 0 #7a2a00;
}
6. Optimización de Performance
Intersection Observer para animaciones bajo demanda

Transiciones CSS en lugar de animaciones JavaScript pesadas

Imágenes optimizadas con object-fit: contain

javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
7. Solución de Caché en Despliegue
Problema: GitHub Pages no reflejaba cambios del CSS

Solución: Versionado de archivos CSS

html
<link rel="stylesheet" href="estilos.css?v=2">
📝 Prompts Utilizados
Prompt 1: Posicionamiento del Carrusel
text
te cuento quiero que el carrusel de los productos no se habra encima 
del formulario, si no al lado cuando el usuario clike el boton
Mejora obtenida: Carrusel lateral con transición desde la izquierda/derecha y formulario desplazable

Prompt 2: Diseño del Botón "Elegir Producto"
text
el boton de elegir producto no tien diseño, podrias ponerle uno cool 
que coincida bien con la estetica de la pagina?
Mejora obtenida: Botón con gradiente oscuro, borde dorado, efecto hover con brillo que recorre el botón

Prompt 3: Personalización de Flechas del Input
text
lo unico que queria era que esas flechas de arriba abajo que son 
triangulos tuvieran otro diseño y fueran visibles, no todo el cuadro
Mejora obtenida: Flechas del input number con degradado de fuego, bordes cuadrados y efecto hover con brillo

Prompt 4: Pedidos como Cards
text
el profe me dio retroaliemntacion, me dijo que los pedidos que se 
hagan y queden en Pedidos Realizados al Reino, que cada pedido 
quede en una card
Mejora obtenida: Sistema de cards independientes con efectos hover, pseudo-elementos decorativos y nombre del guardián en dorado

Prompt 5: Adaptabilidad Responsive
text
viendolo desde una laptop pues las cosas se salen de la pantalla, 
mi pagina web no se adapta a los tipos de pantalla? se puede 
arreglar de alguna manera?
Mejora obtenida: 5 breakpoints responsive con ajustes progresivos para laptops, tablets y móviles

Prompt 6: Validaciones del Formulario
text
el formulario debe validar correo, nombre, producto seleccionado 
y cantidad minima
Mejora obtenida: Sistema completo de validación con sanitización XSS y mensajes de error descriptivos

Prompt 7: Solución de Caché en GitHub
text
cuando subi a github la pagina no cambio y se adapto como lo 
hizo cuando lo hice correr en phyton
Mejora obtenida: Implementación de versionado CSS (?v=2) para forzar actualización en GitHub Pages

🏆 Buenas Prácticas Aplicadas

HTML5

✅ Estructura semántica con etiquetas apropiadas

✅ Atributos required en campos obligatorios

✅ Placeholders descriptivos para guiar al usuario

✅ Vinculación correcta de recursos externos (Google Fonts)

✅ Metadatos para responsive design (viewport)

CSS3

✅ Variables CSS (:root) para mantener consistencia de colores

✅ Metodología BEM-like en nombres de clases

✅ Animaciones con @keyframes y transiciones suaves

✅ Diseño Mobile-First con media queries progresivas

✅ Uso de backdrop-filter para efectos de vidrio esmerilado

✅ Pseudo-elementos (::before, ::after) para decoración sin HTML extra

✅ Sombras y gradientes para profundidad visual

JavaScript

✅ Funciones puras cuando es posible (sin efectos secundarios)

✅ Manejo de errores con mensajes descriptivos para el usuario

✅ Delegación de eventos para el carrusel interactivo

✅ const y let en lugar de var (ES6+)

✅ Arrow functions y template literals

✅ Sanitización de inputs para prevenir XSS

✅ Validación de datos antes de procesar

✅ Intersection Observer para mejorar rendimiento

General

✅ Código comentado en español para mejor comprensión

✅ Separación clara de responsabilidades (HTML/CSS/JS)

✅ Control de versiones con Git/GitHub

✅ Documentación completa en README.md

✅ Pruebas en entorno local antes del despliegue

✅ Diseño responsive probado en múltiples dispositivos
