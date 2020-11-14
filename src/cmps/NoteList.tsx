import { observer } from 'mobx-react-lite';
import React from 'react';
import { Note } from '../interfaces/noteInterface';
import { NotePreview } from './NotePreview';


export const NoteList: React.FC<any> = observer(({ notes, setNote, removeNote }: { notes: Note[], setNote: any, removeNote: any }) => {


    return (
        <div className="note-list-container">
            <div className="note-list-wrapper">
                {notes.map((note: Note) => <NotePreview key={note._id} note={note} setNote={setNote} removeNote={removeNote} />)}
            </div>
        </div>
    )
})