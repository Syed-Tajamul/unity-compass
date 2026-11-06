export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Temp-to-Hire';
  clearanceLevel: 'None' | 'Public Trust' | 'Secret' | 'Top Secret / SCI' | 'TS/SCI with Polygraph';
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
}

export const jobPositions: JobPosition[] = [
  {
    id: 'uc-job-101',
    title: 'Senior Cleared Cloud Architect',
    department: 'Federal IT & Cloud Engineering',
    location: 'Reston, VA / Washington, DC',
    workplaceType: 'Hybrid',
    employmentType: 'Full-Time',
    clearanceLevel: 'TS/SCI with Polygraph',
    description: 'Lead secure cloud migrations and infrastructure architecture for national defense and intelligence community programs.',
    requirements: [
      'Active TS/SCI with CI or Full Scope Polygraph',
      '8+ years cloud engineering experience with AWS GovCloud or Azure Government',
      'DoD 8570/8140 IAM Level II or III certification (CISSP, CCSP, or CISM)',
      'Experience with Infrastructure as Code (Terraform, Ansible)',
    ],
    responsibilities: [
      'Design multi-tenant cloud solutions compliant with FedRAMP High and DoD IL5/IL6',
      'Collaborate with agency security officers on ATO (Authority to Operate) documentation',
      'Mentor engineering teams in zero-trust architecture principles',
    ],
    postedDate: 'February 2026',
  },
  {
    id: 'uc-job-102',
    title: 'Federal Capture & Proposal Manager',
    department: 'Proposal Development & Capture',
    location: 'Frederick, MD / Washington, DC',
    workplaceType: 'Hybrid',
    employmentType: 'Full-Time',
    clearanceLevel: 'Public Trust',
    description: 'Drive end-to-end capture and compliant proposal execution across DoD, Civilian, and GSA OASIS+ solicitations.',
    requirements: [
      '5+ years federal proposal management experience with documented $20M+ win record',
      'Deep mastery of FAR, DFARS, Section L & M evaluation criteria, and Shipley methodology',
      'Bachelor’s degree in English, Journalism, Business, or technical discipline',
      'APMP certification preferred',
    ],
    responsibilities: [
      'Lead Color Team reviews (Pink, Red, Gold Team) ensuring strict compliance matrices',
      'Manage proposal schedules, outline architectures, and coordinate with technical SMEs',
      'Author compelling executive summaries and management volume narratives',
    ],
    postedDate: 'February 2026',
  },
  {
    id: 'uc-job-103',
    title: 'Cybersecurity Analyst / NIST 800-171 Assessor',
    department: 'Cybersecurity & Compliance',
    location: 'Remote, USA',
    workplaceType: 'Remote',
    employmentType: 'Contract',
    clearanceLevel: 'Secret',
    description: 'Perform CMMC 2.0 readiness assessments, NIST SP 800-171 gap analyses, and POA&M management for defense primes and subcontractors.',
    requirements: [
      'Active Secret security clearance',
      '4+ years cybersecurity compliance experience in defense industrial base',
      'Certified CMMC Professional (CCP) or Certified Information Systems Auditor (CISA)',
      'Hands-on experience assessing SPRS scores and drafting System Security Plans (SSP)',
    ],
    responsibilities: [
      'Conduct rigorous NIST 800-171 gap assessments across IT and cloud infrastructure',
      'Draft actionable remediation roadmaps and Plan of Action & Milestones (POA&M)',
      'Conduct mock audits and incident response drills for client organizations',
    ],
    postedDate: 'January 2026',
  },
  {
    id: 'uc-job-104',
    title: 'Technical Recruiter - Cleared Defense Programs',
    department: 'Talent Acquisition & Staffing',
    location: 'Frederick, MD / Remote',
    workplaceType: 'Remote',
    employmentType: 'Full-Time',
    clearanceLevel: 'Public Trust',
    description: 'Source, screen, and deploy high-caliber cleared software engineers, data scientists, and cyber operators for mission-critical client contracts.',
    requirements: [
      '3+ years full lifecycle recruiting for federal defense/intel contractors',
      'Thorough understanding of security clearance levels (Secret, Top Secret, TS/SCI, Polygraph) and DISS/JPAS protocols',
      'Proven ability to build candidate pipelines through specialized GovCon networks',
    ],
    responsibilities: [
      'Partner with hiring managers to define labor category requirements and SOW parameters',
      'Execute clearance pre-screening and salary benchmarking',
      'Manage candidate pipeline from initial outreach to contract onboarding',
    ],
    postedDate: 'February 2026',
  },
  {
    id: 'uc-job-105',
    title: 'Defense Systems Integration Engineer',
    department: 'Engineering Consulting',
    location: 'Bethesda, MD',
    workplaceType: 'On-site',
    employmentType: 'Temp-to-Hire',
    clearanceLevel: 'Top Secret / SCI',
    description: 'Provide systems integration, testing, and lifecycle operational support for naval and aerospace defense communications systems.',
    requirements: [
      'Active Top Secret / SCI clearance',
      'B.S. in Electrical Engineering, Computer Engineering, or related technical field',
      'Experience with C4ISR systems, tactical data links, and RF communications',
    ],
    responsibilities: [
      'Integrate tactical communication subsystems and validate compliance with military specs',
      'Participate in on-site lab testing, hardware-in-the-loop (HWIL) simulation, and field trials',
      'Prepare technical documentation and engineering change proposals (ECPs)',
    ],
    postedDate: 'January 2026',
  },
  {
    id: 'uc-job-106',
    title: 'Government Pricing & Financial Analyst',
    department: 'Business Consulting & Finance',
    location: 'Frederick, MD / Hybrid',
    workplaceType: 'Hybrid',
    employmentType: 'Contract',
    clearanceLevel: 'None',
    description: 'Develop pricing models, cost narrative volumes, and indirect rate structures for competitive federal bids and GSA Schedule maintenance.',
    requirements: [
      '4+ years government contract pricing experience (CPFF, T&M, FFP contract types)',
      'Advanced Excel modeling, FAR Part 15 / CAS compliance, and DCAA audit standards',
      'Bachelor’s in Finance, Accounting, or Economics',
    ],
    responsibilities: [
      'Develop competitive basis of estimate (BOE) cost models for federal RFP responses',
      'Analyze historical labor rates and benchmark against GSA CALC and Bureau of Labor Statistics',
      'Draft defensible cost narratives and financial compliance documentation',
    ],
    postedDate: 'February 2026',
  },
];

