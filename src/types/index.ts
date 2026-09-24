export type Jurisdiction = 'India' | 'United States' | 'United Kingdom' | 'Canada' | 'Australia' | 'General';

export type CollisionType =
  | 'Rear-End Collision'
  | 'Intersection T-Bone'
  | 'Head-On Collision'
  | 'Sideswipe / Lane Change'
  | 'Hit and Run (Other driver fled)'
  | 'Parked Car Collision'
  | 'Multi-Vehicle Pileup'
  | 'Pedestrian / Cyclist Incident';

export type UrgencyLevel = 'CRITICAL' | 'HIGH' | 'STANDARD';

export interface EvidenceItem {
  id: string;
  category: 'Documentation' | 'Scene Photos' | 'Third-Party Info' | 'Medical';
  title: string;
  description: string;
  isCrucial: boolean;
  collected: boolean;
  notes?: string;
}

export interface AccidentAnalysisData {
  urgencyLevel: UrgencyLevel;
  immediateSafetyActions: string[];
  legalObligations: {
    policeReporting: string;
    faultStatementWarning: string;
    informationExchange: string;
  };
  liabilityAssessment: {
    primaFaciePresumption: string;
    likelyFaultDistribution: string;
    defensiveSteps: string;
  };
  mandatoryEvidenceList: {
    category: string;
    items: string[];
  }[];
  insuranceProcedureSteps: {
    step: number;
    title: string;
    description: string;
    timeline: string;
  }[];
  criticalPitfallsToAvoid: string[];
  officialAssistanceGuidance: string;
  executiveSummary: string;
}

export interface DamageAnalysisData {
  damageZone: string;
  severityRating: 'Minor Cosmetic' | 'Moderate Functional' | 'Severe Structural' | 'Critical / Total Loss Risk';
  visibleDamageItems: string[];
  drivabilityStatus: {
    isDrivable: boolean;
    reasoning: string;
    recommendation: string;
  };
  insuranceClaimEvidenceTips: string[];
  potentialHiddenDamages: string[];
  surveyorQuestionPreparation: string;
}

export interface NoticeDraftData {
  insuranceNotice: {
    subject: string;
    body: string;
    nextActions: string[];
  };
  policeIntimation: {
    subject: string;
    body: string;
    statutoryReminders: string[];
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface IncidentFormData {
  claimantName: string;
  contactPhone: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  vehicleRegistration: string;
  insurancePolicyNumber: string;
  insurerName: string;
  otherVehicleDetails: string;
  otherDriverDetails: string;
  otherInsuranceDetails: string;
  witnessDetails: string;
  policeStationName: string;
  gdOrFirNumber: string;
  factualDescription: string;
  collisionType: CollisionType;
  jurisdiction: Jurisdiction;
  injuriesPresent: boolean;
  injuryNotes: string;
}
