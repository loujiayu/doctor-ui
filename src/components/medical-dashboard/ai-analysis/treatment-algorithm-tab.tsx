import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Stethoscope, HeartPulse, Timer, Activity, Brain, Pill, Syringe, ArrowRight, GitBranch } from 'lucide-react';

export function TreatmentAlgorithmTab() {
  return (
    <ScrollArea className="h-full rounded-md border p-4">
      <div className="space-y-6">
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

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-4">
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
  );
}
