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
      // sebetulnya tidak perlu memusingkan css apakah aku benar
      <div className="App">
        <header className="App-header">
          <Typography variant = "h3" color = "primary">
            Avatar Citizen Mapping
          </Typography>
        </header>
        <Form onPayloadChange = {this.handlePayloadChange} />
        <Result data = {this.state.payload} />
      </div>
    );
  }
}

export default App;
