const cartIcon = document.querySelector('.cart-icon');
const cartModalContainer = document.querySelector('.cart-modal-container');
const cartModalContent = document.querySelector('.cart-modal-wrapper');
const cartOverlay = document.querySelector('.cart-modal-overlay');
const cartModalList = document.querySelector('.cart-modal-list');
const buttonsAddToCart = document.querySelectorAll('.add-to-cart');
const emptyCartButton = document.querySelector('.delete-products');
let cartDeleteProduct = document.querySelectorAll('.cart-delete-product');
const body = document.body;

let articulosCarrito = [];

cartIcon.addEventListener('click', () => {
  body.classList.toggle('hidden');
  cartModalContainer.classList.add('open');
  cartModalContent.classList.add('open');
  cartOverlay.classList.add('open');
});

cartOverlay.addEventListener('click', () => {
  body.classList.remove('hidden');
  cartModalContainer.classList.remove('open');
  cartModalContent.classList.remove('open');
  cartOverlay.classList.remove('open');
});

function loadListeners() {
  buttonsAddToCart.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart')) {
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
      }
    });
  });

  cartDeleteProduct.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('cart-delete-product')) {
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(
          (curso) => curso.id !== cursoId
        );

        carritoHTML();
      }
    });
  });

  emptyCartButton.addEventListener('click', (e) => {
    while (cartModalList.firstChild) {
      cartModalList.removeChild(cartModalList.firstChild);
    }
  });
}

function agregarCurso(e) {
  if (e.target.classList.contains('add-to-cart')) {
    const curso = e.target.parentElement.parentElement;
    leerDatosCurso(curso);
  }
}

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector('.product-image').src,
    precio: curso.querySelector('.product-price').textContent,
    id: curso.querySelector('button').getAttribute('data-id'),
    cantidad: 1,
  };

  if (articulosCarrito.some((curso) => curso.id === infoCurso.id)) {
    cartDeleteProduct = document.querySelectorAll('.cart-delete-product');
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id !== infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [infoCurso];
  }
  carritoHTML();
}

function carritoHTML() {
  articulosCarrito.forEach((curso) => {
    const row = document.createElement('li');
    row.style.display = 'flex';
    row.style.justifyContent = 'space-between';
    row.style.alignItems = 'center';
    row.style.gap = '2rem';

    row.innerHTML = `
            <figure class="cart-modal-image-container">  
                 <img src="${curso.imagen}" width=100>
            </figure>
            <div>${curso.precio}</div>
            <div>${curso.cantidad} </div>
            <div>
                 <a href="#" class="cart-delete-product" data-id="${curso.id}">X</a>
            </div>
       `;
    cartModalList.appendChild(row);
  });
}

loadListeners();
