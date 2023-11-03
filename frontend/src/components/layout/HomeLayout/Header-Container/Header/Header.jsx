import "./header.css"
import HeaderCard from "../Header-Card/HeaderCard"
import Slider from "react-slick";
export default function Header({ data }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false
    };
    return (
        <div className="header-container">
            <Slider {...settings}>
                {data.map((data, index)=>{
                    return <HeaderCard data={data} key={index}/>
                })}
            </Slider>
        </div>
    )
}


