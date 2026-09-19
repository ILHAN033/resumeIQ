const pdfParse = require('pdf-parse')
const {generateInterviewReport,generatePdfResume} = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')

async function generateInterviewReportController(req,res){

    // const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    // const {selfDescription,jobDescription} = req.body


    // const interviewReportByAI = await generateInterviewReport({
    //     resume:resumeContent.text,
    //     selfDescription,
    //     jobDescription
    // })

    const hasPdf = Boolean(req.file)
    const hasSelfDescription = Boolean(req.body.selfDescription?.trim())

    // Exactly one must be provided
    if (hasPdf === hasSelfDescription) {
        return res.status(400).json({
            message: "Provide either a PDF resume or a self description, but not both."
        })
    }

    let resumeContent = ""

    if (hasPdf) {
        const parsedPdf = await new pdfParse.PDFParse(
            Uint8Array.from(req.file.buffer)
        ).getText()

        resumeContent = parsedPdf.text
    }

    const { selfDescription, jobDescription } = req.body

    const interviewReportByAI = await generateInterviewReport({
        resume: resumeContent,
        selfDescription: hasSelfDescription ? selfDescription : "",
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAI
    })

    return res.status(201).json({message:
        "Interview report has been generated sucessfully",
        interviewReport
    })

}


async function generateInterviewReportByIdController(req, res){
    const {interviewId} = req.params
    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id})

    if(!interviewReport){
        return res.status(404).json({ message: "Interview report not found" })
    }

    // ✅ Both in one object
    return res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport  
    })
}

async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}

async function generatePdfResumeController(req,res){
    const {interviewReportId} = req.params
    const interviewReport =  await interviewReportModel.findById(interviewReportId)

    if(!interviewReport){
        return res.status(404).json({message:"Interview report not found"})
    }

    const {resume,selfDescription,jobDescription} = interviewReport

    const pdfBuffer = await generatePdfResume({resume,selfDescription,jobDescription})

    res.set({
        "Content-Type":"application/pdf",
        "Content-Disposition":`attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}


module.exports = {generateInterviewReportController,generateInterviewReportByIdController,getAllInterviewReportsController,generatePdfResumeController}