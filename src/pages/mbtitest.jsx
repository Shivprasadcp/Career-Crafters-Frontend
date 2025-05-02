import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategoryAnswer, setMbtiResults } from '../redux/mbtiSlice';

const MbtiTest = () => {
    const userData = useSelector((state) => state.user.userData);
    const mbtiQuestions = useSelector((state) => state.mbti.questions);
    const mbtiAnswers = useSelector((state) => state.mbti.answers);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentCategory, setCurrentCategory] = useState('EI');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Check if questions are loaded
    useEffect(() => {
        if (!mbtiQuestions.EI || mbtiQuestions.EI.length === 0) {
            navigate('/dashboard');
        }
    }, [mbtiQuestions, navigate]);

    const categories = ['EI', 'SN', 'TF', 'JP'];
    const categoryNames = {
        'EI': 'Extraversion vs. Introversion',
        'SN': 'Sensing vs. Intuition',
        'TF': 'Thinking vs. Feeling',
        'JP': 'Judging vs. Perceiving'
    };

    const handleOptionSelect = (questionId, option) => {
        dispatch(updateCategoryAnswer({
            category: currentCategory,
            questionId: questionId,
            option: option
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < mbtiQuestions[currentCategory].length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const nextCategoryIndex = categories.indexOf(currentCategory) + 1;
            if (nextCategoryIndex < categories.length) {
                setCurrentCategory(categories[nextCategoryIndex]);
                setCurrentQuestionIndex(0);
            }
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
            const prevCategoryIndex = categories.indexOf(currentCategory) - 1;
            if (prevCategoryIndex >= 0) {
                setCurrentCategory(categories[prevCategoryIndex]);
                setCurrentQuestionIndex(mbtiQuestions[categories[prevCategoryIndex]].length - 1);
            }
        }
    };

    const getCSRFToken = () => {
        return document.cookie
            .split('; ')
            .find((row) => row.startsWith('csrftoken='))
            ?.split('=')[1];
    };

    //   const handleSubmit = async () => {
    //     try {
    //       const response = await fetch('http://127.0.0.1:8000/tests/mbti/send_mbti_answers/', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'X-CSRFToken': getCSRFToken(),
    //           'user-id': userData.user_id,
    //         },
    //         credentials: 'include',
    //         body: JSON.stringify({ answers: mbtiAnswers }),
    //       });

    //       const result = await response.json();

    //       if (response.ok) {
    //         dispatch(setMbtiResults(result));
    //         alert('MBTI Test submission successful!');
    //         navigate('/dashboard');
    //       } else {
    //         alert(`Submission failed: ${result?.error || 'Unknown error'}`);
    //       }
    //     } catch (error) {
    //       console.error('Submit error:', error);
    //       alert('Failed to submit MBTI test. Please try again.');
    //     }
    //   };

    const handleSubmit = async () => {
        try {
            // Make sure we have answers for all categories
            const allCategoriesAnswered = categories.every(
                category => Object.keys(mbtiAnswers[category]).length === mbtiQuestions[category].length
            );

            if (!allCategoriesAnswered) {
                alert('Please answer all questions before submitting.');
                return;
            }

            // Format answers in the way the backend expects
            const formattedAnswers = {
                answers: {
                    EI: { ...mbtiAnswers.EI },
                    SN: { ...mbtiAnswers.SN },
                    TF: { ...mbtiAnswers.TF },
                    JP: { ...mbtiAnswers.JP }
                }
            };

            console.log('Submitting answers:', formattedAnswers);

            const response = await fetch('http://127.0.0.1:8000/tests/mbti/send_mbti_answers/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken(),
                    'user-id': userData.user_id,
                },
                credentials: 'include',
                body: JSON.stringify(formattedAnswers),
            });

            const result = await response.json();

            if (response.ok) {
                dispatch(setMbtiResults(result));
                alert('MBTI Test submission successful!');
                navigate('/dashboard');
            } else {
                alert(`Submission failed: ${result?.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('Failed to submit MBTI test. Please try again.');
        }
    };

    // Calculate total questions across all categories
    const totalQuestions = Object.values(mbtiQuestions).reduce(
        (total, questions) => total + (questions ? questions.length : 0),
        0
    );

    // Calculate current question number across all categories
    const getCurrentQuestionNumber = () => {
        let questionNumber = currentQuestionIndex + 1;
        for (let i = 0; i < categories.indexOf(currentCategory); i++) {
            questionNumber += mbtiQuestions[categories[i]].length;
        }
        return questionNumber;
    };

    if (!mbtiQuestions[currentCategory] || mbtiQuestions[currentCategory].length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="text-xl font-semibold">Loading MBTI questions...</div>
            </div>
        );
    }

    const question = mbtiQuestions[currentCategory][currentQuestionIndex];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">MBTI Personality Test</h1>

            <div className="w-full max-w-3/4 h-full min-h-[90vh] bg-white rounded-xl shadow-md p-6 overflow-y-auto">
                <div className="text-sm text-gray-500 font-semibold mb-2">
                    Category: {categoryNames[currentCategory]} - Question {getCurrentQuestionNumber()} of {totalQuestions}
                </div>

                <div className="w-full h-2 bg-gray-200 rounded mb-4">
                    <div
                        className="h-full bg-blue-500 rounded"
                        style={{ width: `${(getCurrentQuestionNumber() / totalQuestions) * 100}%` }}
                    ></div>
                </div>

                <div className="bg-gray-50 p-4 h-auto min-h-[70vh] rounded-lg border-l-4 border-blue-500 mb-4">
                    <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
                    <div className="flex flex-col gap-3">
                        <label
                            className={`flex items-center px-4 py-2 rounded-md cursor-pointer transition ${mbtiAnswers[currentCategory][question.id] === 'option1' ? 'bg-blue-100' : 'bg-blue-50'
                                } hover:bg-blue-200`}
                        >
                            <input
                                type="radio"
                                className="appearance-none w-4 h-4 border-2 border-blue-500 rounded-full mr-3 checked:bg-blue-500 relative"
                                name={`question-${question.id}`}
                                value="option1"
                                checked={mbtiAnswers[currentCategory][question.id] === 'option1'}
                                onChange={() => handleOptionSelect(question.id, 'option1')}
                            />
                            {question.option1}
                        </label>
                        <label
                            className={`flex items-center px-4 py-2 rounded-md cursor-pointer transition ${mbtiAnswers[currentCategory][question.id] === 'option2' ? 'bg-blue-100' : 'bg-blue-50'
                                } hover:bg-blue-200`}
                        >
                            <input
                                type="radio"
                                className="appearance-none w-4 h-4 border-2 border-blue-500 rounded-full mr-3 checked:bg-blue-500 relative"
                                name={`question-${question.id}`}
                                value="option2"
                                checked={mbtiAnswers[currentCategory][question.id] === 'option2'}
                                onChange={() => handleOptionSelect(question.id, 'option2')}
                            />
                            {question.option2}
                        </label>
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
                        onClick={handlePrev}
                        disabled={currentCategory === 'EI' && currentQuestionIndex === 0}
                    >
                        Previous
                    </button>

                    {currentCategory === 'JP' && currentQuestionIndex === mbtiQuestions.JP.length - 1 ? (
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

export default MbtiTest;