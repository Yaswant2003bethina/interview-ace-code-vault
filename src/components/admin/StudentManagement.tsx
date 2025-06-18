
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function StudentManagement() {
  return (
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
  );
}
