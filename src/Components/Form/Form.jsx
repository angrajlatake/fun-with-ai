import "./Form.scss";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Form = ({ handleSubmit, listLen, loading, setLoading }) => {
  const [prompt, setPrompt] = useState(null);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("prompt")) {
      setPrompt(localStorage.getItem("prompt"));
    }
  }, []);
  //animation variables
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };
  //check if prompt is valid
  function checkInput(prompt) {
    if (prompt && prompt.trim().length > 0) {
      setInvalid(false);
    } else {
      setInvalid(true);
    }
  }
  //handle input
  function formChange(e) {
    const textarea = e.target;
    setPrompt(textarea.value);
    textarea.style.height = "2rem";
    textarea.style.height = textarea.scrollHeight + "px";
    localStorage.setItem("prompt", textarea.value);
    checkInput(prompt);
  }

  function handleClick(e) {
    e.preventDefault();
    if (prompt) {
      setLoading(true);
      checkInput(prompt);
      handleSubmit(prompt);
      setPrompt(null);
      const input = document.getElementsByClassName("form__input");
      input[0].value = "";
      localStorage.removeItem("prompt");
    } else {
      setInvalid(true);
    }
  }

  return (
    //if no responses are available, show full page height form
    <div className={listLen > 0 ? "form" : "form__empty"}>
      <div className="form__wrapper">
        <motion.form
          className="form__container"
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
            value={prompt ? prompt : ""}
            onChange={formChange}
          ></textarea>
          {invalid ? <p className="form__error">Please enter text</p> : null}
          {loading ? (
            <div className="rings">
              <div className="ring ring1">
                <div className="ring ring2">
                  <div className="ring ring3">
                    <div className="ring ring4"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button onClick={handleClick} className="form__button">
              Submit
            </button>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default Form;
