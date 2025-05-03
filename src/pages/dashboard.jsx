import React, { useEffect, useState } from 'react';
import DomainPieChart from '../components/DomainPieChart';
import DomainRadarChart from '../components/DomainRadarChart';
import MBTIResultCard from '../components/MBTIResultCard';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/Logo.png';
import Help from '../assets/Help.png';
import Feedback from '../assets/Feedback.png';
import { setQuestions } from '../redux/assessmentSlice';
import { setLikertQuestions } from '../redux/likertSlice';
import { setMbtiQuestions } from '../redux/mbtiSlice';
import { setCareerRecommendation } from '../redux/recommendationSlice';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaDownload } from 'react-icons/fa';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const Dashboard = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { domainScores, topDomains, topDomainScores } = useSelector(state => state.result);
  const likertResults = useSelector(state => state.likert.results);
  const mbtiResults = useSelector(state => state.mbti.results);
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!userData || !userData.user_id) {
      navigate('/login');
    }
  }, [userData, navigate]);

  const getCSRFToken = () => {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrftoken='))
      ?.split('=')[1];
  };

  const handleLogout = () => {
    dispatch(clearUserData());
    navigate('/login');
  };

  const startNewAssessment = async () => {
    try {
      console.log("Starting assessment for user ID:", userData.user_id);
      const response = await axios.get('http://127.0.0.1:8000/tests/generate-questions/', {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
          'user-id': userData.user_id,
        },
        credentials: 'include',
      });

      console.log('New assessment started:', response.data);

      // Store questions in Redux
      dispatch(setQuestions(response.data.questions));

      // Navigate to assessment page
      navigate('/assesment');
    } catch (error) {
      console.error('Error starting new assessment:', error);
      alert('Failed to start assessment. Please try again.');
    }
  };

  const startLikertTest = async () => {
    try {
      console.log("Starting Likert test for user:", userData.user_id);

      // Clear existing questions first to avoid showing wrong questions
      dispatch(setLikertQuestions([]));

      // Use the same API call pattern as in the LikertTest component
      const response = await fetch('http://127.0.0.1:8000/tests/get_likert_questions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        credentials: 'include',
        body: JSON.stringify({
          top_domains: topDomains || ["engineering", "business", "arts"] // Fallback if topDomains not available
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Likert questions');
      }

      const data = await response.json();
      console.log('Likert test data received:', data);

      if (data.questions && data.questions.length > 0) {
        // Store questions in Redux
        console.log('Setting Likert questions in Redux:', data.questions);
        dispatch(setLikertQuestions(data.questions));

        // Add a small delay to ensure the state is updated
        setTimeout(() => {
          // Navigate to the Likert test page
          navigate('/likerttest');
        }, 100);
      } else {
        alert('Failed to load Likert test questions.');
      }
    } catch (error) {
      console.error('Error starting Likert test:', error);
      alert('Failed to start Likert test. Please try again.');
    }
  };

  const startMbtiTest = async () => {
    try {
      console.log("Starting MBTI test for user:", userData.user_id);

      // Make API call to get MBTI questions
      const response = await fetch('http://127.0.0.1:8000/tests/mbti/get_mbti_questions/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
          'user-id': userData.user_id,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch MBTI questions');
      }

      const data = await response.json();
      console.log('MBTI test data received:', data);

      if (data.questions) {
        // Store questions in Redux
        console.log('Setting MBTI questions in Redux:', data.questions);
        dispatch(setMbtiQuestions(data.questions));

        // Navigate to the MBTI test page
        navigate('/mbtitest');
      } else {
        alert('Failed to load MBTI test questions.');
      }
    } catch (error) {
      console.error('Error starting MBTI test:', error);
      alert('Failed to start MBTI test. Please try again.');
    }
  };

  const getAiCareerRecommendation = async () => {
    try {
      console.log("Getting AI career recommendation for user:", userData.user_id);

      // Make API call to get career recommendations
      const response = await fetch('http://127.0.0.1:8000/tests/recommendation/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
          'user-id': userData.user_id,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch career recommendations');
      }

      const data = await response.json();
      console.log('AI career recommendation received:', data);

      // Store recommendation in Redux
      dispatch(setCareerRecommendation(data));

      // Navigate to the recommendation page
      navigate('/recommendation');
    } catch (error) {
      console.error('Error getting AI career recommendation:', error);
      alert('Failed to get career recommendation. Please try again.');
    }
  };

  // const getAiCareerRecommendation = async () => {
  //   try {
  //     console.log("Getting AI career recommendation for user:", userData.user_id);
  
  //     // Log the request details
  //     console.log("Request URL:", 'http://127.0.0.1:8000/tests/recommendation/');
  //     console.log("Request headers:", {
  //       'Content-Type': 'application/json',
  //       'X-CSRFToken': getCSRFToken(),
  //       'user-id': userData.user_id,
  //     });
  
  //     // Make API call to get career recommendations
  //     const response = await fetch('http://127.0.0.1:8000/tests/recommendation/', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-CSRFToken': getCSRFToken(),
  //         'user-id': userData.user_id,
  //       },
  //       credentials: 'include',
  //     });
  
  //     // Log full response details
  //     console.log('Response status:', response.status);
  //     console.log('Response status text:', response.statusText);
      
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       console.error('Error response body:', errorText);
  //       throw new Error(`Failed to fetch career recommendations: ${response.status} ${response.statusText}`);
  //     }
  
  //     const data = await response.json();
  //     console.log('AI career recommendation received:', data);
  
  //     // Store recommendation in Redux
  //     dispatch(setCareerRecommendation(data));
  
  //     // Navigate to the recommendation page
  //     navigate('/recommendation');
  //   } catch (error) {
  //     console.error('Error getting AI career recommendation:', error);
  //     alert('Failed to get career recommendation. Please try again.');
  //   }
  // };

    // New function to get AI-based career recommendation
    // const getAiCareerRecommendation = async () => {
    //   try {
    //     console.log("Getting AI career recommendation for user:", userData.user_id);
        
    //     // Make API call to get career recommendations
    //     const response = await fetch('http://127.0.0.1:8000/tests/recommendation/', {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'X-CSRFToken': getCSRFToken(),
    //         'user-id': userData.user_id,
    //       },
    //       credentials: 'include',
    //     });
  
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch career recommendations');
    //     }
  
    //     const data = await response.json();
    //     console.log('AI career recommendation received:', data);
    
    //     // Store recommendation in Redux
    //     dispatch(setCareerRecommendation(data));
     
    //     // Navigate to the recommendation page
    //     navigate('/recommendation');
    //   } catch (error) {
    //     console.error('Error getting AI career recommendation:', error);
    //     alert('Failed to get career recommendation. Please try again.');
    //   }
    // };

    

  // New function to download career assessment report
  const downloadCareerReport = async () => {
    try {
      setIsLoading(true);
      console.log("Downloading career assessment report for user:", userData.user_id);

      // Make API call to get the career assessment report
      const response = await fetch('http://127.0.0.1:8000/tests/career-assessment-report/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
          'user-id': userData.user_id,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch career assessment report');
      }

      const data = await response.json();
      console.log('Career assessment report received:', data);

      if (!data || !data.career_assessment_report) {
        throw new Error('Invalid or empty report data received');
      }

      // Store report data in state
      setReportData(data);

      // Generate and download PDF
      generatePDF(data);

    } catch (error) {
      console.error('Error downloading career assessment report:', error);
      alert(`Failed to download career assessment report: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to generate PDF from report data
  const generatePDF = (data) => {
    try {
      console.log('Generating PDF with data:', data);
      const report = data.career_assessment_report;
      if (!report) {
        throw new Error('Invalid report data format');
      }

      // Create a new PDF document
      const pdf = new jsPDF();
      let yPos = 20;

      // Add title
      pdf.setFontSize(22);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Career Assessment Report', 105, yPos, { align: 'center' });
      yPos += 15;

      // Add date
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, yPos, { align: 'center' });
      yPos += 15;

      // Executive Summary
      pdf.setFontSize(16);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Executive Summary', 20, yPos);
      yPos += 10;

      // Add executive summary details with null checks
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);

      if (report.executive_summary) {
        const summary = report.executive_summary;
        pdf.text(`Name: ${summary?.name }`, 30, yPos);
        yPos += 7;
        pdf.text(`Age: ${summary?.age || 'N/A'}`, 30, yPos);
        yPos += 7;
        pdf.text(`Education: ${summary?.education || 'N/A'}`, 30, yPos);
        yPos += 7;
        pdf.text(`Career Aspiration: ${summary?.career_aspiration || 'N/A'}`, 30, yPos);
        yPos += 10;

        // Key findings with word wrap
        if (summary.key_findings) {
          pdf.setFontSize(12);
          pdf.setTextColor(60, 60, 60);
          const splitKeyFindings = pdf.splitTextToSize(summary.key_findings, 160);
          pdf.text(splitKeyFindings, 30, yPos);
          yPos += splitKeyFindings.length * 7 + 10;
        }
      } else {
        pdf.text('Executive summary not available', 30, yPos);
        yPos += 10;
      }

      // Personality Analysis
      pdf.setFontSize(16);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Personality Analysis', 20, yPos);
      yPos += 10;

      if (report.personality_analysis) {
        const personality = report.personality_analysis;
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`MBTI Type: ${personality.mbti_type || 'N/A'}`, 30, yPos);
        yPos += 7;

        if (personality.analysis) {
          const splitPersonalityAnalysis = pdf.splitTextToSize(personality.analysis, 160);
          pdf.text(splitPersonalityAnalysis, 30, yPos);
          yPos += splitPersonalityAnalysis.length * 7 + 10;
        }
      } else {
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text('Personality analysis not available', 30, yPos);
        yPos += 10;
      }

      // Check if we need a new page
      if (yPos > 250) {
        pdf.addPage();
        yPos = 20;
      }

      // Aptitude Analysis
      pdf.setFontSize(16);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Aptitude Analysis', 20, yPos);
      yPos += 10;

      if (report.aptitude_analysis) {
        const aptitude = report.aptitude_analysis;
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);

        // Safely handle the aptitude test results
        const aptitudeResults = aptitude.aptitude_test_results || [];
        if (Array.isArray(aptitudeResults) && aptitudeResults.length > 0) {
          pdf.text(`Top Aptitudes: ${aptitudeResults.join(", ")}`, 30, yPos);
        } else {
          pdf.text('Top Aptitudes: Not available', 30, yPos);
        }
        yPos += 7;

        if (aptitude.analysis) {
          const splitAptitudeAnalysis = pdf.splitTextToSize(aptitude.analysis, 160);
          pdf.text(splitAptitudeAnalysis, 30, yPos);
          yPos += splitAptitudeAnalysis.length * 7 + 10;
        }
      } else {
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text('Aptitude analysis not available', 30, yPos);
        yPos += 10;
      }

      // Alignment Analysis
      pdf.setFontSize(16);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Alignment Analysis', 20, yPos);
      yPos += 10;

      if (report.alignment_analysis) {
        const alignment = report.alignment_analysis;
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`Aspiration Alignment: ${alignment.aspiration_alignment || 'N/A'}`, 30, yPos);
        yPos += 7;

        if (alignment.analysis) {
          const splitAlignmentAnalysis = pdf.splitTextToSize(alignment.analysis, 160);
          pdf.text(splitAlignmentAnalysis, 30, yPos);
          yPos += splitAlignmentAnalysis.length * 7 + 10;
        }
      } else {
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text('Alignment analysis not available', 30, yPos);
        yPos += 10;
      }

      // Check if we need a new page
      if (yPos > 250) {
        pdf.addPage();
        yPos = 20;
      }

      // Weakness Development
      pdf.setFontSize(16);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Development Areas', 20, yPos);
      yPos += 10;

      if (report.weakness_development) {
        const weakness = report.weakness_development;
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);

        // Safely handle weaknesses
        const weaknesses = weakness.weaknesses || [];
        if (Array.isArray(weaknesses) && weaknesses.length > 0) {
          pdf.text(`Weaknesses: ${weaknesses.join(", ")}`, 30, yPos);
        } else {
          pdf.text('Weaknesses: None identified', 30, yPos);
        }
        yPos += 10;

        pdf.text("Improvement Strategies:", 30, yPos);
        yPos += 7;

        // Safely handle strategies
        const strategies = weakness.strategies || [];
        if (Array.isArray(strategies) && strategies.length > 0) {
          strategies.forEach((strategy, index) => {
            const splitStrategy = pdf.splitTextToSize(`${index + 1}. ${strategy}`, 150);
            pdf.text(splitStrategy, 35, yPos);
            yPos += splitStrategy.length * 7;
          });
        } else {
          pdf.text('No specific strategies available', 35, yPos);
          yPos += 7;
        }
      } else {
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text('Development areas not available', 30, yPos);
      }
      yPos += 10;

      // Check if we need a new page
      if (yPos > 250) {
        pdf.addPage();
        yPos = 20;
      }

      // Recommended Career Paths
      pdf.setFontSize(16);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Recommended Career Paths', 20, yPos);
      yPos += 10;

      // Safely handle recommended career paths
      const careerPaths = report.recommended_career_paths || [];
      if (Array.isArray(careerPaths) && careerPaths.length > 0) {
        careerPaths.forEach((career, index) => {
          if (career) {
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);
            pdf.text(`${index + 1}. ${career.career || 'Unnamed Career'}`, 30, yPos);
            yPos += 7;

            pdf.setFontSize(10);
            pdf.setTextColor(80, 80, 80);
            const rationale = career.rationale || 'No rationale provided';
            const splitRationale = pdf.splitTextToSize(`Rationale: ${rationale}`, 150);
            pdf.text(splitRationale, 35, yPos);
            yPos += splitRationale.length * 5 + 5;
          }
        });
      } else {
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text('No recommended career paths available', 30, yPos);
        yPos += 10;
      }
      yPos += 5;

      // Check if we need a new page
      if (yPos > 250) {
        pdf.addPage();
        yPos = 20;
      }

      // Development Roadmap
      pdf.setFontSize(16);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Development Roadmap', 20, yPos);
      yPos += 10;

      if (report.development_roadmap && report.development_roadmap.steps) {
        const steps = report.development_roadmap.steps || [];
        if (Array.isArray(steps) && steps.length > 0) {
          steps.forEach((step) => {
            if (step) {
              pdf.setFontSize(12);
              pdf.setTextColor(0, 0, 0);
              pdf.text(`Step ${step.step || '?'}:`, 30, yPos);
              yPos += 7;

              pdf.setFontSize(10);
              pdf.setTextColor(80, 80, 80);
              const action = step.action || 'No action specified';
              const splitAction = pdf.splitTextToSize(action, 150);
              pdf.text(splitAction, 35, yPos);
              yPos += splitAction.length * 5 + 5;
            }
          });
        } else {
          pdf.setFontSize(12);
          pdf.setTextColor(0, 0, 0);
          pdf.text('No development steps available', 30, yPos);
          yPos += 10;
        }
      } else {
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text('Development roadmap not available', 30, yPos);
        yPos += 10;
      }

      // Check if we need a new page
      if (yPos > 250) {
        pdf.addPage();
        yPos = 20;
      }

      // Alternative Paths
      pdf.setFontSize(16);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Alternative Career Paths', 20, yPos);
      yPos += 10;

      // Safely handle alternative paths
      const alternativePaths = report.alternative_paths || [];
      if (Array.isArray(alternativePaths) && alternativePaths.length > 0) {
        alternativePaths.forEach((career, index) => {
          if (career) {
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);
            pdf.text(`${index + 1}. ${career.career || 'Unnamed Career'}`, 30, yPos);
            yPos += 7;

            pdf.setFontSize(10);
            pdf.setTextColor(80, 80, 80);
            const rationale = career.rationale || 'No rationale provided';
            const splitRationale = pdf.splitTextToSize(`Rationale: ${rationale}`, 150);
            pdf.text(splitRationale, 35, yPos);
            yPos += splitRationale.length * 5 + 5;
          }
        });
      } else {
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text('No alternative career paths available', 30, yPos);
        yPos += 10;
      }

      // Add footer
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Page ${i} of ${pageCount}`, 105, 287, { align: 'center' });
        pdf.text('Career Path Assessment Report', 105, 292, { align: 'center' });
      }

      // Save the PDF
      pdf.save('Career_Assessment_Report.pdf');

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF report. Please try again.');
    }
  };


  const navigateToCompleteProfile = () => {
    navigate('/complete-profile');
  };

  const chartData = topDomainScores.map(([domain, score]) => ({
    name: domain,
    score: score,
  }));

  const pieChartData = Object.entries(domainScores || {}).map(([name, value]) => ({
    name,
    value,
  }));

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading user data...</div>
      </div>
    );
  }

  return (
    <div>
      <div className='w-full h-auto p-4'>
        <div className='flex flex-row justify-between mb-2'>
          <div className='flex justify-center items-center'>
            <img src={Logo} alt="Logo" width={200} height={200} />
          </div>
          <div className='text-black'>
            <ul className='flex flex-row gap-6 justify-center items-center'>
              <li className="cursor-pointer hover:text-blue-500">Home</li>
              <li className="cursor-pointer hover:text-blue-500">Explore</li>
              <li className="cursor-pointer hover:text-blue-500">Path</li>
              <li onClick={navigateToCompleteProfile} className='border rounded-full bg-blue-400 p-1 text-white'>
                <img src={Logo} alt="User" width={10} height={10} />
              {/* prOFILING */}
              </li>
            </ul>
          </div>
        </div>
        <hr className='border-gray-200' />
      </div>

      <div className='w-full flex flex-row'>
        {/* Left Sidebar */}
        <div className='w-1/5 p-4 h-screen'>
          <div className='h-3/4'>
            <div className='flex flex-col justify-evenly gap-4'>
              <div className='hover:bg-[#F0F2F3] p-2 rounded-lg cursor-pointer'>Dashboard</div>
              <div className='hover:bg-[#F0F2F3] p-2 rounded-lg cursor-pointer'>Assessments</div>
              <div className='hover:bg-[#F0F2F3] p-2 rounded-lg cursor-pointer'>Explore</div>
              <div className='hover:bg-[#F0F2F3] p-2 rounded-lg cursor-pointer'>Connect AI Counselor</div>
              <div
                className='hover:bg-[#F0F2F3] p-2 rounded-lg cursor-pointer'
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          </div>

          <div className='h-1/4'>
            <div
              className='bg-[#1A80E6] p-2 rounded-lg text-center text-white cursor-pointer hover:bg-blue-700 transition-colors'
              onClick={getAiCareerRecommendation}
            >
              Ai Based Career Recommendation
            </div>

            <div className='flex flex-row gap-4 mt-8 cursor-pointer hover:text-blue-500'>
              <img src={Help} alt="Help icon" width={20} height={20} />
              <div>Help</div>
            </div>
            <div className='flex flex-row gap-4 mt-8 cursor-pointer hover:text-blue-500'>
              <img src={Feedback} alt="Feedback icon" width={20} height={20} />
              <div>Feedback</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='w-4/5 mb-4 p-4'>
          <div id="charts-container">
            <div className='flex flex-row gap-8'>
              {/* Bar Chart */}
              <div className='w-1/2 border-2 rounded-lg border-[#E0E0E0] p-4 shadow-sm'>
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">Domain Score Chart</h2>
                {chartData && chartData.length > 0 ? (
                  <BarChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="score" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>)
                  : (
                    <p className="text-center text-gray-500 mt-12">No data available. Submit an assessment to see results.</p>
                  )}
              </div>

              {/* Top Domain Scores */}
              <div className="w-2/5 border-2 rounded-2xl p-8 border-[#E0E0E0] shadow-md bg-white">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                  Top 3 Career Clusters
                </h2>
                {topDomainScores && topDomainScores.length > 0 ? (
                  <ul className="space-y-4">
                    {topDomainScores.map(([domain, score], index) => (
                      <li
                        key={domain}
                        className="flex justify-between items-center px-4 py-3 bg-gray-100 rounded-lg hover:bg-blue-100 transition-all duration-200"
                      >
                        <span className="font-medium text-gray-700 capitalize">{index + 1}. {domain}</span>
                        <span className="text-blue-600 font-semibold">{score}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-500">No domain scores available yet.</p>
                )}
              </div>
            </div>

            <div className='flex flex-row gap-8 mt-4'>
              {/* Pie Chart */}
              <div className='w-1/3 border-2 rounded-lg border-[#E0E0E0] p-4 shadow-sm bg-white'>
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">All Domain Scores</h2>
                {pieChartData && pieChartData.length > 0 ? (
                  <DomainPieChart data={pieChartData} />
                ) : (
                  <p className="text-center text-gray-500 py-12">Complete an assessment to view your domain distribution.</p>
                )}
              </div>

              {/* Radar Chart for Likert Test Results */}
              <div className='w-1/3 border-2 rounded-lg border-[#E0E0E0] p-4 shadow-sm bg-white'>
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">Likert Test Results</h2>
                {likertResults && likertResults.domain_scores ? (
                  <DomainRadarChart data={likertResults.domain_scores} />
                ) : (
                  <p className="text-center text-gray-500 py-12">Complete a Likert test to view your domain radar chart.</p>
                )}
              </div>

              {/* MBTI Results Card */}
              <div className='w-1/3'>
                <MBTIResultCard mbtiResults={mbtiResults} />
              </div>
            </div>
          </div>

          {/* Download Report Button */}
          <div className='flex justify-center mt-8 mb-4'>
            <button
              className='flex items-center gap-2 bg-[#f39c12] text-white px-4 py-2 rounded-lg hover:bg-[#e67e22] transition-colors'
              onClick={downloadCareerReport}
              disabled={isLoading}
            >
              <FaDownload />
              {isLoading ? 'Generating Report...' : 'Download Career Assessment Report'}
            </button>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col mt-8 justify-center items-center gap-6'>
            <div
              className='w-1/2 bg-[#1A80E6] p-2 rounded-lg text-center text-white cursor-pointer hover:bg-blue-700 transition-colors'
              onClick={startNewAssessment}
            >
              New Assessment
            </div>
            <div
              className='w-1/2 bg-[#5e8b36] p-2 rounded-lg text-center text-white cursor-pointer hover:bg-green-700 transition-colors'
              onClick={startLikertTest}
            >
              Take Likert Test
            </div>
            <div
              className='w-1/2 bg-[#9c27b0] p-2 rounded-lg text-center text-white cursor-pointer hover:bg-purple-700 transition-colors'
              onClick={startMbtiTest}
            >
              Take MBTI Personality Test
            </div>
            <div
              className='w-1/2 bg-[#F0F3F3] p-2 rounded-lg text-center text-black hover:bg-gray-200 transition-colors cursor-pointer'
              onClick={getAiCareerRecommendation}
            >
              Get Started with AI Career Counselor
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;



