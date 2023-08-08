import { useState } from 'react'
import '../Styles/Popup.css'

export default function Popup({product, closePopup, addToCart, cart}) {

    const [cartChosen, setCartChosen] = useState(false);
    const [count, setCount] = useState(cart[product.id] ?? 0);

    let buttons;

    if (!cartChosen) buttons = <button className="add-to-cart" onClick={() => setCartChosen(true)}>Add to Cart</button>;
    else {
        buttons = (
            <>
            <div className="quantity-inputs">
                <div className="quantities">
                    <button className="quantity-button minus" onClick={() => {if (count > 0) setCount(count-1); else setCount(0)}}>-</button>
                    <input className="quantity-input-field" autoFocus={true} type="number" value={count} onChange={(e) => {if (e.target.value >= 0) setCount(e.target.value); else setCount(0)}}/>
                    <button className="quantity-button plus" onClick={() => setCount(count+1)}>+</button>
                </div>
                <div className="choices">
                    <button className="confirm choice-button" onClick={() => {addToCart(product.id, count); closePopup();}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" fill='currentColor'/></svg></button>
                    <button className="cancel choice-button" onClick={() => closePopup()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" fill='currentColor'/></svg></button>
                </div>
            </div>
            </> );
    }

    return (
        <div className="popup-container" onClick={(() => closePopup())}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-image-container"><img src={product.image} alt={product.title} className="popup-product-image" /></div>
                <div className="product-info">
                    <p className="product-title">{product.title}</p>
                    <p className="product-description">{product.description}</p>
                    <div className="popup-footer">
                        <p className="product-price">{product.price}</p>
                        <div className="buttons">
                            {buttons}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}