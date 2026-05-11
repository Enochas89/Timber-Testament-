"use client";

import { FormEvent, useState } from "react";

type GeneralContactFormProps = {
  serviceAreas: string[];
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function GeneralContactForm({ serviceAreas }: GeneralContactFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitState("submitting");
    setStatusMessage("Sending your request...");

    try {
      const response = await fetch("/api/estimate-request", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "The request could not be sent.");
      }

      form.reset();
      setSubmitState("success");
      setStatusMessage(result.message ?? "Request sent. We will review it shortly.");
    } catch (error) {
      setSubmitState("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "The request could not be sent. Please call instead.",
      );
    }
  }

  return (
    <form
      className="lead-form issue-intake-form"
      onSubmit={handleSubmit}
      data-track-form="general_estimate_request"
    >
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="form-honeypot" />
      <input type="hidden" name="urgency" value="Planning ahead" />

      <div className="field-row">
        <div>
          <label htmlFor="general-name">Full Name</label>
          <input id="general-name" name="name" autoComplete="name" required />
        </div>
        <div>
          <label htmlFor="general-phone">Phone</label>
          <input id="general-phone" name="phone" type="tel" autoComplete="tel" required />
        </div>
      </div>

      <div className="field-row">
        <div>
          <label htmlFor="general-email">Email</label>
          <input id="general-email" type="email" name="email" autoComplete="email" required />
        </div>
        <div>
          <label htmlFor="general-preferred-contact">Preferred Contact</label>
          <select id="general-preferred-contact" name="preferredContact" defaultValue="Phone call" required>
            <option>Phone call</option>
            <option>Text message</option>
            <option>Email</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="general-address">Project Address or Area</label>
        <input id="general-address" name="address" autoComplete="street-address" required />
      </div>

      <div className="field-row">
        <div>
          <label htmlFor="general-city">Project City</label>
          <select id="general-city" name="city" required>
            <option value="">Select city</option>
            {serviceAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
            <option>Other nearby area</option>
          </select>
        </div>
        <div>
          <label htmlFor="general-service">Service Needed</label>
          <input
            id="general-service"
            name="service"
            placeholder="Built-ins, trim, cabinets, repair list, carpentry, etc."
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="general-message">Project Details</label>
        <textarea
          id="general-message"
          name="message"
          rows={5}
          placeholder="Tell us what you want done, rough timeline, measurements, and anything else helpful."
          required
        />
      </div>

      <button className="btn" type="submit" disabled={submitState === "submitting"}>
        {submitState === "submitting" ? "Sending Request..." : "Submit Non-Emergency Request"}
      </button>

      {statusMessage ? (
        <p className={`form-status form-status-${submitState}`} role="status">
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
