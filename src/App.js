import React from 'react';
import Form from './component/Form';
import Typography from '@material-ui/core/Typography';
import './App.css';

function App() {
  return (
    // sebetulnya tidak perlu memusingkan css apakah aku benar
    <div className="App">
      <header className="App-header">
        <Typography variant = "h3" color = "primary">
          Avatar Citizen Mapping
        </Typography>
      </header>
      <Form />
    </div>
  );
}

export default App;
