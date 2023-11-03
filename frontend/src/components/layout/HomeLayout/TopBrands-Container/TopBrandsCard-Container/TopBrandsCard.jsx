import './top-brands-card.css'

function TopBrandsCard({ data }) {
    return (
        <div className='top-brands-card'>
            <img src={data.url} alt="not loading" />
            <div className="brand-info">
                <div className="brand-name">
                    {data.brand_name}
                </div>
                <div className="min-discounts">
                    Min {data.min_discounts}% Off
                </div>
            </div>
        </div>
    )
}

export default TopBrandsCard
