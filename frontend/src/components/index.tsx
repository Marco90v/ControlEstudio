import { lazy } from "react";

// export * from "./AllComponents/DataClasses";
// export * from "./AllComponents/DataPensum";
// export * from "./AllComponents/DataProfession";
// export * from "./AllComponents/DataScores";
// export * from "./AllComponents/DataStudents";
// export * from "./AllComponents/DataTeacher";
// export * from "./AllComponents/InputForm";
// export * from "./AllComponents/PersonsForms";
// export * from "./AllComponents/Profile";
// export * from "./AllComponents/TableComponent";
// export * from "./AllComponents/TablePersons";
export * from "./AllComponents/BadgeClasse";
export * from "./AllComponents/BlockSemester";
export * from "./AllComponents/DeletePopUp";
export * from "./AllComponents/InputPopUp";
export * from "./AllComponents/Popup";
export * from "./AllComponents/ProfessionSemester";
export * from "./AllComponents/Record";
export * from "./AllComponents/Select";
export * from "./AllComponents/SectionClasses";
export * from "./AllComponents/Select";
export * from "./AllComponents/Sidebar";
export * from "./AllComponents/Teacher";
export * from "./AllComponents/Loading";

// export const BadgeClasse = React.lazy(() => import('./AllComponents/BadgeClasse'));
// export const BadgeClasse = React.lazy(() => import('./AllComponents/BadgeClasse').then(module => ({ default: module.BadgeClasse })))

export const DataClasses = lazy(() => import('./AllComponents/DataClasses').then(module => ({ default: module.DataClasses })))
export const DataPensum = lazy(() => import('./AllComponents/DataPensum').then(module => ({ default: module.DataPensum })))
export const DataProfession = lazy(() => import('./AllComponents/DataProfession').then(module => ({ default: module.DataProfession })))
export const DataScores = lazy(() => import('./AllComponents/DataScores').then(module => ({ default: module.DataScores })))
export const DataStudents = lazy(() => import('./AllComponents/DataStudents').then(module => ({ default: module.DataStudents })))
export const DataTeacher = lazy(() => import('./AllComponents/DataTeacher').then(module => ({ default: module.DataTeacher })))
export const Profile = lazy(() => import('./AllComponents/Profile').then(module => ({ default: module.Profile })))

export const InputForm = lazy(() => import('./AllComponents/InputForm').then(module => ({ default: module.InputForm })))
export const TableComponent = lazy(() => import('./AllComponents/TableComponent').then(module => ({ default: module.TableComponent })))
export const PersonsForms = lazy(() => import('./AllComponents/PersonsForms').then(module => ({ default: module.PersonsForms })))
export const TablePersons = lazy(() => import('./AllComponents/TablePersons').then(module => ({ default: module.TablePersons })))
// export const BadgeClasse = React.lazy(() => import('./AllComponents/BadgeClasse').then(module => ({ default: module.BadgeClasse })))
// export const BlockSemester = React.lazy(() => import('./AllComponents/BlockSemester').then(module => ({ default: module.BlockSemester })))
