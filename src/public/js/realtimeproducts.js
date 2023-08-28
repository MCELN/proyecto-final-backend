const socket = io();

const addProd = document.getElementById( 'addProduct' );

addProd.addEventListener( 'submit', async ( e ) => {
    e.preventDefault();

    const products = new FormData( addProd );

    const obj = {};

    products.forEach(( value, key ) => ( obj[key] = value ));

    try {
        await fetch( '/api/products', {
            headers: {
                "Content-type": "application/json",
            },
            method: "Post",
            body: JSON.stringify(obj),
        });
        socket.emit( 'addProd', obj );
    } catch (error) {
        console.log(error);
    }


    addProd.reset();
})

socket.on( 'newProduct', data => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Se acaba de ingresar el producto ${ data } `,
        showConfirmButton: false,
        timer: 2000
    })
})

