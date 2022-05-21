import "./CardList.scss";
import Card from "../Card/Card";
import { motion, AnimatePresence } from "framer-motion";
function CardList({ list, loading }) {
  //variants for animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const cardAnimation = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 1,
      },
    },
    exit: {
      opacity: 1,
      y: 50,
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="cardlist"
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {list.map((item, index) => {
          return <Card key={index} item={item} cardAnimation={cardAnimation} />;
        })}
      </motion.div>
    </AnimatePresence>
  );
}

export default CardList;
