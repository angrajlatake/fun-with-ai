import './Card.scss'

import React from 'react'

const Card = ({item}) => {
  return (
    <div className='card'>
        <div className="card__header">
            <h3>{item.prompt}</h3>
        </div>
        <div className="card__description">
            {item.response}
        </div>
    </div>
  )
}

export default Card