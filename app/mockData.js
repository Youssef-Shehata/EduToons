




const users = [
  {
    id: '1',
    name: "sha7toot el naw",
    email: "sh7tt@gmail.com",
    password: "1234",
    role: "student",
  },
  {
    id: '2',
    name: "ashraf",
    email: "zodiack@gmail.com",
    password: "1234",
    role: "student",
  },
  {
    id: "3mReda",
    name: "yousef",
    email: "elfarouq@gmail.com",
    password: "1234",
    role: "teacher",
  },
  {
    id: "ElGyar",
    name: "reda el farouq",
    email: "enzlyamdl3@gmail.com",
    password: "1234",
    role: "teacher",
  },
]


const students = [
  {
    id: '1',
    name: "sha7toot el naw",
    email: "sh7tt@gmail.com",
    password: "1234",
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
    id: "elgyar",
    name: "yousef",
    img: "/teacher.jpeg",
    role: "teacher",
  },
  {
    id: "3mreda",
    name: "reda el farouq",
    img: "/squidward.jpeg",
    role: "teacher",
  },
  {
    id: "3mreda2",
    name: "reda el farouq",
    img: "/squidward.jpeg",
    role: "teacher",
  }, {
    id: "3mreda3",
    name: "reda el farouq",
    img: "/squidward.jpeg",
    role: "teacher",
  }, {
    id: "3mreda4",
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


const logIn = (user) => {
  let foundUsers = users.filter(u => {
    return user.email === u.email && user.password === u.password
  })


  if (foundUsers.length == 0) return Promise.reject("User Not Found")
  let currentUser = foundUsers[0]
  if (currentUser.role === "student") {
    currentUser = students.find(student => student.id = currentUser.id)

    return Promise.resolve(currentUser)
  }


  if (currentUser.role === "teacher") {
    currentUser = teachers.find(teacher => teacher.id = currentUser.id)

    return Promise.resolve(currentUser)
  }
}
export {
  logIn,
  getTeacherById,
  getStudentById,
  getTeachers,
  getVideosByTeacher,
  getVideosByTeacherAndCharacter
};
