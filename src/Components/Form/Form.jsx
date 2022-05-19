import './Form.scss'
import React, { useState } from 'react'

const Form = ({handleSubmit, listLen}) => {
  const [prompt, setPrompt] = useState(null)
  function formChange(e){
    const textarea = e.target
    setPrompt(textarea.value)
    textarea.style.height = '2rem'
    console.log(textarea.scrollHeight)
    textarea.style.height = textarea.scrollHeight + 'px'
  }
  function handleClick(e){
    e.preventDefault()
    handleSubmit(prompt)


  }
  return (
    <div className='form'>
      <div className='form__wrapper'>
          <form className={listLen < 1 ?'form__container form__container--empty': 'form__container'}>
            <h1 className='form__header'>Fun with AI</h1>
            <textarea className='form__input' name="input" id="input" placeholder='Type Text here' onChange={formChange}></textarea>
            <button onClick={handleClick} className='form__button'>Submit</button>
          </form>
      </div>
    </div>
  )
}

export default Form