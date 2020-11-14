import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { EditNote } from '../cmps/EditNote';
import { NoteList } from '../cmps/NoteList';
import { useRootStore } from '../store/rootStateContext';

export const NoteApp: React.FC<any> = observer(() => {
    const { noteStore } = useRootStore();

    useEffect(() => {
        noteStore.loadNotes();
    }, [])


    return (
        <div className="note-main-container flex column">
            <EditNote addNote={noteStore.addNote} editNote={noteStore.editNote} currNote={noteStore.currNote} />
            <h2 className="note-counter">{noteStore.noteLength} {noteStore.noteLength === 1 ? 'Note' : 'Notes'}</h2>
            <NoteList notes={noteStore.notes} setNote={noteStore.loadNote} removeNote={noteStore.removeNote} />
        </div>
    )

}
)

