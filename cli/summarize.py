import requests

def summarize_text(text, model_name, mode):
    print(f"🧠 Summarizing with model: {model_name} | mode: {mode}")

    if mode == "meeting":
        prompt = f"""
        Context:
        You are processing a transcript of a meeting.

        Role:
        You are an expert meeting assistant.

        Objective:
        Extract structured and concise meeting insights.

        Source:
        Transcript text below.

        Scope:
        - Do NOT add introduction or conclusion
        - Do NOT ask questions
        - Be concise and factual
        - Avoid repetition

        Output format:
        Key Discussion Points:
        - ...

        Decisions Made:
        - ...

        Action Items:
        - ...

        Important Notes:
        - ...

        Transcript:
        {text}
        """
    elif mode == "interview":
        prompt = f"""
        Context:
        You are processing an educational tutorial, lecture, or technical content.

        Role:
        You are an expert interviewer and evaluator.

        Objective:
        Generate high-quality interview questions based on the key concepts in the content.

        Source:
        Transcript text below.

        Scope:
        - Do NOT add introduction or conclusion
        - Do NOT provide answers
        - Do NOT ask follow-up questions
        - Avoid repetition
        - Focus on conceptual understanding, problem-solving, and practical knowledge

        Output format:

        Basic Questions:
        - ...

        Intermediate Questions:
        - ...

        Advanced Questions:
        - ...

        Scenario-Based Questions:
        - ...

        Transcript:
        {text}
        """
    elif mode == "report":
        prompt = f"""
        Context:
        You are processing informational content.

        Role:
        You are a professional report writer.

        Objective:
        Create a structured and formal summary.

        Source:
        Transcript text below.

        Scope:
        - Do NOT add introduction or conclusion
        - Keep it formal and concise
        - Avoid repetition

        Output format:
        Overview:
        ...

        Key Findings:
        - ...

        Analysis:
        - ...

        Conclusion:
        ...

        Transcript:
        {text}
        """
    elif mode == "lecture":
        prompt = f"""
        Context:
        You are processing an educational lecture or tutorial.

        Role:
        You are an expert educator.

        Objective:
        Extract key learning points and explanations.

        Source:
        Transcript text below.

        Scope:
        - Do NOT add introduction or conclusion
        - Focus on clarity and learning
        - Avoid repetition

        Output format:
        Key Concepts:
        - ...

        Explanations:
        - ...

        Examples:
        - ...

        Takeaways:
        - ...

        Transcript:
        {text}
        """
    elif mode == "keypoints":
        prompt = f"""
        Context:
        You are processing general content.

        Role:
        You are a summarization assistant.

        Objective:
        Extract only the most important points.

        Source:
        Transcript text below.

        Scope:
        - Output ONLY bullet points
        - No headings
        - No explanation
        - No repetition

        Output format:
        - Point 1
        - Point 2
        - Point 3

        Transcript:
        {text}
        """
    else:
        prompt = f"""
        Context:
        You are processing general content.

        Role:
        You are a summarization assistant.

        Objective:
        Create a clear and structured summary.

        Source:
        Transcript text below.

        Scope:
        - Do NOT add introduction or conclusion
        - Keep it concise
        - Avoid repetition

        Output format:
        Summary:
        - ...

        Key Points:
        - ...

        Transcript:
        {text}
        """

    response = requests.post(
        "http://localhost:1234/v1/chat/completions",
        json={
            "model": model_name,
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.3
        }
    )
    data = response.json()
    if "choices" not in data:
        print("❌ Error from LM Studio:")
        print(data)
        return "Error: Failed to generate summary"

        
    return response.json()["choices"][0]["message"]["content"]

