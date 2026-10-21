"use client";

import type { ReactNode } from "react";
import { ButtonAction } from "@/components/ui/Button";
import { openContactTopic } from "@/lib/contactModal";

/**
 * A call to action that opens the form for one plan or service (see
 * `data/formTopics.ts`). Lets server-rendered pages — the service pages —
 * open the right questions instead of sending visitors to the general form.
 */
export function TopicButton({
  topic,
  children,
  size = "lg",
  variant = "solid",
  className,
}: {
  topic: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "outline-inverse" | "ghost";
  className?: string;
}) {
  return (
    <ButtonAction onClick={() => openContactTopic(topic)} size={size} variant={variant} arrow className={className}>
      {children}
    </ButtonAction>
  );
}
