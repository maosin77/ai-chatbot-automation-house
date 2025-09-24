'use client';

import { Ban } from 'lucide-react';

interface ErrorDisplayProps {
  error: Error;
}

export const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  return (
    <div className="mx-4 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Ban className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <h3 className="text-sm font-medium text-red-800">
            Something went wrong
          </h3>
          <div className="mt-1 text-sm text-red-700 break-words">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </div>
        </div>
      </div>
    </div>
  );
};

