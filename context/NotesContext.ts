import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Note } from '../models/Note';

interface NotesContextType {
    notes: Note[]; // 메모 목록
    addNote: (note: Note) => void; // 메모 추가 함수
    updateNote: (updatedNote: Note) => void; // 메모 수정 함수
    deleteNote: (id: string) => void; // 메모 삭제 함수
}

export const NotesContext = React.createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>([]); // 메모 상태

    // 메모 추가
    const addNote = (note: Note) => setNotes([...notes, note]);

    // 메모 수정
    const updateNote = (updatedNote: Note) => {
        setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
    };

    // 메모 삭제
    const deleteNote = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    return (
        <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
        {children}
      </NotesContext.Provider>
  );
};
