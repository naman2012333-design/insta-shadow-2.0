
'use client';
import { TrendingUp } from 'lucide-react';
import { useInstaMockData } from '@/hooks/use-instamock-data';
import { EditableValue } from './editable-value';

export function ProfessionalDashboard() {
  const { data, updateData, loading } = useInstaMockData();

  if (loading || !data) return null;

  const handleViewsSave = (newViews: string) => {
    updateData({ ...data, professionalDashboard: { views: newViews } });
  };

  return (
    <div className="bg-zinc-800 rounded-lg p-3 mx-4 mt-4">
      <p className="font-bold text-sm">Professional dashboard</p>
      <div className="flex items-center gap-1 text-xs text-zinc-400">
        <TrendingUp size={16} className="text-green-500" />
        <EditableValue 
            initialValue={data.professionalDashboard.views} 
            onSave={handleViewsSave}
            inputClassName='w-16 h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-xs'
        />
        <span>views in the last 30 days.</span>
      </div>
    </div>
  );
}
