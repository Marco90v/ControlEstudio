import { configureStore } from '@reduxjs/toolkit'
import classesStore from './module/classesStore';
import professionStore from './module/professionStore';
import visibleSide from './module/visibleSideStore';

const side:any = visibleSide;
const classes:any = classesStore;
const profession:any = professionStore;

export default configureStore({
  reducer: {
    side,
    classes,
    profession
  },
});