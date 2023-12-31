import { useState } from 'react';
import '../Styles/CartItem.css';



export default function CartItem({product, count, editCart}) {

    const [editing, setEditing] = useState(false);

    const [productCount, setCount] = useState(count);

    let controls;

    if (!editing) controls = (
        <>
            <p className="product-count">{count}</p>
            <div className="cart-buttons">
                <button className="cart-item-button edit-button" onClick={() => setEditing(true)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" fill='currentColor'/></svg></button>
                <button className="cart-item-button remove-button" onClick={() => editCart(product.id, 0)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" fill='currentColor'/></svg></button>
            </div>
        </>)
    else controls = (
        <>
            <div className="quantities">
                <button className="quantity-button minus" onClick={() => {if (productCount > 0) setCount(productCount-1); else setCount(0)}}>-</button>
                <input className="quantity-input-field" autoFocus={true} type="number" value={productCount} onChange={(e) => {if (e.target.value >= 0) setCount(e.target.value); else setCount(0)}}/>
                <button className="quantity-button plus" onClick={() => setCount(productCount+1)}>+</button>
            </div>
            <div className="choices">
                <button className="confirm choice-button" onClick={() => {editCart(product.id, productCount); setEditing(false);}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" fill='currentColor'/></svg></button>
                <button className="cancel choice-button" onClick={() => {setEditing(false); setCount(count)}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" fill='currentColor'/></svg></button>
            </div>
        </>
    )

    return (
        <div className="cart-item">
            <div className="cart-image-container"><img className="cart-item-image" src={product.image} alt={product.title} /></div>
            <p className="cart-product-title">{product.title}</p>
            {controls}
        </div>
    )
}