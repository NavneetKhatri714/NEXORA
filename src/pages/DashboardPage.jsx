import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import ReadinessCard from "../components/dashboard/ReadinessCard";
import SkillGapList from "../components/dashboard/SkillGapList";
import RoadmapTimeline from "../components/dashboard/RoadmapTimeline";
import "./DashboardPage.css";

export default function DashboardPage() {
  const { user, updateUser } = useAuth();
  const [view, setView] = useState("overview");

  const roadmapProgress = useMemo(() => {
    const roadmap = user?.roadmap || [];
    const totalPhases = roadmap.reduce((acc, item) => acc + item.phases.length, 0);
    if (!totalPhases) return 0;
    const donePhases = roadmap.reduce(
      (acc, item) => acc + item.phases.filter((p) => p.done).length,
      0
    );
    return Math.round((donePhases / totalPhases) * 100);
  }, [user]);

  const handleTogglePhase = (itemId, phaseIndex) => {
    updateUser((prev) => ({
      ...prev,
      roadmap: prev.roadmap.map((item) =>
        item.id !== itemId
          ? item
          : {
              ...item,
              phases: item.phases.map((phase, i) =>
                i === phaseIndex ? { ...phase, done: !phase.done } : phase
              ),
            }
      ),
    }));
  };

  if (!user) return null;

  return (
    <div className="dashboard-layout">
      <DashboardSidebar active={view} onNavigate={setView} />

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <h1>Welcome back, {user.name?.split(" ")[0] || "Explorer"} 👋</h1>
            <p>Here's where you stand on the path to {user.targetRole || "your target role"}.</p>
          </div>
        </header>

        <section className="dashboard-section">
          <ReadinessCard
            readiness={user.readiness || 0}
            targetRole={user.targetRole || "Not set"}
            roadmapProgress={roadmapProgress}
          />
        </section>

        {(view === "overview" || view === "skills") && (
          <section className="dashboard-section">
            <SkillGapList skills={user.skills || []} />
          </section>
        )}

        {(view === "overview" || view === "roadmap") && (
          <section className="dashboard-section">
            <RoadmapTimeline roadmap={user.roadmap || []} onTogglePhase={handleTogglePhase} />
          </section>
        )}
      </main>
    </div>
  );
}
