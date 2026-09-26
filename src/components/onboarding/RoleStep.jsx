import { useMemo, useState } from "react";
import { ROLES } from "../../data/mockData";
import "./RoleStep.css";

export default function RoleStep({ selectedRoleId, customRole, onSelectRole, onCustomRole }) {
  const [query, setQuery] = useState("");
  const [showCustom, setShowCustom] = useState(Boolean(customRole));

  const filtered = useMemo(() => {
    if (!query.trim()) return ROLES;
    return ROLES.filter((r) => r.name.toLowerCase().includes(query.trim().toLowerCase()));
  }, [query]);

  return (
    <div>
      <input
        type="text"
        className="role-search"
        placeholder="Search a role (e.g. Frontend, Data, Security)…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="role-grid">
        {filtered.map((role) => (
          <button
            key={role.id}
            type="button"
            className={`role-card ${selectedRoleId === role.id ? "is-selected" : ""}`}
            onClick={() => {
              onSelectRole(role.id);
              setShowCustom(false);
            }}
          >
            <h4>{role.name}</h4>
            <p>{role.blurb}</p>
          </button>
        ))}
      </div>

      <div className="role-custom">
        {!showCustom ? (
          <button type="button" className="role-custom__toggle" onClick={() => setShowCustom(true)}>
            + Enter a custom role
          </button>
        ) : (
          <label className="auth-field">
            <span>Custom target role</span>
            <input
              type="text"
              placeholder="e.g. DevOps Engineer"
              value={customRole}
              onChange={(e) => {
                onCustomRole(e.target.value);
                onSelectRole(null);
              }}
            />
          </label>
        )}
      </div>
    </div>
  );
}
