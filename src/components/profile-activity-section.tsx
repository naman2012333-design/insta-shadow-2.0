
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useInstaMockData } from '@/hooks/use-instamock-data';
import { Info } from 'lucide-react';
import { EditableValue } from '@/components/editable-value';
import { defaultData } from '@/lib/data';

const ActivityStat = ({ label, value, onSave }: { label: string; value: number; onSave: (newValue: string) => void }) => (
    <div className="flex justify-between items-center text-sm py-1">
        <span className="text-zinc-300">{label}</span>
        <EditableValue 
            initialValue={value.toLocaleString()}
            onSave={onSave}
            className="font-bold"
            inputClassName='w-20 text-right h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-sm font-bold'
        />
    </div>
);

export function ProfileActivitySection() {
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

    const handleSave = (field: 'profileActivity' | 'follows', newValue: string) => {
        if (!data || !post) return;
        const parsedValue = parseInt(newValue.replace(/,/g, ''), 10);
        if (isNaN(parsedValue)) return;

        const newPosts = data.posts.map(p => {
            if (p.id === id) {
                const newPost = JSON.parse(JSON.stringify(p)); // Deep copy

                const defaultActivity = defaultData.posts.find(dp => dp.id === id)?.insights ?? { profileActivity: 0, profileActivityBreakdown: { follows: 0 } };
                
                const newActivityBreakdown = {
                    ...(defaultActivity.profileActivityBreakdown ?? { follows: 0 }),
                    ...(newPost.insights.profileActivityBreakdown ?? {})
                };
                
                if (field === 'profileActivity') {
                    newPost.insights.profileActivity = parsedValue;
                    // If follows is the only breakdown, we can assume it equals the total
                    newActivityBreakdown.follows = parsedValue;
                } else if (field === 'follows') {
                    newActivityBreakdown.follows = parsedValue;
                    // Update the total as well
                    newPost.insights.profileActivity = parsedValue;
                }
                
                newPost.insights.profileActivityBreakdown = newActivityBreakdown;
                return newPost;
            }
            return p;
        });
        updateData({ ...data, posts: newPosts });
    };

    const profileActivityBreakdown = post.insights.profileActivityBreakdown ?? { follows: post.insights.profileActivity };

    return (
        <div className="my-6">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <h2 className="font-bold text-lg">Profile activity</h2>
                    <Info size={16} className="text-zinc-400" />
                </div>
                <EditableValue
                    initialValue={post.insights.profileActivity.toLocaleString()}
                    onSave={(val) => handleSave('profileActivity', val)}
                    className="font-bold text-lg"
                    inputClassName="w-24 text-right h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-lg font-bold"
                />
            </div>
            
            <div className="space-y-1">
                <ActivityStat label="Follows" value={profileActivityBreakdown.follows} onSave={(val) => handleSave('follows', val)} />
            </div>
        </div>
    );
}
