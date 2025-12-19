
'use client';
import { ChevronDown, PlusSquare, Menu } from 'lucide-react';
import { EditableValue } from './editable-value';
import { useInstaMockData } from '@/hooks/use-instamock-data';

export function ProfileHeader() {
  const { data, updateData, loading } = useInstaMockData();

  if (loading || !data) return null;

  const handleUsernameSave = (newUsername: string) => {
    updateData({ ...data, username: newUsername });
  };

  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center gap-1">
        <EditableValue
          initialValue={data.username}
          onSave={handleUsernameSave}
          className="font-bold text-xl"
        />
        <ChevronDown size={20} />
        <div className="w-2 h-2 bg-red-500 rounded-full ml-1"></div>
      </div>
      <div className="flex items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-at-sign"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>
        <PlusSquare size={24} />
        <Menu size={24} />
      </div>
    </header>
  );
}
