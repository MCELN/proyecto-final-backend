
const addToCartButtons = document.querySelectorAll('.addToCart');
const logout = document.getElementById('logout');

logout.addEventListener('click', async (e) => {
    try {
        const response = await fetch('/api/session/logout', {
            method: 'DELETE',
        });

        if (response.ok) {
            window.location.href = '/api/session';
        } else {
            console.log('Error al cerrar sesión');
        }

    } catch (error) {
        console.log('Error al cerrar sesión', error)
    }
});

addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const productId = button.getAttribute('productId');
        const cartId = button.getAttribute('cartId');

        const requestData = {
            method: 'POST',
        };

        fetch(`/api/carts/${cartId}/product/${productId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                quantity: 1,
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al agregar el producto al carrito.');
                }
            })
            .then(function (data) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Producto agregado al carrito con éxito.',
                    showConfirmButton: false,
                    timer: 2000
                })
            })
            .catch(function (error) {
                alert(error.message);
            });
    });
});
