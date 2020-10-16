import React from 'react'
import { Link } from 'react-router-dom'
// import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteContext from '../NoteContext'
import config from '../config'
import './Note.css'
import PropTypes from 'prop-types'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = NoteContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json"
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        
      })
      .then(() => {
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, 
      // modified 
    } = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {/* {format(new Date(modified), 'Do MMM yyyy')} */}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
Note.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  // modified: PropTypes.string.isRequired
};
