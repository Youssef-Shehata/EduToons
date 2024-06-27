import { Description } from "@radix-ui/react-dialog";





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
const getTeachers = async() => {
  try {
    const response = await fetch('http://localhost:3000/api/db/teachers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const teachers = await response.json();
    console.log(teachers)
    return Promise.resolve(teachers);
  } catch (error) {
    console.error('Error fetching users:', error);

  }  
};

const getVideosByTeacher = async (teacherId) => {
  try {
    const response = await fetch('http://localhost:3000/api/db/videos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const videos = await response.json();
    console.log(videos)
    const vids = videos.filter(vid => vid.teacherId == teacherId);
    console.log(vids)
    return Promise.resolve(vids);
    
  } catch (error) {
    console.error('Error fetching users:', error);

  }
};

const getVideosByTeacherAndCharacter = async(teacherId, character) => {
  try {
    const response = await fetch('http://localhost:3000/api/db/videos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const videos = await response.json();
    console.log(videos)
    const vids = videos.filter(vid => vid.teacherId == teacherId && vid.character == character);
    console.log(vids)
    return Promise.resolve(vids);
    
  } catch (error) {
    console.error('Error fetching users:', error);

  }
};



const getStudentById = async(id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/db/students/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const student = await response.json()
    console.log(student)
    return Promise.resolve(student)
  } catch (error) {
    console.error('Error fetching users:', error);

  }
}

const getTeacherById = async(id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/db/teachers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const student = await response.json()
    console.log(student)
    return Promise.resolve(student)
  } catch (error) {
    console.error('Error fetching users:', error);

  }
}

const uploadVideos = async(video) => {
  try {
    const response = await fetch('http://localhost:3000/api/db/videos', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      body: JSON.stringify({ "url": video.url, "status": video.status,"teacherid": video.teacherid,"character":video.character,"title":video.title,"description":video.description }),
      },
    });
    const videoUploadStatus = await response.json()
    console.log(videoUploadStatus)
    return videoUploadStatus
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

export {
  uploadVideos,
  getTeacherById,
  getStudentById,
  getTeachers,
  getVideosByTeacher,
  getVideosByTeacherAndCharacter
};
