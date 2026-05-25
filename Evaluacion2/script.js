// =============================================
// TIENDA DE TESOROS DRACÓNICOS - APP PRINCIPAL
// Gestión de pedidos con localStorage, validación completa
// =============================================

// Arreglo principal de pedidos (cargar desde localStorage al iniciar)
const pedidos = JSON.parse(localStorage.getItem('pedidosDragon')) || [];

// Referencias al DOM
const container = document.querySelector('.container');
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputRut = document.getElementById('rut');
const inputCorreo = document.getElementById('correo');
const inputTelefono = document.getElementById('telefono');
const inputDireccion = document.getElementById('direccion');
const inputProducto = document.getElementById('producto');
const inputPrecio = document.getElementById('precio');
const inputCantidad = document.getElementById('cantidad');
const inputTotal = document.getElementById('total');
const btnEnviar = document.getElementById('btnEnviar');
const btnLimpiarFormulario = document.getElementById('btnLimpiarFormulario');
const mensajeError = document.getElementById('mensajeError');
const listaPedidos = document.getElementById('listaPedidos');
const totalPedidosDiv = document.getElementById('totalPedidos');
const formulario = document.getElementById('formularioVentas');

// Expresiones regulares para validación
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelefono = /^(\+?56)?\s?9\s?[0-9]{4}\s?[0-9]{4}$/;

// ========== VALIDACIÓN DE RUT CHILENO ==========
function validarRut(rut) {
    // Limpiar el RUT: eliminar puntos, guión y espacios
    let rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').replace(/\s/g, '');
    
    // Verificar que tenga al menos 2 caracteres (número + dígito verificador)
    if (rutLimpio.length < 2) return false;
    
    // Separar número del dígito verificador
    const dv = rutLimpio.slice(-1).toUpperCase();
    const numero = rutLimpio.slice(0, -1);
    
    // Verificar que el número sea numérico
    if (!/^\d+$/.test(numero)) return false;
    
    // Verificar que el dígito verificador sea válido (0-9 o K)
    if (!/^[0-9K]$/.test(dv)) return false;
    
    // Calcular dígito verificador
    let suma = 0;
    let multiplo = 2;
    
    for (let i = numero.length - 1; i >= 0; i--) {
        suma += parseInt(numero[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    
    const resto = suma % 11;
    const dvCalculado = resto === 0 ? '0' : resto === 1 ? 'K' : (11 - resto).toString();
    
    return dv === dvCalculado;
}

function formatearRut(rut) {
    // Limpiar y formatear a XX.XXX.XXX-X
    let rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').replace(/\s/g, '');
    const dv = rutLimpio.slice(-1).toUpperCase();
    const numero = rutLimpio.slice(0, -1);
    
    // Formatear con puntos
    let numeroFormateado = '';
    let contador = 0;
    for (let i = numero.length - 1; i >= 0; i--) {
        numeroFormateado = numero[i] + numeroFormateado;
        contador++;
        if (contador === 3 && i > 0) {
            numeroFormateado = '.' + numeroFormateado;
            contador = 0;
        }
    }
    
    return numeroFormateado + '-' + dv;
}

// ========== CARRUSEL FLOTANTE ==========
const productosCatalogo = [
    { nombre: "Bestiario de Dragones", precio: 18990, imagen: "https://i.pinimg.com/736x/55/be/80/55be80b47b2bf518d67a6111a91bdcff.jpg", descripcion: "Libro ilustrado de leyendas dracónicas" },
    { nombre: "Polerón Escamas Nocturnas", precio: 29990, imagen: "https://i.pinimg.com/1200x/b9/79/55/b979558501b4dccc50a521ad5aa625b7.jpg", descripcion: "Polerón oscuro con escamas" },
    { nombre: "Collar Colmillo de Dragón", precio: 34990, imagen: "https://i.pinimg.com/1200x/12/1b/cc/121bccc7fa8ebbdbd7b35185dde6ff0c.jpg", descripcion: "Amuleto de plata con grabados rúnicos" },
    { nombre: "Polera Dragón Ancestral", precio: 21990, imagen: "https://i.pinimg.com/1200x/d8/56/79/d85679965064931d7894e8b1fe1a2b00.jpg", descripcion: "Polera diseño ancestral" },
    { nombre: "Figura Dragón de Ébano", precio: 49990, imagen: "https://i.pinimg.com/1200x/ca/63/03/ca6303dc7b98afaf8e3c43624d210f39.jpg", descripcion: "Figura de colección" }
];

const carruselFlotante = document.getElementById('carruselFlotante');
const btnAbrirCarrusel = document.getElementById('btnAbrirCarrusel');
const btnCerrarCarrusel = document.getElementById('btnCerrarCarrusel');
const carruselPista = document.getElementById('carruselPista');
const carruselPrev = document.querySelector('.carrusel-prev');
const carruselNext = document.querySelector('.carrusel-next');
const carruselIndicadores = document.getElementById('carruselIndicadores');

let indiceCarrusel = 0;

function construirCarrusel() {
    carruselPista.innerHTML = '';
    carruselIndicadores.innerHTML = '';
    productosCatalogo.forEach((producto, idx) => {
        const slide = document.createElement('div');
        slide.className = 'carrusel-item';
        slide.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>${producto.descripcion}</p>
            <div class="precio">$${producto.precio.toLocaleString('es-CL')}</div>
            <button class="btn-seleccionar-producto" data-idx="${idx}">✨ Seleccionar ✨</button>
        `;
        carruselPista.appendChild(slide);
        
        const punto = document.createElement('button');
        punto.className = 'carrusel-indicador';
        punto.dataset.indice = idx;
        punto.addEventListener('click', () => irASlide(idx));
        carruselIndicadores.appendChild(punto);
    });
    actualizarIndicadores();
}

function actualizarIndicadores() {
    const puntos = document.querySelectorAll('.carrusel-indicador');
    puntos.forEach((p, i) => {
        p.classList.toggle('activo', i === indiceCarrusel);
    });
}

function irASlide(indice) {
    indiceCarrusel = (indice + productosCatalogo.length) % productosCatalogo.length;
    carruselPista.style.transform = `translateX(-${indiceCarrusel * 100}%)`;
    actualizarIndicadores();
}

function abrirCarrusel() {
    carruselFlotante.style.display = 'block';
    void carruselFlotante.offsetWidth;
    carruselFlotante.classList.add('abierto');
    container.classList.add('desplazado');
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

// Eventos del carrusel
if (btnAbrirCarrusel) btnAbrirCarrusel.addEventListener('click', abrirCarrusel);
if (btnCerrarCarrusel) btnCerrarCarrusel.addEventListener('click', cerrarCarrusel);
if (carruselPrev) carruselPrev.addEventListener('click', () => irASlide(indiceCarrusel - 1));
if (carruselNext) carruselNext.addEventListener('click', () => irASlide(indiceCarrusel + 1));

// Seleccionar producto desde el carrusel
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-seleccionar-producto')) {
        const idx = e.target.getAttribute('data-idx');
        if (idx !== null) {
            const producto = productosCatalogo[parseInt(idx)];
            inputProducto.value = producto.nombre;
            inputPrecio.value = `$${producto.precio.toLocaleString('es-CL')}`;
            actualizarPrecioYTotal();
            cerrarCarrusel();
            mostrarMensaje(`✨ Has seleccionado: ${producto.nombre} ✨`, false);
        }
    }
});

// Construir el carrusel al cargar
construirCarrusel();

// ========== FUNCIONES DEL FORMULARIO ==========
function actualizarPrecioYTotal() {
    const precioTexto = inputPrecio.value;
    const precioNumerico = parseInt(precioTexto.replace(/\D/g, '')) || 0;
    let cantidad = parseInt(inputCantidad.value);
    if (isNaN(cantidad) || cantidad < 1) {
        cantidad = 1;
        inputCantidad.value = 1;
    }
    const total = precioNumerico * cantidad;
    inputTotal.value = `$${total.toLocaleString('es-CL')}`;
}

function sanitizarTexto(texto) {
    return texto.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function mostrarMensaje(texto, esError = true) {
    mensajeError.textContent = texto;
    mensajeError.style.color = esError ? '#ffb36b' : '#7dff7d';
}

function limpiarMensaje() {
    mensajeError.textContent = '';
}

function validarFormulario(nombre, apellido, rut, correo, telefono, direccion, producto, cantidad) {
    if (nombre === '' || apellido === '' || rut === '' || correo === '' || telefono === '' || direccion === '') {
        mostrarMensaje('¡Oh, Guardián! Debes completar todos los campos obligatorios.');
        return false;
    }
    if (nombre.length < 3) {
        mostrarMensaje('El nombre debe tener al menos 3 caracteres.');
        return false;
    }
    if (apellido.length < 3) {
        mostrarMensaje('El apellido debe tener al menos 3 caracteres.');
        return false;
    }
    if (!validarRut(rut)) {
        mostrarMensaje('El RUT ingresado no es válido. Verifica el número y dígito verificador.');
        return false;
    }
    if (!regexCorreo.test(correo)) {
        mostrarMensaje('El correo no tiene un formato válido para el reino.');
        return false;
    }
    if (!regexTelefono.test(telefono)) {
        mostrarMensaje('El teléfono debe tener formato chileno (Ej: +56 9 1234 5678 o 9 1234 5678).');
        return false;
    }
    if (direccion.length < 5) {
        mostrarMensaje('La dirección debe tener al menos 5 caracteres.');
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

function crearPedido(nombre, apellido, rut, correo, telefono, direccion, producto, cantidad, total) {
    return {
        id: Date.now(),
        nombre: nombre,
        apellido: apellido,
        rut: rut,
        correo: correo,
        telefono: telefono,
        direccion: direccion,
        producto: producto,
        cantidad: cantidad,
        total: total,
        fecha: new Date().toLocaleString('es-CL')
    };
}

function guardarEnLocalStorage() {
    localStorage.setItem('pedidosDragon', JSON.stringify(pedidos));
}

function agregarPedido(pedido) {
    pedidos.push(pedido);
    guardarEnLocalStorage();
}

function cancelarPedido(id) {
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return;
    const confirmado = confirm(`¿Estás seguro de que quieres cancelar el pedido de ${pedido.producto}?`);
    if (!confirmado) return;
    const indice = pedidos.findIndex(p => p.id === id);
    if (indice !== -1) {
        pedidos.splice(indice, 1);
        guardarEnLocalStorage();
        renderizarLista();
        mostrarMensaje(`Pedido de ${pedido.producto} cancelado.`, false);
    }
}

function calcularTotalGeneral() {
    const totalGeneral = pedidos.reduce((sum, p) => sum + p.total, 0);
    if (totalGeneral > 0) {
        totalPedidosDiv.innerHTML = `<strong>💰 Total recaudado por el reino: $${totalGeneral.toLocaleString('es-CL')}</strong>`;
    } else {
        totalPedidosDiv.innerHTML = '';
    }
}

function renderizarLista() {
    listaPedidos.textContent = '';
    if (pedidos.length === 0) {
        const itemVacio = document.createElement('li');
        itemVacio.textContent = 'No hay pedidos realizados al reino todavía.';
        listaPedidos.appendChild(itemVacio);
        totalPedidosDiv.innerHTML = '';
        return;
    }
    pedidos.forEach(pedido => {
        const item = document.createElement('li');
        item.innerHTML = `
            <p>🐉 Guardián: ${pedido.nombre} ${pedido.apellido}</p>
            <p>📜 RUT: ${pedido.rut}</p>
            <p>✉️ Correo: ${pedido.correo}</p>
            <p>📞 Teléfono: ${pedido.telefono}</p>
            <p>🏰 Dirección: ${pedido.direccion}</p>
            <p>🔥 Producto: ${pedido.producto}</p>
            <p>🔢 Cantidad: ${pedido.cantidad}</p>
            <p>💰 Total: $${pedido.total.toLocaleString('es-CL')}</p>
            <p>📅 Fecha: ${pedido.fecha}</p>
        `;
        const btnCancelar = document.createElement('button');
        btnCancelar.textContent = '❌ Cancelar Pedido';
        btnCancelar.classList.add('btnEliminar');
        btnCancelar.addEventListener('click', () => cancelarPedido(pedido.id));
        item.appendChild(btnCancelar);
        listaPedidos.appendChild(item);
    });
    calcularTotalGeneral();
}

function limpiarCamposFormulario() {
    inputNombre.value = '';
    inputApellido.value = '';
    inputRut.value = '';
    inputCorreo.value = '';
    inputTelefono.value = '';
    inputDireccion.value = '';
    inputProducto.value = '';
    inputPrecio.value = '';
    inputCantidad.value = '1';
    inputTotal.value = '';
    limpiarMensaje();
    mostrarMensaje('Pergamino limpiado por los vientos ancestrales.', false);
}

function procesarFormulario(event) {
    event.preventDefault();
    limpiarMensaje();
    const nombre = sanitizarTexto(inputNombre.value);
    const apellido = sanitizarTexto(inputApellido.value);
    const rutOriginal = sanitizarTexto(inputRut.value);
    const rut = formatearRut(rutOriginal); // Formatear RUT automáticamente
    const correo = sanitizarTexto(inputCorreo.value);
    const telefono = sanitizarTexto(inputTelefono.value);
    const direccion = sanitizarTexto(inputDireccion.value);
    const producto = inputProducto.value;
    const cantidad = parseInt(inputCantidad.value);
    const precioTexto = inputPrecio.value;
    const precioNumerico = parseInt(precioTexto.replace(/\D/g, '')) || 0;
    const total = precioNumerico * cantidad;
    
    if (!validarFormulario(nombre, apellido, rutOriginal, correo, telefono, direccion, producto, cantidad)) return;
    
    const nuevoPedido = crearPedido(nombre, apellido, rut, correo, telefono, direccion, producto, cantidad, total);
    agregarPedido(nuevoPedido);
    renderizarLista();
    limpiarCamposFormulario();
    mostrarMensaje(`✨ ¡Pedido de ${producto} realizado con éxito! ✨`, false);
}

// Formatear RUT mientras se escribe
inputRut.addEventListener('blur', function() {
    if (this.value.trim() !== '' && validarRut(this.value)) {
        this.value = formatearRut(this.value);
    }
});

inputCantidad.addEventListener('input', actualizarPrecioYTotal);
formulario.addEventListener('submit', procesarFormulario);
btnLimpiarFormulario.addEventListener('click', limpiarCamposFormulario);

// ========== INTERSECTION OBSERVER ==========
const listaSection = document.querySelector('.lista');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2, rootMargin: "0px 0px -20px 0px" });
if (listaSection) observer.observe(listaSection);

// ========== BOTÓN FLOTANTE ==========
const btnArriba = document.getElementById('btnArriba');
window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
        btnArriba.style.display = 'block';
    } else {
        btnArriba.style.display = 'none';
    }
});
btnArriba.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== CARGAR PEDIDOS AL INICIAR ==========
renderizarLista();
