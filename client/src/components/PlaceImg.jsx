import React from 'react'
import Image from './Image';

const PlaceImg = ({place,index=0,className=null}) => {
    if (!place.photos?.length) {
        return '';
      }
      if (!className) {
        className = 'object-cover';
      }
  return (
    <>
      {/* {place.photos.length>0 && (
        <img className="object-cover" src={'http://localhost:4000/uploads/'+places.photos[0]} alt=""/>
    )}   We are checking if there is any photo then we are displaying the photo */}
        <Image className={className} src={place.photos[index]} alt=""/>

    </>
  )
}

export default PlaceImg
