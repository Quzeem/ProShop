import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}></meta>
      <meta name='keyword' content={keywords}></meta>
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To Proshop',
  description: 'We got you covered with top, cheap, and quality products',
  keywords:
    'electronics, quality electronics, cheap electronics, best electronics',
}

export default Meta
