
import Form from "./Components/Form/Form";
import CardList from "./Components/CardList/CardList.jsx";
import { OpenAIApi, Configuration } from "openai";
import "./App.scss";
import React, { Component } from 'react'


class App extends Component{
  state = {
    list : [],
  };
  handleSubmit = (text) => {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    (async () => {
      const completion = await openai.createCompletion("text-davinci-002", {
        prompt: text,
        temperature: 0.3,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      const response = await completion;
      console.log(response.data.choices[0].text)
      const newList = [{'prompt': text, "response":response.data.choices[0].text}, ...this.state.list]
      this.setState(
        {list: newList})
      
    })();
  };
  render(){

    return (
      <div className="App">
        <Form handleSubmit={this.handleSubmit} listLen ={this.state.list.length} />
        {this.state.list.length > 0 && <CardList list={this.state.list} />}
      </div>
    );
  }

}

export default App;
