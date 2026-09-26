import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES, buildRoadmap, computeReadiness } from "../data/mockData";
import RoleStep from "../components/onboarding/RoleStep";
import ProfileStep from "../components/onboarding/ProfileStep";
import AssessmentStep from "../components/onboarding/AssessmentStep";
import GenerateStep from "../components/onboarding/GenerateStep";
import "../components/onboarding/OnboardingShell.css";

const STEP_LABELS = ["Target Role", "Your Profile", "Self Assessment", "Generate Roadmap"];
const DEFAULT_SKILLS = ROLES[0].skills;

export default function OnboardingPage() {
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [customRole, setCustomRole] = useState("");
  const [profile, setProfile] = useState({ resume: false, linkedin: false, github: false });
  const [skillGaps, setSkillGaps] = useState([]);

  const selectedRole = useMemo(
    () => ROLES.find((r) => r.id === selectedRoleId) || null,
    [selectedRoleId]
  );

  const roleName = selectedRole ? selectedRole.name : customRole.trim();
  const roleSkills = selectedRole ? selectedRole.skills : DEFAULT_SKILLS;

  const canGoStep1 = Boolean(selectedRoleId || customRole.trim());
  const allConnected = profile.resume && profile.linkedin && profile.github;

  const handleConnect = (key) => {
    setProfile((p) => ({ ...p, [key]: "connecting" }));
    setTimeout(() => {
      setProfile((p) => ({ ...p, [key]: true }));
    }, 900);
  };

  const handleAssessmentComplete = (answers) => {
    const gaps = roleSkills.map((skill) => ({
      name: skill.name,
      current: answers[skill.name] || 1,
      required: skill.required,
    }));
    setSkillGaps(gaps);
    setStep(4);
  };

  const handleFinish = () => {
    const roadmap = buildRoadmap(skillGaps);
    const readiness = computeReadiness(skillGaps);
    updateUser({
      targetRole: roleName,
      profile: {
        resume: Boolean(profile.resume),
        linkedin: Boolean(profile.linkedin),
        github: Boolean(profile.github),
      },
      skills: skillGaps,
      roadmap,
      readiness,
      onboardingComplete: true,
    });
    navigate("/dashboard");
  };

  return (
    <div className="onboarding">
      <div className="glow-orb onboarding__orb" />
      <div className="onboarding__inner">
        <div className="onboarding__header">
          <div className="onboarding__progress">
            {STEP_LABELS.map((label, i) => (
              <div
                key={label}
                className={`onboarding__dot ${
                  step === i + 1 ? "is-active" : step > i + 1 ? "is-done" : ""
                }`}
              />
            ))}
          </div>
          <span className="onboarding__step-label">
            Step {step} of {STEP_LABELS.length} · {STEP_LABELS[step - 1]}
          </span>
        </div>

        <div className="glass onboarding-card">
          {step === 1 && (
            <>
              <h2>Choose Your Target Role</h2>
              <p className="onboarding-card__sub">
                We'll compare your current skills against what this role actually requires.
              </p>
              <RoleStep
                selectedRoleId={selectedRoleId}
                customRole={customRole}
                onSelectRole={setSelectedRoleId}
                onCustomRole={setCustomRole}
              />
              <div className="onboarding__nav">
                <span />
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!canGoStep1}
                  onClick={() => setStep(2)}
                >
                  Continue →
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Add Your Profile</h2>
              <p className="onboarding-card__sub">
                Connect your sources so NEXORA can infer your real skill levels.
              </p>
              <ProfileStep profile={profile} onConnect={handleConnect} />
              <div className="onboarding__nav">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!allConnected}
                  onClick={() => setStep(3)}
                >
                  Continue →
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2>Self Assessment</h2>
              <p className="onboarding-card__sub">
                Rate your comfort level for the skills that matter for {roleName || "your role"}.
              </p>
              <AssessmentStep
                skills={roleSkills}
                onComplete={handleAssessmentComplete}
                onBack={() => setStep(2)}
              />
            </>
          )}

          {step === 4 && <GenerateStep onFinish={handleFinish} />}
        </div>
      </div>
    </div>
  );
}
