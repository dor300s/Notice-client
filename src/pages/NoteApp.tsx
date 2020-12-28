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
            <div className="header-wrapper flex">
                <div className="logo" />
                <EditNote addNote={noteStore.addNote} editNote={noteStore.editNote} currNote={noteStore.currNote} />
            </div>
            <NoteList notes={noteStore.notes} setNote={noteStore.loadNote} removeNote={noteStore.removeNote} />
        </div>
    )

}
)

