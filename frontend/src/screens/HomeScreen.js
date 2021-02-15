import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  // // initial products state
  // const [products, setProducts] = useState([])

  // Search keyword
  const keyword = match.params.keyword || ''

  // Page number from pagination
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  // select part(s) of state
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  // run as soon as a component loads
  useEffect(() => {
    // const fetchProducts = async () => {
    //   const { data } = await axios.get('/api/products')
    //  // sets products state with data from API call
    //   setProducts(data)
    // }
    // // invoke fetchProducts
    // fetchProducts()

    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {/* show product carousel when there is no search */}
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link className='btn btn-light my-3' to='/'>
          Go Back
        </Link>
      )}

      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </>
      )}
    </>
  )
}

export default HomeScreen
