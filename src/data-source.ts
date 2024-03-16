import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./features/v1/user/user.model"
import path from 'path';
import * as dotenv from 'dotenv';
import { Exam } from "./features/v1/exam/exam.model"
import Course from "./features/v1/course/course.model"
import Subject from "./features/v1/subject/subject.model"
import Semester from "./features/v1/semester/semester.model"
import College from "./features/v1/college/college.model"
import CollegeCourseOffered from "./features/v1/college/college-course-offered.model"
import { ExamSubject } from "./features/v1/exam/exam-subject.model"
import { Uploads } from "./features/v1/upload/uploads.model"
import { ActivityTracker } from "./features/v1/actvity_tracker/activity_tracker.model"
import Roles from "./features/v1/role/role.model";
import { AssignSME } from "./features/v1/assignSME/assignSME.model";
import { AssignPaperSetter } from "./features/v1/assignPaperSetter/assignPaperSetter.model";
import { QuestionBank } from "./features/v1/questionBank/questionBank.model";
import { UserRole } from "./features/v1/userRole/userRole.model";

// Load the .env file
dotenv.config();

// Get the current filename and extension for migration location
const currentFilename = __filename;
const fileExtension = path.extname(currentFilename);
const migrationLocation = fileExtension === '.ts' ? './src/migration/*.ts' : '';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'osm',
    synchronize: false,
    logging: false,
    entities: [User, Roles, Exam,
        Course, Subject, Semester, College, CollegeCourseOffered,
        ExamSubject, Uploads,
        ActivityTracker,
        UserRole, AssignSME, AssignPaperSetter,QuestionBank
    ],
    migrationsTableName: "migration_table",
    migrations: [migrationLocation],
    subscribers: [],
});