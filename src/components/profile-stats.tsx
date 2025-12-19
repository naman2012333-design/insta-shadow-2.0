
'use client';
import Image from 'next/image';
import { useInstaMockData } from '@/hooks/use-instamock-data';
import { EditableValue } from './editable-value';

export function ProfileStats() {
  const { data, updateData, loading } = useInstaMockData();

  if (loading || !data) return null;

  const handleStatSave = (key: 'posts' | 'followers' | 'following', newValue: string) => {
    const numValue = parseInt(newValue.replace(/,/g, ''), 10);
    if (!isNaN(numValue)) {
      updateData({ ...data, stats: { ...data.stats, [key]: numValue } });
    }
  };

  const handleImageClick = () => {
    if (!data) return;
    const newImageUrl = prompt("Enter new image URL:", data.profilePictureUrl);
    if (newImageUrl) {
        updateData({ ...data, profilePictureUrl: newImageUrl });
    }
  }

  return (
    <div className="flex items-center justify-between px-4">
      <div className="relative cursor-pointer" onClick={handleImageClick}>
        <Image
          src={data.profilePictureUrl}
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full"
          data-ai-hint={data.profilePictureHint}
        />
         <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-background">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
        </div>
      </div>
      <div className="text-center">
        <EditableValue initialValue={data.stats.posts.toLocaleString()} onSave={(val) => handleStatSave('posts', val)} className="font-bold text-lg" inputClassName="w-16 text-center h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-lg font-bold" />
        <p className="text-sm">posts</p>
      </div>
      <div className="text-center">
        <EditableValue initialValue={data.stats.followers.toLocaleString()} onSave={(val) => handleStatSave('followers', val)} className="font-bold text-lg" inputClassName="w-20 text-center h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-lg font-bold" />
        <p className="text-sm">followers</p>
      </div>
      <div className="text-center">
        <EditableValue initialValue={data.stats.following.toLocaleString()} onSave={(val) => handleStatSave('following', val)} className="font-bold text-lg" inputClassName="w-20 text-center h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-lg font-bold" />
        <p className="text-sm">following</p>
      </div>
    </div>
  );
}
