'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';
import { usePatientStore } from '@/stores/patient-store';
import { format, parseISO } from 'date-fns';

// Helper function to render risk badge
const RiskBadge = ({ level, trend }) => {
  const colors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  };
  
  const getTrendIcon = () => {
    switch (trend) {
      case 'improving': return <ArrowDown className="h-3 w-3 ml-1 text-green-600" />;
      case 'worsening': return <ArrowUp className="h-3 w-3 ml-1 text-red-600" />;
      case 'stable': return <Minus className="h-3 w-3 ml-1 text-gray-600" />;
      default: return null;
    }
  };
  
  return (
    <div className={`text-xs px-2 py-1 rounded-full flex items-center ${colors[level]}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)} Risk
      {getTrendIcon()}
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
    selectedPatientId
  } = usePatientStore();
  
  const handlePatientSelect = (patientId: string) => {
    setLoading(true);
    selectPatient(patientId);
    
    // Simulate a short loading delay
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Patient Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <ScrollArea className="h-[60vh]">
                <div className="space-y-4">
                  {filteredPatients().map((patient) => (
                    <div 
                      key={patient.id}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        selectedPatientId === patient.id 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'bg-card hover:bg-accent/50 border border-border'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={patient.image} alt={patient.name} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{patient.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-muted-foreground">
                              {patient.age} years • {patient.condition}
                            </p>
                            <RiskBadge level={patient.riskScore.level} trend={patient.riskScore.trend} />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Last visit: {format(parseISO(patient.lastVisit), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-sm text-muted-foreground">{patient.appointmentTime}</span>
                        <Button 
                          onClick={() => handlePatientSelect(patient.id)}
                          size="sm"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {filteredPatients().length === 0 && (
                    <div className="py-8 text-center text-muted-foreground">
                      No patients match your search.
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
