import Form from "./Components/Form/Form";
import CardList from "./Components/CardList/CardList.jsx";
import { OpenAIApi, Configuration } from "openai";
import "./App.scss";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// animation variables
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const App = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  //configuration for OpenAI api
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_URL,
  });
  const openai = new OpenAIApi(configuration);

  const handleSubmit = (text) => {
    (async () => {
      try {
        const completion = await openai.createCompletion("text-davinci-002", {
          prompt: text,
          temperature: 0.3,
          max_tokens: 150,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        const response = await completion;
        const newList = [
          { prompt: text, response: response.data.choices[0].text },
          ...list,
        ];
        setList(newList);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          alert(error.response.status);
          alert(error.response.data);
        } else {
          alert(error.message);
        }
      }
    })();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="App"
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <Form
          handleSubmit={handleSubmit}
          listLen={list.length}
          loading={loading}
          setLoading={setLoading}
        />
        {list.length > 0 && <CardList list={list} />}
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
