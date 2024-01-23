const typeDefs = `#graphql
  type Query {
    # ADMIN
    login(user:String, pass:String): Token,
    # ADMIN
    allAdmin: [allAdminAndDataPersons],
    # CLASSES
    allClasses: [classes],
    # SEMESTERS
    allSemesters: [semester],
    # PROFESSION
    allProfession: [profession],
    # SHIFTS
    allShifts: [shift]
    # SECTIONS
    allSections: [section]
    # ROLES
    allRoles: [role]
    # PERSONS
    allPersons: [person]
    getPersonById(id:Int): person
    getPersonByRole(role:Int): [person]
    # TEACHER
    getTeachers:[teacher]
    getTeacherByPerson(id:Int): [teacher]
    # STUDENTS
    getStudents: [student]
    getStudentsByPerson(IdPersons:Int): student
    # SCORE
    getScores(idStudents:Int):[score]
    getClassesByProfessionAndSemesters(ProfessionAndSemesters:ProfessionAndSemesters):[ClassesByProfessionAndSemesters]
    getTeachersByProfessionAndSemesters(ProfessionAndSemesters:ProfessionAndSemesters):[TeachersByProfessionAndSemesters]
    # PROFILE
    getProfile: Profile
    # PEMSUN
    getPensumById(id:Int): [Pensum]
  }
  type Mutation {
    # CLASSES
    addClasses(dataClasse:inputClasse): classes,
    updateClasses(dataClasse:inputClasse): classes,
    deleteClasses(id:Int): Int,
    # SEMESTERS
    addSemester(dataSemester:InputSemester): semester
    updateSemester(dataSemester:InputSemester): semester
    deleteSemester(id:Int):Int
    # PROFESSION
    addProfession(dataProfession:inputProfession): profession
    updateProfession(dataProfession:inputProfession): profession
    deleteProfession(id:Int):Int
    # SHIFTS
    addShift(dataShift:inputShift): shift
    updateShift(dataShift:inputShift): shift
    deleteShift(id:Int):Int
    # SECTIONS
    addSection(dataSection:inputSection): shift
    updateSection(dataSection:inputSection): shift
    deleteSection(id:Int):Int
    # ROLES
    addRole(dataRole:inputRole): role
    updateRole(dataRole:inputRole): role
    deleteRole(id:Int):Int
    # PERSON
    addPerson(dataPerson:inputPerson): person
    updatePerson(dataPerson:inputPerson): person
    deletePerson(id:Int):Int
    # TEACHER
    addTeacher(dataTeacher:[inputTeacher]): Boolean
    updateTeacher(dataTeacher:[inputTeacher]): Boolean
    deleteTeacher(ids:[Int]):Boolean
    deleteTeacherByIdPerson(IdPersons:Int): Int
    # STUDENTS
    addStudents(dataStudent:inputStudent): student
    updateStudent(dataStudent:inputStudent): student
    deleteStudentByIdPerson(IdPersons:Int): Int
    # SCORE
    addScore(dataScores:[inputScore]): Boolean
    updateScore(dataScores:[inputScore]): Boolean
    # PENSUM
    addClassesPensum(DataPensum:DataPensum): Boolean
    deleteClassePensum(id:Int): Boolean
  }
  type Token {
    token:String
  }
  type allAdminAndDataPersons {
    IdAdmin: String,
    IdPerson: String,
    names: String,
    lastNames: String,
    sex: String,
    email: String,
    phone: String,
    photo: String
  }
  # CLASSES
  type classes {
    id: Int,
    names: String
  }
  input inputClasse{
    id: Int,
    names: String
  }
  # SEMESTERS
  type semester {
    id: Int,
    names: String
  }
  input InputSemester{
    id: Int,
    names:String
  }
  # PROFESSION
  type profession {
    id: Int,
    names: String
  }
  input inputProfession {
    id: Int,
    names: String
  }
  # SHIFTS
  type shift {
    id: Int,
    names:String
  }
  input inputShift {
    id: Int,
    names: String
  }
  # SECTIONS
  type section {
    id: Int
    names:String
  }
  input inputSection {
    id: Int,
    names: String
  }
  # ROLES
  type role {
    id: Int,
    names:String
  }
  input inputRole {
    id: Int,
    names: String
  }
  # PERSONS
  type person {
    id: Int,
    names: String,
    lastNames: String,
    sex: String,
    email: String,
    phone: Int,
    photo: String,
    role: Int
  }
  input inputGetPersonById{
    id: Int
  }
  input inputPerson{
    id: Int,
    names: String,
    lastNames: String,
    sex: String,
    email: String,
    phone: Int,
    photo: String,
    role: Int
  }
  # TEACHERS
  type teacher{
    id: Int,
    IdPersons: Int,
    IdProfession: Int,
    IdSemesters: Int,
    IdClasses: Int,
    IdShifts: Int,
    IdSections: Int
  }
  input inputTeacher{
    id: Int,
    IdPersons: Int,
    IdProfession: Int,
    IdSemesters: Int,
    IdClasses: Int,
    IdShifts: Int,
    IdSections: Int
  }
  type insertId {
    insertId: Int
  }
  # STUDENTS
  type student{
    id: Int,
    IdPersons: Int,
    IdProfession: Int,
    IdSemesters: Int
  }
  input inputStudent{
    id: Int,
    IdPersons: Int,
    IdProfession: Int,
    IdSemesters: Int
  }
  # SCORE
  type score {
    id: Int,
    IdStudents: Int,
    IdClasses: Int,
    IdTeachers: Int,
    IdShifts: Int,
    IdSections: Int,
    score: Int
  }
  input inputScore {
    id: Int,
    IdStudents: Int,
    IdClasses: Int,
    IdTeachers: Int,
    IdShifts: Int,
    IdSections: Int,
    score: Int
  }
  type ClassesByProfessionAndSemesters{
    id: Int,
    names: String
  }
  type TeachersByProfessionAndSemesters{
    id: Int,
    IdPersons: Int,
    names: String,
    lastNames: String,
    IdClasses: Int,
    IdShifts: Int,
    IdSections: Int
  }
  input ProfessionAndSemesters {
    IdProfession: Int,
    IdSemesters: Int
  }
  type Profile {
    id: Int,
    names: String,
    lastNames: String,
    sex: String,
    email: String,
    phone: Int,
    photo: String,
    role: Int,
  }
  # PENSUM
  type ClasseFormatPensum {
    id: Int,
    IdClasses: Int,
    Name_Classes: String,
  }
  type Pensum {
    IdSemesters: Int,
    Name_Semesters: String,
    Classes: [ClasseFormatPensum],
  }
  input ClassePensum {
    IdProfession: Int,
    IdSemesters: Int,
    IdClasses: Int,
    Name_Classes: String
  }
  input DataPensum {
    body: [ClassePensum],
    p: Int
  }
`
export default typeDefs