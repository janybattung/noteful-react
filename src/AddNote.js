import React from 'react'
import config from './config';
import ValidationError from './ValidationError';
import NoteContext from './NoteContext';
import FormError from './FormError';

export default class AddNote extends React.Component {
    constructor(props) {
        super()
        this.state = {
            name: '',
            content: '',
            folderId: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

updateName(name) { // handlers to update these state properties
    this.setState({name});
}

updateContent(content) { // handlers to update these state properties
    this.setState({content});
}

updateFolder(folderId) { // handlers to update these state properties
    this.setState({folderId});
}

handleSubmit(event) {
    event.preventDefault();
    const {name, content, folderId} = this.state;
    fetch(`${config.API_ENDPOINT}/notes`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, content, folderId})
        })
        .then((resp) => {
            console.log(resp);
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
            <NoteContext.Consumer>
            {(value) => <form onSubmit={e => this.handleSubmit(e)}>
                <h3>New Note</h3>
                <input onChange={e => this.updateName(e.target.value)}/>
                <input onChange={e => this.updateContent(e.target.value)}/>
                <select onChange={e => this.updateFolder(e.target.value)} >
                    {value.folders.map(folder => {
                        return (<option key={folder.id} value={folder.id}>{folder.name}</option>)
                    })}
                </select>
                <button onClick={this.handleSubmit}>Submit</button>
                <ValidationError message={this.state.error}/>
            </form>}
            </NoteContext.Consumer>
            </FormError>
        </div>
        
    )
}



}