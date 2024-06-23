





const students = [
  {
    id: '1',
    name: "sha7toot el naw",
    followedTeachersIds: ["3mReda"],
    role: "student",
  },
  {
    id: '2',
    name: "ashraf",
    followedTeachersIds: ["ElGyar"],
    role: "student",
  },




]

const studentVideos = [
  {
    id: '1',
    title: "sddsda",
    topics: ["science", "english"],
    character: 'naruto',
    teacherId: '3mReda', // Corrected from teachersId to teacherId
  },
  {
    id: '2',
    title: "art of war",
    topics: ["politics", "english"],
    character: 'madara',
    teacherId: '3mReda', // Corrected from teachersId to teacherId
  },
]
const teacherVideos = [
  {
    id: '1',
    title: "sddsda",
    topics: ["science", "english"],
    teacherId: '3mReda', // Corrected from teachersId to teacherId
  },
  {
    id: '2',
    title: "art of war",
    topics: ["politics", "english"],
    teacherId: '3mReda', // Corrected from teachersId to teacherId
  },
];
const teachers = [
  {
    id: "3mReda",
    name: "yousef",
    img: "/teacher.jpeg",
    role: "teacher",
  },
  {
    id: "ElGyar",
    name: "reda el farouq",
    img: "/squidward.jpeg",
    role: "teacher",
  },
];
const getTeachers = () => {


  return Promise.resolve(teachers);
};

const getVideosByTeacher = (teacherId) => {

  const vids = teacherVideos.filter(vid => vid.teacherId == teacherId);
  console.log(vids)
  return Promise.resolve(vids);
};

const getVideosByTeacherAndCharacter = (teacherId, character) => {
  const vids = studentVideos.filter(vid => vid.teacherId == teacherId && vid.character == character);
  return Promise.resolve(vids);
};



const getStudentById = (id) => {
  let student = students.filter(student => {
    return student.id == id;
  })

  return Promise.resolve(student[0])
}

const getTeacherById = (id) => {
  let teacher = teachers.filter(teacher => {
    return teacher.id == id;
  })

  console.log(teacher)
  return Promise.resolve(teacher[0])
}

export {
  getTeacherById,
  getStudentById,
  getTeachers,
  getVideosByTeacher,
  getVideosByTeacherAndCharacter
};
