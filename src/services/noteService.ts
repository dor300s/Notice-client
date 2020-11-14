import { Note } from '../interfaces/noteInterface';
import Axios from 'axios';
const axios = Axios.create({ withCredentials: true });
const baseUrl = (process.env.NODE_ENV !== 'development') ? '/api/note' : '//localhost:3030/api/note';

export const getNotes = (): Promise<Note[]> => axios.get(baseUrl).then(res => res.data);

export const getNote = (id: string): Promise<Note> => axios.get(`${baseUrl}/${id}`).then(res => res.data);

export const createNote = (note: Note): Promise<Note> => axios.post(baseUrl, note).then(res => res.data);

export const editNote = (note: Note): Promise<Note> => axios.put(`${baseUrl}/${note._id}`, note).then(res => res.data);

export const removeNote = (id: string): Promise<void> => axios.delete(`${baseUrl}/${id}`);