'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

// Mock patient data
const patients = [
  { 
    id: '1', 
    name: 'Sarah Johnson', 
    age: 45, 
    condition: 'Hypertension',
    appointmentTime: '9:00 AM',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  { 
    id: '2', 
    name: 'Michael Chen', 
    age: 32, 
    condition: 'Lower Back Pain',
    appointmentTime: '9:30 AM',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  { 
    id: '3', 
    name: 'Robert Smith', 
    age: 67, 
    condition: 'Diabetes, Type 2',
    appointmentTime: '10:15 AM',
    image: 'https://randomuser.me/api/portraits/men/52.jpg'
  },
  { 
    id: '4', 
    name: 'Emily Wilson', 
    age: 28, 
    condition: 'Migraine',
    appointmentTime: '11:00 AM',
    image: 'https://randomuser.me/api/portraits/women/17.jpg'
  },
  { 
    id: '5', 
    name: 'James Rodriguez', 
    age: 55, 
    condition: 'Arthritis',
    appointmentTime: '1:30 PM',
    image: 'https://randomuser.me/api/portraits/men/72.jpg'
  },
  { 
    id: '6', 
    name: 'Sophia Lee', 
    age: 38, 
    condition: 'Anxiety Disorder',
    appointmentTime: '2:15 PM',
    image: 'https://randomuser.me/api/portraits/women/32.jpg'
  },
  { 
    id: '7', 
    name: 'David Garcia', 
    age: 61, 
    condition: 'COPD',
    appointmentTime: '3:00 PM',
    image: 'https://randomuser.me/api/portraits/men/40.jpg'
  },
];

interface PatientListProps {
  onPatientSelect: (patientId: string) => void;
}

export function PatientList({ onPatientSelect }: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  
  // Filter patients based on search term
  const filteredPatients = patients.filter(
    patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePatientSelect = (patientId: string) => {
    setIsLoading(true);
    setSelectedPatientId(patientId);
    
    // Simulate loading patient data
    setTimeout(() => {
      setIsLoading(false);
      onPatientSelect(patientId);
    }, 1000);
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
                  {filteredPatients.map((patient) => (
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
                          <p className="text-sm text-muted-foreground">
                            {patient.age} years • {patient.condition}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
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
                  
                  {filteredPatients.length === 0 && (
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
