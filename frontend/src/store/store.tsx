import { configureStore } from '@reduxjs/toolkit'
import classesStore from './module/classesStore';
import visibleSide from './module/visibleSideStore';

const classes:any = classesStore;
const side:any = visibleSide;

export default configureStore({
  reducer: {
    classes,
    side
  },
});