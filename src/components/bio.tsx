
'use client';
import { useInstaMockData } from '@/hooks/use-instamock-data';
import { EditableValue } from './editable-value';

export function Bio() {
  const { data, updateData, loading } = useInstaMockData();

  if (loading || !data) return null;

  const handleNameSave = (newName: string) => {
    updateData({ ...data, bio: { ...data.bio, name: newName } });
  };
  
  const handleDescriptionSave = (index: number, newDescription: string) => {
    const newDescriptions = [...data.bio.description];
    newDescriptions[index] = newDescription;
    updateData({ ...data, bio: { ...data.bio, description: newDescriptions } });
  };


  return (
    <div className="px-4 mt-4">
        <EditableValue initialValue={data.bio.name} onSave={handleNameSave} className="font-bold" />
      <div className="text-sm">
        Community
      </div>
      {data.bio.description.map((line, index) => (
        <EditableValue key={index} initialValue={line} onSave={(newValue) => handleDescriptionSave(index, newValue)} className="text-sm" />
      ))}
    </div>
  );
}
