import { configureStore } from '@reduxjs/toolkit'
import classesStore from './module/classesStore';
import visibleSide from './module/visibleSideStore';

import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { useDispatch } from 'react-redux';

import { classesApi } from './apis/classesApi';
import { professionApi } from './apis/professionApi';
import { pensumApi } from './apis/pensumApi';
import { semestersApi } from './apis/semestersApi';
import { rolesApi } from './apis/rolesApi';
import { shiftsApi } from './apis/shiftsApi';
import { sectionsApi } from './apis/sectionsApi';
import { personApi } from './apis/personApi';
import { teacherApi } from './apis/teacherApi';
import { studentsApi } from './apis/studentsApi';
import { scoresApi } from './apis/scoresApi';

const sidebar = visibleSide;
const classes = classesStore;

export const store = configureStore({
  reducer: {
    sidebar,
    classes,
    [classesApi.reducerPath]: classesApi.reducer,
    [professionApi.reducerPath]: professionApi.reducer,
    [pensumApi.reducerPath]: pensumApi.reducer,
    [semestersApi.reducerPath]: semestersApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [shiftsApi.reducerPath]: shiftsApi.reducer,
    [sectionsApi.reducerPath]: sectionsApi.reducer,
    [personApi.reducerPath]: personApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [scoresApi.reducerPath]: scoresApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    classesApi.middleware, 
    professionApi.middleware,
    pensumApi.middleware,
    semestersApi.middleware,
    rolesApi.middleware,
    shiftsApi.middleware,
    sectionsApi.middleware,
    personApi.middleware,
    teacherApi.middleware,
    studentsApi.middleware,
    scoresApi.middleware,
  ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;