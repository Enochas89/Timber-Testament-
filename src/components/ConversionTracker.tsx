"use client";

import { useEffect } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const gaId = GA_MEASUREMENT_ID;

function trackEvent(eventName: string, params: Record<string, unknown>) {
  if (!gaId || !window.gtag) {
    return;
  }

  window.gtag("event", eventName, {
    send_to: gaId,
    ...params,
  });
}

export function ConversionTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) {
        return;
      }

      const telLink = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!telLink) {
        return;
      }

      const href = telLink.getAttribute("href") ?? "";
      const phoneNumber = href.replace(/^tel:/, "");

      trackEvent("click_to_call", {
        phone_number: phoneNumber,
        link_text: telLink.textContent?.trim() ?? "",
        page_location: window.location.href,
      });
    };

    const onSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null;
      if (!form) {
        return;
      }

      const formName = form.getAttribute("data-track-form") ?? form.getAttribute("name") ?? "form";

      trackEvent("form_submit", {
        form_name: formName,
        form_destination: form.action ?? "",
        page_location: window.location.href,
      });
    };

    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
    };
  }, []);

  return null;
}
