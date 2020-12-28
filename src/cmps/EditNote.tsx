import React, { useEffect, useRef, useState } from 'react';
import { Note } from '../interfaces/noteInterface';
import { NoteStore } from '../store/noteStore';


type NewNoteProps = {
    addNote: NoteStore["addNote"],
    editNote: NoteStore["editNote"],
    currNote: NoteStore["currNote"]
}

let range: any = document.createRange();
let sel: any = window.getSelection();

export const EditNote: React.FC<NewNoteProps> = ({ addNote, editNote, currNote }) => {
    const [note, setNote] = useState<Note>({ title: '', text: '' })
    const [isFocused, setIsFocused] = useState(false);
    const formRef = useRef<any>();
    const inputTitleRef = useRef<any>();
    const inputTextRef = useRef<any>();

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return (() => document.removeEventListener('mousedown', handleClick));
    }, [])

    useEffect(() => {
        if (currNote) {
            setNote(currNote);
            inputTitleRef.current.innerText = currNote.title;
            inputTextRef.current.innerText = currNote.text;
            inputTextRef.current.focus();
        }
    }, [currNote])

    const handleClick = (e: MouseEvent) => {
        if (!formRef.current.contains(e.target)) handleSubmit();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLDivElement>) => {
        const name: string = e.target.dataset.name || '';
        const value: string = e.target.innerText;
        setNote(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async () => {

        let pNote: Note | undefined;

        await setNote(prevState => {
            pNote = { ...prevState };
            return prevState;
        });

        setIsFocused(false);
        if (pNote && !pNote.title && !pNote.text) return;
        (pNote && pNote._id) ? editNote(pNote) : (pNote && addNote(pNote));
        setNote({ title: '', text: '' });
        inputTitleRef.current.innerText = '';
        inputTextRef.current.innerText = '';
    }

    const handleKeyDown = (e: any): void => {
        if (e.keyCode === 13) {
            e.preventDefault();
            inputTextRef.current.focus();
        }
    }

    const setCaret = () => {
        const lastLine = inputTextRef.current.childNodes?.length;
        if (lastLine) {
            const textLength = inputTextRef.current.childNodes[lastLine - 1].length;
            range.setStart(inputTextRef.current.childNodes[lastLine - 1], textLength);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }

    }

    return (
        <div className="add-note-container flex column justify-center"  >
            <div className={`screen ${isFocused ? 'display' : ''}`} />
            <form ref={formRef} className={`flex column ${isFocused ? 'focused' : ''}`} onFocus={() => setIsFocused(true)} onSubmit={(e) => e.preventDefault()}>
                <div contentEditable ref={inputTitleRef} className={`title-input ${note.title ? '' : 'empty'} ${isFocused ? 'focused' : ''}`} data-name="title" onInput={handleChange} onKeyDown={handleKeyDown} spellCheck="false" /* hidden={!isFocused && !note.title && !note.text} */ />
                <div contentEditable ref={inputTextRef} className={`text-input ${note.text ? '' : 'empty'}`} data-name="text" onInput={handleChange} spellCheck="false" onFocus={setCaret} />
            </form>
        </div>
    )
}