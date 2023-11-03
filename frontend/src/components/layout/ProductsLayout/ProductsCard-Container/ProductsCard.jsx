import { Link } from 'react-router-dom'
import CloudinaryImg from '../../../utils/Cloudinary Image/CloudinaryImg'
import Rating from '../../../utils/Rating/Rating'
import './products-card.css'
export default function ProductsCard({ product }) {
    return (
        <div className="products-card-container">
            <Link to={`/product/${product._id}`} className="product-link">
                <div className="product-card-image">
                    <CloudinaryImg public_id={product.images[0].public_id} />
                </div>
                <div className="product-details">
                    <div className="name">
                        {product.name}
                    </div>
                    <div className="price-with-discount">
                        <div className="price">
                            {`Rs.${product.originalPrice}`}
                        </div>
                        <div className="discount">
                            {`${product.discount}% Off`}
                        </div>
                    </div>
                    <div className="current-price">
                        {`Rs.${product.price}`}
                    </div>
                    <div className="rating">
                        <Rating rating={product.rating} />
                    </div>
                    <div className="review-count">
                        {`${product.numOfReviews} Reviews`}
                    </div>
                </div>
            </Link>
        </div>
    )
}