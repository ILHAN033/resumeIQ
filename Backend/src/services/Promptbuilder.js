/**
 * Builds the structured prompt for Gemini to analyze a resume
 * against a job description and self-description.
 *
 * @param {string} resume
 * @param {string} selfDescription
 * @param {string} jobDescription
 * @returns {string} - The full prompt string
 */
function buildPrompt(resume, selfDescription, jobDescription) {
  return `
You are an expert technical recruiter and career coach. Analyze the candidate's resume and self-description against the job description provided.

Your task is to return a SINGLE valid JSON object — no markdown, no explanation, no code fences. Just raw JSON.

The JSON must follow this exact schema:

{
  "matchScore": <integer 0–100 representing how well the candidate matches the job>,
  "technicalQuestions": [
    {
      "question": "<interview question tailored to the JD and candidate's background>",
      "intention": "<what this question is meant to evaluate>",
      "answer": "<ideal answer the interviewer expects>"
    }
    // Provide exactly 3 technical questions
  ],
  "behavioralQuestions": [
    {
      "question": "<behavioral interview question>",
      "intention": "<what this question is meant to evaluate>",
      "answer": "<ideal answer>"
    }
    // Provide exactly 2 behavioral questions
  ],
  "skillGaps": [
    {
      "skill": "<skill name missing or weak based on JD vs resume>",
      "severity": "<'low' | 'medium' | 'high'>"
    }
    // List all identified skill gaps
  ],
  "preparationPlan": [
    {
      "day": <day number starting from 1>,
      "focus": "<the main topic for the day>",
      "tasks": [
        "<specific actionable task>",
        "<specific actionable task>",
        "<specific actionable task>"
      ]
    }
    // Provide a 5-day plan
  ]
}

--- JOB DESCRIPTION ---
${jobDescription}

--- CANDIDATE SELF DESCRIPTION ---
${selfDescription}

--- CANDIDATE RESUME ---
${resume}

Return only the JSON object. Do not include any other text.
`.trim();
}

module.exports = { buildPrompt };