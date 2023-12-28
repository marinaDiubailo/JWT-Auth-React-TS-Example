import { createContext, ReactNode } from 'react';
import Store from './store';

interface IStore {
    store: Store;
}

const store = new Store();

const Context = createContext<IStore>({
    store,
});

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    return <Context.Provider value={{ store }}>{children}</Context.Provider>;
};
