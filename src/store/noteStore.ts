import { observable, action, makeObservable, when, autorun, computed, reaction } from 'mobx';
import { Note } from '../interfaces/noteInterface';
import { getNotes, getNote, createNote, editNote, removeNote } from '../services/noteService';


export class NoteStore {
    @observable notes: Note[] = []
    @observable currNote: Note | null = null

    constructor() {
        makeObservable(this);
    }

    @action
    loadNotes = async () => {
        const notes = await getNotes();
        notes.reverse();
        this.notes = notes;
    }

    @action
    loadNote = async (id: string) => {
        const note = await getNote(id);
        this.currNote = note;
    }

    @action
    addNote = async (note: Note) => {
        const savedNote = await createNote(note);
        this.notes.unshift(savedNote);
    }

    @action
    editNote = async (note: Note) => {
        const savedNote = await editNote(note);
        const idx = this.notes.findIndex(n => n._id === note._id);
        this.notes.splice(idx, 1, savedNote);
    }

    @action
    removeNote = async (id: string) => {
        await removeNote(id);
        const idx = this.notes.findIndex(n => n._id === id);
        this.notes.splice(idx, 1);
    }

    @computed
    get noteLength() {
        return this.notes.length;
    }



}