import "./header-card.css"
function HeaderCard({data}) {
    return (
        <div className="header-card">
            <img src={data.url} alt="not loaded" className="header-images"/>
        </div>
    )
}

export default HeaderCard
