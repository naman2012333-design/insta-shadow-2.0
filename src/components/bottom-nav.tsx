
'use client';
import { Home, Search, PlusSquare, Clapperboard } from 'lucide-react';
import Image from 'next/image';
import { useInstaMockData } from '@/hooks/use-instamock-data';


export function BottomNav() {
    const { data, loading } = useInstaMockData();
    if(loading || !data) return null;

  return (
    <div className="flex justify-around items-center p-2 bg-black border-t border-zinc-800">
      <Home size={28} />
      <Search size={28} />
      <PlusSquare size={28} />
      <Clapperboard size={28} />
      <Image src={data.profilePictureUrl} alt="Profile" width={28} height={28} className="rounded-full" />
    </div>
  );
}
