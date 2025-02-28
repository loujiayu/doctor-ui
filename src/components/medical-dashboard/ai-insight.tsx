import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Brain, ChevronDown, Sparkles, Lightbulb, AlertTriangle, Zap, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function AIInsight() {
  const [isOpen, setIsOpen] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh of AI insights
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700 shadow-lg overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-500/20 p-1.5 rounded-md">
                <Brain className="h-5 w-5 text-indigo-300" />
              </div>
              <h3 className="font-semibold text-white">AI Clinical Insights</h3>
              <div className="px-1.5 py-0.5 bg-indigo-500/20 rounded-md text-xs font-medium text-indigo-300">
                Beta
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 text-slate-300 hover:text-white hover:bg-slate-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRefresh();
                }}
                disabled={isRefreshing}
              >
                {isRefreshing ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-1" />
                )}
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <ChevronDown 
                className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
              />
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 space-y-4">
            <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg overflow-hidden">
              <div className="bg-indigo-900/20 px-4 py-2 border-b border-indigo-500/20 flex items-center">
                <Sparkles className="h-4 w-4 text-indigo-300 mr-2" />
                <h4 className="text-sm font-medium text-indigo-200">Pattern Recognition</h4>
              </div>
              <div className="p-4 text-sm text-slate-300 space-y-2">
                <div className="flex gap-3">
                  <div className="min-w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div>
                  <p>Correlation between disrupted sleep patterns and recent device data shows a <span className="text-indigo-200 font-medium">43% decrease</span> in deep sleep over the past month, suggesting potential underlying sleep disorder.</p>
                </div>
                <div className="flex gap-3">
                  <div className="min-w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div>
                  <p>Subtle trend in morning vs. evening BP readings indicates <span className="text-indigo-200 font-medium">possible masked hypertension</span> despite normal office readings.</p>
                </div>
                <div className="flex gap-3">
                  <div className="min-w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div>
                  <p>Heart rate variability analysis reveals <span className="text-indigo-200 font-medium">autonomic dysfunction patterns</span> commonly missed in standard evaluations.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-950/30 border border-amber-500/20 rounded-lg overflow-hidden">
              <div className="bg-amber-900/20 px-4 py-2 border-b border-amber-500/20 flex items-center">
                <AlertTriangle className="h-4 w-4 text-amber-300 mr-2" />
                <h4 className="text-sm font-medium text-amber-200">Expanded Differential Diagnoses</h4>
              </div>
              <div className="p-4 text-sm text-slate-300">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-amber-500 rounded-full mr-3"></div>
                    <div>
                      <span className="text-amber-200 font-medium">Primary (87%):</span>
                      <p>Chronic migraine with aura</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-amber-500/70 rounded-full mr-3"></div>
                    <div>
                      <span className="text-amber-200 font-medium">Secondary (72%):</span>
                      <p>Sleep apnea with morning headaches</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-amber-500/50 rounded-full mr-3"></div>
                    <div>
                      <span className="text-amber-200 font-medium">Tertiary (65%):</span>
                      <p>Subclinical thyroid dysfunction</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-amber-500/30 rounded-full mr-3"></div>
                    <div>
                      <span className="text-amber-200 font-medium">Quaternary (43%):</span>
                      <p>Early presentation of autoimmune condition</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-950/30 border border-purple-500/20 rounded-lg overflow-hidden">
              <div className="bg-purple-900/20 px-4 py-2 border-b border-purple-500/20 flex items-center">
                <Lightbulb className="h-4 w-4 text-purple-300 mr-2" />
                <h4 className="text-sm font-medium text-purple-200">AI-Detected Patterns</h4>
              </div>
              <div className="p-4 text-sm text-slate-300 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-3.5 w-3.5 text-purple-300" />
                  <span className="text-purple-200 font-medium">Key Observations:</span>
                </div>
                <div className="flex gap-3">
                  <div className="min-w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5"></div>
                  <p>Temporal relationship between headache onset and barometric pressure changes (last 90 days)</p>
                </div>
                <div className="flex gap-3">
                  <div className="min-w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5"></div>
                  <p>Subtle cognitive performance decline during headache episodes (based on digital interaction patterns)</p>
                </div>
                <div className="flex gap-3">
                  <div className="min-w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5"></div>
                  <p>Micronutrient deficiency signature in recent lab trends</p>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-slate-500 mt-2 px-1">
              These AI-generated insights are provided for informational purposes and should be verified by clinical judgment.
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}