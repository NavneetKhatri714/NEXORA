import "./SkillGapList.css";

export default function SkillGapList({ skills }) {
  return (
    <div className="glass skill-gap-panel">
      <div className="skill-gap-panel__head">
        <h3>Skill Gap Analysis</h3>
        <p>Current level compared to what your target role requires.</p>
      </div>

      <div className="skill-gap-list">
        {skills.map((skill) => {
          const met = skill.current >= skill.required;
          return (
            <div className="skill-gap-row" key={skill.name}>
              <div className="skill-gap-row__top">
                <span className="skill-gap-row__name">{skill.name}</span>
                <span className={`skill-gap-row__badge ${met ? "is-met" : ""}`}>
                  {skill.current}/5 → {skill.required}/5
                </span>
              </div>
              <div className="skill-gap-row__track">
                <div
                  className="skill-gap-row__required"
                  style={{ width: `${(skill.required / 5) * 100}%` }}
                />
                <div
                  className="skill-gap-row__current"
                  style={{ width: `${(skill.current / 5) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
