"use client";

import { ReactNode, useState } from "react";

type ServiceToggleProps = {
  children: ReactNode;
};

export function ServiceToggle({ children }: ServiceToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = "more-carpentry-services";

  return (
    <div className={`service-toggle ${isOpen ? "is-open" : ""}`}>
      <div className="service-toggle-head">
        <div className="service-toggle-copy">
          <p className="authority-label">Specialty Work</p>
          <h2>More Carpentry Services</h2>
          <p>Explore the remaining specialty woodwork and finish services.</p>
        </div>
        <button
          type="button"
          className="service-toggle-button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span>{isOpen ? "Hide services" : "View all carpentry services"}</span>
          <span className="service-toggle-icon" aria-hidden="true" />
        </button>
      </div>
      <div className="service-toggle-panel" id={contentId} aria-hidden={!isOpen}>
        <div className="service-toggle-inner">{children}</div>
      </div>
    </div>
  );
}
