import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/home')
        .then(response => response.json())
        .then(response => this.setState({'message': response.message}))
  }

  render() {
    return <h1>The response is {this.state.message}</h1>;
  }

}

export default App;