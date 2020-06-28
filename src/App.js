import React from 'react';
import Form from './component/Form';
import Result from './component/Result';
import Typography from '@material-ui/core/Typography';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payload: ''
    };

    this.handlePayloadChange = this.handlePayloadChange.bind(this);
  }

  handlePayloadChange(data) {
    this.setState({
      payload: data
    });
  }

  render() {
    return (
      <div className="App">
        <Form onPayloadChange = {this.handlePayloadChange} />
        <Result data = {this.state.payload} />
      </div>
    );
  }
}

export default App;
