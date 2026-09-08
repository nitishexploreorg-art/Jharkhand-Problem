/**
 * Core Types for Samadhan Jharkhand (समाधान झारखंड)
 * Government of Jharkhand Societal Innovation Platform
 */

export type UserRole = 'citizen' | 'admin' | 'student' | 'csr';

export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low';

export type PlatformStage =
  | 'REPORTED'             // 1. Citizen Report Problem
  | 'AI_PROCESSED'         // 2. AI Processing (Categorization, Duplicate Check, Severity)
  | 'ADMIN_VERIFIED'       // 3. Admin Verification (District Magistrate / Department Triage)
  | 'CHALLENGE_PUBLISHED'  // 4. Verified Challenge (Listed for University & CSR)
  | 'STUDENT_ADOPTED'      // 5. Student / University Adoption
  | 'CSR_FUNDED'           // 6. Industry / CSR Grant Support
  | 'IN_DEVELOPMENT'       // 7. Milestone-Based Development
  | 'GROUND_DEPLOYED'      // 8. Ground Deployment (Field Installation / Pilot)
  | 'CITIZEN_AUDIT'        // 9. Citizen Verification & Social Audit
  | 'RESOLVED';            // 10. Officially Resolved & Documented

export interface StageDefinition {
  stepNumber: number;
  stage: PlatformStage;
  labelEn: string;
  labelHi: string;
  shortDescEn: string;
  shortDescHi: string;
  color: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MediaEvidence {
  id: string;
  url: string;
  type: 'image' | 'video' | 'audio';
  caption?: string;
  uploadedAt: string;
}

export interface AIAnalysis {
  categorySuggested: string;
  confidenceScore: number;
  duplicateDetected: boolean;
  duplicateCandidateId?: string;
  duplicateSimilarityScore?: number;
  suggestedPriority: PriorityLevel;
  urgencyReasoning: string;
  keyKeywords: string[];
  processedAt: string;
}

export interface AdminVerification {
  verifiedBy: string;
  officerDesignation: string;
  departmentAssigned: string;
  adminNotes: string;
  verifiedAt: string;
  challengeEligibility: boolean;
  estimatedBudgetInr?: number;
}

export interface Milestone {
  id: string;
  number: number;
  title: string;
  titleHi: string;
  description: string;
  status: 'pending' | 'in_progress' | 'submitted' | 'approved';
  dueDate: string;
  grantReleasePercentage: number;
  submissionProof?: string;
  submittedAt?: string;
  approvedAt?: string;
  adminReviewComment?: string;
}

export interface UniversityTeam {
  teamId: string;
  teamName: string;
  universityName: string;
  collegeName?: string;
  institutionType?: 'IIT' | 'NIT' | 'BIT' | 'State University' | 'Polytechnic' | 'Engineering College';
  department?: string;
  leadStudent?: string;
  teamLeader?: string;
  teamMembers?: string[];
  facultyMentor: string;
  projectType?: string;
  teamSize?: number;
  proposalSummary?: string;
  adoptedAt: string;
  repositoryOrDocsUrl?: string;
  facultyApprovalStatus?: 'PENDING_FACULTY_APPROVAL' | 'APPROVED' | 'REJECTED';
}

export interface CSRSponsorship {
  partnerId: string;
  corporateName: string;
  programName: string;
  fundedAmountInr: number;
  totalGrantRequiredInr: number;
  mouSignedDate: string;
  representativeName: string;
  status: 'pledged' | 'first_tranche_released' | 'fully_funded';
}

export interface GroundDeployment {
  deploymentDate: string;
  pilotLocation: string;
  beneficiariesCount: number;
  deploymentLead: string;
  proofPhotos: string[];
  operationalMetrics: string;
}

export interface SocialAudit {
  auditCompleted: boolean;
  citizenSatisfactionScore: number; // 1 to 5
  auditedByPanchayat: boolean;
  panchayatPradhanName?: string;
  citizenComments: string;
  beforePhotoUrl: string;
  afterPhotoUrl: string;
  auditDate?: string;
  certificateNumber?: string;
}

export interface Problem {
  id: string;
  trackingCode: string; // e.g. JH-RNC-2026-104
  title: string;
  titleHi: string;
  description: string;
  descriptionHi?: string;
  category: string;
  categoryHi: string;
  district: string;
  districtHi: string;
  block: string;
  villageOrWard: string;
  coordinates: Coordinates;
  citizenName: string;
  citizenPhoneMasked: string;
  reportedAt: string;
  evidence: MediaEvidence[];
  currentStage: PlatformStage;
  priority: PriorityLevel;
  votesCount: number;
  citizensAffected?: number;
  requiredSkills?: string[];
  estimatedProjectRequirement?: string;
  projectType?: string;
  expectedOutcome?: string;
  facultyApprovalStatus?: 'PENDING_FACULTY_APPROVAL' | 'APPROVED' | 'REJECTED';
  adoptionRequest?: {
    collegeName: string;
    teamName: string;
    teamLeader: string;
    teamMembers: string[];
    facultyMentor: string;
    projectType: string;
    requestedAt: string;
  };
  
  // Lifecycle modules
  aiAnalysis?: AIAnalysis;
  adminVerification?: AdminVerification;
  adoptedTeam?: UniversityTeam;
  csrSponsorship?: CSRSponsorship;
  milestones: Milestone[];
  groundDeployment?: GroundDeployment;
  socialAudit?: SocialAudit;
}

export interface CategoryInfo {
  id: string;
  nameEn: string;
  nameHi: string;
  iconName: string;
  colorClass: string;
  description: string;
}

export interface DistrictInfo {
  id: string;
  nameEn: string;
  nameHi: string;
  blocks: string[];
  headquarters: string;
  lat: number;
  lng: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  timestamp: string;
  read: boolean;
  trackingCode?: string;
}
