import React from 'react';

type AdditionalInfoProps = {
  info?: string;
};

export default function AdditionalInfo({ info }: AdditionalInfoProps) {
  if (!info) return null;

  return (
    <div className="text-sm text-gray-500 pt-2">
      <p>{info}</p>
    </div>
  );
}