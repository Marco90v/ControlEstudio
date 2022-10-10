import { configureStore } from '@reduxjs/toolkit'
import classesStore from './module/classesStore';
import professionStore from './module/professionStore';
import visibleSide from './module/visibleSideStore';

const sidebar = visibleSide;
const classes = classesStore;
const profession = professionStore;

export default configureStore({
  reducer: {
    sidebar,
    classes,
    profession
  },
});