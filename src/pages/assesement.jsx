// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Card, CardContent } from '../components/button.jsx';
// import { useDispatch, useSelector } from 'react-redux';
// import { setQuestions, setAnswers } from '../redux/assessmentSlice';
// import { setResultData } from '../redux/resultSlice';

// const assesement = () => {
//   const userData = useSelector((state) => state.user.userData);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const questions = useSelector((state) => state.assessment.questions);
//   // console.log("Questions in Assessment:", questions);
//   const [answers, setAnswersState] = useState({});
//   useEffect(() => {

//     if (!questions.length) {
//       navigate('/');
//     }
//   }, [questions, navigate]);


//   useEffect(() => {
//     if (!questions.length) {
//       navigate('/');
//     }
//   }, [questions, navigate]);

//   const handleOptionSelect = (questionId, option) => {
//     const updatedAnswers = { ...answers, [questionId]: option };
//     console.log("selected ans :", updatedAnswers);
//     setAnswersState(updatedAnswers);
//     dispatch(setAnswers(updatedAnswers));
//   };



//   const getCSRFToken = () => {
//     return document.cookie.split('; ')
//       .find(row => row.startsWith('csrftoken='))
//       ?.split('=')[1];
//   };

//   const handleSubmit = async () => {
//     try {
//       const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
//         question_id: parseInt(questionId),
//         selected_option: selectedOption,
//       }));

//       const response = await fetch('http://127.0.0.1:8000/tests/submit-answers/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRFToken': getCSRFToken(),
//           'user-id': userData.user_id,
//         },
//         credentials: 'include',  // ✅ Ensure cookies are sent
//         body: JSON.stringify({ answers: formattedAnswers }),
//       });


//       const text = await response.text();
//       console.log('Raw response body:', text);
//       let result;
//       try {
//         result = JSON.parse(text);
//       } catch (e) {
//         console.error('Failed to parse JSON:', e);
//       }

//       if (response.ok && result) {
//         dispatch(setResultData(result));
//         alert('Submission successful!');
//         navigate('/dashboard');
//       } else {
//         console.error(`Error: ${result?.error}`);
//         alert(`Submission failed: ${result?.error}`);
//       }
//     } catch (error) {
//       console.error('Error submitting answers:', error);
//     }
//   };



//   return (
//     <div className="p-8 space-y-4">
//       <h2 className="text-2xl font-bold">Assessment</h2>
//       {questions && questions.length > 0 ? (
//         questions.map((question) => (
//           <Card key={question.id} className="p-4 mb-4">
//             <CardContent>
//               <h3 className="text-xl font-semibold">{question.question}</h3>
//               {question.options && question.options.map((option, index) => (
//                 <label key={index} className="block mt-2">
//                   <input
//                     type="radio"
//                     name={`question-${question.id}`}
//                     value={option}
//                     checked={answers[question.id] === option}
//                     onChange={() => handleOptionSelect(question.id, option)}
//                   />
//                   {option}
//                 </label>
//               ))}
//             </CardContent>
//           </Card>
//         ))
//       ) : (
//         <p>No questions available</p>
//       )}

//       <Button onClick={handleSubmit} className="bg-blue-500 text-white rounded-lg px-4 py-2">
//         Submit
//       </Button>
//     </div>
//   );
// };

// export default assesement;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswers } from '../redux/assessmentSlice';
import { setResultData } from '../redux/resultSlice';

const Assessment = () => {
  const userData = useSelector((state) => state.user.userData);
  const questions = useSelector((state) => state.assessment.questions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [answers, setAnswersState] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (!questions.length) {
      navigate('/');
    }
  }, [questions, navigate]);

  const handleOptionSelect = (questionId, option) => {
    const updated = { ...answers, [questionId]: option };
    setAnswersState(updated);
    dispatch(setAnswers(updated));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getCSRFToken = () => {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrftoken='))
      ?.split('=')[1];
  };

  const handleSubmit = async () => {
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
        question_id: parseInt(questionId),
        selected_option: selectedOption,
      }));

      const response = await fetch('http://127.0.0.1:8000/tests/submit-answers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
          'user-id': userData.user_id,
        },
        credentials: 'include',
        body: JSON.stringify({ answers: formattedAnswers }),
      });

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.error('JSON parse error:', e);
      }

      if (response.ok && result) {
        dispatch(setResultData(result));
        alert('Submission successful!');
        navigate('/dashboard');
      } else {
        alert(`Submission failed: ${result?.error}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const question = questions[currentQuestionIndex];

  return (
    // <div className="flex flex-col  items-center px-4 py-8">
    <div className="min-h-screen  flex flex-col items-center justify-center px-4 py-8 bg-gray-100">

      <h1 className="text-3xl font-bold mb-4">Welcome, {userData?.username || 'User'}!</h1>

      {/* <div className="w-full max-w-3/4  bg-white rounded-xl shadow-md p-6"> */}
      <div className="w-full max-w-3/4 h-full min-h-[90vh] bg-white rounded-xl shadow-md p-6 overflow-y-auto">

        <div className="text-sm text-gray-500 font-semibold mb-2">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>

        <div className="w-full h-2 bg-gray-200 rounded mb-4">
          <div
            className="h-full bg-blue-500 rounded"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="bg-gray-50 p-4 h-auto min-h-[70vh] rounded-lg border-l-4 border-blue-500 mb-4">
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
          <div className="flex  flex-col gap-3">
            {question.options.map((option, idx) => (
              <label
                key={idx}
                className={`flex items-center px-4 py-2 rounded-md cursor-pointer transition ${answers[question.id] === option ? 'bg-blue-100' : 'bg-blue-50'
                  } hover:bg-blue-200`}
              >
                <input
                  type="radio"
                  className="appearance-none w-4 h-4 border-2 border-blue-500 rounded-full mr-3 checked:bg-blue-500 relative"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => handleOptionSelect(question.id, option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit Answers
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
