import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}

export function enrollInCourse(userId, courseId) {
  const enrollment = { user: userId, course: courseId };
  if (!Database.enrollments.some(en => en.user === userId && en.course === courseId)) {
    Database.enrollments.push(enrollment);
  }
  return enrollment;
}

export function unenrollFromCourse(userId, courseId) {
  Database.enrollments = Database.enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
}

export function getEnrollments(userId) {
  return Database.enrollments.filter((enrollment) => enrollment.user === userId);
}
