import React from 'react';
import { Loader2, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { usePatientStore } from '@/stores/patient-store';

interface DifferentialDiagnosis {
  condition: string;
  risk: string;
  confidence: number;
  steps: string;
}

interface DvxAnalysisTabProps {
  isLoading: boolean;
  dvxAnalysis: string | null;
}

export function DvxAnalysisTab({ isLoading, dvxAnalysis }: DvxAnalysisTabProps) {
  const selectedPatient = usePatientStore(state => state.selectedPatient());
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="text-sm text-gray-600 font-medium">Generating differential diagnoses...</p>
        </div>
      </div>
    );
  }
  
  if (!dvxAnalysis || !selectedPatient) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-600">No differential diagnoses available.</p>
          <p className="text-sm text-gray-500">Select a patient to generate an analysis.</p>
        </div>
      </div>
    );
  }
  
  // Parse the JSON string into an array of differential diagnoses
  let differentials: DifferentialDiagnosis[] = [];
  try {
    differentials = JSON.parse(dvxAnalysis);
  } catch (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-red-600">
          <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm">Error parsing differential diagnoses.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full overflow-auto p-3">
      <div className="mb-3 p-2.5 bg-purple-50 border border-purple-200 rounded-lg flex justify-between items-center">
        <div>
          <h3 className="font-medium text-purple-800">
            Differential Diagnosis for {selectedPatient.name}
          </h3>
          <p className="text-sm text-gray-600">
            Chief Complaint: {selectedPatient.condition}
          </p>
        </div>
        {selectedPatient.risk === 'critical' && (
          <Badge className="bg-red-100 text-red-700 border-red-300 px-3">
            <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
            High Risk Patient
          </Badge>
        )}
      </div>
      
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-medium">Possible Condition</TableHead>
            <TableHead className="font-medium text-center">Risk Level</TableHead>
            <TableHead className="font-medium text-center">Confidence Score (%)</TableHead>
            <TableHead className="font-medium">Suggested Next Steps</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {differentials.map((diff, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell className="font-medium">{diff.condition}</TableCell>
              <TableCell className="text-center">
                {diff.risk === "High" && (
                  <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-200">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {diff.risk}
                  </Badge>
                )}
                {diff.risk === "Medium" && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200">
                    <HelpCircle className="h-3 w-3 mr-1" />
                    {diff.risk}
                  </Badge>
                )}
                {diff.risk === "Low" && (
                  <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {diff.risk}
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-center">
                <div className={`
                  inline-block px-2 py-1 rounded-full text-sm font-medium
                  ${diff.confidence >= 70 ? 'bg-red-100 text-red-800' : 
                    diff.confidence >= 50 ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'}
                `}>
                  {diff.confidence}%
                </div>
              </TableCell>
              <TableCell className="text-sm">{diff.steps}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="mt-3 p-2.5 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-1">Clinical Interpretation</h4>
        <p className="text-sm text-gray-700">
          Based on the confidence scores and risk levels, consider prioritizing the diagnoses with highest confidence percentages and risk levels.
          Follow the suggested next steps for each potential condition to rule in or rule out diagnoses.
        </p>
      </div>
    </div>
  );
}
