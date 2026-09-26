import "./RoadmapTimeline.css";

export default function RoadmapTimeline({ roadmap, onTogglePhase }) {
  if (!roadmap.length) {
    return (
      <div className="glass roadmap-panel roadmap-panel--empty">
        <h3>You're already at target level 🎉</h3>
        <p>No skill gaps detected — check back after your next self-assessment.</p>
      </div>
    );
  }

  return (
    <div className="glass roadmap-panel">
      <div className="roadmap-panel__head">
        <h3>Your Personalized Roadmap</h3>
        <p>Learn → Practice → Build → Test, sequenced by the size of each skill gap.</p>
      </div>

      <div className="roadmap-list">
        {roadmap.map((item) => {
          const doneCount = item.phases.filter((p) => p.done).length;
          const complete = doneCount === item.phases.length;
          return (
            <div className={`roadmap-item ${complete ? "is-complete" : ""}`} key={item.id}>
              <div className="roadmap-item__head">
                <div>
                  <h4>{item.skill}</h4>
                  <span className="roadmap-item__gap">
                    {item.current}/5 → {item.required}/5 · gap {item.gap}
                  </span>
                </div>
                <span className="roadmap-item__progress">{doneCount}/{item.phases.length}</span>
              </div>

              <div className="roadmap-phases">
                {item.phases.map((phase, i) => (
                  <label className={`roadmap-phase ${phase.done ? "is-done" : ""}`} key={phase.phase}>
                    <input
                      type="checkbox"
                      checked={phase.done}
                      onChange={() => onTogglePhase(item.id, i)}
                    />
                    <span className="roadmap-phase__check">{phase.done ? "✓" : ""}</span>
                    <span className="roadmap-phase__body">
                      <strong>{phase.phase}</strong>
                      <span>{phase.task}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
