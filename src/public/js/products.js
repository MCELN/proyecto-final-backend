
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.addToCart');


    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const productId = button.getAttribute('productId');
            const cartId = button.getAttribute('cartId');

            const requestData = {
                method: 'Post',
            };

            fetch(`/api/carts/${cartId}/product/${productId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'Put',
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
                .then(function(data) {
                    alert('Producto agregado al carrito con éxito.');
                })
                .catch(function(error) {
                    alert(error.message);
                });
        });
    });
});
