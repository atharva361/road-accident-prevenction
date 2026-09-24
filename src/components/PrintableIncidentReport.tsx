import React from 'react';
import { Printer, X, Download, Shield, CheckSquare, Square } from 'lucide-react';
import { IncidentFormData, EvidenceItem, Jurisdiction } from '../types';

interface PrintableIncidentReportProps {
  isOpen: boolean;
  onClose: () => void;
  incidentData: IncidentFormData;
  onUpdateIncidentData: (data: Partial<IncidentFormData>) => void;
  evidenceList: EvidenceItem[];
  jurisdiction: Jurisdiction;
}

export const PrintableIncidentReport: React.FC<PrintableIncidentReportProps> = ({
  isOpen,
  onClose,
  incidentData,
  onUpdateIncidentData,
  evidenceList,
  jurisdiction,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between no-print bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-slate-900" />
            <h3 className="font-bold text-slate-900 text-base">
              Official Motor Vehicle Incident Dossier (Print & Submission Ready)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Printable Form */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-900 printable-area text-xs">
          {/* Document Title Header */}
          <div className="border-b-2 border-slate-900 pb-3 text-center space-y-1">
            <h1 className="text-xl font-extrabold uppercase tracking-tight">
              FORMAL MOTOR VEHICLE COLLISION INCIDENT RECORD
            </h1>
            <p className="text-[11px] text-slate-600 uppercase font-medium tracking-wide">
              Prepared for Submission to Police Station, Insurance Surveyor & Legal Counsel · {jurisdiction}
            </p>
          </div>

          {/* Section 1: Claimant & Date Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border border-slate-300 p-3 rounded-lg bg-slate-50/50">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Claimant / Driver Name
              </span>
              <input
                type="text"
                value={incidentData.claimantName}
                onChange={(e) => onUpdateIncidentData({ claimantName: e.target.value })}
                placeholder="Full Legal Name"
                className="w-full text-xs font-semibold bg-transparent border-b border-slate-300 py-0.5 focus:outline-hidden"
              />
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Contact Phone
              </span>
              <input
                type="text"
                value={incidentData.contactPhone}
                onChange={(e) => onUpdateIncidentData({ contactPhone: e.target.value })}
                placeholder="Phone Number"
                className="w-full text-xs font-semibold bg-transparent border-b border-slate-300 py-0.5 focus:outline-hidden"
              />
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Date & Time of Accident
              </span>
              <div className="flex gap-1">
                <input
                  type="date"
                  value={incidentData.incidentDate}
                  onChange={(e) => onUpdateIncidentData({ incidentDate: e.target.value })}
                  className="w-1/2 text-[11px] bg-transparent border-b border-slate-300 py-0.5 focus:outline-hidden"
                />
                <input
                  type="time"
                  value={incidentData.incidentTime}
                  onChange={(e) => onUpdateIncidentData({ incidentTime: e.target.value })}
                  className="w-1/2 text-[11px] bg-transparent border-b border-slate-300 py-0.5 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Exact Location / Road
              </span>
              <input
                type="text"
                value={incidentData.incidentLocation}
                onChange={(e) => onUpdateIncidentData({ incidentLocation: e.target.value })}
                placeholder="Road name, crossing, city"
                className="w-full text-xs font-semibold bg-transparent border-b border-slate-300 py-0.5 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Section 2: Vehicles & Insurance Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* My Vehicle */}
            <div className="border border-slate-300 p-3.5 rounded-lg space-y-2">
              <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase tracking-wide text-[11px]">
                Party A (Claimant Vehicle)
              </h4>
              <div className="space-y-1.5">
                <div>
                  <span className="text-[10px] text-slate-500 block">Registration Number (Plate):</span>
                  <input
                    type="text"
                    value={incidentData.vehicleRegistration}
                    onChange={(e) => onUpdateIncidentData({ vehicleRegistration: e.target.value })}
                    placeholder="e.g., DL-01-AB-1234 or CA 7XYZ890"
                    className="w-full font-mono font-bold text-xs bg-slate-50 px-2 py-1 rounded border border-slate-200"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Insurance Carrier & Policy Number:</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={incidentData.insurerName}
                      onChange={(e) => onUpdateIncidentData({ insurerName: e.target.value })}
                      placeholder="Insurer Company"
                      className="w-1/2 text-xs bg-slate-50 px-2 py-1 rounded border border-slate-200"
                    />
                    <input
                      type="text"
                      value={incidentData.insurancePolicyNumber}
                      onChange={(e) => onUpdateIncidentData({ insurancePolicyNumber: e.target.value })}
                      placeholder="Policy No"
                      className="w-1/2 font-mono text-xs bg-slate-50 px-2 py-1 rounded border border-slate-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Other Vehicle */}
            <div className="border border-slate-300 p-3.5 rounded-lg space-y-2">
              <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase tracking-wide text-[11px]">
                Party B (Other Vehicle / Adverse Party)
              </h4>
              <div className="space-y-1.5">
                <div>
                  <span className="text-[10px] text-slate-500 block">Other Vehicle Reg & Make:</span>
                  <input
                    type="text"
                    value={incidentData.otherVehicleDetails}
                    onChange={(e) => onUpdateIncidentData({ otherVehicleDetails: e.target.value })}
                    placeholder="e.g., White Toyota Corolla (Plate: XYZ 456)"
                    className="w-full text-xs bg-slate-50 px-2 py-1 rounded border border-slate-200"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Other Driver Name & Contact:</span>
                  <input
                    type="text"
                    value={incidentData.otherDriverDetails}
                    onChange={(e) => onUpdateIncidentData({ otherDriverDetails: e.target.value })}
                    placeholder="Name, Phone, License number"
                    className="w-full text-xs bg-slate-50 px-2 py-1 rounded border border-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Police Reference */}
          <div className="border border-slate-300 p-3 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50/50">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Police Station Jurisdiction:
              </span>
              <input
                type="text"
                value={incidentData.policeStationName}
                onChange={(e) => onUpdateIncidentData({ policeStationName: e.target.value })}
                placeholder="Station name / Precinct"
                className="w-full text-xs font-semibold bg-transparent border-b border-slate-300 py-0.5"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                GD / Incident / FIR Ref Number:
              </span>
              <input
                type="text"
                value={incidentData.gdOrFirNumber}
                onChange={(e) => onUpdateIncidentData({ gdOrFirNumber: e.target.value })}
                placeholder="FIR or Diary Entry Number"
                className="w-full font-mono text-xs font-semibold bg-transparent border-b border-slate-300 py-0.5"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Injuries / Paramedics:
              </span>
              <span className="font-semibold text-slate-800">
                {incidentData.injuriesPresent
                  ? 'Yes - Medical examination recorded'
                  : 'No critical open trauma recorded at scene'}
              </span>
            </div>
          </div>

          {/* Section 4: Factual Narrative */}
          <div className="border border-slate-300 p-3.5 rounded-lg space-y-1.5">
            <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
              Objective Factual Summary (No Presumptive Liability)
            </h4>
            <textarea
              rows={3}
              value={incidentData.factualDescription}
              onChange={(e) => onUpdateIncidentData({ factualDescription: e.target.value })}
              className="w-full p-2 text-xs border border-slate-200 rounded leading-relaxed bg-white"
            />
          </div>

          {/* Section 5: Evidence Checklist State */}
          <div className="border border-slate-300 p-3.5 rounded-lg space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
              Physical & Documentary Evidence Preserved
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {evidenceList.map((item) => (
                <div key={item.id} className="flex items-center gap-1.5 text-[11px]">
                  {item.collected ? (
                    <CheckSquare className="w-3.5 h-3.5 text-slate-900" />
                  ) : (
                    <Square className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span className={item.collected ? 'font-semibold text-slate-900' : 'text-slate-500'}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Signatures Footer */}
          <div className="pt-6 grid grid-cols-2 gap-8 border-t border-slate-300 mt-6">
            <div className="text-center space-y-6">
              <div className="border-b border-slate-400 h-10 w-4/5 mx-auto" />
              <span className="text-[11px] font-semibold text-slate-700 block">
                Signature of Vehicle Operator / Claimant
              </span>
            </div>
            <div className="text-center space-y-6">
              <div className="border-b border-slate-400 h-10 w-4/5 mx-auto" />
              <span className="text-[11px] font-semibold text-slate-700 block">
                Signature of Responding Police Officer / Surveyor
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
