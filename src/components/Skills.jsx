import {
  RiCustomerService2Line, RiMegaphoneLine, RiToolsLine, RiBugLine,
  RiBookOpenLine, RiUserHeartLine, RiShakeHandsLine, RiMailSendLine,
  RiSearchLine, RiGroupLine, RiChatSmile3Line, RiLineChartLine,
  RiSettings3Line, RiChat3Line, RiCodeSSlashLine,
} from "@remixicon/react";
import {
  SiPython, SiReact, SiPostgresql, SiSupabase,
  SiTailwindcss, SiGit, SiNotion, SiJavascript, SiNodedotjs, SiWordpress,
} from "react-icons/si";
import SectionHeading from "./SectionHeading";

const groups = [
  {
    name: "Marketing & partnerships",
    icon: RiMegaphoneLine,
    description: "Building relationships and helping products reach the right people.",
    skills: [
      { name: "Partnerships", icon: RiShakeHandsLine },
      { name: "Outreach", icon: RiMailSendLine },
      { name: "Influencer marketing", icon: RiUserHeartLine },
      { name: "Community", icon: RiGroupLine },
      { name: "SEO & content", icon: RiSearchLine },
      { name: "Social media", icon: RiChatSmile3Line },
      { name: "Email prospecting", icon: RiMailSendLine },
      { name: "Competitor analysis", icon: RiLineChartLine },
    ],
  },
  {
    name: "Technical support & IT",
    icon: RiCustomerService2Line,
    description: "Solving issues, supporting customers, and keeping teams connected.",
    skills: [
      { name: "Troubleshooting", icon: RiToolsLine },
      { name: "WordPress", icon: SiWordpress },
      { name: "QA & bug triage", icon: RiBugLine },
      { name: "IT operations", icon: RiSettings3Line },
      { name: "Documentation", icon: RiBookOpenLine },
      { name: "Zoho Desk & Tawk.to", icon: RiChat3Line },
      { name: "Remote support", icon: RiCustomerService2Line },
      { name: "Notion", icon: SiNotion },
    ],
  },
  {
    name: "Development & tools",
    icon: RiCodeSSlashLine,
    description: "The technical foundation behind how I understand software.",
    skills: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "Python", icon: SiPython },
      { name: "React", icon: SiReact },
      { name: "HTML, CSS & Tailwind", icon: SiTailwindcss },
      { name: "Node.js & Express", icon: SiNodedotjs },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Supabase", icon: SiSupabase },
      { name: "Git & Postman", icon: SiGit },
    ],
  },
];

export default function Skills() {
  return (
    <section className="section page-width" id="skills" aria-labelledby="skills-title">
      <SectionHeading number="02" label="MY TOOLKIT" id="skills-title">Skills & <em>expertise.</em></SectionHeading>
      <div className="skills-groups">
        {groups.map(({ name, icon: GroupIcon, description, skills }) => (
          <article className="skill-group" key={name} data-reveal>
            <div className="skill-group-heading"><GroupIcon size={24} aria-hidden="true" /><h3>{name}</h3></div>
            <p className="skill-group-description">{description}</p>
            <ul className="skill-icon-grid">
              {skills.map(({ name: skill, icon: SkillIcon }) => (
                <li className="skill-item" key={skill}>
                  <SkillIcon className="skill-icon" size={31} aria-hidden="true" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
