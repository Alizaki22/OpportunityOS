import React from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}

export function OpportunityCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-20 h-4" />
        </div>
        <Skeleton className="w-7 h-7 rounded-lg" />
      </div>
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-1/2 h-3" />
      <Skeleton className="w-full h-8" />
      <div className="flex gap-2">
        <Skeleton className="w-14 h-5 rounded-full" />
        <Skeleton className="w-16 h-5 rounded-full" />
        <Skeleton className="w-12 h-5 rounded-full" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="flex-1 h-9 rounded-lg" />
        <Skeleton className="w-9 h-9 rounded-lg" />
      </div>
    </div>
  );
}

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-4 rounded-xl border border-border bg-card flex flex-col items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="w-12 h-5" />
          <Skeleton className="w-10 h-3" />
        </div>
      ))}
    </div>
  );
}

export function PassportSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex gap-5">
          <Skeleton className="w-24 h-24 rounded-2xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-48 h-6" />
            <Skeleton className="w-32 h-4" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="w-20 h-6 rounded-full" />
              <Skeleton className="w-24 h-6 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4 space-y-3">
            <Skeleton className="w-full h-32 rounded-lg" />
            <Skeleton className="w-2/3 h-4" />
            <Skeleton className="w-full h-3" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChatMessageSkeleton() {
  return (
    <div className="space-y-4">
      {[false, true, false].map((isUser, i) => (
        <div key={i} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
          <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
          <Skeleton className={`h-12 rounded-xl ${isUser ? 'w-48' : 'w-64'}`} />
        </div>
      ))}
    </div>
  );
}
