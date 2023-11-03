import Slider from 'react-slick'
import TopBrandsCard from '../TopBrandsCard-Container/TopBrandsCard'
import './top-brands.css'
import { useEffect, useState } from 'react'
function TopBrands({ data }) {
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
    useEffect(()=>{
        setWindowResolution({
            width: window.innerWidth,
            height: window.innerHeight,
        })
        window.addEventListener('resize', setResolution)
        return () => window.removeEventListener('resize', setResolution)
    }, [])
    useEffect(() => {
        if (windowResolution.width >= 768) {
            setSettings({
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 3
            })
        }
        else if (windowResolution.width <= 768 && windowResolution.width >= 550) {
            setSettings({
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 2,
                slidesToScroll: 1
            })
        }
        else if (windowResolution.width <= 550) {
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
        <div className="top-brands-container">
            <h2>Top Brands</h2>
            <Slider {...settings}>
                {data.map((brand, index) => {
                    return <TopBrandsCard data={brand} key={index} />
                })}
            </Slider>
        </div>
    )
}

export default TopBrands
