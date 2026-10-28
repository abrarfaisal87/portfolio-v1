import SectionHeading from "./SectionHeading";

const roles = [
  {
    title: "Partnership Coordinator",
    team: "PaymentForm.io",
    company: "Bit Code Technologies",
    period: "September 2026 — Present",
    current: true,
    description: "I help products reach the right people by building partnerships, developing outreach campaigns, and turning audience insights into practical marketing opportunities. My work includes finding relevant publications and communities, coordinating creator collaborations and product demonstrations, and securing listings that improve product visibility. I also manage social channels, develop search-focused content, and maintain relationships with publishing partners. By listening to customers and studying competitor positioning, I refine messaging, identify friction in the customer journey, and help the team make better-informed decisions about growth.",
  },
  {
    title: "Technical Support Engineer",
    team: "BitApps",
    company: "Bit Code Technologies",
    period: "May 2025 — September 2026",
    description: "I supported a global customer base by investigating software, hardware, and integration issues through written communication, live conversations, and remote assistance. I translated complex reports into clear, actionable tickets and worked with developers to track problems from the first report through to a verified fix. Alongside support, I tested features and releases, checked integrations, and shared practical feedback to improve product quality and documentation. I also helped manage support communities and customer relationships, handling upgrade conversations and payment arrangements with a focus on retention. The role connected customers, engineering, and product teams so that issues led to lasting improvements.",
  },
];

export default function Career() {
  return (
    <section className="section page-width career-section" id="career" aria-labelledby="career-title">
      <SectionHeading number="01" label="EXPERIENCE" id="career-title">Career</SectionHeading>
      <div className="career-list">
        {roles.map((role) => (
          <article className="career-entry" key={role.title} data-reveal>
            <div className="career-date">
              {role.current && <span className="current-label"><span className="status-dot" /> Current role</span>}
              <span>{role.period}</span>
            </div>
            <div className="career-entry-content">
              <h3>{role.title}</h3>
              <p className="career-employer"><span>{role.team}</span><span className="employer-divider">/</span>{role.company}</p>
              <p className="career-description">{role.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
