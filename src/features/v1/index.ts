import dotenv from 'dotenv';
import { Router } from 'express';
import users from './user/user.route';
import keycloak from './keycloak/keycloak.route'
import script from './script/script.route'
import exam from './exam/exam.route'
import upload from './upload/upload.route'
import role from './role/role.route'
import assignSME from './assignSME/assignSME.route';
import assignPaperSetter from './assignPaperSetter/assignPaperSetter.route';
import assignModerator from './assignModerator/assignModerator.route';
import questionBank from './questionBank/questionBank.route'
import subject from './subject/subject.route';
import questionSet from './question_set/question_set/question_set.route';
import paperSetter from './paperSetter/paper-setter.route';
import questionBankModule from './questionBankModule/questionBankModule.route';
import moderator from './moderator/moderator.route'

const router = Router();
dotenv.config();
const environment = process.env.NODE_ENV || 'development';

interface IRoutes {
    path: string,
    route: Router
}

const productionRoutes: IRoutes[] = [
    {
        path: '/users',
        route: users
    },
    {
        path: '/keycloak',
        route: keycloak
    },
    {
        path: '/script',
        route: script
    },
    {
        path: '/exam',
        route: exam
    },
    {
        path: '/upload',
        route: upload
    },
    {
        path: '/role',
        route: role
    },
    {
        path: '/assignSME',
        route: assignSME
    },
    {
        path: '/assignPaperSetter',
        route: assignPaperSetter
    },
    {
        path: '/assignModerator',
        route: assignModerator
    },
    {
        path: '/questionBank',
        route: questionBank
    },
    {
        path: '/subject',
        route: subject
    },
    {
        path: '/question-set',
        route: questionSet
    },
    {
        path: '/paperSetter',
        route: paperSetter
    },
    {
        path: '/moderator',
        route: moderator
    },
    {
        path: '/questionBankModule',
        route: questionBankModule
    }

];

// Setting the production route
productionRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;