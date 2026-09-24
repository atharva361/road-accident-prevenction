import { CollisionType, EvidenceItem, Jurisdiction } from '../types';

export interface EmergencyNumber {
  country: Jurisdiction;
  police: string;
  ambulance: string;
  emergencyUniversal: string;
  highwayPatrol: string;
  statutoryReportingWindow: string;
  keyLegislation: string;
}

export const EMERGENCY_DIRECTORIES: Record<Jurisdiction, EmergencyNumber> = {
  India: {
    country: 'India',
    police: '112 / 100',
    ambulance: '108 / 102',
    emergencyUniversal: '112',
    highwayPatrol: '1033 (NHAI Emergency)',
    statutoryReportingWindow: 'Within 24 hours (Section 134 Motor Vehicles Act)',
    keyLegislation: 'Motor Vehicles (Amendment) Act 2019, Section 134 (Duty of driver in case of accident), Section 166 (Claims Tribunal).',
  },
  'United States': {
    country: 'United States',
    police: '911',
    ambulance: '911',
    emergencyUniversal: '911',
    highwayPatrol: '*55 / *HP (State Troopers)',
    statutoryReportingWindow: 'Immediately to 10 days depending on state and damage threshold ($500–$1,000)',
    keyLegislation: 'State Motor Vehicle Codes, Comparative / Contributory Negligence Statutes, No-Fault (PIP) in 12 states.',
  },
  'United Kingdom': {
    country: 'United Kingdom',
    police: '999 (Emergency) / 101 (Non-Emergency)',
    ambulance: '999',
    emergencyUniversal: '999 / 112',
    highwayPatrol: '0300 123 5000 (National Highways)',
    statutoryReportingWindow: 'Within 24 hours at a police station if details were not exchanged (Road Traffic Act 1988 s.170)',
    keyLegislation: 'Road Traffic Act 1988 Section 170 (Duty to stop and report), Motor Insurers Bureau (MIB) for uninsured/hit-and-run.',
  },
  Canada: {
    country: 'Canada',
    police: '911',
    ambulance: '911',
    emergencyUniversal: '911',
    highwayPatrol: '*OPP (Ontario) / provincial dispatch',
    statutoryReportingWindow: 'Within 24 hours if damage exceeds $2,000 CAD or if injury occurs',
    keyLegislation: 'Provincial Highway Traffic Acts, Direct Compensation Property Damage (DCPD) rules in Ontario, Quebec, Maritimes.',
  },
  Australia: {
    country: 'Australia',
    police: '000 (Emergency) / 131 444 (Police Assistance)',
    ambulance: '000',
    emergencyUniversal: '000 / 112',
    highwayPatrol: '131 444',
    statutoryReportingWindow: 'Within 24 hours if vehicle towed, person injured, or details not exchanged',
    keyLegislation: 'Road Transport Acts by State/Territory, Compulsory Third Party (CTP) scheme for personal injury.',
  },
  General: {
    country: 'General',
    police: 'Local Emergency Number (112 or 911)',
    ambulance: 'Local Ambulance',
    emergencyUniversal: '112 / 911',
    highwayPatrol: 'Traffic Division',
    statutoryReportingWindow: 'Immediately or within 24 hours',
    keyLegislation: 'Standard International Vienna Convention on Road Traffic rules and reciprocal third-party liability.',
  },
};

export const INITIAL_EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: 'ev-1',
    category: 'Documentation',
    title: "Driver's License & ID Card",
    description: "Your valid driver's license and the other party's license front & back.",
    isCrucial: true,
    collected: false,
  },
  {
    id: 'ev-2',
    category: 'Documentation',
    title: 'Vehicle Registration Certificate (RC / Logbook)',
    description: 'Proves legal ownership and registered vehicle classification.',
    isCrucial: true,
    collected: false,
  },
  {
    id: 'ev-3',
    category: 'Documentation',
    title: 'Valid Motor Insurance Policy Certificate',
    description: 'Policy schedule showing Comprehensive vs Third-Party cover and expiration date.',
    isCrucial: true,
    collected: false,
  },
  {
    id: 'ev-4',
    category: 'Scene Photos',
    title: 'Overall Scene Wide-Angle Photos',
    description: 'Capture both vehicles before moving them, showing relative positions on the road/lanes.',
    isCrucial: true,
    collected: false,
  },
  {
    id: 'ev-5',
    category: 'Scene Photos',
    title: 'Close-Ups of All Points of Impact',
    description: 'Dent depths, scratched paint, broken lamps, punctured tires, and bumper crumple.',
    isCrucial: true,
    collected: false,
  },
  {
    id: 'ev-6',
    category: 'Scene Photos',
    title: 'Road Environment & Skid Marks',
    description: 'Braking tire marks, debris/glass dispersion, wet roads, potholes, or obscured signage.',
    isCrucial: false,
    collected: false,
  },
  {
    id: 'ev-7',
    category: 'Scene Photos',
    title: 'Traffic Signals & Speed Limit Signs',
    description: 'Shows active traffic lights, stop signs, pedestrian crossings, or yellow line markers.',
    isCrucial: false,
    collected: false,
  },
  {
    id: 'ev-8',
    category: 'Third-Party Info',
    title: 'Other Driver Contact & Insurance Details',
    description: 'Name, phone number, vehicle registration number, and their insurance company name.',
    isCrucial: true,
    collected: false,
  },
  {
    id: 'ev-9',
    category: 'Third-Party Info',
    title: 'Independent Witness Contact Details',
    description: 'Name and phone numbers of bystanders, pedestrians, or shopkeepers who saw the event.',
    isCrucial: false,
    collected: false,
  },
  {
    id: 'ev-10',
    category: 'Documentation',
    title: 'Police Station Dairy / Incident / FIR Number',
    description: 'General Diary (GD) entry or First Information Report (FIR) acknowledgment from responding officer.',
    isCrucial: true,
    collected: false,
  },
  {
    id: 'ev-11',
    category: 'Medical',
    title: 'Emergency Medical & Paramedic Evaluation Slip',
    description: 'Medical documentation of even minor neck stiffness, whiplash, cuts, or dizziness.',
    isCrucial: false,
    collected: false,
  },
  {
    id: 'ev-12',
    category: 'Documentation',
    title: 'Towing Service Receipt & Destination Slip',
    description: 'Exact authorized workshop or impound yard where vehicle was towed.',
    isCrucial: false,
    collected: false,
  },
];

export interface ScenarioPreset {
  id: string;
  title: string;
  collisionType: CollisionType;
  description: string;
  tags: string[];
}

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'rear-end',
    title: 'Rear-Ended at Traffic Signal',
    collisionType: 'Rear-End Collision',
    description: 'I was fully stopped at a red traffic signal. A vehicle approached from behind at high speed and slammed into my rear bumper. The driver claimed their brakes slipped.',
    tags: ['Clear Liability', 'High Prima Facie Defense', 'Common'],
  },
  {
    id: 't-bone',
    title: 'Intersection T-Bone / Green Light Dispute',
    collisionType: 'Intersection T-Bone',
    description: 'I had the green light entering a four-way intersection. Another car jumped the red light from my left side and struck my driver door and front wheel.',
    tags: ['Witness Crucial', 'Dashcam Priority', 'Signal Camera'],
  },
  {
    id: 'hit-and-run',
    title: 'Hit & Run / Driver Fled the Scene',
    collisionType: 'Hit and Run (Other driver fled)',
    description: 'A commercial pickup truck brushed my front fender, damaging the headlamp and bumper, and immediately sped away without stopping. I caught partial plate numbers.',
    tags: ['Police FIR Mandatory', 'CCTV Footages', 'Special MIB/Fund'],
  },
  {
    id: 'parking-scrape',
    title: 'Parking Lot Scrape / Disputed Reversing',
    collisionType: 'Parked Car Collision',
    description: 'While parked or carefully backing out of a designated shopping mall parking bay, another car was speeding across parking lanes and sideswiped my rear quarter panel.',
    tags: ['Private Property Rule', 'Mall Security Video', 'Minor Damage'],
  },
  {
    id: 'sideswipe-lane',
    title: 'Highway Lane-Change Sideswipe',
    collisionType: 'Sideswipe / Lane Change',
    description: 'I was maintaining my lane on the highway. Another vehicle merged abruptly without signaling or checking their blind spot, forcing my car against the roadside barrier.',
    tags: ['Blind Spot', 'Barrier Damage', 'Comparative Fault'],
  },
];

export const TIMELINE_PROCEDURES = [
  {
    phase: 'Immediate Scene (0 – 15 Minutes)',
    badge: 'Phase 1: Life Safety & Securing the Area',
    color: 'border-amber-500 bg-amber-50/50',
    steps: [
      {
        title: 'Check for Injuries & Turn On Hazard Warning Lights',
        detail: 'Turn off the vehicle engine immediately to prevent fire hazard. Check yourself and passengers. If anyone is in shock, bleeding, or reporting neck pain, do NOT move them unless there is an imminent fire danger.',
      },
      {
        title: 'Place Warning Triangle 30-50 Meters Behind Vehicle',
        detail: 'On highways or fast roads, step behind safety barriers. Do not stand directly between two damaged cars or on the active traffic lane.',
      },
      {
        title: 'Call Emergency Services (112 / 911 / 100)',
        detail: 'Report exact location, number of injured, vehicle types, and whether road traffic is blocked. Provide nearby landmarks.',
      },
    ],
  },
  {
    phase: 'Statutory Exchange (15 – 45 Minutes)',
    badge: 'Phase 2: Evidence & Legal Exchange',
    color: 'border-blue-500 bg-blue-50/50',
    steps: [
      {
        title: 'Statutory Information Exchange (Do Not Argue Fault)',
        detail: 'Exchange full names, phone numbers, vehicle registration numbers, and insurance policy details. Do NOT engage in aggressive arguments or assign blame on the road.',
      },
      {
        title: 'Strict Warning: Never Apologize or Sign Waivers',
        detail: 'Phrases like "I am so sorry, I didn\'t see you" or "Let us settle this cash without police" can be admitted as legal concessions of fault. Keep statements 100% factual.',
      },
      {
        title: 'Comprehensive 360° Photographic Recording',
        detail: 'Photograph tire skid marks, debris position, traffic lights, weather conditions, and relative positions of all vehicles before any tow truck moves them.',
      },
    ],
  },
  {
    phase: 'Official Records (Hours 1 – 24)',
    badge: 'Phase 3: Police Reporting & Insurance Intimation',
    color: 'border-purple-500 bg-purple-50/50',
    steps: [
      {
        title: 'File Police Incident Report or FIR',
        detail: 'Mandatory in injury accidents, government property damage, hit-and-run, or major collisions. Ensure you obtain the official GD (General Diary) or FIR reference number.',
      },
      {
        title: 'Formally Notify Your Insurer Within Statutory Window',
        detail: 'Most policies mandate intimation within 24 to 48 hours. Failing to report on time gives insurers legal grounds to dispute liability or delay spot surveys.',
      },
      {
        title: 'Seek Immediate Medical Examination for Hidden Trauma',
        detail: 'Whiplash, internal contusions, and concussion symptoms frequently manifest 24 hours later. An official medical record on Day 1 is crucial evidence against insurance claim denials.',
      },
    ],
  },
  {
    phase: 'Settlement & Repairs (Days 2 – 30)',
    badge: 'Phase 4: Inspection, Claims & Legal Recourse',
    color: 'border-emerald-500 bg-emerald-50/50',
    steps: [
      {
        title: 'Deputation of Insurance Surveyor (Spot Survey)',
        detail: 'Do NOT dismantle or start repairing the vehicle until the appointed licensed surveyor inspects the car and approves the initial estimate.',
      },
      {
        title: 'Select Cashless Network Garage vs Reimbursement',
        detail: 'Authorized network garages settle directly with insurer minus mandatory deductibles, saving out-of-pocket cash outlay and dispute hassles.',
      },
      {
        title: 'Evaluate Motor Accident Claims Tribunal (MACT) / Legal Aid',
        detail: 'If permanent disability, third-party fatalities, or bad-faith claim denials arise, consult a specialized motor accident legal practitioner immediately.',
      },
    ],
  },
];
