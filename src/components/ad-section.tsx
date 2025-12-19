
'use client';

import { TrendingUp, ChevronRight } from 'lucide-react';
import { Separator } from './ui/separator';

export function AdSection() {
    return (
        <>
            <Separator className="my-6 bg-zinc-800" />
            <div className="my-6">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="font-bold text-lg">Ad</h2>
                </div>
                
                <div className="flex justify-between items-center text-sm py-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={20} />
                        <span className="font-bold">Boost this Reel</span>
                    </div>
                    <ChevronRight size={20} className="text-zinc-500" />
                </div>
            </div>
        </>
    );
}
