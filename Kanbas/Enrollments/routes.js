import * as enrollmentDao from "./dao.js";

export default function EnrollmentsRoutes(app) {

    app.delete("/api/enrollments/:id/:userID", (req, res) => {
        const { id, userID } = req.params;
        enrollmentDao.deleteEnrollment(id, userID);
        res.sendStatus(204);
    });

    app.post("/api/enrollments", (req, res) => {
        enrollmentDao.addEnrollment(req.body);
        res.sendStatus(204);
    });

    app.get("/api/enrollments/:id", (req, res) => {
        const { id } = req.params;
        res.json(enrollmentDao.fetchEnrollments(id));
    });

}
