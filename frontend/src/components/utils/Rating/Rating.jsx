import { useEffect, useRef, useState } from 'react';
import './rating.css'
const Rating = ({ rating }) => {
    const ratingContainerRef = useRef()
    const fullStars = Math.floor(rating);
    const partialStar = rating - fullStars;
    const emptyStars = 5 - fullStars - Math.ceil(partialStar);
    const [displayRating, setDisplayRating] = useState(false)
    useEffect(()=>{
        const rating_stars_container = ratingContainerRef.current
        rating_stars_container.onmouseover = ()=>{
            setDisplayRating(true)
        }
        rating_stars_container.onmouseleave = ()=>{
            setDisplayRating(false)
        }
    }, [])
    return (
      <div className="rating-stars-container" ref={ratingContainerRef}>
        {[...Array(fullStars)].map((star, index) => (
          <svg key={index} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#FFC107">
            <path d="M10 1.5L13.636 7.167H19.5L14.727 11.583L16.455 17.833L10 14.167L3.545 17.833L5.273 11.583L0.5 7.167H6.364L10 1.5Z" />
          </svg>
        ))}
        {partialStar > 0 && (
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#FFC107">
            <defs>
              <linearGradient id="partialStarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset={`${partialStar * 100}%`} stopColor="#FFC107" />
                <stop offset={`${partialStar * 100}%`} stopColor="#CCCCCC" />
              </linearGradient>
            </defs>
            <path d="M10 1.5L13.636 7.167H19.5L14.727 11.583L16.455 17.833L10 14.167L3.545 17.833L5.273 11.583L0.5 7.167H6.364L10 1.5Z" fill="url(#partialStarGradient)" />
          </svg>
        )}
        {[...Array(emptyStars)].map((star, index) => (
          <svg key={index} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#CCCCCC">
            <path d="M10 1.5L13.636 7.167H19.5L14.727 11.583L16.455 17.833L10 14.167L3.545 17.833L5.273 11.583L0.5 7.167H6.364L10 1.5Z" />
          </svg>
        ))}
        {
            displayRating ? <div className="rating-display">Rating: {rating}</div> : ""
        }
      </div>
    );
  };
  
  export default Rating;
  