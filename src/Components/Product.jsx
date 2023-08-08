import '../Styles/Product.css'

export default function Product({product, classes, onClick}) {

    return (
        <div className={classes} onClick={onClick}>
            <div className="image-container"><img src={product.image} alt={product.title} className="product-image" /></div>
        </div>
    );
}