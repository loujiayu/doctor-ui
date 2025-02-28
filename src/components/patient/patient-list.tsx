'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, UserCircle, Clock, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';
import { usePatientStore, SortField, RiskLevel } from '@/stores/patient-store';
import { SortButton } from '@/components/ui/sort-button';
import { format, parseISO } from 'date-fns';
import { AppHeader } from '@/components/layout/app-header';
import { Badge } from '@/components/ui/badge';

// Helper function to render risk badge with improved styling
const RiskBadge = ({ risk }: { risk: RiskLevel }) => {
  const config = {
    low: { 
      color: 'bg-emerald-600/20 text-emerald-200 border-emerald-600/30',
      icon: <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1" />
    },
    medium: { 
      color: 'bg-amber-600/20 text-amber-200 border-amber-600/30',
      icon: <div className="h-2 w-2 rounded-full bg-amber-500 mr-1" />
    },
    high: { 
      color: 'bg-orange-600/20 text-orange-200 border-orange-600/30',
      icon: <div className="h-2 w-2 rounded-full bg-orange-500 mr-1" />
    },
    critical: { 
      color: 'bg-red-600/20 text-red-200 border-red-600/30',
      icon: <div className="h-2 w-2 rounded-full bg-red-500 mr-1" />
    },
  };
  
  return (
    <div className={`flex items-center text-xs px-2 py-1 rounded-md border ${config[risk].color}`}>
      {config[risk].icon}
      <span>{risk.charAt(0).toUpperCase() + risk.slice(1)}</span>
    </div>
  );
};

export function PatientList() {
  const { 
    filteredPatients, 
    searchTerm, 
    setSearchTerm, 
    selectPatient, 
    isLoading, 
    setLoading,
    selectedPatientId,
    sortField,
    sortOrder,
    setSorting,
    fetchPatients
  } = usePatientStore();
  
  // Fetch patients when component mounts
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);
  
  const handlePatientSelect = (patientId: string) => {
    setLoading(true);
    selectPatient(patientId);
    
    // Simulate a short loading delay
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const handleSort = (field: SortField) => {
    setSorting(field);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-[900px] mx-auto">
        <AppHeader subtitle="Doctor Dashboard" />
        
        <Card className="bg-slate-900/50 border-slate-700 shadow-lg backdrop-blur-sm">
          <CardHeader className="border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-xl">Patient Directory</CardTitle>
              <Badge variant="outline" className="bg-slate-800 border-slate-600 text-slate-200">
                {filteredPatients().length} Patients
              </Badge>
            </div>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name or condition..."
                className="pl-9 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-2 border-b border-slate-800/50">
              <span className="text-sm text-slate-400">Sort by:</span>
              <SortButton 
                label="Name" 
                field="name" 
                currentSortField={sortField} 
                currentSortOrder={sortOrder} 
                onSort={handleSort}
                className="bg-slate-800 text-slate-200 hover:bg-slate-700" 
              />
              <SortButton 
                label="Age" 
                field="age" 
                currentSortField={sortField} 
                currentSortOrder={sortOrder} 
                onSort={handleSort} 
                className="bg-slate-800 text-slate-200 hover:bg-slate-700"
              />
              <SortButton 
                label="Last Visit" 
                field="lastVisit" 
                currentSortField={sortField} 
                currentSortOrder={sortOrder} 
                onSort={handleSort}
                className="bg-slate-800 text-slate-200 hover:bg-slate-700" 
              />
              <SortButton 
                label="Risk" 
                field="risk" 
                currentSortField={sortField} 
                currentSortOrder={sortOrder} 
                onSort={handleSort}
                className="bg-slate-800 text-slate-200 hover:bg-slate-700" 
              />
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-2" />
                  <p className="text-slate-300">Loading patient data...</p>
                </div>
              </div>
            ) : (
              <ScrollArea className="h-[65vh] pr-4">
                <div className="space-y-3">
                  {filteredPatients().map((patient) => (
                    <div 
                      key={patient.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                        selectedPatientId === patient.id 
                          ? 'bg-blue-900/30 border border-blue-500/30 shadow-md shadow-blue-500/5' 
                          : 'bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/70'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className={`h-12 w-12 ring-2 ${
                          selectedPatientId === patient.id 
                            ? 'ring-blue-500/50' 
                            : 'ring-slate-700'
                        }`}>
                          <AvatarImage src={patient.image} alt={patient.name} />
                          <AvatarFallback className="bg-slate-700 text-slate-200">
                            {patient.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-white">{patient.name}</h3>
                          <div className="flex flex-wrap items-center gap-3 mt-1.5">
                            <div className="flex items-center text-xs text-slate-300">
                              <UserCircle className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              {patient.age} years
                            </div>
                            <div className="flex items-center text-xs text-slate-300">
                              <AlertCircle className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              {patient.condition}
                            </div>
                            <div className="flex items-center text-xs text-slate-300">
                              <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              {format(parseISO(patient.lastVisit), 'MMM d, yyyy')}
                            </div>
                            <RiskBadge risk={patient.risk} />
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button 
                          onClick={() => handlePatientSelect(patient.id)}
                          size="sm"
                          className={selectedPatientId === patient.id 
                            ? "bg-blue-600 hover:bg-blue-700 text-white" 
                            : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                          }
                        >
                          {selectedPatientId === patient.id ? 'Selected' : 'View Records'}
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {filteredPatients().length === 0 && (
                    <div className="py-16 text-center">
                      <div className="bg-slate-800/50 inline-flex rounded-full p-3 mb-4">
                        <Search className="h-6 w-6 text-slate-400" />
                      </div>
                      <p className="text-slate-300 font-medium">No patients match your search.</p>
                      <p className="text-slate-400 text-sm mt-1">Try using different keywords.</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
