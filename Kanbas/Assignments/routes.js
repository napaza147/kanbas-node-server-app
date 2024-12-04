import * as assignmentDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.put("/api/assignments", (req, res) => {
    const { _id, ...assignmentUpdates } = req.body;
    if (!_id) {
        return res.status(400).json({ error: "Idrequired!" }); // Verifying id
    }

    try {
        assignmentDao.updateAssignment(_id, assignmentUpdates);
        res.sendStatus(204); // No content response
    } catch (error) {
        console.error(error.message);
        res.status(404).json({ error: error.message });
    }
});

  
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    assignmentDao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  });

  app.get("/api/assignments/:cid", (req, res) => {
    const { cid } = req.params;
    res.json(assignmentDao.fetchAssignmentsForCourse(cid));
});

  app.post("/api/assignments", async (req, res) => {
      assignmentDao.createAssignment(req.body);
      res.sendStatus(204);
  });

}


