import * as enrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {

    app.post("/api/enrollments/enroll", async (req, res) => {
        const { userId, courseId } = req.body;
        const enrollment = await enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.send(enrollment);
    });

    app.delete("/api/enrollments/unenroll", async (req, res) => {
        const { userId, courseId } = req.body;
        await enrollmentsDao.unenrollFromCourse(userId, courseId);
        res.send({ message: "Unenrolled successfully" });
    });

    app.get("/api/enrollments/user/:userId", async (req, res) => {
        const { userId } = req.params;
        const enrollments = await enrollmentsDao.getEnrollments(userId);
        res.send(enrollments);
    });

}
