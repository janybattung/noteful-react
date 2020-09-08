import React from 'react'
import config from './config';
import ValidationError from './ValidationError';
import FormError from './FormError';

export default class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            error: null
        }
    }

    updateName(name) { // handlers to update these state properties
        this.setState({name});
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name } = this.state;
        if(!name) {
            this.setState({error: "All fields are required"})
            return 
        }

        fetch(`${config.API_ENDPOINT}/folders`, 
        {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
          })
        
        .then((resp) => {
            console.log(resp);
            this.props.refetch()
        })
        .catch(error => {
            console.error({error});
            this.setState({error: error.message})
        });

        console.log('Name');
    
    }

    render() {
        return(
            <div>
                <FormError>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <h3>Create a new folder</h3>
                    <label>Folder Name</label>
                    <input onChange={e => this.updateName(e.target.value)} /> {/*}update the name in state*/}
                    <button>Submit</button>
                    <ValidationError message={this.state.error}/>
                </form>
                </FormError>
            </div>
            
        )
    }
}