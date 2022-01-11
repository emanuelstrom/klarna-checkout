import fetch from 'node-fetch';

async function getFakeStoreCart(cartItems){
    const completeCart = cartItems;

    let cellNumber = 0;
    for (const currentItem of cartItems) {
        const id = currentItem.id;
        const quantity = currentItem.quantity;

        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        data.quantity = quantity;

        completeCart[cellNumber] = data;
        cellNumber++;
    }

    return completeCart;
}

function fakeStoreToKlarnaCart(fakeStoreCart) {

    const klarnaCart = fakeStoreCart.map((fakeStoreItem) => {
        return {            
            "type": "physical", // same
            "reference": fakeStoreItem.id,
            "name": fakeStoreItem.title,
            "quantity": fakeStoreItem.quantity,
            "quantity_unit": "pcs", // same
            "unit_price": parseInt(fakeStoreItem.price) * 100,
            "tax_rate": 1000, // same
            "total_discount_amount": 0, // same
            "image_url": fakeStoreItem.image,
        }
    });

    return klarnaCart;

}

module.exports = {getFakeStoreCart, fakeStoreToKlarnaCart};

