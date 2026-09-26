import "./ProfileStep.css";

const SOURCES = [
  {
    key: "resume",
    title: "Upload Resume",
    description: "PDF or DOCX — we'll extract your skills and experience.",
    action: "Upload File",
    analyzedLabel: "Resume analyzed",
  },
  {
    key: "linkedin",
    title: "Connect LinkedIn",
    description: "Pull your work history, endorsements and skills.",
    action: "Connect",
    analyzedLabel: "LinkedIn analyzed",
  },
  {
    key: "github",
    title: "Connect GitHub",
    description: "Analyze languages, repos and contribution activity.",
    action: "Connect",
    analyzedLabel: "GitHub analyzed",
  },
];

export default function ProfileStep({ profile, onConnect }) {
  const connectedCount = Object.values(profile).filter(Boolean).length;

  return (
    <div>
      <div className="profile-grid">
        {SOURCES.map((source) => {
          const status = profile[source.key]; // false | "connecting" | true
          return (
            <div className={`glass profile-card ${status === true ? "is-done" : ""}`} key={source.key}>
              <h4>{source.title}</h4>
              <p>{source.description}</p>
              <button
                type="button"
                className={`btn btn-sm ${status === true ? "btn-ghost" : "btn-primary"} profile-card__btn`}
                disabled={status === "connecting" || status === true}
                onClick={() => onConnect(source.key)}
              >
                {status === "connecting" && "Analyzing…"}
                {status === true && "✓ Connected"}
                {!status && source.action}
              </button>
            </div>
          );
        })}
      </div>

      <div className="profile-status">
        <span className="profile-status__count">{connectedCount}/3 sources connected</span>
        <ul>
          {SOURCES.filter((s) => profile[s.key] === true).map((s) => (
            <li key={s.key}>✓ {s.analyzedLabel}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
