import React from 'react'
import './style.scss'
import ContentWrapper from '../contentWrapper/ContentWrapper'

const Footer = () => {
  const date = new Date().getFullYear()

  return (
    <footer className='footer'>
      <ContentWrapper>
        <div className='copyright'>
          <p> © {date} All Rights Reserved, Designed and Maintained by NISCHAL TANDUKAR.</p>
        </div>
      </ContentWrapper>
    </footer >
  )
}

export default Footer
