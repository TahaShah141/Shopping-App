import Product from "./Product";
import '../Styles/Tray.css';
import { useEffect, useState } from "react";

export default function Tray({url, displaySize=5, title="", showPopup}) {

    const [size, setSize] = useState(displaySize);
    const [data, setData] = useState([]);
    const [startingIndex, setStartingIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [onDisplay, setOnDisplay] = useState([]);

    function updateStartingIndex(offset) {
        let newIndex = startingIndex+offset;

        if (newIndex < 0) newIndex += data.length;
        if (newIndex >= data.length) newIndex = newIndex % data.length;

        setStartingIndex(newIndex);
    }

    function getArraySlice(array, start, end) {
        let length = array.length;
        if (length === 0) return [];

        if (start >= length) start = start % length;
        if (end >= length) end = end % length;

        if (start < 0) start = start + length;
        if (end < 0) end = end + length;

        if (end >= start) return array.slice(start, end+1);
        if (start > end) return array.slice(start).concat(array.slice(0, end+1));
    }

    useEffect(() => {
        async function fetchData() {
            let response = await fetch(url);
            let data = await response.json();
            setData(data);
            if (data.length < size) setSize(data.length - ((data.length+1)%2));
            setLoading(false);
        }

        fetchData();

    }, [url]);

    useEffect(() => {

        if (loading) return;
        let offset = Math.floor(size/2);

        let products = getArraySlice(data, startingIndex-offset, startingIndex+offset);

        let newDisplay = [];
        for (let i = 0; i < products.length; i++) {
            let className = "product-display";
            let o = offset-i;
            if (o < 0) o *= -1;
            let onClick = () => {};

            if (o === 0) {
                className += " primary";
                onClick = () => showPopup(products[i]);
            }
            else if (o === 1) {
                 className += " secondary";
                 onClick = () => updateStartingIndex(i-offset);
            }
            else {
                className += " tertiary";
                onClick = () => updateStartingIndex(i-offset);
            }

            newDisplay.push(<Product key={products[i].id} classes={className} product={products[i]} onClick={onClick}/>)
        }

        setOnDisplay(newDisplay);

    }, [startingIndex, size, loading, data]);

    if (!loading) return (
        <div className="tray">
        <h1 className="tray-header">{title}</h1>
        <div className="product-tray">
            <button className="tray-button next-product" onClick={() => updateStartingIndex(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" fill="currentColor"/></svg>
            </button>
            <div className="tray-items-container">
                {onDisplay}
            </div>
            <button className="tray-button next-product" onClick={() => updateStartingIndex(+1)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" fill="currentColor"/></svg>
            </button>
        </div>
        </div>
    )
    else return (
        <div className="product-tray">
            <p className="loading-text">...Loading</p>
        </div>
    )
}