import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, Code, Wand2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PromptConfigTabProps {
  isLoadingPrompt: boolean;
  isSaving: boolean;
  soapPromptText: string;
  dvxPromptText: string;
  onSoapPromptChange: (text: string) => void;
  onDvxPromptChange: (text: string) => void;
  onSavePrompt: (type: 'soap' | 'dvx') => void;
}

export function PromptConfigTab({
  isLoadingPrompt,
  isSaving,
  soapPromptText,
  dvxPromptText,
  onSoapPromptChange,
  onDvxPromptChange,
  onSavePrompt
}: PromptConfigTabProps) {
  const [activePromptType, setActivePromptType] = useState<'soap' | 'dvx'>('soap');

  if (isLoadingPrompt) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-gray-600 font-medium">Loading prompt configurations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs 
        defaultValue="soap" 
        onValueChange={(value) => setActivePromptType(value as 'soap' | 'dvx')} 
        className="w-full"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <TabsList className="bg-gray-100 p-1 border border-gray-200 rounded-lg shadow-sm">
            <TabsTrigger 
              value="soap" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-800 data-[state=active]:shadow-sm data-[state=active]:font-medium text-gray-700 rounded-md relative"
            >
              SOAP Note Prompt
              <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200 absolute -top-2.5 -right-2.5 shadow-sm">
                <Code className="h-3 w-3 mr-1" />
                System
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="dvx" 
              className="data-[state=active]:bg-white data-[state=active]:text-purple-800 data-[state=active]:shadow-sm data-[state=active]:font-medium text-gray-700 rounded-md relative"
            >
              AI DVX Analysis Prompt
              <Badge variant="outline" className="ml-2 bg-purple-50 text-purple-700 border-purple-200 absolute -top-2.5 -right-2.5 shadow-sm">
                <Wand2 className="h-3 w-3 mr-1" />
                Advanced
              </Badge>
            </TabsTrigger>
          </TabsList>
          <Button
            onClick={() => onSavePrompt(activePromptType)}
            size="sm"
            className="flex items-center gap-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save {activePromptType === 'soap' ? 'SOAP' : 'DVX'} Prompt
          </Button>
        </div>

        <TabsContent value="soap">
          <Card className="border-blue-200 bg-white shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-md shadow-sm border border-blue-200 mt-0.5">
                    <Code className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">SOAP Note Generator Configuration</h3>
                    <p className="text-sm text-gray-600">
                      Customize the AI prompt used to generate structured SOAP notes for patient records.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
                  <Textarea
                    value={soapPromptText}
                    onChange={(e) => onSoapPromptChange(e.target.value)}
                    className="h-[calc(100vh-36rem)] sm:h-[calc(100vh-30rem)] font-mono text-sm resize-none bg-white border-gray-300 text-gray-800 focus-visible:ring-blue-500/30 shadow-sm"
                    placeholder="Enter your SOAP note prompt configuration here..."
                  />
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-gray-700 shadow-sm">
                  <h4 className="font-medium text-blue-800 mb-1.5 flex items-center">
                    <Code className="h-4 w-4 mr-1.5 inline" />
                    Available Variables
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <code className="text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded border border-blue-200">
                        [PATIENT_NAME]
                      </code>
                      <span className="text-gray-600 ml-2">Patient's full name</span>
                    </div>
                    <div>
                      <code className="text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded border border-blue-200">
                        [PATIENT_AGE]
                      </code>
                      <span className="text-gray-600 ml-2">Patient's age</span>
                    </div>
                    <div>
                      <code className="text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded border border-blue-200">
                        [CHIEF_COMPLAINT]
                      </code>
                      <span className="text-gray-600 ml-2">Primary complaint</span>
                    </div>
                    <div>
                      <code className="text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded border border-blue-200">
                        [VITALS]
                      </code>
                      <span className="text-gray-600 ml-2">Patient's vital signs</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dvx">
          <Card className="border-purple-200 bg-white shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-md shadow-sm border border-purple-200 mt-0.5">
                    <Wand2 className="h-4 w-4 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">DVX Analysis Engine Configuration</h3>
                    <p className="text-sm text-gray-600">
                      Customize the AI prompt used to generate advanced diagnostic insights for patient care.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
                  <Textarea
                    value={dvxPromptText}
                    onChange={(e) => onDvxPromptChange(e.target.value)}
                    className="h-[calc(100vh-36rem)] sm:h-[calc(100vh-30rem)] font-mono text-sm resize-none bg-white border-gray-300 text-gray-800 focus-visible:ring-purple-500/30 shadow-sm"
                    placeholder="Enter your AI DVX analysis prompt configuration here..."
                  />
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3 text-sm text-gray-700 shadow-sm">
                  <h4 className="font-medium text-purple-800 mb-1.5 flex items-center">
                    <Code className="h-4 w-4 mr-1.5 inline" />
                    Available Variables
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <code className="text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded border border-purple-200">
                        [PATIENT_NAME]
                      </code>
                      <span className="text-gray-600 ml-2">Patient's full name</span>
                    </div>
                    <div>
                      <code className="text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded border border-purple-200">
                        [CONDITION]
                      </code>
                      <span className="text-gray-600 ml-2">Medical condition</span>
                    </div>
                    <div>
                      <code className="text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded border border-purple-200">
                        [DEVICE_DATA]
                      </code>
                      <span className="text-gray-600 ml-2">Connected device info</span>
                    </div>
                    <div>
                      <code className="text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded border border-purple-200">
                        [TEST_RESULTS]
                      </code>
                      <span className="text-gray-600 ml-2">Clinical test results</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
