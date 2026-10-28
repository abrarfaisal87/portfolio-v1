import SectionHeading from "./SectionHeading";

const education = [
  {
    date: "2020 — 2024",
    degree: "Bachelor of Science in Computer Science and Engineering",
    institute: "International Islamic University of Chittagong",
  },
  {
    date: "2017 — 2019",
    degree: "Higher Secondary School Certificate",
    institute: "Feni Government College",
  },
  {
    date: "2017",
    degree: "Secondary School Certificate",
    institute: "Shaheen Academy School and College",
  },
];

export default function Education() {
  return (
    <section className="section page-width education-section" id="education" aria-labelledby="education-title">
      <SectionHeading number="03" label="EDUCATION" id="education-title">Education</SectionHeading>
      <div className="education-list">
        {education.map((item) => (
          <article key={item.degree} className="education-item" data-reveal>
            <span className="education-date">{item.date}</span>
            <div><h3>{item.degree}</h3><p>{item.institute}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
