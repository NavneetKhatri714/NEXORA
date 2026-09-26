import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./DashboardSidebar.css";

const NAV = [
  { key: "overview", label: "Overview", icon: "◈" },
  { key: "skills", label: "Skill Gaps", icon: "◎" },
  { key: "roadmap", label: "Roadmap", icon: "⬡" },
];

export default function DashboardSidebar({ active, onNavigate }) {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="dash-sidebar__mobile-toggle" onClick={() => setOpen((o) => !o)}>
        {open ? "✕" : "☰"}
      </button>

      <aside className={`dash-sidebar ${open ? "is-open" : ""}`}>
        <Link to="/" className="nx-logo dash-sidebar__logo">
          <span className="nx-logo__mark">N</span>
          <span className="nx-logo__text">NEXORA</span>
        </Link>

        <nav className="dash-sidebar__nav">
          {NAV.map((item) => (
            <button
              key={item.key}
              className={active === item.key ? "is-active" : ""}
              onClick={() => {
                onNavigate(item.key);
                setOpen(false);
              }}
            >
              <span className="dash-sidebar__icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="dash-sidebar__user">
          <div className="dash-sidebar__avatar">{(user?.name || "N")[0].toUpperCase()}</div>
          <div>
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm btn-block" onClick={signOut}>
          Sign Out
        </button>
      </aside>
    </>
  );
}
