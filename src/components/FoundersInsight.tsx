import { ReactNode } from "react";

type FoundersInsightProps = {
  title: string;
  paragraph: string;
  children?: ReactNode;
};

export function FoundersInsight({
  title,
  paragraph,
  children,
}: FoundersInsightProps) {
  return (
    <section className="founders-insight">
      <h2>{title}</h2>
      <blockquote>
        <p>{paragraph}</p>
        {children ? <p>{children}</p> : null}
        <cite>Founder, Timber &amp; Testament - 14 years of residential carpentry</cite>
      </blockquote>
    </section>
  );
}
