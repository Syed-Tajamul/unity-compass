export interface Testimonial {
  quote: string;
  authorRole?: string;
  organizationType?: string;
  impactArea?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "We faced significant challenges finding candidates with Full Scope Polygraph clearance for our OCONUS projects. Unity Compass (UC) expertly navigated these complexities, providing qualified professionals quickly and efficiently, ensuring our project timelines were met.",
  },
  {
    quote: "Unity Compass transformed our IT infrastructure, providing cutting-edge solutions that boosted our operational efficiency by 40%. Their consulting team is knowledgeable, proactive, and dedicated to delivering measurable results. We highly recommend their services!",
    authorRole: "Chief Technology Officer",
  },
  {
    quote: "Finding the right talent used to be a challenge for us. With Unity Compass’s recruitment and staffing services, we’ve filled critical positions faster with top-tier professionals who fit perfectly into our culture. Their attention to detail and personalized approach set them apart.",
  },
  {
    quote: "Unity Compass’s Proposal Development Services have been a game-changer for our business. Their team’s expertise in crafting compelling, winning proposals has significantly increased our success rate in securing new projects. They truly understand our business and goals.",
  },
];
