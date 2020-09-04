import React from 'react'

const NoteContext = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {},
  deleteFolder: () => {},
})

export default NoteContext