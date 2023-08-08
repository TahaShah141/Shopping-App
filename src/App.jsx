import { useEffect, useState } from 'react'
import './App.css'
import Tray from './Components/Tray';
import Navigation from './Components/Navigation';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer';

function App() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [navHighlight, setNavHighlight] = useState(0);
  const [cart, setCart] = useState({});

  function addToCart(productID, count) {
    if (count > 0 )cart[productID] = count;
    else delete cart[productID];
    setCart(cart);
  }

  useEffect(() => {
    async function getCategories() {
      let response = await fetch('https://fakestoreapi.com/products/categories');
      let data = await response.json();

      setCategories(data);
    }
    getCategories();
  }, []);

  useEffect(() => {
      async function fetchData(url) {
        let response = await fetch(url);
        let data = await response.json();
        setProducts(data);
      }
      fetchData('https://fakestoreapi.com/products/');
  }, [])

  return (
    <>
    <Navigation highlightIndex={navHighlight}/>
    <Outlet context={{setNavHighlight, addToCart, categories, cart, products}}/>
    <Footer />
    </>
  )
}

export default App
