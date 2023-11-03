import './dynamic-rating.css'
import React, { useContext, useEffect, useState } from 'react';
import { DynamicRatingContext } from '../../layout/ProductsLayout/ProductDetail/ProductDetail';

const DynamicRating = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const { setRatingVal } = useContext(DynamicRatingContext)
    const handleStarClick = (event) => {
        let target = event.target;
        // check if target is child element of SVG
        while (target.tagName !== "svg") {
            target = target.parentElement;
        }
        const starIndex = parseInt(target.getAttribute("data-index"))
        // Calculate the new rating based on the clicked star
        const newRating = starIndex + 1;
        // Update the rating state
        setRating(newRating);
    };

    const handleStarHover = (event) => {
        let target = event.target;
        // check if target is child element of SVG
        while (target.tagName !== "svg") {
            target = target.parentElement;
        }
        // Get the index of the hovered star
        const starIndex = parseInt(event.target.getAttribute('data-index'));
        // Set the hover rating state to the index of the hovered star
        setHoverRating(starIndex + 1);
    };

    const handleStarHoverEnd = () => {
        // Reset the hover rating state when the mouse leaves the star container
        setHoverRating(0);
    };

    useEffect(()=>{
        if(rating !== 0){
            setRatingVal(rating)
        }
    }, [rating])

    return (
        <div className="dynamic-rating-container" onMouseLeave={handleStarHoverEnd}>
            {[...Array(5)].map((star, index) => (
                <svg key={index} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                    fill={index < hoverRating || index < rating ? "#FFC107" : "#CCCCCC"} data-index={index}
                    onClick={handleStarClick} onMouseEnter={handleStarHover}
                    style={{ cursor: 'pointer' }}>
                    <path d="M10 1.5L13.636 7.167H19.5L14.727 11.583L16.455 17.833L10 14.167L3.545 17.833L5.273 11.583L0.5 7.167H6.364L10 1.5Z" />
                </svg>
            ))}
        </div>
    );
};

export default DynamicRating;
