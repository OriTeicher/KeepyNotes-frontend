import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { Note } from '../_interfaces/note';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBZrN9H_D5R4cjpxckizldO0t9sJtB47DA',
  authDomain: 'keepynotes-1d3e0.firebaseapp.com',
  projectId: 'keepynotes-1d3e0',
  storageBucket: 'keepynotes-1d3e0.appspot.com',
  messagingSenderId: '349075250932',
  appId: '1:349075250932:web:158e05b11c8c46a63048a1',
  measurementId: 'G-SC61C50XES',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const dbService = {
  addNote,
  loadNotes,
  removeNote,
  updateNote,
};

const NOTES_COLLECTION_KEY = 'notes';
const notesCollection = collection(db, NOTES_COLLECTION_KEY);

async function addNote(note: Note): Promise<void> {
  try {
    await addDoc(notesCollection, note);
  } catch (e) {
    console.error('Error adding note: ', e);
  }
}

async function loadNotes(): Promise<Note[]> {
  try {
    const notesSnapshot = await getDocs(notesCollection);
    const notesList = notesSnapshot.docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    })) as Note[];
    return notesList;
  } catch (e) {
    console.error('Error loading notes: ', e);
    return [];
  }
}

async function removeNote(noteId: string): Promise<void> {
  try {
    const noteDoc = doc(db, NOTES_COLLECTION_KEY, noteId);
    await deleteDoc(noteDoc);
  } catch (e) {
    console.error('Error removing note: ', e);
  }
}

async function updateNote(
  noteId: string,
  updatedFields: Partial<Note>
): Promise<void> {
  try {
    const noteDoc = doc(db, NOTES_COLLECTION_KEY, noteId);
    await updateDoc(noteDoc, updatedFields);
  } catch (e) {
    console.error('Error updating note: ', e);
  }
}
