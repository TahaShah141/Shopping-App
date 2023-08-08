import { useOutletContext } from "react-router-dom"
import Tray from "./Tray";
import Popup from "./Popup";
import { useState } from "react";


export default function Shop() {

    const [popupShown, setPopupShown] = useState(false);
    const [popupProduct, setPopupProduct] = useState({});

    function showPopup(product) {
        if (popupShown) return;
        setPopupProduct(product);
        setPopupShown(true);
    }

    function closePopup() {
        setPopupProduct({});
        setPopupShown(false);
    }

    const {setNavHighlight, addToCart, categories, cart} = useOutletContext();
    setNavHighlight(0);

    let categoryTrays = [];
    if (categories) categoryTrays = categories.map(category => <Tray key={category} url={`https://fakestoreapi.com/products/category/${category}`} title={category} showPopup={showPopup}/>)

    return (
        <>
        <Tray url={'https://fakestoreapi.com/products/'} title="All Products" showPopup={showPopup}/>
        {categoryTrays}
        {popupShown && <Popup product={popupProduct} closePopup={closePopup} addToCart={addToCart} cart={cart}/>}
        </>
    )

}