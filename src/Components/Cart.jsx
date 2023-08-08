import { Link, useOutletContext } from "react-router-dom";
import CartItem from "./CartItem";
import '../Styles/Cart.css';
import { useEffect, useState } from "react";
import BillItem from "./BillItem";

export default function Cart() {

    const {setNavHighlight, products, addToCart, cart} = useOutletContext();
    const [summaries, setSummaries] = useState([]);
    const [bills, setBills] = useState([]);
    const [localCart, setLocalCart] = useState(cart);

    function addCart(productID, count) {
        if (count > 0 )localCart[productID] = count;
        else delete localCart[productID];

        setLocalCart(localCart);
        updateDisplays();

        addToCart(productID, count);
    } 

    function updateDisplays() {
        let IDs = Object.keys(localCart);
        let summary = [];
        let bill = [];

        if (IDs.length === 0) {
            setSummaries(<p style={{color: 'white', fontSize: '2rem'}}>Please Add some Items to the cart first.</p>);
            setBills(<p style={{color: 'white', fontSize: '2rem'}}>Spend some money.</p>);
            return;
        } 

        for (let i = 0; i < IDs.length; i++) {
            let ID = IDs[i];

            bill.push(<BillItem key={ID} product={products[ID-1]} count={localCart[ID]} />)
            summary.push(<CartItem key={ID} product={products[ID-1]} count={localCart[ID]} editCart={addCart}/>);
        }

        setBills(bill);
        setSummaries(summary);
    }

    useEffect(() => {
        updateDisplays();
    }, []);

    setNavHighlight(1);
    return (
        <>
        <div className="cart-info">
            <div className="cart-summary">
                <div className="summaries">
                    {summaries}
                </div>
            </div>
            <div className="bill-container">
                <div className="bills">
                    {bills}
                </div>
                <div className="bill-buttons">
                    <button className="bill-button shopping"><Link to='/shop' >Shopping</Link></button>                    
                    <button className="bill-button checkout">CheckOut</button>
                </div>
            </div>
        </div>
        </>
    )

}