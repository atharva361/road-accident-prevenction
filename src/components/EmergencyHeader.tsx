import React from 'react';
import {
  ShieldAlert,
  PhoneCall,
  Flame,
  AlertTriangle,
  Scale,
  Printer,
  ChevronDown,
} from 'lucide-react';
import { Jurisdiction } from '../types';
import { EMERGENCY_DIRECTORIES } from '../data/legalGuides';

interface EmergencyHeaderProps {
  jurisdiction: Jurisdiction;
  onJurisdictionChange: (j: Jurisdiction) => void;
  emergencyMode: boolean;
  onToggleEmergencyMode: () => void;
  onOpenPrintReport: () => void;
}

export const EmergencyHeader: React.FC<EmergencyHeaderProps> = ({
  jurisdiction,
  onJurisdictionChange,
  emergencyMode,
  onToggleEmergencyMode,
  onOpenPrintReport,
}) => {
  const currentDir = EMERGENCY_DIRECTORIES[jurisdiction] || EMERGENCY_DIRECTORIES['General'];

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs">
      {/* Top Notification / Crisis Banner */}
      <div className={`px-4 py-2 transition-colors ${
        emergencyMode ? 'bg-red-700 text-white' : 'bg-slate-900 text-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-red-400 animate-pulse" />
            <span className="font-semibold tracking-wide">
              {emergencyMode
                ? 'EMERGENCY SCENE ACTIVE MODE — Prioritize Personal Safety & Call Authorities'
                : 'Road Accident Legal & Insurance Procedural Copilot — Free Statutory Guidance'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="text-slate-400">Jurisdiction:</span>
              <div className="relative inline-block">
                <select
                  value={jurisdiction}
                  onChange={(e) => onJurisdictionChange(e.target.value as Jurisdiction)}
                  className="bg-slate-800 text-white font-medium rounded-md px-2 py-1 pr-6 text-xs appearance-none border border-slate-700 hover:border-slate-500 focus:outline-hidden focus:ring-1 focus:ring-amber-400 cursor-pointer"
                  aria-label="Select Country or Jurisdiction"
                >
                  <option value="India">India (MVA 2019)</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom (RTA 1988)</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="General">International / General</option>
                </select>
                <ChevronDown className="w-3 h-3 absolute right-1.5 top-2 pointer-events-none text-slate-400" />
              </div>
            </div>

            <button
              onClick={onToggleEmergencyMode}
              className={`px-3 py-1 rounded text-xs font-bold transition-all shadow-xs cursor-pointer ${
                emergencyMode
                  ? 'bg-white text-red-700 hover:bg-red-50'
                  : 'bg-red-600 hover:bg-red-500 text-white'
              }`}
              aria-pressed={emergencyMode}
            >
              {emergencyMode ? 'Exit Emergency Mode' : '🚨 I am at Accident Scene'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold shadow-sm">
            <Scale className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg md:text-xl text-slate-900 tracking-tight">
                AcciGuide AI
              </h1>
              <span className="text-xs text-amber-900 font-medium px-2 py-0.5 bg-amber-100/80 rounded">
                Legal & Claim Copilot
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Statutory procedural guidelines · Evidence security · Insurance claim roadmap
            </p>
          </div>
        </div>

        {/* Rapid Helpline Quick Access */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${currentDir.police.split('/')[0].trim()}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-xs font-semibold transition-colors"
            title={`Call Police (${currentDir.police})`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Police: <strong className="font-mono">{currentDir.police}</strong></span>
          </a>

          <a
            href={`tel:${currentDir.ambulance.split('/')[0].trim()}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold transition-colors"
            title={`Call Ambulance (${currentDir.ambulance})`}
          >
            <Flame className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ambulance: <strong className="font-mono">{currentDir.ambulance}</strong></span>
          </a>

          <button
            onClick={onOpenPrintReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            title="Generate and print official incident packet for police or surveyor"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Print Formal Report</span>
          </button>
        </div>
      </div>

      {/* Emergency Mode Prominent Red Banner if Active */}
      {emergencyMode && (
        <div className="bg-red-50 border-t border-b border-red-300 px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-red-900">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-950">
                  Immediate 3-Step Life Safety Checklist:
                </p>
                <p className="text-xs text-red-800 mt-0.5">
                  1. Turn on Hazard Lights & turn engine OFF. 2. Stay behind safety barrier (do not stand between cars). 3. Never admit fault or apologize verbally.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-red-700 font-medium">
                Mandatory reporting window: <strong>{currentDir.statutoryReportingWindow}</strong>
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
