export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  heroHeadline: string;
  leadParagraph: string;
  fullOverview: string[];
  processSteps?: {
    step: string;
    title: string;
    desc: string;
  }[];
  keyBenefits?: {
    title: string;
    desc: string;
  }[];
  capabilities?: string[];
  image: string;
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'proposal-development',
    slug: 'proposal-development-services',
    title: 'Proposal Development Services',
    shortDesc: 'Structured proposal lifecycle management from opportunity identification and capture to compliant RFP submission.',
    heroHeadline: 'Increase Your Federal Win Rates and Secure the Contracts You Deserve',
    leadParagraph: 'With Unity Compass proposal writing expertise, you can increase your win rates and secure the contracts you deserve. UC’s automated and specialized approach streamlines the creation of compliant and credible proposals for you.',
    fullOverview: [
      'Our team manages the entire Request for Proposal (RFP) process, from developing proposal pipelines and pricing strategies to submission. With 10+ years of experience in Government Business Development Capture, we help your brand stand out, develop a robust pipeline, and deliver a higher win rate.',
      'Securing government contracts can be daunting, especially for companies new to the process or those unfamiliar with the intricacies of federal procurement.',
      'From identifying the right opportunities to crafting persuasive responses, UNITY COMPASS ensures that every step of the proposal development process is handled with precision. Our expertise covers the creation of key proposal sections such as the executive summary, technical approach, project management plan, and pricing strategy. We also help with compliance requirements, ensuring that proposals meet the strict documentation and formatting standards set by various government agencies.',
    ],
    processSteps: [
      {
        step: '01',
        title: 'Opportunity Search',
        desc: 'Discover and pursue high-fit federal business opportunities that align strictly with your company’s core capabilities and growth vision.',
      },
      {
        step: '02',
        title: 'Go-No-Go Analysis',
        desc: 'Make informed, risk-adjusted bid decisions with comprehensive scoring against evaluation criteria and competitor capabilities.',
      },
      {
        step: '03',
        title: 'Proposal Development',
        desc: 'Follow a disciplined development methodology creating compliant executive summaries, technical volumes, and management plans.',
      },
      {
        step: '04',
        title: 'Proposal Response & Color Reviews',
        desc: 'Execute Pink, Red, and Gold Team reviews meeting the highest evaluation standards in federal procurement.',
      },
      {
        step: '05',
        title: 'Submission Readiness',
        desc: 'Complete final compliance cross-walks, formatting validation, and secure on-time agency portal submission.',
      },
    ],
    keyBenefits: [
      {
        title: 'Compelling & Tailored Content',
        desc: 'Craft persuasive proposals aligned with RFP requirements, showcasing your value proposition and technical expertise.',
      },
      {
        title: '100% Compliance Assurance',
        desc: 'Rigorous compliance matrix mapping against Sections L & M to ensure zero disqualifications.',
      },
      {
        title: 'Collaborative SME Engagement',
        desc: 'Seamless collaboration with your internal Subject Matter Experts to capture nuance without draining billable hours.',
      },
      {
        title: 'Measurable Win Rate Gains',
        desc: 'High-quality past performance packaging and pricing strategy that improves overall contract capture rates.',
      },
    ],
    capabilities: [
      'Federal RFP, RFI, and RFQ Response Management',
      'GSA OASIS+ Readiness & Qualifying Project (QP) Structuring',
      'Cost Volume & Pricing Strategy Development',
      'Oral Presentation Coaching & Slide Development',
      'Past Performance Fact Sheet Architecture',
    ],
    image: '/images/ChatGPT-Image-Feb-5-2026-04_29_27-PM.png',
  },
  {
    id: 'recruitment-services',
    slug: 'recruitment-services',
    title: 'Security-Cleared Recruitment',
    shortDesc: 'End-to-end federal recruitment lifecycle for mission-critical programs requiring active clearances from Secret to Full Scope Polygraph.',
    heroHeadline: 'Your Strategic Partner in Federal Cleared & Non-Cleared Talent Acquisition',
    leadParagraph: 'Unity Compass provides end-to-end federal recruitment services focused on permanent and long-term hiring for government programs requiring cleared and clearance-eligible professionals. We manage the complete recruitment lifecycle from clearance-aware sourcing and vetting to interviews, selection, and onboarding.',
    fullOverview: [
      'Our recruiters understand federal hiring requirements, labor categories, and contract mandates. We source both active and passive cleared candidates through trusted networks, targeted outreach, and federal-focused recruiting channels to ensure access to highly qualified talent.',
      'We support prime contractors and subcontractors supporting DoD, DHS, Intelligence Community (IC), and civilian federal agencies.',
      'Our clearance verification procedures confirm active JPAS/DISS status and CI or Full Scope Polygraph validation prior to client introduction, eliminating credential delays.',
    ],
    processSteps: [
      {
        step: '01',
        title: 'Clearance-Aware Sourcing',
        desc: 'Targeted outreach through specialized defense networks to identify active clearance holders.',
      },
      {
        step: '02',
        title: 'Labor Category Alignment',
        desc: 'Scrutiny of years of experience, degree requirements, and DoD 8570/8140 baseline certifications.',
      },
      {
        step: '03',
        title: 'Verification & Vetting',
        desc: 'Pre-screening of eligibility, clearance status (JPAS/DISS), and salary expectations.',
      },
      {
        step: '04',
        title: 'Rapid Deployment',
        desc: 'Swift candidate delivery that protects program execution timelines and SLA commitments.',
      },
    ],
    keyBenefits: [
      {
        title: 'Public Trust through Full Scope Poly',
        desc: 'Specialized pipeline across Secret, Top Secret, TS/SCI with CI Polygraph, Full Scope Polygraph, and DOE Q & L clearances.',
      },
      {
        title: 'Cost Savings up to 70%',
        desc: 'Enabling SMBs and prime contractors to scale cleared headcounts efficiently without bloated internal recruitment overhead.',
      },
      {
        title: 'Compliance with Contract Standards',
        desc: 'Rigorous alignment with federal labor categories, FAR clauses, and security mandates.',
      },
      {
        title: 'CONUS & OCONUS Deployment',
        desc: 'Proven capability staffing specialized technical and operational roles domestically and abroad.',
      },
    ],
    capabilities: [
      'Clearances: Public Trust, Secret, Top Secret, TS/SCI, CI & Full Scope Polygraph, DOE Q/L',
      'Disciplines: Federal IT, Cloud Architecture, Cyber Defense, C4ISR, Systems Engineering',
      'Contract SOW & Labor Category Mapping',
      'Subcontractor Clearance Sponsorship Navigation',
    ],
    image: '/images/ChatGPT-Image-Feb-6-2026-03_13_58-PM.png',
  },
  {
    id: 'staffing',
    slug: 'staffing',
    title: 'Staffing Solutions',
    shortDesc: 'Agile workforce deployment models including contract, long-term, and temp-to-hire staffing for federal contractors and commercial enterprises.',
    heroHeadline: 'Flexible, High-Performance Staffing Models Tailored to Program Needs',
    leadParagraph: 'Find top-tier staffing solutions for federal and commercial contractors. Unity Compass delivers reliable talent across contract, temp-to-hire, and long-term staffing engagements designed to scale seamlessly with contract awards.',
    fullOverview: [
      'In federal contracting, workforce needs fluctuate based on contract phase, surge requirements, and unexpected program changes. Unity Compass provides elastic staffing models that reduce overhead while ensuring project continuity.',
      'Our proactive staffing approach helps organizations prepare for new office setups, backfills, key personnel retirements, and immediate surge demands.',
      'We take care of credential checks, compliance vetting, and onboarding logistics so our clients can focus on mission delivery.',
    ],
    processSteps: [
      {
        step: '01',
        title: 'Contract / Short-Term Staffing',
        desc: 'Rapid deployment of specialists to handle surge requirements, tight proposal deadlines, or temporary contract modifications.',
      },
      {
        step: '02',
        title: 'Long-Term Program Staffing',
        desc: 'Proactive workforce planning aligned with multi-year contract vehicles, facility setups, and core personnel backfills.',
      },
      {
        step: '03',
        title: 'Temp-to-Hire Flexibility',
        desc: 'A trial-based model allowing contractors to evaluate technical performance and cultural alignment before permanent transition.',
      },
    ],
    keyBenefits: [
      {
        title: 'Rapid Resource Deployment',
        desc: 'Shorten time-to-fill for critical program roles by drawing on pre-vetted candidate pools.',
      },
      {
        title: 'Mitigated Hiring Risk',
        desc: 'Temp-to-hire structures allow comprehensive evaluation before permanent FTE commitment.',
      },
      {
        title: 'Scalable Surge Capacity',
        desc: 'Effortlessly scale teams up or down in sync with government task order lifecycles.',
      },
      {
        title: 'Seamless Onboarding',
        desc: 'End-to-end coordination of security paperwork, NDAs, and day-one readiness.',
      },
    ],
    capabilities: [
      'Surge Workforce Management for Government Task Orders',
      'Temp-to-Perm Conversion Pathways',
      'Commercial & Federal Technical Staffing',
      'Labor Rate & GSA Schedule Wage Compliance (SCA / Davis-Bacon)',
    ],
    image: '/images/Untitled-design-8.png',
  },
  {
    id: 'information-technology-and-business-consulting',
    slug: 'information-technology-and-business-consulting',
    title: 'Information Technology and Business Consulting',
    shortDesc: 'Strategic advisory, systems modernization, cybersecurity readiness, and federal compliance support for modern enterprises.',
    heroHeadline: 'Innovative IT and Business Consulting Solutions for High-Growth Organizations',
    leadParagraph: 'At Unity Compass (UC), we specialize in delivering cutting-edge Information Technology and Business Consulting services designed to empower organizations and drive success. With a commitment to innovation and excellence, we provide tailored solutions that address the unique challenges and goals of each client.',
    fullOverview: [
      'Our consulting practice focuses on delivering tailored, compliance-driven solutions to help commercial businesses and federal contractors navigate complex technological and operational environments.',
      'From IT modernization and cloud architecture to OASIS+ readiness and compliance audits, we ensure your technical infrastructure and business systems withstand rigorous federal scrutiny.',
      'We combine strategic business guidance with hands-on technical acumen, bridging the gap between executive vision and operational execution.',
    ],
    processSteps: [
      {
        step: '01',
        title: 'Systems & Infrastructure Assessment',
        desc: 'Deep-dive analysis of current IT architecture, security controls, and operational workflows.',
      },
      {
        step: '02',
        title: 'Compliance & Gap Analysis',
        desc: 'Evaluating federal readiness against NIST SP 800-171, CMMC, and GSA OASIS+ standards.',
      },
      {
        step: '03',
        title: 'Strategic Modernization Roadmap',
        desc: 'Developing phased, cost-effective execution roadmaps to modernize legacy applications and data pipelines.',
      },
      {
        step: '04',
        title: 'Performance & Audit Oversight',
        desc: 'Establishing continuous monitoring, governance frameworks, and audit-ready documentation packages.',
      },
    ],
    keyBenefits: [
      {
        title: 'Defensible Federal Readiness',
        desc: 'Structuring business processes and IT controls that satisfy federal evaluation boards and audits.',
      },
      {
        title: 'Operational Efficiency Gains',
        desc: 'Documented improvements of up to 40% in operational throughput through streamlined systems.',
      },
      {
        title: 'Cybersecurity & CMMC Alignment',
        desc: 'Guiding defense contractors toward compliance with CMMC 2.0 and DFARS 252.204-7012 mandates.',
      },
      {
        title: 'Executive Advisory Support',
        desc: 'Trusted counsel for growth-stage contractors competing against established market leaders.',
      },
    ],
    capabilities: [
      'GSA OASIS+ Readiness & Domain Scoring Validation',
      'IT Infrastructure Optimization & Cloud Strategy',
      'Cybersecurity Readiness & NIST 800-171 Compliance',
      'Process Re-engineering & Program Governance',
    ],
    image: '/images/ChatGPT-Image-Feb-5-2026-04_41_43-PM.png',
  },
  {
    id: 'customized-support-services',
    slug: 'customized-support-services',
    title: 'Customized Support Services',
    shortDesc: 'Bespoke operational, technical, and capture support engineered to address non-standard challenges for commercial and federal clients.',
    heroHeadline: 'Personalized Operational and Technical Support Tailored to Your Specific Objectives',
    leadParagraph: 'At Unity Compass (UC), we believe that every business is unique, and so are its challenges. That’s why we offer Customized Service Support designed to align with your specific goals and operational requirements. Our personalized approach ensures that we deliver solutions that fit your business, enabling you to achieve success with efficiency and confidence.',
    fullOverview: [
      'We understand that off-the-shelf solutions don’t always address the complexities of your business. At UC, we work closely with you to develop strategies and processes that are uniquely tailored to your needs, helping you overcome obstacles and seize opportunities effectively.',
      'Whether you require specialized proposal support, rapid tech intervention, or custom workforce models, we tailor our engagement structure to your operational rhythm.',
      'Our multidisciplinary team adapts to your existing workflows, functioning as a seamless extension of your internal leadership team.',
    ],
    processSteps: [
      {
        step: '01',
        title: 'Consultative Discovery',
        desc: 'In-depth review of specific project bottlenecks, resource constraints, and contract obligations.',
      },
      {
        step: '02',
        title: 'Bespoke Solution Design',
        desc: 'Custom assembly of talent, advisory frameworks, and technical resources tailored to the objective.',
      },
      {
        step: '03',
        title: 'Agile Implementation',
        desc: 'Direct execution with regular milestone reviews, transparent communication, and rapid iteration.',
      },
    ],
    keyBenefits: [
      {
        title: 'Tailored Business Solutions',
        desc: 'Custom-crafted strategies built around your specific organizational structure and market goals.',
      },
      {
        title: 'Specialized IT Interventions',
        desc: 'Targeted support for system maintenance, cybersecurity, and software customization.',
      },
      {
        title: 'Integrated Assistance Model',
        desc: 'Bridging proposal development, staffing, and technology advisory under one cohesive partner.',
      },
      {
        title: 'Frictionless Scaling',
        desc: 'Flexible engagement models that adjust as your project requirements evolve.',
      },
    ],
    capabilities: [
      'Bespoke Capture & Proposal Sprints',
      'Targeted IT Maintenance & Security Architecture',
      'Specialized Program Operations Consulting',
      'Executive Strategy Sessions & Growth Roadmapping',
    ],
    image: '/images/ChatGPT-Image-Feb-10-2026-05_15_36-PM.png',
  },
];

export interface HomeService {
  number: string;
  id: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
  deliverables: string[];
  iconSvg: string;
}

export const homeServices: HomeService[] = [
  {
    number: '01',
    id: 'proposal-bid-support',
    title: 'Proposal Development & Federal Bid Support',
    description: 'Structured proposal lifecycle support including capture planning, proposal structuring, narrative development, and submission readiness.',
    href: '/proposal-development-services',
    badge: 'Core Practice',
    deliverables: [
      'Capture Planning & Pipeline Structuring',
      'Sections L & M Compliance Crosswalk',
      'Pink, Red & Gold Team Color Reviews',
      'Submission-Ready Executive Summaries',
    ],
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />`,
  },
  {
    number: '02',
    id: 'cleared-recruitment',
    title: 'Security-Cleared Recruitment',
    description: 'Recruitment services for cleared and non-cleared federal roles including verification, screening, and documentation readiness.',
    href: '/recruitment-services',
    badge: 'TS/SCI & Poly',
    deliverables: [
      'Active Secret, TS/SCI & Full Scope Polygraph',
      'JPAS / DISS Direct Clearance Validation',
      'Critical CONUS & OCONUS Deployment',
      'Fast-Track Screening & Technical Vetting',
    ],
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />`,
  },
  {
    number: '03',
    id: 'staffing-solutions',
    title: 'Staffing Solutions',
    description: 'Flexible staffing models including contract staffing, direct hire, and contract-to-hire aligned with federal program needs.',
    href: '/staffing',
    badge: 'Agile Delivery',
    deliverables: [
      'Task Order Surge Workforce Deployment',
      'Contract-to-Hire Risk Mitigation Models',
      'SCA & GSA Wage Compliance Adherence',
      'Rapid Backfill & Program Ramp-Up Support',
    ],
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />`,
  },
  {
    number: '04',
    id: 'it-program-consulting',
    title: 'IT & Program Consulting',
    description: 'Technical advisory and program governance services to support federal systems delivery and performance oversight.',
    href: '/information-technology-and-business-consulting',
    badge: 'Technical Advisory',
    deliverables: [
      'Enterprise Cloud & Architecture Strategy',
      'CMMC 2.0 & NIST SP 800-171 Readiness',
      'Program Governance & SLA Oversight',
      'Systems Modernization & Tech Roadmapping',
    ],
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />`,
  },
  {
    number: '05',
    id: 'customized-support-services',
    title: 'Customized Support Services',
    description: 'Contract documentation management, compliance preparation, and audit-ready operational processes.',
    href: '/customized-support-services',
    badge: 'Tailored Solutions',
    deliverables: [
      'Pre-Audit Documentation Verification',
      'FAR & DFARS Subcontractor Oversight',
      'CPARS & Past Performance Record Packaging',
      'Contract Lifecycle Administration & Records',
    ],
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />`,
  },
];


