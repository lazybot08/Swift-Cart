import "./home.css"
import { categoryData, headerData, topBrandsData, topDealsData } from "../../data";
//importing components
import Header from "../../components/layout/HomeLayout/Header-Container/Header/Header";
import TopDeals from "../../components/layout/HomeLayout/TopDeals-Container/TopDeals/TopDeals";
import TopBrands from "../../components/layout/HomeLayout/TopBrands-Container/TopBrands/TopBrands";
import Category from "../../components/layout/HomeLayout/Categories-Container/Category/Category";
function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <Header data={headerData} />
        <TopDeals data={topDealsData} />
        <TopBrands data={topBrandsData} />
        <Category data={categoryData} />
      </div>
    </div>
  )
}

export default Home
