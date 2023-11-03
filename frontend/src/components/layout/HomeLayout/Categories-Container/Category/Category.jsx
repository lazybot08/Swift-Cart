import './category.css'
import CategoryCard from '../CategoryCard/CategoryCard'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import AlertError from '../../../../utils/Error/AlertError'
import MODE from '../../../../../mode'

function Category() {
    const [categories, setCategories] = useState([])
    const [iSFetching, setFetching] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {
        const fetchCategories = async () => {
            setFetching(true)
            try {
                const fetchedCategories = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/productCategories`, {
                    method: 'GET'
                })
                const jsonCategories = await fetchedCategories.json()
                setCategories(jsonCategories.category)
                setFetching(false)
            } catch (error) {
                setFetching(false)
                setError(error.message)
            }
        }
        fetchCategories()
    }, [])
    let categoryList = categories.map((item, index) => {
        return <CategoryCard data={item} key={index} />
    })
    return (
        <div className='category-container'>
            <h2>Shop by Categories</h2>
            {error ?
                <AlertError error={error} /> :
                <div className="categories">
                    {iSFetching ?
                        <CircularProgress className='circular-progress'/> :
                        <div className="category-list">
                            {categoryList}
                        </div>}
                </div>
            }
        </div>
    )
}

export default Category
