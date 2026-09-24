import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Camera,
  FileCheck2,
  Users,
  Compass,
  Download,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { EvidenceItem, CollisionType } from '../types';

interface EvidenceChecklistVaultProps {
  evidenceList: EvidenceItem[];
  onToggleItem: (id: string) => void;
  selectedCollisionType: CollisionType;
  onSelectCollisionType: (t: CollisionType) => void;
}

export const EvidenceChecklistVault: React.FC<EvidenceChecklistVaultProps> = ({
  evidenceList,
  onToggleItem,
  selectedCollisionType,
  onSelectCollisionType,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const collectedCount = evidenceList.filter((e) => e.collected).length;
  const totalCount = evidenceList.length;
  const progressPercent = Math.round((collectedCount / totalCount) * 100);

  const categories = ['All', 'Documentation', 'Scene Photos', 'Third-Party Info', 'Medical'];

  const filteredItems =
    activeCategoryFilter === 'All'
      ? evidenceList
      : evidenceList.filter((i) => i.category === activeCategoryFilter);

  const collisionPresumptions: Record<CollisionType, { presumption: string; crucialEvidence: string; faultTip: string }> = {
    'Rear-End Collision': {
      presumption: 'Strong presumption against the trailing vehicle for failure to maintain safe braking distance (assured clear distance doctrine).',
      crucialEvidence: 'Take photo of front bumper crumple of trailing vehicle and brake mark length on asphalt.',
      faultTip: 'Unless the lead car reversed illegally or cut in abruptly and slammed brakes without warning, the rear car is almost always 100% liable.',
    },
    'Intersection T-Bone': {
      presumption: 'Liability rests on whoever violated traffic light phase, stop sign, or right-of-way priority.',
      crucialEvidence: 'Traffic signal sequence, bystander dashcam or store surveillance facing the intersection.',
      faultTip: 'Do not rely on verbal memory—request CCTV footage from local traffic command before recordings overwrite.',
    },
    'Head-On Collision': {
      presumption: 'Assigned to the vehicle that crossed the median / center yellow line into the opposing lane.',
      crucialEvidence: 'Tire skid directions, position of debris relative to yellow line, steering angle.',
      faultTip: 'High risk of criminal vehicular negligence charges. Secure immediate legal counsel before formal police statement.',
    },
    'Sideswipe / Lane Change': {
      presumption: 'Presumption against the vehicle performing the lane-change maneuver (duty to yield before merging).',
      crucialEvidence: 'Scrape scratches along doors, indicator light status, blind-spot orientation.',
      faultTip: 'Frequently results in split comparative liability (e.g., 70/30) unless dashcam proves complete lane encroachment.',
    },
    'Hit and Run (Other driver fled)': {
      presumption: 'Fleeing driver commits statutory criminal offense. Special uninsured/untraced driver funds apply.',
      crucialEvidence: 'Partial plate characters, vehicle color/model, fragments of broken headlights or paint transfer on your car.',
      faultTip: 'Immediately file police FIR / report. Most hit-and-run compensation schemes require report within 24-48 hours.',
    },
    'Parked Car Collision': {
      presumption: 'Moving vehicle is almost universally at fault for colliding with a stationary vehicle.',
      crucialEvidence: 'Proof your car was legally parked within bay lines, security guard logs.',
      faultTip: 'If your car was legally parked, you have zero comparative fault under standard insurance rules.',
    },
    'Multi-Vehicle Pileup': {
      presumption: 'Complex cascade liability. Usually multiple trailing drivers are liable for their individual collisions.',
      crucialEvidence: 'Number of distinct impact thumps heard, damage on both ends of your car.',
      faultTip: 'Clarify whether you were pushed into the front car or stopped first before being struck.',
    },
    'Pedestrian / Cyclist Incident': {
      presumption: 'Extremely high duty of care imposed on motor vehicle drivers regarding vulnerable road users.',
      crucialEvidence: 'Point of impact relative to pedestrian crosswalk, pedestrian clothing visibility, speed.',
      faultTip: 'Immediately administer emergency medical care under Good Samaritan statutes.',
    },
  };

  const currentCollision = collisionPresumptions[selectedCollisionType];

  return (
    <div className="space-y-8">
      {/* Evidence Tracker Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Evidence Locker & Document Checklist</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
              Documents & Physical Evidence Collection Vault
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Insurance companies regularly deny or discount claims due to lack of immediate proof. Collect these items before leaving the scene.
            </p>
          </div>

          {/* Progress Tracker Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 min-w-[220px]">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
              <span>Collection Progress</span>
              <span className="font-mono text-slate-900">
                {collectedCount}/{totalCount} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  progressPercent >= 80
                    ? 'bg-emerald-500'
                    : progressPercent >= 40
                    ? 'bg-amber-500'
                    : 'bg-blue-600'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              {progressPercent >= 80
                ? 'Excellent evidence readiness for insurer & police.'
                : 'Tap items as you verify and collect them.'}
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeCategoryFilter === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Checklist Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onToggleItem(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                item.collected
                  ? 'bg-emerald-50/50 border-emerald-300'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="mt-0.5 shrink-0 text-slate-400">
                {item.collected ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4
                    className={`text-sm font-semibold ${
                      item.collected ? 'line-through text-slate-500' : 'text-slate-900'
                    }`}
                  >
                    {item.title}
                  </h4>
                  {item.isCrucial && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                      Crucial
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collision Type & Legal Presumption Analyzer */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-700">
            <Compass className="w-3.5 h-3.5" />
            <span>Collision Geometry & Presumption of Fault</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-1">
            Accident Type & Legal Liability Presumption
          </h3>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Select your specific collision geometry to see standard court doctrines and high-priority evidence points.
          </p>
        </div>

        {/* Collision Type Pill Selector */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(
            [
              'Rear-End Collision',
              'Intersection T-Bone',
              'Sideswipe / Lane Change',
              'Hit and Run (Other driver fled)',
              'Parked Car Collision',
              'Head-On Collision',
              'Multi-Vehicle Pileup',
              'Pedestrian / Cyclist Incident',
            ] as CollisionType[]
          ).map((type) => (
            <button
              key={type}
              onClick={() => onSelectCollisionType(type)}
              className={`p-2.5 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer ${
                selectedCollisionType === type
                  ? 'bg-purple-900 text-white border-purple-900 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Dynamic Presumption Card */}
        {currentCollision && (
          <div className="mt-5 bg-purple-50/50 border border-purple-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-purple-950 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-purple-700" />
              <span>Standard Legal Presumption for: {selectedCollisionType}</span>
            </div>
            <p className="text-xs md:text-sm text-purple-900 leading-relaxed">
              {currentCollision.presumption}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-purple-200/60 text-xs">
              <div>
                <strong className="text-purple-950 block mb-0.5">📸 Evidence to Secure First:</strong>
                <span className="text-purple-800">{currentCollision.crucialEvidence}</span>
              </div>
              <div>
                <strong className="text-purple-950 block mb-0.5">⚖️ Adjuster / Court Fault Tip:</strong>
                <span className="text-purple-800">{currentCollision.faultTip}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
