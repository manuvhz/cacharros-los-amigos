let vehiculos = [
    { marca: 'Mazda', modelo: 'CX-5 2023', cilindraje: 2500, imagen: 'https://movicentro.co/wp-content/uploads/2024/08/1-2.jpg', precio: 25000, id: 1 },
    { marca: 'BMW', modelo: 'X5 2022', cilindraje: 3000, imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/2019_BMW_X5_M50d_Automatic_3.0.jpg/640px-2019-BMW-X5-M50d-Automatic_3.0.jpg', precio: 50000, id: 2 },
    { marca: 'Audi', modelo: 'Q7 2023', cilindraje: 3500, imagen: 'https://http2.mlstatic.com/D_NQ_NP_972928-MCO79231560359_092024-O.webp', precio: 60000, id: 3 }
];

let carrito = [];

function agregarCarro() {
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const cilindraje = document.getElementById('cilindraje').value;
    const imagen = document.getElementById('imagen').value;
    const precio = document.getElementById('precio').value;

    if (marca && modelo && cilindraje && imagen && precio) {
        const carro = { marca, modelo, cilindraje, imagen, precio, id: Date.now() };
        vehiculos.push(carro);
        document.getElementById('marca').value = '';
        document.getElementById('modelo').value = '';
        document.getElementById('cilindraje').value = '';
        document.getElementById('imagen').value = '';
        document.getElementById('precio').value = '';
        mostrarCatalogo();
        mostrarToast('Vehículo agregado exitosamente', 'success');
    } else {
        mostrarToast('Por favor, complete todos los campos', 'danger');
    }
}

function mostrarCatalogo() {
    const catalogoContainer = document.getElementById('catalogoContainer');
    catalogoContainer.innerHTML = '';  

    vehiculos.forEach(carro => {
        const precioFormateado = parseInt(carro.precio).toLocaleString();

        const carroCard = `
            <div class="card">
                <img src="${carro.imagen}" class="card-img-top img-fluid" alt="${carro.modelo}">
                <div class="card-body">
                    <h5 class="card-title">${carro.marca} ${carro.modelo}</h5>
                    <p class="card-text">Cilindraje: ${carro.cilindraje}cc</p>
                    <p class="card-text">Precio: $${precioFormateado}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${carro.id})">Agregar al carrito</button>
                </div>
            </div>
        `;
        catalogoContainer.innerHTML += carroCard;
    });
}

function agregarAlCarrito(id) {
    const carro = vehiculos.find(c => c.id === id);
    if (!carrito.includes(carro)) {
        carrito.push(carro);
        document.getElementById('carritoCount').innerText = carrito.length;
        mostrarToast(`${carro.marca} ${carro.modelo} agregado al carrito`, 'success');
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(carro => carro.id !== id);
    mostrarFactura();
    document.getElementById('carritoCount').innerText = carrito.length;
}

function mostrarToast(mensaje, tipo) {
    const toast = new bootstrap.Toast(document.getElementById('toastMessage'));
    document.getElementById('toastBody').innerText = mensaje;
    document.getElementById('toastMessage').classList.remove('bg-danger', 'bg-success');
    document.getElementById('toastMessage').classList.add(`bg-${tipo}`);
    toast.show();
}

function mostrarFactura() {
    const detalleCarrito = document.getElementById('detalleCarrito');
    detalleCarrito.innerHTML = '';
    let total = 0;
    carrito.forEach(carro => {
        const precioFormateado = parseInt(carro.precio).toLocaleString(); // Formatear el precio con separador de miles
        const item = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${carro.marca} ${carro.modelo} - $${precioFormateado}
                <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${carro.id})">
                    Eliminar
                </button>
            </li>
        `;
        detalleCarrito.innerHTML += item;
        total += parseFloat(carro.precio);
    });
    document.getElementById('totalCarrito').innerText = `Total: $${total.toLocaleString()}`; // Formatear el total con separador de miles
}

document.getElementById('carritoBtn').addEventListener('click', mostrarFactura);
