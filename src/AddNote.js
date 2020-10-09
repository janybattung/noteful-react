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
            folder_id: '',
            error: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

updateName(name) { // handlers to update these state properties
    this.setState({name});
}

updateContent(content) { // handlers to update these state properties
    this.setState({content});
}

updateFolder(folder_id) { // handlers to update these state properties
    this.setState({folder_id});
}

handleSubmit(event) {
    event.preventDefault();
    const {name, content, folder_id} = this.state;
    if(!name || !content || !folder_id) {
        this.setState({error: "All fields are required"})
        return 
    }
    this.setState({error: ""})
    fetch(`${config.API_ENDPOINT}/notes`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, content, folder_id:folder_id})
        })
        .then((resp) => {
            console.log(resp);
            this.props.refetch()
        })
        .catch(error => {
            console.error({error});
            this.setState({error: error.message})
        });
        this.setState({name: "", content: ""})
}
render() {
    return(
        <div>
            <FormError>
            <NoteContext.Consumer>
            {(value) => <form onSubmit={e => this.handleSubmit(e)}>
                <h3>Create A New Note</h3>
                <label>Note name</label>
                <input value={this.state.name} onChange={e => this.updateName(e.target.value)} required/>
                <label>Note content</label>
                <input value={this.state.content} onChange={e => this.updateContent(e.target.value)} required/>
                <label>Note folder</label>
                <select value={this.state.folder_id} onChange={e => this.updateFolder(e.target.value)} >
                    <option>Select a folder</option>
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