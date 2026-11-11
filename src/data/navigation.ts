export interface NavItem {
  name: string;
  href: string;
  description?: string;
  badge?: string;
  children?: NavItem[];
}

export const navigationLinks: NavItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'About Us',
    href: 'javascript:void(0)',
    children: [
      {
        name: 'About Unity Compass',
        href: 'javascript:void(0)',
        description: 'Our mission, federal contracting standards, leadership, and operational methodology.',
      },
      {
        name: 'Capability Statement (PDF)',
        href: '/documents/capability-statement.pdf',
        description: 'Official corporate capabilities, NAICS codes, past performance, and contract vehicles.',
        badge: 'PDF',
      },
    ],
  },
  {
    name: 'Services',
    href: '/proposal-development-services',
    children: [
      {
        name: 'Proposal Development Services',
        href: '/proposal-development-services',
        description: 'End-to-end RFP capture, compliance matrices, pricing strategies, and proposal development.',
        badge: 'Core Practice',
      },
      {
        name: 'Security-Cleared Recruitment',
        href: '/recruitment-services',
        description: 'Permanent & long-term talent acquisition for Secret, Top Secret, and Polygraph clearances.',
        badge: 'TS/SCI & Poly',
      },
      {
        name: 'Staffing Solutions',
        href: '/staffing',
        description: 'Flexible contract, long-term, and temp-to-hire staffing for federal and defense programs.',
      },
      {
        name: 'IT & Business Consulting',
        href: '/information-technology-and-business-consulting',
        description: 'Systems architecture, federal compliance advisory, and OASIS+ readiness support.',
      },
      {
        name: 'Customized Support Services',
        href: '/customized-support-services',
        description: 'Tailored operational solutions aligned with agency and prime contractor missions.',
      },
    ],
  },
  { name: 'Careers', href: 'javascript:void(0)' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: 'javascript:void(0)' },
];

export const footerLinks = {
  services: [
    { name: 'Proposal development', href: '/proposal-development-services' },
    { name: 'Security-cleared recruitment', href: '/recruitment-services' },
    { name: 'Staffing solutions', href: '/staffing' },
    { name: 'IT and business consulting', href: '/information-technology-and-business-consulting' },
    { name: 'Customized support services', href: '/customized-support-services' },
  ],
  company: [
    { name: 'About us', href: '/about-us' },
    { name: 'Capability statement (PDF)', href: '/documents/capability-statement.pdf' },
    { name: 'Careers and job board', href: 'javascript:void(0)' },
    { name: 'Insights and blog', href: '/blog' },
    { name: 'Contact us', href: 'javascript:void(0)' },
    { name: 'Privacy policy', href: '/privacy-policy' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/privacy-policy' },
  ],
};

