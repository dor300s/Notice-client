import React, { useEffect, useState } from 'react';
import { Note } from '../interfaces/noteInterface';
import { NoteStore } from '../store/noteStore';


type NewNoteProps = {
    addNote: NoteStore["addNote"],
    editNote: NoteStore["editNote"],
    currNote: NoteStore["currNote"]
}

export const EditNote: React.FC<NewNoteProps> = ({ addNote, editNote, currNote }) => {
    const [note, setNote] = useState<Note>({ title: '', text: '' })

    useEffect(() => {
        if (currNote) setNote(currNote);
    }, [currNote])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNote(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!note.title && !note.text) return;
        note._id ? editNote(note) : addNote(note);
        setNote({ title: '', text: '' });
    }

    return (
        <div className="add-note-container flex column align-center">
            <form className="flex column" onSubmit={handleSubmit}>
                <input className="title-input" name="title" type="text" placeholder="Title" value={note.title} onChange={handleChange} spellCheck="false" />
                <input className="text-input" name="text" type="text" placeholder="Text..." value={note.text} onChange={handleChange} spellCheck="false" />
                <button>Save</button>
            </form>
        </div>
    )
}