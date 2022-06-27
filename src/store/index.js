import { createStore } from 'redux';
import usuarioReducer from './usuarioReducer';
import {persistReducer, persistStore} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'eventos',
  storage,
}

const persistedReducer = persistReducer(persistConfig, usuarioReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export { store, persistor };