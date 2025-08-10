"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Search, Filter, Calendar } from "lucide-react";

export default function NotesPage() {
  const [notes] = useState([
    {
      id: 1,
      title: "Meeting with Immigration Officer",
      content: "Discussed visa application process and required documents...",
      category: "meetings",
      date: "2024-01-15",
      priority: "high",
    },
    {
      id: 2,
      title: "Document Checklist",
      content: "Updated list of required documents for PR application...",
      category: "documents",
      date: "2024-01-10",
      priority: "medium",
    },
    {
      id: 3,
      title: "Language Test Preparation",
      content: "IELTS preparation schedule and study materials...",
      category: "preparation",
      date: "2024-01-08",
      priority: "high",
    },
  ]);

  const categories = [
    { id: "all", label: "All Notes", count: notes.length },
    { id: "meetings", label: "Meetings", count: 1 },
    { id: "documents", label: "Documents", count: 1 },
    { id: "preparation", label: "Preparation", count: 1 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "medium":
        return "bg-gray-800/10 text-gray-300 border-gray-800/20";
      case "low":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Notes
              </h1>
              <p className="text-gray-600">
                Keep track of your immigration journey with personal notes
              </p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Categories */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2"
              >
                {category.label}
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <div className="grid gap-6">
              {notes.map((note) => (
                <Card
                  key={note.id}
                  className="hover:shadow-lg transition-shadow duration-200"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                          {note.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(note.date).toLocaleDateString()}
                          </div>
                          <Badge
                            className={`text-xs ${getPriorityColor(
                              note.priority
                            )}`}
                          >
                            {note.priority} priority
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {note.category}
                          </Badge>
                        </div>
                      </div>
                      <FileText className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{note.content}</p>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        View Full Note
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Individual category tabs */}
          {categories.slice(1).map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid gap-6">
                {notes
                  .filter((note) => note.category === category.id)
                  .map((note) => (
                    <Card
                      key={note.id}
                      className="hover:shadow-lg transition-shadow duration-200"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                              {note.title}
                            </CardTitle>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(note.date).toLocaleDateString()}
                              </div>
                              <Badge
                                className={`text-xs ${getPriorityColor(
                                  note.priority
                                )}`}
                              >
                                {note.priority} priority
                              </Badge>
                            </div>
                          </div>
                          <FileText className="w-5 h-5 text-gray-400" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{note.content}</p>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            View Full Note
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {notes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notes yet
            </h3>
            <p className="text-gray-500 mb-4">
              Start documenting your immigration journey
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Note
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
