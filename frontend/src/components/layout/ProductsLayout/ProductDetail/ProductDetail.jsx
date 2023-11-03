import './product-detail.css'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useParams } from "react-router-dom"
import { ProductDetailContext } from '../../../../context/ProductContext'
import Slider from 'react-slick'
import CloudinaryImg from '../../../utils/Cloudinary Image/CloudinaryImg'
import Rating from '../../../utils/Rating/Rating'
import DynamicRating from '../../../utils/DynamicRating/DynamicRating'
import { CircularProgress } from '@mui/material'
import MODE from '../../../../mode'
export const DynamicRatingContext = createContext()
export default function ProductDetail() {
    const param = useParams()
    const product_id = param.id
    const reviewInputRef = useRef()
    const [ratingValue, setRatingVal] = useState(0)
    const [isReviewFetching, setReviewFetching] = useState(false)
    const [reviewState, setReviewState] = useState("")
    const [error, setError] = useState("")
    const { productDetail, dispatch } = useContext(ProductDetailContext)
    useEffect(() => {
        dispatch({
            type: 'FETCHING_PRODUCT'
        })
        const fetchProductDetail = async () => {
            try {
                const fetchedProduct = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/product/${product_id}`)
                const jsonProductDetail = await fetchedProduct.json()
                dispatch({
                    type: 'PRODUCT_SUCCESS',
                    payload: jsonProductDetail
                })
            } catch (error) {
                dispatch({
                    type: 'PRODUCT_FAILED',
                    payload: error
                })
            }
        }
        fetchProductDetail()
    }, [])
    const addReview = async (e) => {
        e.preventDefault()
        if (reviewState === "") {
            try {
                setReviewFetching(true)
                const addedReview = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/product/reviews`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        rating: ratingValue,
                        comment: reviewInputRef.current.value,
                        productId: product_id
                    }),
                    credentials: 'include'
                })
                const jsonAddedReview = await addedReview.json()
                setReviewFetching(false)
                setReviewState(jsonAddedReview.message)
            } catch (error) {
                setReviewFetching(false)
                setError(error)
            }
        }
    }
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        <div className="product-detail-container">
            {productDetail.productFetchedData &&
                <>
                    <div className="product-detail-top">
                        <Slider {...settings} className='product-images-slider'>
                            {productDetail.productFetchedData.product.images.map((image) => {
                                return <CloudinaryImg public_id={image.public_id} key={image._id} />
                            })}
                        </Slider>
                        <div className="product-name">{productDetail.productFetchedData.product.name}</div>
                        <div className="product-price">Rs.{productDetail.productFetchedData.product.price}/-</div>
                        <div className="product-rating"><Rating rating={productDetail.productFetchedData.product.rating} /></div>
                    </div>
                    <div className="product-detail-bottom">
                        <div className="product-description">
                            <h2>Product Description:</h2>
                            <div className="description">
                                {productDetail.productFetchedData.product.description}
                            </div>
                        </div>
                        <div className="add-product-review">
                            <h2>Add Review:</h2>
                            <div className="review-form">
                                <form>
                                    <label>
                                        <input type="text" ref={reviewInputRef} placeholder='Add your Review' className='review-input' />
                                    </label>
                                    <DynamicRatingContext.Provider value={{ ratingValue, setRatingVal }}>
                                        <DynamicRating />
                                    </DynamicRatingContext.Provider>
                                    {
                                        error ? <div className="error">{error}</div> :
                                            <div className={reviewState ? "review-submitted-button" : "review-submit-button"} onClick={addReview}>
                                                {isReviewFetching ? <CircularProgress /> : reviewState ? reviewState : "Add Review"}
                                            </div>
                                    }
                                </form>
                            </div>
                        </div>
                        <div className="product-reviews">
                            <h2>Customer Reviews:</h2>
                            <div className="reviews">
                                {productDetail.productFetchedData.product.reviews.map((review) => {
                                    return (
                                        <div className="review" key={review.user}>
                                            <div className="reviewer-details">
                                                <div className="reviewer-avtar">
                                                    <CloudinaryImg public_id={review.avtar.public_id} />
                                                </div>
                                                <div>
                                                    <div className="reviewer-name">{review.name}</div>
                                                    <div className="reviewer-rating"><Rating rating={review.rating} /></div>
                                                </div>
                                            </div>
                                            <div className="reviewer-comment">{review.comment}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}