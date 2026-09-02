"use client";

import { FormEvent, useMemo, useState } from "react";

type IssueIntakeFormProps = {
  serviceAreas: string[];
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function IssueIntakeForm({ serviceAreas }: IssueIntakeFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const fileSummary = useMemo(() => {
    if (!selectedFiles.length) {
      return "Add photos from your camera or gallery.";
    }

    return `${selectedFiles.length} photo${selectedFiles.length === 1 ? "" : "s"} selected`;
  }, [selectedFiles]);

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
      setSelectedFiles([]);
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
      data-track-form="photo_issue_intake_request"
    >
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="form-honeypot" />

      <div className="field-row">
        <div>
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" autoComplete="name" required />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required />
        </div>
      </div>

      <div className="field-row">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" autoComplete="email" required />
        </div>
        <div>
          <label htmlFor="preferredContact">Preferred Contact</label>
          <select id="preferredContact" name="preferredContact" defaultValue="Phone call" required>
            <option>Phone call</option>
            <option>Text message</option>
            <option>Email</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="address">Project Address or Nearest Cross Street</label>
        <input id="address" name="address" autoComplete="street-address" required />
      </div>

      <div className="field-row">
        <div>
          <label htmlFor="city">Project City</label>
          <select id="city" name="city" required>
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
          <label htmlFor="urgency">Urgency</label>
          <select id="urgency" name="urgency" defaultValue="This week" required>
            <option>This week</option>
            <option>Within 2 weeks</option>
            <option>Planning ahead</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="service">What needs help?</label>
        <input
          id="service"
          name="service"
          placeholder="Leak, drywall, door, window, electrical fixture, plumbing fixture, storm damage, etc."
          required
        />
      </div>

      <div>
        <label htmlFor="message">Describe the Issue</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="What happened, where is it located, how urgent is it, and what have you already tried?"
          required
        />
      </div>

      <div>
        <label htmlFor="photos">Photos of the Issue</label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => setSelectedFiles(Array.from(event.currentTarget.files ?? []))}
        />
        <p className="form-help">{fileSummary} Up to 6 photos, 12 MB total.</p>
      </div>

      <button className="btn" type="submit" disabled={submitState === "submitting"}>
        {submitState === "submitting" ? "Sending Request..." : "Submit Repair Request"}
      </button>

      {statusMessage ? (
        <p className={`form-status form-status-${submitState}`} role="status">
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
