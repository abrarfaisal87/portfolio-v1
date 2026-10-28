import PropTypes from "prop-types";
export default function SectionHeading({ number, label, children, aside, id }) {
  return (
    <div className="section-heading" data-reveal>
      <div><p className="eyebrow section-eyebrow"><span>{number}</span> / {label}</p><h2 id={id}>{children}</h2></div>
      {aside && <p className="section-aside">{aside}</p>}
    </div>
  );
}
SectionHeading.propTypes = {
  number: PropTypes.string.isRequired, label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired, aside: PropTypes.string, id: PropTypes.string,
};
