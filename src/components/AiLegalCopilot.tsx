import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  AlertTriangle,
  FileText,
  ShieldAlert,
  Copy,
  Check,
  RefreshCw,
  Scale,
  MessageSquare,
  ChevronRight,
  BookOpen,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import {
  AccidentAnalysisData,
  ChatMessage,
  CollisionType,
  IncidentFormData,
  Jurisdiction,
  NoticeDraftData,
} from '../types';
import { SCENARIO_PRESETS, ScenarioPreset } from '../data/legalGuides';

interface AiLegalCopilotProps {
  jurisdiction: Jurisdiction;
  incidentData: IncidentFormData;
  onUpdateIncidentData: (data: Partial<IncidentFormData>) => void;
  analysisData: AccidentAnalysisData | null;
  onSetAnalysisData: (data: AccidentAnalysisData | null) => void;
}

export const AiLegalCopilot: React.FC<AiLegalCopilotProps> = ({
  jurisdiction,
  incidentData,
  onUpdateIncidentData,
  analysisData,
  onSetAnalysisData,
}) => {
  const [scenarioInput, setScenarioInput] = useState<string>(
    incidentData.factualDescription || ''
  );
  const [selectedType, setSelectedType] = useState<CollisionType>(
    incidentData.collisionType || 'Rear-End Collision'
  );
  const [hasInjuries, setHasInjuries] = useState<boolean>(incidentData.injuriesPresent || false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Copilot Interactive Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      role: 'model',
      content:
        'Hello. I am your specialized Motor Legal & Insurance Copilot. Describe your accident or ask any specific question (e.g., "What if the driver gave fake phone number?", "Can I claim if my road tax is overdue?", "What if police refuse to file an FIR?").',
      timestamp: 'Just now',
    },
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  // Notice Drafting State
  const [draftedNotices, setDraftedNotices] = useState<NoticeDraftData | null>(null);
  const [isDrafting, setIsDrafting] = useState<boolean>(false);
  const [activeNoticeTab, setActiveNoticeTab] = useState<'insurance' | 'police'>('insurance');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleApplyPreset = (preset: ScenarioPreset) => {
    setScenarioInput(preset.description);
    setSelectedType(preset.collisionType);
    onUpdateIncidentData({
      collisionType: preset.collisionType,
      factualDescription: preset.description,
    });
  };

  const handleRunAnalysis = async () => {
    if (!scenarioInput.trim()) {
      setErrorMsg('Please describe what happened in the accident.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/ai/accident-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: scenarioInput,
          jurisdiction: jurisdiction,
          collisionType: selectedType,
          injuries: hasInjuries,
          vehiclesInvolved: '2 vehicles',
          driverRole: 'Driver',
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Failed to analyze accident scenario.');
      }

      onSetAnalysisData(resData.data);
      onUpdateIncidentData({
        factualDescription: scenarioInput,
        collisionType: selectedType,
        injuriesPresent: hasInjuries,
      });
    } catch (err: any) {
      console.error('Case analysis error:', err);
      setErrorMsg(err.message || 'Error processing AI analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userQuestion = chatInput.trim();
    const newUserMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: userQuestion,
      timestamp: 'Just now',
    };

    setChatMessages((prev) => [...prev, newUserMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/ai/copilot-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userQuestion,
          conversationHistory: chatMessages.slice(-6),
          context: {
            jurisdiction,
            collisionType: selectedType,
            scenario: scenarioInput,
            hasInjuries,
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to receive response.');
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: data.answer || 'Guidance received.',
        timestamp: 'Just now',
      };
      setChatMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `Error: ${err.message || 'Unable to connect to legal advice service.'}`,
        timestamp: 'Just now',
      };
      setChatMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleGenerateNotices = async () => {
    setIsDrafting(true);
    try {
      const response = await fetch('/api/ai/draft-notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: incidentData.claimantName || 'Vehicle Owner / Driver',
          contactPhone: incidentData.contactPhone || 'Contact Registered on File',
          incidentDate: incidentData.incidentDate || 'Date of Incident',
          incidentTime: incidentData.incidentTime || 'Time of Incident',
          incidentLocation: incidentData.incidentLocation || 'Incident Location / Intersection',
          vehicleRegistration: incidentData.vehicleRegistration || 'Registered Plate No.',
          insurancePolicyNumber: incidentData.insurancePolicyNumber || 'Insurance Policy No.',
          insurerName: incidentData.insurerName || 'Motor Insurance Company',
          otherVehicleDetails: incidentData.otherVehicleDetails || 'Other Vehicle Involved',
          otherDriverDetails: incidentData.otherDriverDetails || 'Other Driver (if known)',
          factualDescription: scenarioInput || incidentData.factualDescription,
          jurisdiction: jurisdiction,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Failed to draft notices.');
      }
      setDraftedNotices(resData.data);
    } catch (err: any) {
      console.error('Draft notices error:', err);
      alert('Could not draft notices: ' + err.message);
    } finally {
      setIsDrafting(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Case Input & Analysis Portal */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-700">
              <Scale className="w-3.5 h-3.5" />
              <span>Google Gemini 3.8 Flash Motor Law Intelligence</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
              AI Accident Legal Procedure & Liability Analyzer
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Describe how the collision happened to receive customized statutory duties, liability evaluation, immediate defense steps, and critical pitfalls.
            </p>
          </div>
        </div>

        {/* Quick Scenario Preset Chips */}
        <div>
          <span className="text-xs font-semibold text-slate-600 block mb-2">
            Load Quick Realistic Accident Scenario:
          </span>
          <div className="flex flex-wrap gap-2">
            {SCENARIO_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleApplyPreset(p)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition-colors cursor-pointer text-left"
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Collision Category:
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as CollisionType)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
              >
                <option value="Rear-End Collision">Rear-End Collision</option>
                <option value="Intersection T-Bone">Intersection T-Bone</option>
                <option value="Head-On Collision">Head-On Collision</option>
                <option value="Sideswipe / Lane Change">Sideswipe / Lane Change</option>
                <option value="Hit and Run (Other driver fled)">Hit and Run (Other driver fled)</option>
                <option value="Parked Car Collision">Parked Car Collision</option>
                <option value="Multi-Vehicle Pileup">Multi-Vehicle Pileup</option>
                <option value="Pedestrian / Cyclist Incident">Pedestrian / Cyclist Incident</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={hasInjuries}
                  onChange={(e) => setHasInjuries(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                />
                <span>Any bodily injury, severe neck strain, or dizziness involved?</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Accident Description (Who was doing what, vehicle positions, weather, other driver's reaction):
            </label>
            <textarea
              rows={4}
              value={scenarioInput}
              onChange={(e) => setScenarioInput(e.target.value)}
              placeholder="e.g. I was stopped at a red traffic light on MG Road. A silver sedan struck my rear bumper at about 35 km/h. The other driver claimed they were looking at their GPS and didn't notice the light. Nobody is visibly bleeding but I feel slight neck stiffness."
              className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-slate-900 bg-white leading-relaxed"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing || !scenarioInput.trim()}
              className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating Legal Doctrines & Case Law...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Generate Complete Legal & Claim Roadmap</span>
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* AI Output Display */}
        {analysisData && (
          <div className="border-t border-slate-200 pt-6 space-y-6">
            {/* Header summary & Urgency */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                  Case Assessment Summary
                </span>
                <p className="text-xs md:text-sm text-slate-800 font-medium mt-0.5 max-w-2xl">
                  {analysisData.executiveSummary}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded text-xs font-bold ${
                  analysisData.urgencyLevel === 'CRITICAL'
                    ? 'bg-red-100 text-red-800 border border-red-300'
                    : analysisData.urgencyLevel === 'HIGH'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-blue-100 text-blue-900 border border-blue-200'
                }`}
              >
                Urgency: {analysisData.urgencyLevel}
              </span>
            </div>

            {/* 3 Pillar Cards: Immediate Safety, Legal Obligations, Liability */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Immediate Safety */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 text-amber-700">
                  <ShieldAlert className="w-4 h-4" />
                  Immediate Scene Actions
                </h4>
                <ul className="text-xs text-slate-700 space-y-1.5 pl-4 list-disc">
                  {analysisData.immediateSafetyActions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>

              {/* Card 2: Legal Obligations & Police Warning */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 text-red-700">
                  <Scale className="w-4 h-4" />
                  Statutory Police & Fault Rules
                </h4>
                <div className="text-xs text-slate-700 space-y-2">
                  <p>
                    <strong className="text-slate-900">Police Mandate: </strong>
                    {analysisData.legalObligations.policeReporting}
                  </p>
                  <p>
                    <strong className="text-red-900">Never Say: </strong>
                    {analysisData.legalObligations.faultStatementWarning}
                  </p>
                </div>
              </div>

              {/* Card 3: Liability & Fault Assessment */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 text-blue-700">
                  <BookOpen className="w-4 h-4" />
                  Liability & Fault Doctrine
                </h4>
                <div className="text-xs text-slate-700 space-y-2">
                  <p>
                    <strong className="text-slate-900">Prima Facie Presumption: </strong>
                    {analysisData.liabilityAssessment.primaFaciePresumption}
                  </p>
                  <p>
                    <strong className="text-slate-900">Protective Actions: </strong>
                    {analysisData.liabilityAssessment.defensiveSteps}
                  </p>
                </div>
              </div>
            </div>

            {/* Pitfalls & Evidence Checklist from AI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50/50 border border-red-200 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Critical Traps & Pitfalls to Avoid:
                </h4>
                <ul className="text-xs text-red-950 space-y-1.5 pl-4 list-disc">
                  {analysisData.criticalPitfallsToAvoid.map((pit, i) => (
                    <li key={i}>{pit}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  Official Assistance & Legal Aid Direction:
                </h4>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  {analysisData.officialAssistanceGuidance}
                </p>
              </div>
            </div>

            {/* Claim Notice Draft Action CTA */}
            <div className="bg-slate-900 text-slate-100 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">
                  Generate Formal Statutory Notice Letters
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Produce legally formatted Insurance Claim Intimation & Police Incident Statements ready to submit.
                </p>
              </div>

              <button
                onClick={handleGenerateNotices}
                disabled={isDrafting}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0"
              >
                {isDrafting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Drafting Formal Notices...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-3.5 h-3.5" />
                    <span>Generate Formal Notice Letters</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notice Drafting Output View */}
      {draftedNotices && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Generated Legal Communications
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Official Incident Notice Documents
              </h3>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveNoticeTab('insurance')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeNoticeTab === 'insurance'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Insurance Intimation
              </button>
              <button
                onClick={() => setActiveNoticeTab('police')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeNoticeTab === 'police'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Police Station Statement
              </button>
            </div>
          </div>

          {activeNoticeTab === 'insurance' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">
                  Subject: {draftedNotices.insuranceNotice.subject}
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${draftedNotices.insuranceNotice.subject}\n\n${draftedNotices.insuranceNotice.body}`,
                      'ins'
                    )
                  }
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
                >
                  {copiedType === 'ins' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'ins' ? 'Copied' : 'Copy Letter'}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
                {draftedNotices.insuranceNotice.body}
              </pre>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">
                  Subject: {draftedNotices.policeIntimation.subject}
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${draftedNotices.policeIntimation.subject}\n\n${draftedNotices.policeIntimation.body}`,
                      'pol'
                    )
                  }
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
                >
                  {copiedType === 'pol' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'pol' ? 'Copied' : 'Copy Statement'}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
                {draftedNotices.policeIntimation.body}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Interactive Copilot Q&A Chat */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Interactive Legal Copilot Dialogue</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-1">
            Ask Any Specific Legal or Claim Question
          </h3>
          <p className="text-xs md:text-sm text-slate-600 mt-0.5">
            Ask about hit-and-run compensation, disputed blame, drunk driving third parties, or insurance delays.
          </p>
        </div>

        {/* Chat History Container */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-80 overflow-y-auto space-y-3">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-2.5 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-2xs'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isChatLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing legal statute and formulating answer...</span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSendChat} className="flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="e.g. Can the other driver's insurer deny my claim if they were uninsured?"
            className="flex-1 text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-slate-900 bg-white"
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || isChatLoading}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
