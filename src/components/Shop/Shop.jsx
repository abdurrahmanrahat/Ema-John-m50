import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // fetch url
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, []);

    useEffect( () => {
        const storedCart = getShoppingCart;
        // console.log(storedCart);
    }, []) 

    const handlerAddToCart = (product) => {
        // console.log(product);
        // React JS এ array তে push করা যায় না, নতুন array বানিয়ে পাঠানো লাগে set function এ।
        const newCart = [...cart, product];
        setCart(newCart);

        // এই function টা just id parameter হিসেবে নিবে। 
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product 
                        key={product.id}
                        product={product}
                        handlerAddToCart={handlerAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;