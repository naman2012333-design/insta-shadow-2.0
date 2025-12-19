
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useInstaMockData } from '@/hooks/use-instamock-data';
import { Info } from 'lucide-react';
import { EditableValue } from '@/components/editable-value';
import { defaultData } from '@/lib/data';
import { Separator } from './ui/separator';

const MonetisationStat = ({ label, value, onSave }: { label: string; value: number; onSave: (newValue: string) => void }) => {
    const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);

    return (
        <div className="flex justify-between items-center text-sm py-1">
            <span className="text-zinc-300">{label}</span>
            <EditableValue 
                initialValue={formattedValue}
                onSave={onSave}
                className="font-bold"
                inputClassName='w-24 text-right h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-sm font-bold'
            />
        </div>
    );
};

export function MonetisationSection() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const { data, updateData, loading } = useInstaMockData();
    const [post, setPost] = useState(() => data?.posts.find(p => p.id === id));

    useEffect(() => {
        if (data) {
            setPost(data.posts.find(p => p.id === id));
        }
    }, [data, id]);

    if (loading || !data || !post) {
        return null;
    }

    const handleSave = (newValue: string) => {
        if (!data || !post) return;
        const parsedValue = parseFloat(newValue.replace(/[^0-9.-]+/g,""));
        if (isNaN(parsedValue)) return;

        const newPosts = data.posts.map(p => {
            if (p.id === id) {
                const newPost = JSON.parse(JSON.stringify(p));

                const defaultMonetisation = defaultData.posts.find(dp => dp.id === id)?.insights.monetisation ?? { approximateEarnings: 0 };
                
                const newMonetisation = {
                    ...(defaultMonetisation),
                    ...(newPost.insights.monetisation ?? {})
                };
                
                newMonetisation.approximateEarnings = parsedValue;
                newPost.insights.monetisation = newMonetisation;
                
                return newPost;
            }
            return p;
        });
        updateData({ ...data, posts: newPosts });
    };

    const monetisation = post.insights.monetisation ?? defaultData.posts.find(p => p.id === id)?.insights.monetisation ?? { approximateEarnings: 0 };

    return (
        <>
            <Separator className="my-6 bg-zinc-800" />
            <div className="my-6">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="font-bold text-lg">Monetisation</h2>
                    <Info size={16} className="text-zinc-400" />
                </div>
                
                <div className="space-y-2">
                    <h3 className="font-bold text-base">Gifts</h3>
                    <MonetisationStat 
                        label="Approximate earnings" 
                        value={monetisation.approximateEarnings} 
                        onSave={handleSave} 
                    />
                </div>
            </div>
        </>
    );
}
