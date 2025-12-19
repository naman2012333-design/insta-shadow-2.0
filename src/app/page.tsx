
'use client';

import { BottomNav } from '@/components/bottom-nav';
import { PostGrid } from '@/components/post-grid';
import { ProfileHeader } from '@/components/profile-header';
import { ProfileStats } from '@/components/profile-stats';
import { Bio } from '@/components/bio';
import { ActionButtons } from '@/components/action-buttons';
import { ProfessionalDashboard } from '@/components/professional-dashboard';

export default function InstaMockPage() {
  return (
    <div className="flex flex-col h-full">
      <ProfileHeader />
      <main className="flex-1 overflow-y-auto p-4">
        <ProfileStats />
        <Bio />
        <ProfessionalDashboard />
        <ActionButtons />
        <PostGrid />
      </main>
      <BottomNav />
    </div>
  );
}
