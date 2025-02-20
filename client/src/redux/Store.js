// import { configureStore } from '@reduxjs/toolkit';
// import AuthSlice from './AuthSlice';
// import storage from 'redux-persist/lib/storage'; 
// import { persistStore, persistReducer} from 'redux-persist';

// const persistConfig={
//     key:"root",
//     storage,
//     whitelist:['Auth']
// }

// const Reducer = persistReducer(persistConfig.AuthSlice)

// export const store = configureStore({
//     reducer:{
//         Auth:Reducer
//     }
// })

// export const persistor = persistStore(store)

import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';


const persistConfig = {
    key: "root",
    storage,
//     whitelist:['Auth']
};


const persistedReducer = persistReducer(persistConfig, AuthSlice);

export const store = configureStore({
    reducer: {
        Auth: persistedReducer, // Use persisted reducer
    },
});

export const persistor = persistStore(store);
