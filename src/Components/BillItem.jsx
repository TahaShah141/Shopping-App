import '../Styles/BIllItem.css';

export default function BillItem({product, count}) {

    return (
        <div className="bill-item">
            <div className="bill-image-container"><img className="bill-item-image" src={product.image} alt={product.title} /></div>
            <p className="product-count">{count}</p>
            <p className="bill-total-price">{product.price*count}</p>
        </div>
    )
}