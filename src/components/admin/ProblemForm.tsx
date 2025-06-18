
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProblemForm() {
  const { toast } = useToast();
  const [problemForm, setProblemForm] = useState({
    title: '',
    description: '',
    difficulty: '',
    sampleInput: '',
    sampleOutput: ''
  });

  const handleAddProblem = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
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
  );
}
