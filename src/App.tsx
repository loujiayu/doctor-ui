import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ThumbsUp, ThumbsDown, AlertCircle, MessageSquare, Activity, Brain, ChevronDown, Pill, Syringe, Timer, Stethoscope, HeartPulse, ArrowRight, GitBranch } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const { toast } = useToast();
  
  const handleVote = (type: 'up' | 'down' | 'more') => {
    const messages = {
      up: 'Analysis approved and sent to patient',
      down: 'Analysis rejected - requires revision',
      more: 'Requested additional patient data'
    };
    toast({
      title: 'Review Status Updated',
      description: messages[type],
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Header and other sections remain the same... */}
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white p-2 shadow-lg">
              <img 
                src="https://raw.githubusercontent.com/stackblitz/stackblitz-icons/main/files/vicki-ai-logo.png" 
                alt="Vicki.AI"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">Vicki.AI</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/80">Dr. Charles Sandors</span>
          </div>
        </header>

        {/* Approval Buttons */}
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardContent className="py-4">
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2 hover:bg-primary hover:text-white"
                onClick={() => handleVote('up')}
              >
                <ThumbsUp className="h-4 w-4" />
                Approve Analysis
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 hover:bg-destructive hover:text-white"
                onClick={() => handleVote('down')}
              >
                <ThumbsDown className="h-4 w-4" />
                Reject Analysis
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 hover:bg-secondary hover:text-foreground"
                onClick={() => handleVote('more')}
              >
                <AlertCircle className="h-4 w-4" />
                Need More Data
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content area */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="soap" className="h-[calc(100vh-15rem)]">
                <TabsList className="mb-4">
                  <TabsTrigger value="soap">SOAP Note</TabsTrigger>
                  <TabsTrigger value="raw">Raw Analysis</TabsTrigger>
                  <TabsTrigger value="algorithm">Treatment Algorithm</TabsTrigger>
                  <TabsTrigger value="insurance">Insurance Notes</TabsTrigger>
                  <TabsTrigger value="prompt">Prompt Config</TabsTrigger>
                </TabsList>
                {/* Previous tab contents remain the same... */}
                
                {/* New Treatment Algorithm tab */}
                <TabsContent value="algorithm" className="h-[calc(100%-3rem)]">
                  <ScrollArea className="h-full rounded-md border p-4">
                    <div className="space-y-6">
                      {/* Initial Assessment */}
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-bold flex items-center gap-2 mb-3">
                          <Stethoscope className="h-5 w-5" />
                          Initial Assessment
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <HeartPulse className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">Vital Signs Review</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Timer className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">Symptom Duration</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Activity className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">Sleep Pattern Analysis</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Brain className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">Neurological Screen</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Primary Treatment Path */}
                      <div className="relative">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        <div className="space-y-4">
                          {/* First Line Treatment */}
                          <div className="relative ml-12">
                            <div className="absolute -left-6 top-3 w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="bg-green-50 p-4 rounded-lg">
                              <h4 className="font-bold flex items-center gap-2 mb-2">
                                <Pill className="h-4 w-4" />
                                First Line Treatment
                              </h4>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                  <ArrowRight className="h-4 w-4 text-green-600" />
                                  OTC pain reliever (Acetaminophen/NSAIDs)
                                </li>
                                <li className="flex items-center gap-2">
                                  <ArrowRight className="h-4 w-4 text-green-600" />
                                  Sleep hygiene optimization
                                </li>
                                <li className="flex items-center gap-2">
                                  <ArrowRight className="h-4 w-4 text-green-600" />
                                  Stress reduction techniques
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* Second Line Treatment */}
                          <div className="relative ml-12">
                            <div className="absolute -left-6 top-3 w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                              <h4 className="font-bold flex items-center gap-2 mb-2">
                                <Syringe className="h-4 w-4" />
                                Second Line Treatment
                              </h4>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                  <ArrowRight className="h-4 w-4 text-yellow-600" />
                                  Sleep study referral
                                </li>
                                <li className="flex items-center gap-2">
                                  <ArrowRight className="h-4 w-4 text-yellow-600" />
                                  Thyroid panel
                                </li>
                                <li className="flex items-center gap-2">
                                  <ArrowRight className="h-4 w-4 text-yellow-600" />
                                  Prophylactic migraine therapy consideration
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* Advanced Interventions */}
                          <div className="relative ml-12">
                            <div className="absolute -left-6 top-3 w-3 h-3 rounded-full bg-purple-500"></div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <h4 className="font-bold flex items-center gap-2 mb-2">
                                <GitBranch className="h-4 w-4" />
                                Advanced Interventions
                              </h4>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                  <ArrowRight className="h-4 w-4 text-purple-600" />
                                  Neurological consultation
                                </li>
                                <li className="flex items-center gap-2">
                                  <ArrowRight className="h-4 w-4 text-purple-600" />
                                  Autoimmune screening
                                </li>
                                <li className="flex items-center gap-2">
                                  <ArrowRight className="h-4 w-4 text-purple-600" />
                                  Advanced imaging if indicated
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Response Monitoring */}
                      <div className="bg-gray-50 p-4 rounded-lg mt-6">
                        <h3 className="font-bold flex items-center gap-2 mb-3">
                          <Activity className="h-5 w-5" />
                          Response Monitoring
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold mb-2">Short Term (1-2 weeks)</h5>
                            <ul className="space-y-1">
                              <li>• Daily symptom tracking</li>
                              <li>• Sleep quality assessment</li>
                              <li>• Medication response</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-2">Long Term (1-3 months)</h5>
                            <ul className="space-y-1">
                              <li>• Pattern recognition analysis</li>
                              <li>• Treatment efficacy evaluation</li>
                              <li>• Quality of life assessment</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Other existing tab contents remain the same... */}
                {/* Include SOAP, Raw Analysis, Insurance Notes, and Prompt tabs here */}
              </Tabs>
            </CardContent>
          </Card>

          {/* Sidebar content remains the same... */}
          <div className="space-y-6">
            {/* Device Data Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Device Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Heart Rate</span>
                    <span className="text-sm font-medium">78 bpm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sleep Quality</span>
                    <span className="text-sm font-medium">6.5 hrs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Steps</span>
                    <span className="text-sm font-medium">5,234</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chatbot Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chatbot Interaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        P
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">I've been having these headaches...</p>
                        <span className="text-xs text-muted-foreground">10:30 AM</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                        AI
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Can you describe the pain intensity?</p>
                        <span className="text-xs text-muted-foreground">10:31 AM</span>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* AI Insight Collapsible */}
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="bg-card rounded-lg shadow-md">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    <h3 className="font-semibold">AI Insight</h3>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4 space-y-3">
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-sm text-blue-800 font-semibold mb-1">Pattern Recognition Insights:</p>
                    <ul className="text-sm text-blue-800 list-disc pl-4 space-y-1">
                      <li>Correlation between disrupted sleep patterns and recent device data shows a 43% decrease in deep sleep over the past month, suggesting potential underlying sleep disorder.</li>
                      <li>Subtle trend in morning vs. evening BP readings indicates possible masked hypertension despite normal office readings.</li>
                      <li>Heart rate variability analysis reveals autonomic dysfunction patterns commonly missed in standard evaluations.</li>
                    </ul>
                  </div>
                  
                  <div className="bg-amber-50 p-3 rounded-md">
                    <p className="text-sm text-amber-800 font-semibold mb-1">Expanded Differential Diagnoses:</p>
                    <ul className="text-sm text-amber-800 list-disc pl-4 space-y-1">
                      <li>Primary: Chronic migraine with aura (87% probability based on symptom clustering)</li>
                      <li>Secondary: Sleep apnea with morning headaches (72% correlation)</li>
                      <li>Tertiary: Subclinical thyroid dysfunction (65% probability based on multi-system analysis)</li>
                      <li>Quaternary: Early presentation of autoimmune condition (43% probability)</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-md">
                    <p className="text-sm text-purple-800 font-semibold mb-1">AI-Detected Patterns:</p>
                    <ul className="text-sm text-purple-800 list-disc pl-4 space-y-1">
                      <li>Temporal relationship between headache onset and barometric pressure changes (last 90 days)</li>
                      <li>Subtle cognitive performance decline during headache episodes (based on digital interaction patterns)</li>
                      <li>Micronutrient deficiency signature in recent lab trends</li>
                    </ul>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;