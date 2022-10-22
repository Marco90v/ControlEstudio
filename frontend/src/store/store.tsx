import { configureStore } from '@reduxjs/toolkit'
import classesStore from './module/classesStore';
import pensumStore from './module/pensumStore';
import professionStore from './module/professionStore';
import semestersStore from './module/semestersStore';
import visibleSide from './module/visibleSideStore';

const sidebar = visibleSide;
const classes = classesStore;
const profession = professionStore;
const pensum = pensumStore;
const semesters = semestersStore;

export default configureStore({
  reducer: {
    sidebar,
    classes,
    profession,
    pensum,
    semesters
  },
});