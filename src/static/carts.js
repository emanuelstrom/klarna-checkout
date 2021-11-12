const blueTShirt = require('./products.js');

function getCarts() {
    const cartOneBlueTShirt = {};
    const cartTwoBlueTShirt = {};
    
    Object.assign(cartOneBlueTShirt, blueTShirt);
    Object.assign(cartTwoBlueTShirt, blueTShirt);

    cartOneBlueTShirt.quantity = 2;
    const cartOne = [
        cartOneBlueTShirt
    ];

    cartTwoBlueTShirt.quantity = 5;
    const cartTwo = [
        cartTwoBlueTShirt,
    ];
    
    return {
        "AAA-123" : cartOne,
        "BBB-123" : cartTwo
    }
}

module.exports = getCarts;