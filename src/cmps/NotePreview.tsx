import { observer } from 'mobx-react-lite';
import React from 'react';
import { Note } from '../interfaces/noteInterface';

export const NotePreview: React.FC<any> = observer(({ note, setNote, removeNote }: { note: Note, setNote: any, removeNote: any }) => {

    return (
        <div className="note">
            <h3 className="note-title">{note.title}</h3>
            <div className="note-text">{note.text}</div>
            <div className="manage-buttons">
                <button className="edit-button" onClick={() => setNote(note._id)}>Edit</button>
                <button className="delete-button" onClick={() => removeNote(note._id || '')}>Delete</button>
            </div>
        </div>
    )
})