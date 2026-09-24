import React from 'react';
import {
  Building,
  Scale,
  Phone,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Award,
} from 'lucide-react';
import { Jurisdiction } from '../types';
import { EMERGENCY_DIRECTORIES } from '../data/legalGuides';

interface LegalAssistanceDirectoryProps {
  jurisdiction: Jurisdiction;
}

export const LegalAssistanceDirectory: React.FC<LegalAssistanceDirectoryProps> = ({
  jurisdiction,
}) => {
  const current = EMERGENCY_DIRECTORIES[jurisdiction] || EMERGENCY_DIRECTORIES['General'];

  const jurisdictionalResources: Record<
    Jurisdiction,
    {
      tribunal: string;
      tribunalDesc: string;
      ombudsman: string;
      ombudsmanDesc: string;
      legalAid: string;
      legalAidDesc: string;
      statuteLimitation: string;
    }
  > = {
    India: {
      tribunal: 'Motor Accident Claims Tribunal (MACT)',
      tribunalDesc:
        'Established under Section 165/166 of the Motor Vehicles Act 1988. Has exclusive jurisdiction for compensation claims relating to death, bodily injury, or property damage against vehicle owners and insurers.',
      ombudsman: 'Executive Council of Insurers / Insurance Ombudsman',
      ombudsmanDesc:
        'Free quasi-judicial forum for settling claims disputes, repudiation of claims, or unreasonable delay by motor insurance companies up to ₹50 Lakhs.',
      legalAid: 'National Legal Services Authority (NALSA / DALSA)',
      legalAidDesc:
        'Free, competent legal services provided under Legal Services Authorities Act to marginalized citizens, road accident victims, and low-income drivers. Helpline: 15100.',
      statuteLimitation: '6 months from accident date to file MACT claim (MVA 2019 Section 166(3)).',
    },
    'United States': {
      tribunal: 'State Civil Court & Small Claims Tribunal',
      tribunalDesc:
        'For property damage claims usually under $5,000–$10,000 without requiring expensive legal counsel. Larger personal injury claims proceed in County/State Superior Court.',
      ombudsman: 'State Insurance Commissioner / Department of Insurance',
      ombudsmanDesc:
        'State regulatory body enforcing fair claims practices. Investigates bad-faith insurer delays, improper claim denials, and non-responsive adjusters.',
      legalAid: 'Legal Services Corporation (LSC) & State Bar Pro Bono',
      legalAidDesc:
        'Provides legal counseling for low-income drivers involved in complex uninsured motorist or civil liability disputes.',
      statuteLimitation: 'Typically 1 to 3 years depending on state personal injury statutes of limitation.',
    },
    'United Kingdom': {
      tribunal: 'Official Injury Claim (OIC) & County Court',
      tribunalDesc:
        'Free government portal for settling whiplash and soft-tissue injury road accident claims under £5,000 without a solicitor.',
      ombudsman: 'Financial Ombudsman Service (FOS)',
      ombudsmanDesc:
        'Independent service that investigates complaints against insurance providers if formal claim deadlock is reached or 8 weeks have elapsed.',
      legalAid: 'Motor Insurers Bureau (MIB) & Citizens Advice',
      legalAidDesc:
        'The MIB compensates victims of uninsured and "hit-and-run" untraced drivers across England, Scotland, and Wales.',
      statuteLimitation: '3 years from the date of the accident for personal injury claims.',
    },
    Canada: {
      tribunal: 'Civil Resolution Tribunal (CRT) / Provincial Courts',
      tribunalDesc:
        'Handles small claims and accident benefit disputes with direct online dispute resolution in British Columbia, Ontario LAT, etc.',
      ombudsman: 'General Insurance OmbudService (GIO)',
      ombudsmanDesc:
        'Independent dispute resolution system for resolving disputes between consumers and member insurance companies.',
      legalAid: 'Provincial Legal Aid Societies & Community Clinics',
      legalAidDesc:
        'Assists victims facing disputed third-party liability and cross-provincial collision complexities.',
      statuteLimitation: 'Usually 2 years from the date of the incident under Provincial Limitations Acts.',
    },
    Australia: {
      tribunal: 'Personal Injury Commission / NCAT / VCAT',
      tribunalDesc:
        'Specialized tribunals resolving statutory benefits and damages claims under Compulsory Third Party (CTP) schemes.',
      ombudsman: 'Australian Financial Complaints Authority (AFCA)',
      ombudsmanDesc:
        'Free and independent dispute resolution scheme for consumer insurance claim disputes, unjust delays, or settlement disagreements.',
      legalAid: 'Legal Aid & Community Legal Centres (CLCs)',
      legalAidDesc:
        'Government-funded legal assistance for vulnerable individuals, hit-and-run claims, and court representation.',
      statuteLimitation: 'Usually 3 years for personal injury; strict initial claim notification within 28 days to 3 months.',
    },
    General: {
      tribunal: 'Competent Regional Civil Court or Traffic Tribunal',
      tribunalDesc:
        'Formal judicial bodies designated under national road traffic laws to apportion liability and adjudicate compensation damages.',
      ombudsman: 'National Insurance Supervisory Authority',
      ombudsmanDesc:
        'Government financial regulator receiving grievances for unfair claims settlement practices.',
      legalAid: 'National Legal Aid Directorate / Bar Association',
      legalAidDesc:
        'Pro bono legal aid networks and public defenders assisting injured drivers and vulnerable road users.',
      statuteLimitation: 'Standard international norm is 1 to 2 years from the date of incident.',
    },
  };

  const res = jurisdictionalResources[jurisdiction] || jurisdictionalResources['General'];

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <Scale className="w-3.5 h-3.5" />
              <span>Official Institutional Framework</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
              Official Legal & Government Assistance Directory
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Statutory bodies, dispute ombudsmen, and free legal aid authorities governing motor accidents in <strong>{jurisdiction}</strong>.
            </p>
          </div>

          <div className="text-xs bg-slate-100 border border-slate-200 px-3 py-2 rounded-lg text-slate-700">
            <span className="font-semibold block text-slate-900">Statutory Limitation:</span>
            <span>{res.statuteLimitation}</span>
          </div>
        </div>

        {/* 3 Pillar Institutions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tribunal */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center mb-3">
                <Building className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{res.tribunal}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{res.tribunalDesc}</p>
            </div>
            <span className="text-[11px] font-semibold text-blue-800 mt-3 block">
              Official Court / Claims Forum
            </span>
          </div>

          {/* Ombudsman */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{res.ombudsman}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{res.ombudsmanDesc}</p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-800 mt-3 block">
              Free Insurance Dispute Redressal
            </span>
          </div>

          {/* Legal Aid */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center mb-3">
                <Scale className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{res.legalAid}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{res.legalAidDesc}</p>
            </div>
            <span className="text-[11px] font-semibold text-purple-800 mt-3 block">
              Free Legal Representation
            </span>
          </div>
        </div>
      </div>

      {/* When You Need a Lawyer vs When You Don't */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3>You Can Usually Handle Yourself When:</h3>
          </div>
          <ul className="text-xs text-slate-600 space-y-2 pl-4 list-disc leading-relaxed">
            <li>Collision resulted purely in vehicle metal/plastic damage with zero injuries.</li>
            <li>Both drivers exchanged complete insurance policies and driver IDs at the scene.</li>
            <li>The other driver’s insurer or your own comprehensive policy admitted coverage in writing.</li>
            <li>Damage is within typical repair limits ($1,000–$5,000 / ₹20,000–₹1,00,000).</li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2 text-red-800 font-bold text-sm mb-3">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <h3>Consult a Motor Accident Lawyer Promptly When:</h3>
          </div>
          <ul className="text-xs text-slate-600 space-y-2 pl-4 list-disc leading-relaxed">
            <li>Any passenger or driver suffered fractures, hospital admission, or head/spine trauma.</li>
            <li>The other driver fled (hit-and-run) or was driving without valid insurance/license.</li>
            <li>Fault is vigorously disputed and the insurer issued a formal denial or repudiation letter.</li>
            <li>An insurance adjuster pressured you to sign a "full and final waiver" while still in pain.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
