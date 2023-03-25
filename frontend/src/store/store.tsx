import { configureStore } from '@reduxjs/toolkit'
import classesStore from './module/classesStore';
import pensumStore from './module/pensumStore';
import personStore from './module/personStore';
import professionStore from './module/professionStore';
import rolesStore from './module/rolesStore';
import sectionsStore from './module/sectionsStore';
import semestersStore from './module/semestersStore';
import shiftsStore from './module/shiftsStore';
import teachersStore from './module/teachersStore';
import visibleSide from './module/visibleSideStore';

const sidebar = visibleSide;
const classes = classesStore;
const profession = professionStore;
const pensum = pensumStore;
const semesters = semestersStore;
const roles = rolesStore;
const shifts = shiftsStore;
const sections = sectionsStore;
const teachers = teachersStore;
const persons = personStore;

export default configureStore({
  reducer: {
    sidebar,
    classes,
    profession,
    pensum,
    semesters,
    roles,
    shifts,
    sections,
    teachers,
    persons,
  },
});