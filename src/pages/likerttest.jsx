import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setLikertAnswers, 
  setLikertResults
} from '../redux/likertSlice';
import { setResultData } from '../redux/resultSlice';

const LikertTest = () => {
  const userData = useSelector((state) => state.user.userData);
  const likertQuestions = useSelector((state) => state.likert.questions);
  const likertAnswers = useSelector((state) => state.likert.answers);
  const likertLoading = useSelector((state) => state.likert.loading);
  const likertError = useSelector((state) => state.likert.error);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Debugging log
  useEffect(() => {
    console.log('LikertTest component mounted');
    console.log('userData:', userData);
    console.log('likertQuestions from Redux:', likertQuestions);
  }, [userData, likertQuestions]);

  // Authentication check
  useEffect(() => {
    if (!userData || !userData.user_id) {
      navigate('/login');
    }
  }, [userData, navigate]);

  // Initialize answers when questions are loaded
  useEffect(() => {
    // Only initialize if we have questions but no answers yet
    if (likertQuestions && likertQuestions.length > 0 && Object.keys(likertAnswers).length === 0) {
      console.log('Initializing likert answers');
      const initialAnswers = {};
      likertQuestions.forEach((q, index) => {
        initialAnswers[index] = null;
      });
      dispatch(setLikertAnswers(initialAnswers));
    }
  }, [likertQuestions, likertAnswers, dispatch]);

  // Likert scale options
  const likertOptions = [
    "Strongly Disagree",
    "Disagree", 
    "Neutral", 
    "Agree", 
    "Strongly Agree"
  ];

  const getCSRFToken = () => {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrftoken='))
      ?.split('=')[1];
  };

  const handleOptionSelect = (questionIndex, value) => {
    const updatedAnswers = {
      ...likertAnswers,
      [questionIndex]: value
    };
    dispatch(setLikertAnswers(updatedAnswers));
  };

  const handleNext = () => {
    if (currentQuestionIndex < likertQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all questions have been answered
    const unansweredQuestions = Object.values(likertAnswers).filter(value => value === null).length;
    if (unansweredQuestions > 0) {
      alert(`You have ${unansweredQuestions} unanswered questions. Please complete all questions before submitting.`);
      return;
    }

    try {
      // Format answers for API according to the required structure
      const responses = Object.entries(likertAnswers).map(([index, value]) => ({
        question: likertQuestions[parseInt(index)].question,
        domains: likertQuestions[parseInt(index)].domains,
        response: value // Changed from 'rating' to 'response' to match backend expectations
      }));

      // Create the payload in the required format
      const payload = {
        responses: responses
      };

      console.log("Submitting Likert answers:", payload);

      const response = await fetch('http://127.0.0.1:8000/tests/submit_likert_answers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
          'user-id': userData.user_id,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${errorText}`);
      }

      const result = await response.json();
      console.log("Submission result:", result);

      // Store likert results in redux
      dispatch(setLikertResults(result));
      
      // Update main result data if needed
      if (result.domainScores) {
        dispatch(setResultData(result));
      }
      
      alert('Likert test submission successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Submit error:', error);
      alert('An error occurred during submission: ' + error.message);
    }
  };

  // Show loading state if no questions available yet
  if (!likertQuestions || likertQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading questions...</div>
      </div>
    );
  }

  // Show error if present
  if (likertError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-red-500">Error: {likertError}</div>
      </div>
    );
  }

  const currentQuestion = likertQuestions[currentQuestionIndex];
  
  // Additional check to ensure currentQuestion exists
  if (!currentQuestion) {
    console.error('Current question is undefined', {
      currentQuestionIndex,
      likertQuestionsLength: likertQuestions.length,
      likertQuestions
    });
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-red-500">Error: Could not load current question</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Likert Test</h1>
      <h2 className="text-xl mb-6">Welcome, {userData?.username || userData?.success || 'User'}!</h2>

      <div className="w-full max-w-3/4 h-full min-h-[90vh] bg-white rounded-xl shadow-md p-6 overflow-y-auto">
        <div className="text-sm text-gray-500 font-semibold mb-2">
          Question {currentQuestionIndex + 1} of {likertQuestions.length}
        </div>

        <div className="w-full h-2 bg-gray-200 rounded mb-4">
          <div
            className="h-full bg-blue-500 rounded"
            style={{ width: `${((currentQuestionIndex + 1) / likertQuestions.length) * 100}%` }}
          ></div>
        </div>

        <div className="bg-gray-50 p-4 h-auto min-h-[60vh] rounded-lg border-l-4 border-blue-500 mb-4">
          <h3 className="text-lg font-semibold mb-6">{currentQuestion.question}</h3>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 text-sm text-gray-600">
            <span>Strongly Disagree</span>
            <span className="hidden md:block">Disagree</span>
            <span className="hidden md:block">Neutral</span>
            <span className="hidden md:block">Agree</span>
            <span>Strongly Agree</span>
          </div>

          <div className="flex justify-between items-center mb-6">
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value} className="flex flex-col items-center">
                <button
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 transition
                    ${likertAnswers[currentQuestionIndex] === value 
                      ? 'bg-blue-500 text-white border-blue-600' 
                      : 'bg-white border-gray-300 hover:bg-blue-100'}`}
                  onClick={() => handleOptionSelect(currentQuestionIndex, value)}
                >
                  {value}
                </button>
                <span className="md:hidden text-xs text-center">{likertOptions[value-1]}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>Domains: {currentQuestion.domains.join(", ")}</p>
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

          {currentQuestionIndex === likertQuestions.length - 1 ? (
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

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Question Response: {likertAnswers[currentQuestionIndex] ? likertOptions[likertAnswers[currentQuestionIndex]-1] : "Not answered"}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {Object.values(likertAnswers).filter(v => v !== null).length} of {likertQuestions.length} questions answered
          </p>
        </div>
      </div>
    </div>
  );
};

export default LikertTest;