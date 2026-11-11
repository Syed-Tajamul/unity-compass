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
        description: 'Systems architecture, federal compliance advisory, and digital transformation.',
      },
      {
        name: 'Customized Support Services',
        href: '/customized-support-services',
        description: 'Tailored operational solutions aligned with agency and prime contractor missions.',
      },
    ],
  },
  { name: 'About Us', href: '/about-us' },
  {
    name: 'Resources',
    href: '/blog',
    children: [
      {
        name: 'Insights & Blog',
        href: '/blog',
        description: 'Federal contracting trends, capture strategies, and compliance best practices.',
      },
      {
        name: 'Capability Statement (PDF)',
        href: '/documents/capability-statement.pdf',
        description: 'Official corporate capabilities, NAICS codes, past performance, and contract vehicles.',
        badge: 'PDF',
      },
    ],
  },
  { name: 'Careers', href: 'javascript:void(0)' },
  { name: 'Contact Us', href: 'javascript:void(0)' },
];

export const footerLinks = {
  services: [
    { name: 'Proposal Development', href: '/proposal-development-services' },
    { name: 'Security-Cleared Recruitment', href: '/recruitment-services' },
    { name: 'Staffing Solutions', href: '/staffing' },
    { name: 'IT & Business Consulting', href: '/information-technology-and-business-consulting' },
    { name: 'Customized Support Services', href: '/customized-support-services' },
  ],
  company: [
    { name: 'About Us', href: '/about-us' },
    { name: 'Capability Statement (PDF)', href: '/documents/capability-statement.pdf' },
    { name: 'Careers & Job Board', href: 'javascript:void(0)' },
    { name: 'Insights & Blog', href: '/blog' },
    { name: 'Contact Us', href: 'javascript:void(0)' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/privacy-policy' },
  ],
};

