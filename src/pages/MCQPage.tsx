
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock MCQ data
const mockMCQs = [
  {
    id: 1,
    question: "What is the time complexity of binary search?",
    optionA: "O(n)",
    optionB: "O(log n)",
    optionC: "O(n log n)",
    optionD: "O(n²)",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity."
  },
  {
    id: 2,
    question: "Which data structure uses LIFO (Last In, First Out) principle?",
    optionA: "Queue",
    optionB: "Array",
    optionC: "Stack",
    optionD: "Linked List",
    correctAnswer: "C",
    difficulty: "Easy",
    explanation: "Stack follows LIFO principle where the last element added is the first one to be removed."
  },
  {
    id: 3,
    question: "What is the worst-case time complexity of QuickSort?",
    optionA: "O(n)",
    optionB: "O(n log n)",
    optionC: "O(n²)",
    optionD: "O(log n)",
    correctAnswer: "C",
    difficulty: "Medium",
    explanation: "QuickSort has O(n²) worst-case time complexity when the pivot is always the smallest or largest element."
  }
];

export default function MCQPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<{[key: number]: boolean}>({});
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    if (submittedAnswers[questionId]) return; // Prevent changing after submission
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitAnswer = (questionId: number) => {
    const selectedAnswer = selectedAnswers[questionId];
    if (!selectedAnswer) {
      toast({
        title: "Please select an answer",
        description: "You must select an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    const question = mockMCQs.find(q => q.id === questionId);
    const isCorrect = selectedAnswer === question?.correctAnswer;
    
    setSubmittedAnswers(prev => ({
      ...prev,
      [questionId]: true
    }));

    if (isCorrect) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct!",
        description: "Well done! That's the right answer.",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer is ${question?.correctAnswer}. ${question?.explanation}`,
        variant: "destructive",
      });
    }
  };

  const currentMCQ = mockMCQs[currentQuestion];
  const isSubmitted = submittedAnswers[currentMCQ.id];
  const selectedAnswer = selectedAnswers[currentMCQ.id];

  const getOptionClass = (option: string) => {
    if (!isSubmitted) {
      return selectedAnswer === option 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-gray-200 hover:border-gray-300';
    }
    
    if (option === currentMCQ.correctAnswer) {
      return 'border-green-500 bg-green-50';
    }
    
    if (selectedAnswer === option && option !== currentMCQ.correctAnswer) {
      return 'border-red-500 bg-red-50';
    }
    
    return 'border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">MCQ Practice</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {mockMCQs.length}
              </span>
              <span className="text-sm font-medium text-green-600">
                Score: {score}/{mockMCQs.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / mockMCQs.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Question {currentQuestion + 1}
                </CardTitle>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  currentMCQ.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  currentMCQ.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentMCQ.difficulty}
                </span>
              </div>
              <CardDescription className="text-base text-gray-700 mt-4">
                {currentMCQ.question}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { key: 'A', text: currentMCQ.optionA },
                  { key: 'B', text: currentMCQ.optionB },
                  { key: 'C', text: currentMCQ.optionC },
                  { key: 'D', text: currentMCQ.optionD },
                ].map((option) => (
                  <div
                    key={option.key}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${getOptionClass(option.key)} ${
                      isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    onClick={() => handleAnswerSelect(currentMCQ.id, option.key)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-700">
                          {option.key}.
                        </span>
                        <span className="text-gray-700">{option.text}</span>
                      </div>
                      {isSubmitted && (
                        <div>
                          {option.key === currentMCQ.correctAnswer ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : selectedAnswer === option.key ? (
                            <XCircle className="h-5 w-5 text-red-600" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              {!isSubmitted && (
                <div className="mt-6">
                  <Button 
                    onClick={() => handleSubmitAnswer(currentMCQ.id)}
                    disabled={!selectedAnswer}
                    className="w-full"
                  >
                    Submit Answer
                  </Button>
                </div>
              )}

              {/* Explanation */}
              {isSubmitted && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
                  <p className="text-blue-800 text-sm">{currentMCQ.explanation}</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                
                <Button
                  onClick={() => setCurrentQuestion(prev => Math.min(mockMCQs.length - 1, prev + 1))}
                  disabled={currentQuestion === mockMCQs.length - 1}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Final Score */}
          {currentQuestion === mockMCQs.length - 1 && isSubmitted && (
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Quiz Complete!</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {score}/{mockMCQs.length}
                </div>
                <p className="text-gray-600 mb-4">
                  You scored {Math.round((score / mockMCQs.length) * 100)}%
                </p>
                <Button onClick={() => navigate('/dashboard')}>
                  Back to Dashboard
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
