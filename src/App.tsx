import React, { useState } from 'react';
import {
  ShieldAlert,
  Clock,
  FileCheck2,
  Sparkles,
  Camera,
  Shield,
  Building,
  AlertTriangle,
  Printer,
  ChevronRight,
  PhoneCall,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { EmergencyHeader } from './components/EmergencyHeader';
import { SceneSafetyGuide } from './components/SceneSafetyGuide';
import { EvidenceChecklistVault } from './components/EvidenceChecklistVault';
import { PhotoDamageScanner } from './components/PhotoDamageScanner';
import { InsuranceClaimEngine } from './components/InsuranceClaimEngine';
import { AiLegalCopilot } from './components/AiLegalCopilot';
import { LegalAssistanceDirectory } from './components/LegalAssistanceDirectory';
import { PrintableIncidentReport } from './components/PrintableIncidentReport';
import {
  AccidentAnalysisData,
  CollisionType,
  EvidenceItem,
  IncidentFormData,
  Jurisdiction,
} from './types';
import { INITIAL_EVIDENCE_ITEMS, EMERGENCY_DIRECTORIES } from './data/legalGuides';

export default function App() {
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('India');
  const [emergencyMode, setEmergencyMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    'guide' | 'evidence' | 'copilot' | 'damage' | 'insurance' | 'directory'
  >('copilot');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  // Evidence Checklist State
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>(INITIAL_EVIDENCE_ITEMS);
  const [selectedCollisionType, setSelectedCollisionType] =
    useState<CollisionType>('Rear-End Collision');

  // AI Analysis Data
  const [analysisData, setAnalysisData] = useState<AccidentAnalysisData | null>(null);

  // Master Incident Form State
  const [incidentData, setIncidentData] = useState<IncidentFormData>({
    claimantName: '',
    contactPhone: '',
    incidentDate: new Date().toISOString().split('T')[0],
    incidentTime: '14:30',
    incidentLocation: 'Main Arterial Road & 4th Cross Intersection',
    vehicleRegistration: '',
    insurancePolicyNumber: '',
    insurerName: '',
    otherVehicleDetails: '',
    otherDriverDetails: '',
    otherInsuranceDetails: '',
    witnessDetails: '',
    policeStationName: '',
    gdOrFirNumber: '',
    factualDescription:
      'Stopped in designated traffic lane at traffic light. Trailing vehicle struck rear bumper. Photos and insurance details collected.',
    collisionType: 'Rear-End Collision',
    jurisdiction: 'India',
    injuriesPresent: false,
    injuryNotes: '',
  });

  const handleToggleEvidence = (id: string) => {
    setEvidenceList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, collected: !item.collected } : item
      )
    );
  };

  const handleUpdateIncidentData = (newData: Partial<IncidentFormData>) => {
    setIncidentData((prev) => ({ ...prev, ...newData }));
  };

  interface NavItem {
    id: 'guide' | 'evidence' | 'copilot' | 'damage' | 'insurance' | 'directory';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }

  const navItems: NavItem[] = [
    { id: 'copilot', label: 'AI Legal Copilot', icon: Sparkles, badge: 'Gemini 3.8' },
    { id: 'guide', label: 'Scene Steps & Safety', icon: Clock },
    { id: 'evidence', label: 'Evidence & Documents', icon: FileCheck2 },
    { id: 'damage', label: 'Damage Photo Scanner', icon: Camera },
    { id: 'insurance', label: 'Insurance & Claims', icon: Shield },
    { id: 'directory', label: 'Official Authorities', icon: Building },
  ];

  const currentEmergencyDir = EMERGENCY_DIRECTORIES[jurisdiction] || EMERGENCY_DIRECTORIES['General'];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header with Emergency Hotlines and Jurisdiction Selector */}
      <EmergencyHeader
        jurisdiction={jurisdiction}
        onJurisdictionChange={(j) => {
          setJurisdiction(j);
          handleUpdateIncidentData({ jurisdiction: j });
        }}
        emergencyMode={emergencyMode}
        onToggleEmergencyMode={() => setEmergencyMode(!emergencyMode)}
        onOpenPrintReport={() => setIsPrintModalOpen(true)}
      />

      {/* Emergency Mode Roadside Rescue Quick Panel */}
      {emergencyMode && (
        <section className="bg-red-700 text-white py-6 px-4 shadow-inner">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-red-600/70 pb-4">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-red-200">
                  CRISIS PROTOCOL ACTIVE
                </span>
                <h2 className="text-2xl font-black mt-0.5">
                  Are You At The Accident Scene Right Now?
                </h2>
                <p className="text-xs text-red-100 mt-1 max-w-xl">
                  Do not panic. Follow these 4 life-safety actions immediately in order:
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={`tel:${currentEmergencyDir.emergencyUniversal}`}
                  className="px-4 py-2.5 bg-white text-red-700 font-extrabold rounded-xl shadow-lg hover:bg-red-50 text-sm flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Emergency Dispatch ({currentEmergencyDir.emergencyUniversal})</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-red-800/80 border border-red-500/40 p-3.5 rounded-xl space-y-1">
                <span className="font-extrabold text-amber-300 block text-sm">
                  1. Life Safety First
                </span>
                <p className="text-red-100 leading-relaxed">
                  Turn hazard blinkers ON. Turn engine ignition OFF. Move yourself behind safety crash barrier.
                </p>
              </div>

              <div className="bg-red-800/80 border border-red-500/40 p-3.5 rounded-xl space-y-1">
                <span className="font-extrabold text-amber-300 block text-sm">
                  2. Do NOT Admit Fault
                </span>
                <p className="text-red-100 leading-relaxed">
                  Never apologize or say "I didn't see you". Share only name, license plate, and insurance company.
                </p>
              </div>

              <div className="bg-red-800/80 border border-red-500/40 p-3.5 rounded-xl space-y-1">
                <span className="font-extrabold text-amber-300 block text-sm">
                  3. Take 4 Scene Photos
                </span>
                <p className="text-red-100 leading-relaxed">
                  Take wide photos of both cars, road lane markers, skid marks, and traffic signal BEFORE moving cars.
                </p>
              </div>

              <div className="bg-red-800/80 border border-red-500/40 p-3.5 rounded-xl space-y-1">
                <span className="font-extrabold text-amber-300 block text-sm">
                  4. Demand Police Entry
                </span>
                <p className="text-red-100 leading-relaxed">
                  Ensure the attending police officer notes an official Diary (GD/FIR) entry number before leaving.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="border-b border-slate-200 overflow-x-auto pb-px">
          <nav className="flex space-x-1 sm:space-x-2 min-w-max" aria-label="Tabs">
            {navItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-3.5 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'border-slate-900 text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-amber-500' : 'text-slate-400'
                    }`}
                  />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded ml-0.5">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content Display */}
        <div className="pt-2">
          {activeTab === 'copilot' && (
            <AiLegalCopilot
              jurisdiction={jurisdiction}
              incidentData={incidentData}
              onUpdateIncidentData={handleUpdateIncidentData}
              analysisData={analysisData}
              onSetAnalysisData={setAnalysisData}
            />
          )}

          {activeTab === 'guide' && (
            <SceneSafetyGuide jurisdiction={jurisdiction} />
          )}

          {activeTab === 'evidence' && (
            <EvidenceChecklistVault
              evidenceList={evidenceList}
              onToggleItem={handleToggleEvidence}
              selectedCollisionType={selectedCollisionType}
              onSelectCollisionType={(t) => {
                setSelectedCollisionType(t);
                handleUpdateIncidentData({ collisionType: t });
              }}
            />
          )}

          {activeTab === 'damage' && <PhotoDamageScanner />}

          {activeTab === 'insurance' && <InsuranceClaimEngine />}

          {activeTab === 'directory' && (
            <LegalAssistanceDirectory jurisdiction={jurisdiction} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">AcciGuide AI</span>
            <span>·</span>
            <span>Statutory Road Traffic & Motor Insurance Procedural Copilot</span>
          </div>

          <div className="text-[11px] text-slate-500 max-w-xl text-center md:text-right">
            <strong>Legal Disclaimer:</strong> AcciGuide AI provides procedural educational assistance based on published motor vehicle acts and insurance regulations. It does not constitute formal licensed attorney-client legal representation. In severe injuries or disputed liability, immediately consult official legal aid or an authorized attorney.
          </div>
        </div>
      </footer>

      {/* Printable Modal */}
      <PrintableIncidentReport
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        incidentData={incidentData}
        onUpdateIncidentData={handleUpdateIncidentData}
        evidenceList={evidenceList}
        jurisdiction={jurisdiction}
      />
    </div>
  );
}
