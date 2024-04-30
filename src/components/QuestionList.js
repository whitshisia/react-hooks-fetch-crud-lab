import React ,{useEffect,useState} from "react";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((questions) => {
      if (questions.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return questions;
      }
    });
    setQuestions(updatedQuestions);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul  className="Items">
        {questions.map((questions) => (
          <QuestionForm key={questions.id} question={questions} onUpdateQuestion={handleUpdateQuestion}  />
        ))}
       </ul>
    </section>
  );
}

export default QuestionList;
