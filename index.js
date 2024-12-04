import "dotenv/config";
import session from "express-session";
import express from 'express';
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";

import ModuleRoutes from "./Kanbas/Modules/routes.js";




const app = express();

app.use(express.json());

app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};


if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(
  session(sessionOptions)
);

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);