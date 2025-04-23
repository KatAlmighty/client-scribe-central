
import React from "react";
import { ExternalLink, Link as LinkIcon } from "lucide-react";

interface FrontendProjectLinkColumnProps {
  frontendProjectUrl?: string;
}

export default function FrontendProjectLinkColumn({
  frontendProjectUrl,
}: FrontendProjectLinkColumnProps) {
  if (frontendProjectUrl) {
    return (
      <a
        href={frontendProjectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-green-700 hover:underline gap-1"
        title="Ouvrir le projet frontend"
      >
        Oui
        <ExternalLink size={14} className="ml-1" />
      </a>
    );
  }
  return (
    <span className="flex items-center text-slate-400 gap-1">
      <LinkIcon size={14} />
      Non
    </span>
  );
}
