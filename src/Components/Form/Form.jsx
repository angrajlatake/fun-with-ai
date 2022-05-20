import "./Form.scss";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
const Form = ({ handleSubmit, listLen}) => {
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("prompt")){
      setPrompt(localStorage.getItem("prompt"));
    };
  },[])

  function formChange(e) {
    const textarea = e.target;
    setPrompt(textarea.value);
    textarea.style.height = "2rem";
    textarea.style.height = textarea.scrollHeight + "px";
    localStorage.setItem("prompt", textarea.value);
  }
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
    exit:{
      opacity:0,
    }
  };
  function handleClick(e) {
    e.preventDefault();
    handleSubmit(prompt);
    setPrompt(null);
    const input = document.getElementsByClassName("form__input");
    input[0].value = "";
    localStorage.removeItem("prompt");
  }

  return (
    <div className="form">
      <div className="form__wrapper">
        <motion.form
          className={
            listLen < 1
              ? "form__container form__container--empty"
              : "form__container"
          }
          variants={container}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <h1 className="form__header">Fun with AI</h1>
          <textarea
            className="form__input"
            name="input"
            id="input"
            placeholder="Type Text here"
            value={prompt ? prompt: ""}
            onChange={formChange}
          ></textarea>
          <button onClick={handleClick} className="form__button">
            Submit
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Form;
