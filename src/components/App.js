import React, { useState , useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App({onAddQuestion}) {

  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function handleSubmit(e ,FormData) {
    e.preventDefault();
    fetch("http://localhost:4000/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(FormData),
  })
    .then((r) => r.json())
    .then((newQuestion) =>{
      setQuestions([...questions, newQuestion]);
      onAddQuestion(newQuestion);
    }); ;
  }
  function handleToAddQuestion({updatedQuestion}) {
    fetch(`http://localhost:4000/questions/${updatedQuestion.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      addquestion: !updatedQuestion.addquestion,
    }),
  })
    .then((r) => r.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      );
      setQuestions(updatedQuestions);
    });;

  }
  function handleDeleteClick({questionToDelete}) {
    fetch(`http://localhost:4000/questions/${questions.id}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then(() => {
      const updatedQuestions = questions.filter(
        (question) => question.id !== questionToDelete.id
      );
      setQuestions(updatedQuestions);
    });
}


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onSubmit={handleSubmit} /> : <QuestionList questions={questions} onAddQuestion={handleToAddQuestion} onDeleteQuestion={handleDeleteClick} />}
    </main>
  );
}

export default App;
