
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface FrontendProjectLinkFieldProps {
  value: string;
  onChange: (val: string) => void;
}

export default function FrontendProjectLinkField({
  value,
  onChange,
}: FrontendProjectLinkFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          id="frontend-url"
          placeholder="https://mon-projet-frontend.lovable.app"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {value && (
          <Button variant="outline" asChild>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              title="Ouvrir le frontend"
            >
              <ExternalLink size={16} className="mr-1" />
              Ouvrir
            </a>
          </Button>
        )}
      </div>
      <p className="text-xs text-slate-500">
        Lien vers le projet Lovable servant de frontend public.<br />
        Laissez vide si aucun n'est lié pour l'instant.
      </p>
    </div>
  );
}
