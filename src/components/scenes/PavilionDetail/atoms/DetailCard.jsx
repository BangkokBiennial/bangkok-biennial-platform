import React from 'react'

const DetailCard = ({ name, shortBio, link, imageUrl, key }) => {
  return (
    <div key={key} className="detail-card">
      <p className="detail-card__name">{name}</p>
      <p className="detail-card__text">{shortBio}</p>
      <a className="detail-card__link" 
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        {link}
      </a>
      {imageUrl && <img
        className="detail-card__image"
        src={imageUrl}
      />}
    </div>
  )
}

export default DetailCard