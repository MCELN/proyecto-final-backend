const socket = io();

const addProd = document.getElementById( 'addProduct' );

addProd.addEventListener( 'submit', async ( e ) => {
    e.preventDefault();

    const products = new FormData( addProd );

    const obj = {};

    products.forEach(( value, key ) => ( obj[key] = value ));

    socket.emit( 'addProd', obj );

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

