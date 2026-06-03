var productsData = {
    farenheit: {
        id: 'farenheit',
        name: 'Farenheit (Grey)',
        category: 'Gafas de hombre',
        price: 575.0,
        image: 'imagenes/s1.jpg',
        reference: 'REF-001',
        description: 'Montura moderna gris con lentes de alta calidad y estilo elegante para uso diario.'
    },
    opium: {
        id: 'opium',
        name: 'Opium (Grey)',
        category: 'Gafas de hombre',
        price: 325.0,
        image: 'imagenes/s2.jpg',
        reference: 'REF-002',
        description: 'Lentes ligeros color gris con detalles sofisticados y diseño cómodo.'
    },
    kenneth: {
        id: 'kenneth',
        name: 'Kenneth Cole',
        category: 'Gafas unisex',
        price: 575.0,
        image: 'imagenes/s3.jpg',
        reference: 'REF-003',
        description: 'Diseño contemporáneo con marco resistente y acabado premium.'
    },
    'farenheit-oval': {
        id: 'farenheit-oval',
        name: 'Farenheit Oval',
        category: 'Gafas de hombre',
        price: 325.0,
        image: 'imagenes/s4.jpg',
        reference: 'REF-004',
        description: 'Estilo ovalado con montura clásica y ajuste cómodo para todos los días.'
    },
    aislin: {
        id: 'aislin',
        name: 'Aislin Wayfarer',
        category: 'Gafas de mujer',
        price: 775.0,
        image: 'imagenes/m1.jpg',
        reference: 'REF-005',
        description: 'Elegantes gafas Wayfarer con un toque moderno y acabado brillante.'
    },
    azmani: {
        id: 'azmani',
        name: 'Azmani Round',
        category: 'Gafas de mujer',
        price: 725.0,
        image: 'imagenes/m2.jpg',
        reference: 'REF-006',
        description: 'Lentes redondos con estilo retro y detalles que resaltan en cualquier look.'
    },
    'farenheit-wayfarer': {
        id: 'farenheit-wayfarer',
        name: 'Farenheit Wayfarer',
        category: 'Gafas de hombre',
        price: 475.0,
        image: 'imagenes/m3.jpg',
        reference: 'REF-007',
        description: 'Clásicas Wayfarer con diseño robusto y comodidad mejorada.'
    },
    'fossil-wayfarer': {
        id: 'fossil-wayfarer',
        name: 'Fossil Wayfarer',
        category: 'Gafas de mujer',
        price: 825.0,
        image: 'imagenes/m4.jpg',
        reference: 'REF-008',
        description: 'Lentes de alta gama con diseño contemporáneo y líneas sofisticadas.'
    }
};

function getCart() {
    var cartData = localStorage.getItem('olamCart');
    if (!cartData) {
        cartData = localStorage.getItem('gogglesCart');
        if (cartData) {
            localStorage.setItem('olamCart', cartData);
        }
    }
    return cartData ? JSON.parse(cartData) : [];
}

function saveCart(cart) {
    localStorage.setItem('olamCart', JSON.stringify(cart));
}

function updateCartCount() {
    var cart = getCart();
    var count = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);
    var badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = count;
    }
}

function addToCart(productId) {
    var product = productsData[productId];
    if (!product) {
        alert('Producto no encontrado.');
        return;
    }
    var cart = getCart();
    var existing = cart.find(function(item) {
        return item.id === productId;
    });
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    saveCart(cart);
    updateCartCount();
}

function getQueryParam(key) {
    var params = new URLSearchParams(window.location.search);
    return params.get(key);
}

function renderProductDetails() {
    var productId = getQueryParam('product');
    var product = productsData[productId];
    var image = document.getElementById('product-image');
    var name = document.getElementById('product-name');
    var category = document.getElementById('product-category');
    var reference = document.getElementById('product-reference');
    var price = document.getElementById('product-price');
    var description = document.getElementById('product-description');
    var addButton = document.getElementById('add-to-cart-single');

    if (!product || !name || !price || !description || !reference || !category || !image) {
        return;
    }

    image.src = product.image;
    image.alt = product.name;
    name.textContent = product.name;
    category.textContent = product.category;
    reference.textContent = 'Referencia: ' + product.reference;
    price.textContent = '$' + product.price.toFixed(2);
    description.textContent = product.description;

    if (addButton) {
        addButton.addEventListener('click', function() {
            addToCart(product.id);
        });
    }
}

function renderCartPage() {
    var cartItems = document.getElementById('cart-items');
    var cartSummary = document.getElementById('cart-summary');
    if (!cartItems || !cartSummary) {
        return;
    }

    var cart = getCart();
    if (!cart.length) {
        cartItems.innerHTML = '<div class="alert alert-info">Tu carrito está vacío.</div><a href="categories.html" class="btn btn-primary">Ver catalogo</a>';
        cartSummary.innerHTML = '';
        return;
    }

    var total = 0;
    var html = '<div class="table-responsive"><table class="table table-bordered"><thead><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Total</th><th>Acción</th></tr></thead><tbody>';
    cart.forEach(function(item) {
        var itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += '<tr>' +
            '<td><div class="d-flex align-items-center"><img src="' + item.image + '" alt="' + item.name + '" style="width:70px;height:70px;object-fit:cover;margin-right:12px;">' + item.name + '</div></td>' +
            '<td>$' + item.price.toFixed(2) + '</td>' +
            '<td>' + item.quantity + '</td>' +
            '<td>$' + itemTotal.toFixed(2) + '</td>' +
            '<td><button class="btn btn-sm btn-danger remove-cart-item" data-product="' + item.id + '">Eliminar</button></td>' +
            '</tr>';
    });
    html += '</tbody></table></div>';
    cartItems.innerHTML = html;
    cartSummary.innerHTML = '<h4>Total: $' + total.toFixed(2) + '</h4><a href="categories.html" class="btn btn-secondary mr-2">Seguir comprando</a><button id="clear-cart" class="btn btn-danger">Vaciar carrito</button>';

    document.querySelectorAll('.remove-cart-item').forEach(function(button) {
        button.addEventListener('click', function() {
            removeFromCart(this.dataset.product);
        });
    });
    var clearButton = document.getElementById('clear-cart');
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            saveCart([]);
            updateCartCount();
            renderCartPage();
        });
    }
}

function removeFromCart(productId) {
    var cart = getCart();
    var updated = cart.filter(function(item) {
        return item.id !== productId;
    });
    saveCart(updated);
    updateCartCount();
    renderCartPage();
}

function attachCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(function(button) {
        button.addEventListener('click', function() {
            var productId = this.dataset.product;
            addToCart(productId);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount(); // Actualizar contador al cargar

    var productNameToId = {
        'Farenheit': 'farenheit',
        'Opium (Grey)': 'opium',
        'Kenneth Cole': 'kenneth',
        'Farenheit Oval': 'farenheit-oval',
        'Aislin Wayfarer': 'aislin',
        'Azmani Round': 'azmani',
        'Farenheit Wayfarer': 'farenheit-wayfarer',
        'Fossil Wayfarer': 'fossil-wayfarer'
    };

    document.querySelectorAll('.googles-cart').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            var form = this.closest('form');
            var itemName = form.querySelector('input[name="googles_item"]').value;
            var productId = productNameToId[itemName];
            if (!productId) {
                alert('Producto no encontrado.');
                return;
            }
            var product = productsData[productId];
            $('#confirmModal').modal('show');
            $('#product-name-confirm').text(product.name);
            $('#confirm-add').off('click').on('click', function() {
                addToCart(productId);
                $('#confirmModal').modal('hide');
            });
        });
    });

    var overlayLogin = document.querySelector('.overlay-login');
    var overlaySearch = document.querySelector('.overlay-door');
    var btnOpenLogin = document.querySelector('.button-log .btn-open');
    var overlayCloseLogin = document.querySelector('.overlay-close1');
    var overlayCloseSearch = document.querySelector('.overlay-close');

    if (btnOpenLogin) {
        btnOpenLogin.addEventListener('click', function(event) {
            event.preventDefault();
            if (overlayLogin) overlayLogin.classList.toggle('active');
            this.classList.toggle('btn-close');
        });
    }

    if (overlayCloseLogin) {
        overlayCloseLogin.addEventListener('click', function() {
            if (overlayLogin) overlayLogin.classList.remove('active');
            if (btnOpenLogin) btnOpenLogin.classList.remove('btn-close');
        });
    }

    if (overlaySearch) {
        var searchTrigger = document.getElementById('trigger-overlay');
        if (searchTrigger) {
            searchTrigger.addEventListener('click', function(event) {
                event.preventDefault();
                overlaySearch.classList.toggle('active');
            });
        }
    }

    if (overlayCloseSearch) {
        overlayCloseSearch.addEventListener('click', function() {
            if (overlaySearch) overlaySearch.classList.remove('active');
        });
    }

    if (typeof $ === 'function') {
        $('.dropdown').hover(
            function() {
                $('.dropdown-menu', this).stop(true, true).slideDown('fast');
                $(this).toggleClass('open');
            },
            function() {
                $('.dropdown-menu', this).stop(true, true).slideUp('fast');
                $(this).toggleClass('open');
            }
        );

        $('.scroll').click(function(event) {
            event.preventDefault();
            $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 900);
        });

        if ($('.owl-carousel').length && typeof $.fn.owlCarousel === 'function') {
            $('.owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                responsiveClass: true,
                responsive: {
                    0: { items: 1, nav: true },
                    600: { items: 2, nav: false },
                    900: { items: 3, nav: false },
                    1000: { items: 4, nav: true, loop: false, margin: 20 }
                }
            });
        }

        // Carrusel 1: Banner principal (#carouselPrincipal)
        if ($('#carouselPrincipal').length && typeof $.fn.carousel === 'function') {
            $('#carouselPrincipal').carousel({
                interval: 10000,
                pause: 'hover',
                wrap: true
            });

            // Forzar flechas SOLO para el carrusel principal
            $('#carouselPrincipal .carousel-control-prev').off('click').on('click', function(e) {
                e.preventDefault();
                $('#carouselPrincipal').carousel('prev');
            });

            $('#carouselPrincipal .carousel-control-next').off('click').on('click', function(e) {
                e.preventDefault();
                $('#carouselPrincipal').carousel('next');
            });
        }

        // Carrusel 2: Glasses People (#glassesPeopleCarousel)
        if ($('#glassesPeopleCarousel').length && typeof $.fn.carousel === 'function') {
            $('#glassesPeopleCarousel').carousel({
                interval: 5500,
                pause: 'hover',
                wrap: true
            });

            // Forzar flechas SOLO para el segundo carrusel
            $('#glassesPeopleCarousel .carousel-control-prev').off('click').on('click', function(e) {
                e.preventDefault();
                $('#glassesPeopleCarousel').carousel('prev');
            });

            $('#glassesPeopleCarousel .carousel-control-next').off('click').on('click', function(e) {
                e.preventDefault();
                $('#glassesPeopleCarousel').carousel('next');
            });
        }

        if (typeof simplyCountdown === 'function') {
            var d = new Date();
            simplyCountdown('simply-countdown-custom', {
                year: d.getFullYear(),
                month: d.getMonth() + 2,
                day: 25
            });
        }

        updateCartCount();
        attachCartButtons();

        if (document.body.dataset.page === 'single') {
            renderProductDetails();
        }
    }
    if (document.body.dataset.page === 'cart') {
        renderCartPage();
    }
});