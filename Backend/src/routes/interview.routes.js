const express = require("express")
const authMiddleWare = require('../middlewares/auth.middleware')
const upload = require("../middlewares/file.middleware")
const interviewController = require("../controller/interview.controller")


const interviewRouter = express.Router()




interviewRouter.post("/",authMiddleWare.authUser,upload.single("resume"),interviewController.generateInterviewReportController)


interviewRouter.get("/report/:interviewId",authMiddleWare.authUser,interviewController.generateInterviewReportByIdController)


interviewRouter.get("/",authMiddleWare.authUser,interviewController.getAllInterviewReportsController)

interviewRouter.post("/resume/pdf/:interviewReportId",authMiddleWare.authUser,interviewController.generatePdfResumeController)


module.exports = interviewRouter

