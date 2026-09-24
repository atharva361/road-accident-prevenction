import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  AlertOctagon,
  FileText,
  ChevronRight,
  Info,
} from 'lucide-react';
import { TIMELINE_PROCEDURES } from '../data/legalGuides';
import { Jurisdiction } from '../types';

interface SceneSafetyGuideProps {
  jurisdiction: Jurisdiction;
}

export const SceneSafetyGuide: React.FC<SceneSafetyGuideProps> = ({ jurisdiction }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const dos = [
    {
      title: 'Check Safety & Turn Engine Off',
      desc: 'Kill the ignition instantly to eliminate spark ignition of leaking fuel.',
    },
    {
      title: 'Turn on Hazard Flashers & Deploy Triangle',
      desc: 'Alert approaching motorists from at least 30-50m away on city roads, 100m on highways.',
    },
    {
      title: 'Exchange Objective Statutory Facts Only',
      desc: 'Provide driver name, vehicle registration number, and insurance carrier without discussing blame.',
    },
    {
      title: 'Photograph Scene Before Any Vehicle Moves',
      desc: 'Capture license plates, road skid trajectories, traffic lights, and both vehicles in context.',
    },
    {
      title: 'Insist on Written Police Incident Record / FIR',
      desc: 'Record the responding officer badge number, police station name, and diary/FIR reference.',
    },
  ];

  const donts = [
    {
      title: 'NEVER Apologize or Say "It was my fault"',
      desc: 'Even saying "I didn\'t see you" or "I am sorry" can be introduced in court as an admission of legal liability.',
    },
    {
      title: 'NEVER Agree to Unofficial Cash Settlements on Road',
      desc: 'Unseen frame/suspension damages can cost 10x more later, and private deals void your insurance coverage.',
    },
    {
      title: 'NEVER Sign Blank Documents or Fast Releases',
      desc: 'Do not sign waivers given by tow truck operators, third parties, or private adjusters without reading every line.',
    },
    {
      title: 'NEVER Leave the Scene Before Exchanging Details',
      desc: 'Leaving without providing statutory details can convert a minor fender bender into a criminal hit-and-run offense.',
    },
    {
      title: 'NEVER Skip Medical Check-Up Because "You Feel Fine"',
      desc: 'Adrenaline masks soft tissue tears and concussions. Delaying diagnosis ruins personal injury coverage.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Intro section banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
              <Clock className="w-3.5 h-3.5" />
              <span>Chronological Legal Playbook</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
              What to Do Immediately After a Road Accident
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Following the correct statutory sequence preserves your insurance rights, prevents wrongful criminal citations, and protects your safety.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Good Samaritan Protection applies in {jurisdiction}</span>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {TIMELINE_PROCEDURES.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActivePhaseIndex(idx)}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                activePhaseIndex === idx
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.phase}
            </button>
          ))}
        </div>

        {/* Active Phase Details */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              {TIMELINE_PROCEDURES[activePhaseIndex].badge}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TIMELINE_PROCEDURES[activePhaseIndex].steps.map((st, sIdx) => (
              <div
                key={sIdx}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-2">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 text-xs flex items-center justify-center font-mono">
                      {sIdx + 1}
                    </span>
                    <h4>{st.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {st.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Do's and Don'ts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DO's */}
        <div className="bg-emerald-50/40 border border-emerald-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3>Crucial DO's (Preserve Your Rights)</h3>
          </div>
          <div className="space-y-3.5">
            {dos.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/80 p-3.5 rounded-lg border border-emerald-100">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DONT's */}
        <div className="bg-red-50/40 border border-red-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 text-red-800 font-bold text-lg mb-4">
            <XCircle className="w-5 h-5 text-red-600" />
            <h3>Fatal DONT's (Avoid Liability Traps)</h3>
          </div>
          <div className="space-y-3.5">
            {donts.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/80 p-3.5 rounded-lg border border-red-100">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  ✕
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legal Rights Callout Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex flex-col sm:flex-row items-start gap-4">
        <AlertOctagon className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 space-y-1">
          <p className="font-bold text-sm text-amber-900">
            Legal Requirement: When is Calling Police / Filing an FIR Mandatory?
          </p>
          <p className="leading-relaxed">
            In virtually all jurisdictions including <strong>{jurisdiction}</strong>, police notification or an incident report is strictly mandatory if:
            (1) Any person sustained bodily injury or death, (2) Any driver appears intoxicated, (3) It is a hit-and-run where a vehicle fled, (4) Public or government property was damaged, or (5) Estimated damage exceeds local threshold ($1,000–$2,000 / ₹10,000). Never agree to "skip police" if any injury exists!
          </p>
        </div>
      </div>
    </div>
  );
};
