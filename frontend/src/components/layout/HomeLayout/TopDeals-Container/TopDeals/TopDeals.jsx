import "./top-deals.css"
import TopDealsCard from "../TopDeals-Card/TopDealsCard";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Alert, CircularProgress } from "@mui/material";
import AlertError from "../../../../utils/Error/AlertError";
import MODE from "../../../../../mode";

function TopDeals() {
    const [topDeals, setTopDeals] = useState([])
    const [isFetching, setFetching] = useState(false)
    const [error, setError] = useState(false)
    const [windowResolution, setWindowResolution] = useState({})
    const [settings, setSettings] = useState({
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    })
    const setResolution = () => {
        setWindowResolution({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }
    useEffect(() => {
        setWindowResolution({
            width: window.innerWidth,
            height: window.innerHeight,
        })
        const fetchTopDeals = async () => {
            setFetching(true)
            try {
                const fetchedTopDeals = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/topDeals`, {
                    method: 'GET'
                })
                const jsonTopDeals = await fetchedTopDeals.json()
                setTopDeals(jsonTopDeals.topDeals)
                setFetching(false)
            } catch (error) {
                setError(error.message)
                setFetching(false)
            }
        }
        fetchTopDeals()
        window.addEventListener('resize', setResolution)
        return () => window.removeEventListener('resize', setResolution)
    }, [])
    useEffect(() => {
            if(windowResolution.width >= 768){
                setSettings({
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 3,
                    slidesToScroll: 3
                })
            }
            else if(windowResolution.width <= 768 && windowResolution.width >= 550){
                setSettings({
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 2,
                    slidesToScroll: 1
                })
            }
            else if(windowResolution.width <= 550){
                setSettings({
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1
                })
            }
    }, [windowResolution])
    return (
        <div className="top-deals-container">
            <h2>Top Deals</h2>
            {error ?
                <AlertError error={error} /> :
                <div className="top-deals">
                    {isFetching ?
                        <CircularProgress className="circular-progress" /> :
                        <Slider {...settings}>
                            {topDeals.map((product) => {
                                return <TopDealsCard data={product} key={product._id} />
                            })}
                        </Slider>
                    }
                </div>
            }
        </div>
    )
}

export default TopDeals;
