import React, { createContext, useContext } from 'react';
import { NoteStore } from './noteStore';

type RootStateContextValue = {
    noteStore: NoteStore
}

const RootStateContext = createContext<RootStateContextValue>({} as RootStateContextValue);

const noteStore = new NoteStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return <RootStateContext.Provider value={{ noteStore }}>{children}</RootStateContext.Provider>
}


export const useRootStore = () => useContext(RootStateContext)