import './products.css'
//importing components
// import FilterMenu from "../../components/layout/ProductsLayout/FilterMenu-Container/FilterMenu";
import { useState, useEffect, useContext } from "react";
import ProductsCard from '../../components/layout/ProductsLayout/ProductsCard-Container/ProductsCard';
import { AllProductsContext } from '../../context/ProductContext';
import { useSearchParams } from 'react-router-dom';
import { NavbarContext } from '../../context/NavbarContext';
import { CircularProgress } from '@mui/material';
import AlertError from '../../components/utils/Error/AlertError';
import MODE from '../../mode';

function Products() {
  const [queryString] = useSearchParams()
  const { navbarState, navbarDispatch } = useContext(NavbarContext)
  const { allProducts, dispatch } = useContext(AllProductsContext)
  const [totalPages, setTotalPages] = useState(0)
  //product fetching on first render
  useEffect(() => {
    if (navbarState.dropdownState.value === "All" && navbarState.queryString.keyword === '') {
      const fetchData = async () => {
        dispatch({
          type: 'FETCHING_PRODUCTS',
        })
        try {
          const productsData = await fetch(`${MODE === 'DEVELOPMENT' ? 'http://localhost:4000' :'https://e-commerce-backend-y30k.onrender.com'}/api/v1/products`)
          const jsonProductsData = await productsData.json()
          const totalProducts = jsonProductsData.filteredLength
          const resultsPerPage = jsonProductsData.resultsPerPage
          setTotalPages(Math.ceil(totalProducts / resultsPerPage))
          dispatch({
            type: 'PRODUCTS_SUCCESS',
            payload: jsonProductsData
          })
        } catch (error) {
          dispatch({
            type: 'PRODUCTS_FAILED',
            payload: error
          })
        }
      }
      fetchData()
    }
  }, [])
  //pagination, filteration and search products
  useEffect(() => {
    const fetchData = async () => {
      let encodedCategory = encodeURIComponent(queryString.get('category'))
      let encodedKeyword = encodeURIComponent(queryString.get('keyword'))
      try {
        dispatch({
          type: 'FETCHING_PRODUCTS',
        })
        const productsData = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/products?page=${queryString.get('page') || 1}&keyword=${queryString.get('keyword') ? encodedKeyword : ''}${queryString.get('category') && queryString.get('category') !== 'All' ? '&category=' + encodedCategory : ''}`)
        const jsonProductsData = await productsData.json()
        const totalProducts = jsonProductsData.filteredLength
        const resultsPerPage = jsonProductsData.resultsPerPage
        setTotalPages(Math.ceil(totalProducts / resultsPerPage))
        dispatch({
          type: 'PRODUCTS_SUCCESS',
          payload: jsonProductsData
        })
      } catch (error) {
        dispatch({
          type: 'PRODUCTS_FAILED',
          payload: error
        })
      }
    }
    fetchData()
  }, [queryString])

  const visitPrevPage = () => {
    navbarDispatch({ type: 'PREVIOUS_PAGE' })
  }
  const visitNextPage = () => {
    navbarDispatch({ type: 'NEXT_PAGE' })
  }
  return (
    <div className="products-container">
      <div className="products-content-bottom">
        {allProducts.error ?
          <AlertError error={allProducts.error.message}/> :
          allProducts.isFetching ? <CircularProgress className='circular-progress' /> : 
          allProducts.allProductsFetchedData && allProducts.allProductsFetchedData.products.map((product) => {
            return (
              <ProductsCard product={product} key={product._id} />
            )
          })
        }
      </div>
      <div className="pagination">
        <button className="prevPage" onClick={visitPrevPage} disabled={navbarState.queryString.page <= 1}>&lt; Prev</button>
        <button className="nextPage" onClick={visitNextPage} disabled={navbarState.queryString.page >= totalPages}>Next &gt;</button>
      </div>
    </div>
  )
}

export default Products
