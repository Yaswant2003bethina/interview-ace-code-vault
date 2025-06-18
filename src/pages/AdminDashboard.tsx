
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import StatsCards from '@/components/admin/StatsCards';
import ProblemForm from '@/components/admin/ProblemForm';
import MCQForm from '@/components/admin/MCQForm';
import StudentManagement from '@/components/admin/StudentManagement';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
        <StatsCards />

        {/* Management Tabs */}
        <Tabs defaultValue="problems" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="problems">Manage Problems</TabsTrigger>
            <TabsTrigger value="mcqs">Manage MCQs</TabsTrigger>
            <TabsTrigger value="students">Manage Students</TabsTrigger>
          </TabsList>

          <TabsContent value="problems">
            <ProblemForm />
          </TabsContent>

          <TabsContent value="mcqs">
            <MCQForm />
          </TabsContent>

          <TabsContent value="students">
            <StudentManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
