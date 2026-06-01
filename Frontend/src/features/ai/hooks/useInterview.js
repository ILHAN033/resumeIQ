    import { useContext} from "react";
    import { InterviewContext } from "../interview.context";
    import { generateInterviewReport, generateResumePdf, getAllInterviewsReports, getInterviewReportById } from "../services/interview.api";


    export function useInterview(){

        const context = useContext(InterviewContext)


        if(!context){

            throw new Error("useIntview must be used inside the InterviewContext")
        }
        const {loading,setLoading,report,setReport,reports,setReports} = context

        async function generateReport({jobDescription,selfDescription,resumeFile}){
            setLoading(true)

            let response = null

            try{
                response = await generateInterviewReport({jobDescription,selfDescription,resumeFile})
                setReport(response.interviewReport)
                

            }
            catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }

            return response.interviewReport


        
        }
        

        async function getReportById(interviewId){
            setLoading(true)
            let response = null 
            try{
                response = await getInterviewReportById(interviewId)
                setReport(response.interviewReport)
                
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
            return response.interviewReport
        }


        async function getAllReports(){
            setLoading(true)
            let response = null
            try{
                response = await getAllInterviewsReports()
                setReports(response.interviewReports)
                
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
            return response.interviewReports
        }


        const getResumePdf = async (interviewReportId) => {
            setLoading(true)
            let response = null
            try {
                response = await generateResumePdf({ interviewReportId })
                const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
                const link = document.createElement("a")
                link.href = url
                link.setAttribute("download", `resume_${interviewReportId}.pdf`)
                document.body.appendChild(link)
                link.click()
            }
            catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }





        return {loading,report,reports,generateReport,getReportById,getAllReports,getResumePdf}

    }