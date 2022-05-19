import React from 'react'
import './CardList.scss'
import Card from '../Card/Card'
function CardList({list}){
  return (

    <div className='cardlist'>
        {list.map((item, index) => {
             return <Card key={index} item={item} />
        })}
    </div>
  )
}

export default CardList