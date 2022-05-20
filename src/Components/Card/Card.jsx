import './Card.scss'

import {motion} from 'framer-motion'
const Card = ({item, cardAnimation}) => {
  return (
    <motion.div className='card'
      variants={cardAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
        <div className="card__header">
            <h3>{item.prompt}</h3>
        </div>
        <div className="card__description">
            {item.response}
        </div>
    </motion.div>
  )
}

export default Card