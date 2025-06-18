
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Play, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Editor from '@monaco-editor/react';

// Mock problem data
const mockProblems = {
  1: {
    id: 1,
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]`,
    difficulty: "Easy",
    sampleInput: "[2,7,11,15]\n9",
    sampleOutput: "[0,1]",
    testCases: [
      { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]", hidden: false },
      { input: "[3,2,4]\n6", expectedOutput: "[1,2]", hidden: false },
      { input: "[3,3]\n6", expectedOutput: "[0,1]", hidden: true },
    ]
  }
};

const defaultCode = {
  python: `def twoSum(nums, target):
    # Write your solution here
    pass

# Test your solution
nums = [2, 7, 11, 15]
target = 9
result = twoSum(nums, target)
print(result)`,
  javascript: `function twoSum(nums, target) {
    // Write your solution here
}

// Test your solution
const nums = [2, 7, 11, 15];
const target = 9;
const result = twoSum(nums, target);
console.log(result);`,
  java: `import java.util.*;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] result = solution.twoSum(nums, target);
        System.out.println(Arrays.toString(result));
    }
}`,
  cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};

int main() {
    Solution solution;
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = solution.twoSum(nums, target);
    
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        cout << result[i];
        if (i < result.size() - 1) cout << ",";
    }
    cout << "]" << endl;
    
    return 0;
}`
};

export default function ProblemSolver() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(defaultCode.python);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const problem = mockProblems[1]; // Using mock data

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(defaultCode[newLanguage as keyof typeof defaultCode]);
  };

  const runCode = async () => {
    setIsRunning(true);
    setHasSubmitted(true);
    
    // Simulate code execution and testing
    setTimeout(() => {
      // Mock test results
      const results = problem.testCases.map((testCase, index) => ({
        testCaseId: index,
        status: index < 2 ? 'passed' : 'failed',
        message: index < 2 ? 'Passed' : 'Failed: Wrong output',
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: index < 2 ? testCase.expectedOutput : '[0,2]'
      }));
      
      setTestResults(results);
      setIsRunning(false);
      
      const passedTests = results.filter(r => r.status === 'passed').length;
      const score = (passedTests / results.length) * 100;
      
      if (score === 100) {
        toast({
          title: "All tests passed!",
          description: `Great job! You solved the problem with ${score}% success rate.`,
        });
      } else {
        toast({
          title: `${passedTests}/${results.length} tests passed`,
          description: `Keep trying! Your current score is ${score}%.`,
          variant: "destructive",
        });
      }
    }, 2000);
  };

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Problem not found</h2>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">{problem.title}</h1>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {problem.difficulty}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={runCode} disabled={isRunning}>
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? 'Running...' : 'Run Code'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Problem Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                  {problem.description}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Code Editor */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Code Editor</CardTitle>
                <CardDescription>Write your solution in {language}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Editor
                    height="400px"
                    language={language}
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      wordWrap: 'on',
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Test Results */}
            {hasSubmitted && (
              <Card>
                <CardHeader>
                  <CardTitle>Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  {isRunning ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Running tests...</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {testResults.map((result, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${
                            result.status === 'passed'
                              ? 'bg-green-50 border-green-200'
                              : 'bg-red-50 border-red-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">
                              Test Case {index + 1}
                            </span>
                            {result.status === 'passed' ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>
                              <strong>Input:</strong> {result.input}
                            </div>
                            <div>
                              <strong>Expected:</strong> {result.expectedOutput}
                            </div>
                            {result.status === 'failed' && (
                              <div>
                                <strong>Your Output:</strong> {result.actualOutput}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
