
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, BookOpen, Code, BarChart3, LogOut, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form states
  const [problemForm, setProblemForm] = useState({
    title: '',
    description: '',
    difficulty: '',
    sampleInput: '',
    sampleOutput: ''
  });

  const [mcqForm, setMcqForm] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    difficulty: '',
    explanation: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddProblem = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    toast({
      title: "Problem added successfully",
      description: `"${problemForm.title}" has been added to the problem bank.`,
    });
    setProblemForm({
      title: '',
      description: '',
      difficulty: '',
      sampleInput: '',
      sampleOutput: ''
    });
  };

  const handleAddMCQ = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    toast({
      title: "MCQ added successfully",
      description: "New MCQ has been added to the question bank.",
    });
    setMcqForm({
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
      difficulty: '',
      explanation: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Code className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user?.fullName}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+12 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Problems</CardTitle>
              <Code className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">63</div>
              <p className="text-xs text-muted-foreground">+5 this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MCQ Questions</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">+8 this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Submissions</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+21% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="problems" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="problems">Manage Problems</TabsTrigger>
            <TabsTrigger value="mcqs">Manage MCQs</TabsTrigger>
            <TabsTrigger value="students">Manage Students</TabsTrigger>
          </TabsList>

          <TabsContent value="problems">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Problem
                </CardTitle>
                <CardDescription>Create a new coding problem for students to solve</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProblem} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Problem Title</Label>
                      <Input
                        id="title"
                        value={problemForm.title}
                        onChange={(e) => setProblemForm({...problemForm, title: e.target.value})}
                        placeholder="Enter problem title"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select 
                        value={problemForm.difficulty} 
                        onValueChange={(value) => setProblemForm({...problemForm, difficulty: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Problem Description</Label>
                    <Textarea
                      id="description"
                      value={problemForm.description}
                      onChange={(e) => setProblemForm({...problemForm, description: e.target.value})}
                      placeholder="Describe the problem in detail..."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sampleInput">Sample Input</Label>
                      <Textarea
                        id="sampleInput"
                        value={problemForm.sampleInput}
                        onChange={(e) => setProblemForm({...problemForm, sampleInput: e.target.value})}
                        placeholder="Enter sample input"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sampleOutput">Sample Output</Label>
                      <Textarea
                        id="sampleOutput"
                        value={problemForm.sampleOutput}
                        onChange={(e) => setProblemForm({...problemForm, sampleOutput: e.target.value})}
                        placeholder="Enter expected output"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Problem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mcqs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New MCQ
                </CardTitle>
                <CardDescription>Create a new multiple choice question</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddMCQ} className="space-y-4">
                  <div>
                    <Label htmlFor="question">Question</Label>
                    <Textarea
                      id="question"
                      value={mcqForm.question}
                      onChange={(e) => setMcqForm({...mcqForm, question: e.target.value})}
                      placeholder="Enter the question"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="optionA">Option A</Label>
                      <Input
                        id="optionA"
                        value={mcqForm.optionA}
                        onChange={(e) => setMcqForm({...mcqForm, optionA: e.target.value})}
                        placeholder="Enter option A"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="optionB">Option B</Label>
                      <Input
                        id="optionB"
                        value={mcqForm.optionB}
                        onChange={(e) => setMcqForm({...mcqForm, optionB: e.target.value})}
                        placeholder="Enter option B"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="optionC">Option C</Label>
                      <Input
                        id="optionC"
                        value={mcqForm.optionC}
                        onChange={(e) => setMcqForm({...mcqForm, optionC: e.target.value})}
                        placeholder="Enter option C"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="optionD">Option D</Label>
                      <Input
                        id="optionD"
                        value={mcqForm.optionD}
                        onChange={(e) => setMcqForm({...mcqForm, optionD: e.target.value})}
                        placeholder="Enter option D"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="correctAnswer">Correct Answer</Label>
                      <Select 
                        value={mcqForm.correctAnswer} 
                        onValueChange={(value) => setMcqForm({...mcqForm, correctAnswer: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select correct answer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Option A</SelectItem>
                          <SelectItem value="B">Option B</SelectItem>
                          <SelectItem value="C">Option C</SelectItem>
                          <SelectItem value="D">Option D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="mcqDifficulty">Difficulty</Label>
                      <Select 
                        value={mcqForm.difficulty} 
                        onValueChange={(value) => setMcqForm({...mcqForm, difficulty: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="explanation">Explanation (Optional)</Label>
                    <Textarea
                      id="explanation"
                      value={mcqForm.explanation}
                      onChange={(e) => setMcqForm({...mcqForm, explanation: e.target.value})}
                      placeholder="Explain the correct answer..."
                      rows={3}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add MCQ
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>View and manage registered students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Student management features will be available here.
                  <br />
                  You can view student progress, submissions, and manage accounts.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
