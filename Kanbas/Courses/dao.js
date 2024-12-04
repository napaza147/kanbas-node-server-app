import model from "./model.js";

export function findAllCourses() {
  return model.find();
}

export function findCoursesForEnrolledUser(userId) {
  const { courses } = Database;
  const enrolledCourses = courses;
  return enrolledCourses;
}

export function deleteCourse(courseId) {
  const { courses, enrollments } = Database;
  Database.courses = courses.filter((course) => course._id !== courseId);
  Database.enrollments = enrollments.filter(
  (enrollment) => enrollment.course !== courseId
);
}
  
export function updateCourse(courseId, courseUpdates) {
  const { courses } = Database;
  const course = courses.find((course) => course._id === courseId);
  Object.assign(course, courseUpdates);
  return course;
} 

export function createCourse(course) {
  delete course._id;
  return model.create(course);
 
}
  
   