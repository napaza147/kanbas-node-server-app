import Database from "../Database/index.js";
import model from "./model.js";

export function createCourse(course) {
  delete course._id;
  return model.create(course);
}

export function findAllCourses() {
  return model.find();
}

export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
      enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
  }

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
 }
 

 export async function updateCourse(courseId, courseUpdates) {
  try {
    const result = await model.updateOne(
      { _id: courseId },
      { $set: courseUpdates }
    );

    // Return appropriate status codes based on the result
    if (result.modifiedCount > 0) {
      return 200; // Success: course updated
    } else if (result.matchedCount === 0) {
      return 404; // Not Found: no course matched the given ID
    } else {
      return 304; // Not Modified: course matched but no changes made
    }
  } catch (error) {
    console.error(error);
    return 500; // Internal Server Error
  }
}
