import React, { useRef } from 'react'
import './style.scss'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import LazyLoadImg from '../../../components/lazyLoad/LazyLoadImg';
import { useSelector } from 'react-redux';
import avatar from '../../../assets/avatar.png'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const Cast = ({ data, loading }) => {

  const { url } = useSelector((state) => state.home)
  const castContainer = useRef()

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    )
  }

  const navigation = (direction) => {
    const container = castContainer.current
    const scrollAmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + 1) : container.scrollLeft + (container.offsetWidth + 1)

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    })
  }

  return (
    <div className='castSection'>
      <ContentWrapper>
        {
          data?.length > 8 && (
            <>
              <KeyboardArrowLeftIcon
                className='carouselLeftNav arrow'
                onClick={() => navigation("left")}
              />
              <KeyboardArrowRightIcon
                className='carouselRightNav arrow'
                onClick={() => navigation("right")}
              />
            </>
          )
        }
        <div className="castHeading">Casts</div>
        {!loading ? (
          <div className='castItems' ref={castContainer}>
            {data?.map((item, index) => (
              <div className='castItem' key={index}>
                <div className="profileImg">
                  <LazyLoadImg image={item.profile_path ? (url?.profile + item.profile_path) : avatar} />
                </div>
                <div className="name">{item.name}</div>
                <div className="character">{item.character}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

export default Cast
