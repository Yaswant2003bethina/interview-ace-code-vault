
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function MCQForm() {
  const { toast } = useToast();
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

  const handleAddMCQ = (e: React.FormEvent) => {
    e.preventDefault();
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
  );
}
