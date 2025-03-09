import React from 'react';
import { AlertCircle } from 'lucide-react';

type ImportantNoteProps = {
  attention?: string;
  className?: string;
};

export default function ImportantNote({ attention, className = '' }: ImportantNoteProps) {
  return attention ? (
    <div className={`bg-amber-50 border-b border-amber-100 ${className}`}>
      <div className="flex items-start gap-3 p-4">
        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-amber-900 mb-1">System-Specific Note</h4>
          <p className="text-sm text-amber-700 leading-relaxed">
            {attention}
          </p>
        </div>
      </div>
    </div>
  ) : null;
}