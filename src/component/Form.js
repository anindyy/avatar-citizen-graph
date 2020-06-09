import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            userInput: '',
            payload: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    saveData(data) {
        if (data.id !== this.state.payload.id) {
            this.setState({
                payload: data
            });
        }
        this.props.onPayloadChange(data);
    }

    handleChange(e) {
        this.setState({
            userInput: e.target.value
        });
    }

    handleClick(e) {
        const axios = require('axios').default;
        let url = 'http://avatar.labpro.dev/friends/';
        axios.get(`${url}${this.state.userInput}`)
            .then(response => { 
                console.log(response);
                this.saveData(response.data.payload);
            })
            .catch(response => this.saveData('error'));
    }

    render() {
        return (
            <div>
                <TextField
                    // id = ""
                    label = "Citizen ID"
                    type = "number"
                    InputLabelProps={{
                        shrink: true
                    }}
                    variant = "outlined"
                    size = "small"
                    onChange = {this.handleChange}
                />
                <Button 
                    variant = "outlined" 
                    size = "medium"
                    color = "primary"
                    onClick = {this.handleClick}>
                        Search
                </Button>
            </div>
        )
    }
}

export default Form;