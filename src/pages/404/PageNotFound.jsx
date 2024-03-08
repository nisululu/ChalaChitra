import React from 'react'
import './style.scss'
import LazyLoadImg from '../../components/lazyLoad/LazyLoadImg'
import ImageNotFound from '../../assets/no-results.png'

const PageNotFound = () => {
  return (
    <div className='pageNotFound'>
      <div className="backdropImg">
        <LazyLoadImg image={ImageNotFound} />
      </div>
      <div className="resultNotFoundtxt">404, page not found !!!</div>
    </div>
  )
}

export default PageNotFound
