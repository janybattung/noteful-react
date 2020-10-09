export const findFolder = (folders=[], folder_id) =>
  folders.find(folder => folder.id == folder_id)

export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id == noteId)

export const getNotesForFolder = (notes=[], folder_id) => {
  console.log("Get notes for folder " ,notes,folder_id)
    return (
  (!folder_id)
    ? notes
    : notes.filter(note => note.folder_id == folder_id)
)}

export const countNotesForFolder = (notes=[], folder_id) =>
  notes.filter(note => note.folder_id === folder_id).length