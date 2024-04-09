import { NextFunction, Request, Response } from 'express';
import QuestionSetUtils from './question_set.utils';
import sendSuccessResponse from '../../../../middlewares/success-handler';
import { IRoles } from '../../user/user.types';
import path from 'path';
import fs from 'fs';
import puppeteer from 'puppeteer';
import UploadsRepository from '../../upload/uploads.util';

// Define your HTML content
const htmlContent = (questionSet) => `
<div style="max-width: 100%; padding-left: 0; padding-right: 0; padding-top: 1.25rem; padding-bottom: 1.25rem; display: flex; flex-direction: column; font-weight: bold; align-items: center;">
<div style="max-height: 500px; width: 90%; padding-left: .5rem;">
  <div style="justify-content: center; margin-bottom: .5rem; font-size: 1.25rem; text-align: center;">${questionSet[0].courseName}</div>
  <div style="justify-content: space-between; margin-bottom: .5rem; display: flex; flex-direction: row; align-items: center;">
    <span style="margin-top: auto;">${questionSet[0].year}</span>
    <span style="font-size: 1.125rem; text-align: center;">${questionSet[0].assessmentCode} - ${questionSet[0].subjectName} - <span style="margin-top: auto;">${questionSet[0].setName}</span></span>
    <span style="margin-top: auto;">Total Marks: ${questionSet[0].totalMark}</span>
  </div>
  <hr style="border-width: 2px; margin-top: 1.25rem; margin-bottom: 1.25rem;" />
  ${questionSet[0].questions.map((section, sectionIndex) => (
    '<div key="' + section.questionIndex + '" style="margin-bottom: .1rem; margin-top: -1rem;">' +
    '<div style="display: flex">' +
    '<div style="display: flex">' +
    '<span style="font-weight: bold; padding-right: .5rem; padding-top: 1.2rem;">Q' + section.questionIndex + '.)</span>' +
    '<div style="">' + section.questionContent + '</div>' +
    (section.subQuestionsAllowed ? '<span style="font-weight: bold; padding-top: 1.2rem; padding-left: .5rem;">(Any ' + (section?.maxSubQuestionsAttempt || '') + ')</span>' : '') +
    '</div>' +
    '<div style="margin-left: auto; padding-top: 1.2rem;">(' + section.marks + ')</div>' +
    '</div>' +
    (section.questions && section.questions.length > 0 ?
        '<div style="padding-left: 1.5rem;">' +
        section.questions.map((question, questionIndex) => (
            '<div key="' + question.questionIndex + '" style="margin-bottom: .1rem; margin-top: -1rem;">' +
            '<div style="display: flex; margin-left: 1rem">' +
            '<div style="display: flex">' +
            '<span style="font-weight: bold; padding-top: 1.2rem; padding-right: .5rem;">' + question.questionIndex + '.) </span><div>' + question.questionText + '</div>' +
            (question.subQuestionsAllowed ? '<span style="font-weight: bold; padding-top: 1.2rem; padding-left: .5rem;">(Any ' + (question?.maxSubQuestionsAttempt || '') + ')</span>' : '') +
            '</div>' +
            '<div style="margin-left: auto; padding-top: 1.2rem;">(' + question.marks + ')</div>' +
            '</div>' +
            (question.questions && question.questions.length > 0 ?
                '<div style="padding-left: 1rem; margin-bottom: .1rem; margin-top: -2rem;">' +
                question.questions.map((subQuestion, subQuestionIndex) => (
                    '<span key="' + question.questionIndex + '" style="display: flex; margin-top: .75rem; margin-left: 1.25rem">' +
                    '<div style="display: flex ">' +
                    '<span style="font-weight: bold; padding-top: 1.2rem; padding-right: .5rem;">' + subQuestion.questionIndex + '.)</span>' +
                    '<div>' + subQuestion.questionText + '</div>' +
                    '</div>' +
                    '<div style="margin-left: auto; padding-top: 1.2rem;">(' + subQuestion.marks + ')</div>' +
                    '</span>'
                )).join('') +
                '</div>' : '') +
            '</div>'
        )).join('') +
        '</div>' : '') +
    '</div>'
)).join('')}
</div>
<div >
<hr style="border-width: 2px; margin-top: 1.25rem; margin-bottom: 1.25rem;" />
</div>
</div>`;
export default class QuestionSetController {

    static async generateQuestionSetPdf(req: Request, res: Response, next: NextFunction) {
        try {
            const browser = await puppeteer.launch({
                headless: true, // Set to true to run in headless mode
            });

            const userId = req.user.id
            const {subjectId, examId,questionSetId } = req.body

            const questionSetData = await QuestionSetUtils.getQuestionSetData(userId,subjectId,examId,questionSetId)
            
            const page = await browser.newPage();
            await page.setContent(htmlContent(questionSetData));
            // Define footer template
            const footerTemplate = `
                <div style="width: 100%; text-align: center; font-size: 10px;">
                  Page <span class="pageNumber"></span> of <span class="totalPages"></span>
                </div>`;
            // Generate PDF
            const pdfBuffer = await page.pdf({
                format: 'A4', // Paper format
                printBackground: true, // Include background graphics
                displayHeaderFooter: true,
                headerTemplate: '<div></div> ',
                margin: {
                    top: "20px",
                    right: "0px",
                    bottom: "50px",
                    left: "0px"
                },
                footerTemplate: footerTemplate
            });

            const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.pdf`;
            const destination = path.join(process.cwd(), 'uploads', 'question_paper')
            
            const folderPath = path.join(process.cwd(), 'uploads', 'question_paper', filename)
             
            fs.writeFileSync(folderPath, pdfBuffer);

            await browser.close();

            const pdfGenerate = {
                helperName: 'questionSetUploadPdf',
                uploadedFor: 'addQuestionSet',
                extension: 'pdf',
                originalname: filename,
                encoding: '7bit',
                mimetype: 'application/pdf',
                size: 1,
                destination,
                filename,
            }

            const questionSetUploadPdf = await UploadsRepository.createUploads(pdfGenerate);
            await QuestionSetUtils.updateUploadedPdfId(questionSetUploadPdf.id,req.body.questionSetId)
            sendSuccessResponse(req, res, { data: "Successfully Saved" })

        } catch (e) {
            next(e);
        }
    }

    static async createQuestionSet(req: Request, res: Response, next: NextFunction) {
        try {

            const userId = req.user.id
            const body = req.body
            const newData = { ...body, userId: userId }
            const questionSet = await QuestionSetUtils.createQuestionSet(newData)
            
            req.body.questionSetId = questionSet.id
            next();
        } catch (error) {
            next(error)
        }
    }

    static async getQuestionSet(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.user.id
            const roles = req.user.role

            if (Array.isArray(roles)) {
                const checkRole = roles.filter((obj: any) => obj.roleName === IRoles.PAPER_SETTER || obj.roleName === IRoles.SUPER_ADMIN || IRoles.COE_HEAD);
                console.log("checkRole", checkRole);

                if (checkRole && checkRole.length > 0) {
                    // check if role includes SUPER_ADMIN
                    if (checkRole.some((obj: any) => obj.roleName === IRoles.SUPER_ADMIN || obj.roleName === IRoles.COE_HEAD)) {
                        const data = await QuestionSetUtils.getQuestionSet();
                        sendSuccessResponse(req, res, { data });
                    } else if (checkRole.some((obj: any) => obj.roleName === IRoles.MODERATOR)) {

                        const data = await QuestionSetUtils.getQuestionSetByExamAndSubjectId(Number(req.query.examId), Number(req.query.subjectId));
                        return sendSuccessResponse(req, res, { data });
                    } else {
                        console.log("req.query", req.query.examId, req.query.subjectId);

                        const data = await QuestionSetUtils.getQuestionSetByUserIdExamAndSubjectId(Number(id), Number(req.query.examId), Number(req.query.subjectId));
                        sendSuccessResponse(req, res, { data });
                    }
                } else {
                    sendSuccessResponse(req, res, { data: [] });
                }
            } else {
                sendSuccessResponse(req, res, { data: [] });

            }
            const data = await QuestionSetUtils.getQuestionSet()
            sendSuccessResponse(req, res, { data })
        } catch (error) {
            next(error)
        }
    }

    static async getQuestionSetById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const data = await QuestionSetUtils.getQuestionSetById(Number(id));
            sendSuccessResponse(req, res, { data });
        } catch (error) {
            next(error)
        }
    }
} 