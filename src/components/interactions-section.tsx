
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useInstaMockData } from '@/hooks/use-instamock-data';
import { Info } from 'lucide-react';
import { EditableValue } from '@/components/editable-value';
import { Separator } from '@/components/ui/separator';
import { defaultData } from '@/lib/data';

const AudienceStat = ({ label, value, onSave, dotClassName }: { label: string, value: number, onSave: (newValue: string) => void, dotClassName: string }) => (
    <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${dotClassName}`}></span>
            <span className="text-zinc-300">{label}</span>
        </div>
        <EditableValue 
            initialValue={`${value.toFixed(1)}%`}
            onSave={onSave}
            className="font-bold"
            inputClassName='w-16 text-right h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-sm font-bold'
        />
    </div>
);

const InteractionStat = ({ label, value, onSave }: { label: string, value: number, onSave: (newValue: string) => void }) => (
    <div className="flex justify-between items-center text-sm py-2">
        <span className="text-zinc-300">{label}</span>
        <EditableValue 
            initialValue={value.toLocaleString()}
            onSave={onSave}
            className="font-bold"
            inputClassName='w-20 text-right h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-sm font-bold'
        />
    </div>
);


export function InteractionsSection() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const { data, updateData, loading } = useInstaMockData();
    
    const [post, setPost] = useState(() => data?.posts.find(p => p.id === id));
    
    const [followersPercentage, setFollowersPercentage] = useState(
      post?.insights.interactionsBreakdown?.followersPercentage ??
      defaultData.posts.find(p => p.id === id)?.insights.interactionsBreakdown.followersPercentage ?? 91.7
    );

    useEffect(() => {
        if (data) {
            const currentPost = data.posts.find(p => p.id === id);
            if (currentPost) {
                setPost(currentPost);
                setFollowersPercentage(
                    currentPost.insights.interactionsBreakdown?.followersPercentage ??
                    defaultData.posts.find(p => p.id === id)?.insights.interactionsBreakdown.followersPercentage ?? 91.7
                );
            }
        }
    }, [data, id]);

    if (loading || !data || !post) {
        return null;
    }
    
    const handleSave = (field: string, newValue: string) => {
        if (!data || !post) return;
        const parsedValue = parseFloat(newValue.replace(/[,%]/g, ''));
        if (isNaN(parsedValue)) return;

        const newPosts = data.posts.map(p => {
            if (p.id === id) {
                const newPost = JSON.parse(JSON.stringify(p)); // Deep copy
                
                const defaultInteractions = defaultData.posts.find(dp => dp.id === id)?.insights.interactionsBreakdown ?? {
                    followersPercentage: 0,
                    nonFollowersPercentage: 0,
                    likes: 0,
                    shares: 0,
                    saves: 0,
                    comments: 0
                };
                
                const newInteractionsBreakdown = {
                    ...defaultInteractions,
                    ...(newPost.insights.interactionsBreakdown ?? {})
                };
                
                let mainInteractionValueToUpdate = false;

                if (field === 'followersPercentage') {
                    const newPercent = parsedValue > 100 ? 100 : parsedValue < 0 ? 0 : parsedValue;
                    newInteractionsBreakdown.followersPercentage = newPercent;
                    newInteractionsBreakdown.nonFollowersPercentage = 100 - newPercent;
                    setFollowersPercentage(newPercent);
                } else if (field === 'nonFollowersPercentage') {
                    const newPercent = parsedValue > 100 ? 100 : parsedValue < 0 ? 0 : parsedValue;
                    newInteractionsBreakdown.nonFollowersPercentage = newPercent;
                    newInteractionsBreakdown.followersPercentage = 100 - newPercent;
                    setFollowersPercentage(100 - newPercent);
                } else {
                    (newInteractionsBreakdown as any)[field] = parsedValue;
                    mainInteractionValueToUpdate = true;
                }
                
                newPost.insights.interactionsBreakdown = newInteractionsBreakdown;
                
                // If a specific interaction was updated, update its value on the main insights object as well
                if (mainInteractionValueToUpdate && ['likes', 'shares', 'saves', 'comments'].includes(field)) {
                    (newPost.insights as any)[field] = parsedValue;
                }
                
                // Also update the main `accountsEngaged` value to reflect the sum
                newPost.insights.accountsEngaged = newInteractionsBreakdown.likes + newInteractionsBreakdown.shares + newInteractionsBreakdown.saves + newInteractionsBreakdown.comments;

                return newPost;
            }
            return p;
        });
        updateData({ ...data, posts: newPosts });
    };
    
    const handleTotalInteractionsSave = (newValue: string) => {
      if (!data || !post) return;
      const parsedValue = parseInt(newValue.replace(/,/g, ''), 10);
      if (isNaN(parsedValue)) return;
      
      const newPosts = data.posts.map(p => {
        if (p.id === id) {
            const newPost = JSON.parse(JSON.stringify(p));
            newPost.insights.accountsEngaged = parsedValue;
            return newPost;
        }
        return p;
      });
      updateData({ ...data, posts: newPosts });
    }

    const interactionsBreakdown = post.insights.interactionsBreakdown ?? defaultData.posts.find(p => p.id === id)?.insights.interactionsBreakdown ?? {
        followersPercentage: 91.7,
        nonFollowersPercentage: 8.3,
        likes: post.insights.likes,
        shares: post.insights.shares,
        saves: post.insights.saves,
        comments: post.insights.comments
    };

    const totalInteractions = post.insights.accountsEngaged;
    const nonFollowersPercentage = 100 - followersPercentage;
    const circumference = 2 * Math.PI * 45; // For a radius of 45
    const followersStrokeDashoffset = circumference - (circumference * followersPercentage) / 100;
    const nonFollowersStrokeDashoffset = circumference - (circumference * (nonFollowersPercentage)) / 100;

    const followersRotation = -90;
    const nonFollowersRotation = -90 + (followersPercentage * 3.6);


    return (
        <div className="my-6">
            <div className="flex items-center gap-2 mb-4">
                <h2 className="font-bold text-lg">Interactions</h2>
                <Info size={16} className="text-zinc-400" />
            </div>
            <div className="flex justify-center my-8">
                <div className="relative w-56 h-56">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-sm text-zinc-400">Interactions</span>
                         <EditableValue
                            initialValue={totalInteractions.toLocaleString()}
                            onSave={handleTotalInteractionsSave}
                            className="text-4xl font-bold"
                            inputClassName="w-full h-auto text-center p-0 bg-transparent border-0 focus-visible:ring-0 text-4xl font-bold text-white"
                        />
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                            className="text-zinc-800"
                            strokeWidth="6.5"
                            stroke="currentColor"
                            fill="transparent"
                            r="45"
                            cx="50"
                            cy="50"
                        />
                        <circle
                            className="text-fuchsia-600"
                            strokeWidth="6.5"
                            strokeDasharray={circumference}
                            strokeDashoffset={followersStrokeDashoffset}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="45"
                            cx="50"
                            cy="50"
                            style={{ transform: `rotate(${followersRotation}deg)`, transformOrigin: "50% 50%", transition: "stroke-dashoffset 0.5s ease-out, transform 0.5s ease-out" }}
                        />
                         <circle
                            className="text-violet-600"
                            strokeWidth="6.5"
                            strokeDasharray={circumference}
                            strokeDashoffset={nonFollowersStrokeDashoffset}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="45"
                            cx="50"
                            cy="50"
                            style={{ transform: `rotate(${nonFollowersRotation}deg)`, transformOrigin: "50% 50%", transition: "stroke-dashoffset 0.5s ease-out, transform 0.5s ease-out" }}
                        />
                    </svg>
                </div>
            </div>

            <div className="my-8 space-y-3">
                <AudienceStat label="Followers" value={followersPercentage} onSave={(val) => handleSave('followersPercentage', val)} dotClassName="bg-fuchsia-600" />
                <AudienceStat label="Non-followers" value={nonFollowersPercentage} onSave={(val) => handleSave('nonFollowersPercentage', val)} dotClassName="bg-violet-600" />
            </div>
            
            <Separator className="my-6 bg-zinc-800" />

            <div className="space-y-1">
                <InteractionStat label="Likes" value={interactionsBreakdown.likes} onSave={(val) => handleSave('likes', val)} />
                <InteractionStat label="Shares" value={interactionsBreakdown.shares} onSave={(val) => handleSave('shares', val)} />
                <InteractionStat label="Saves" value={interactionsBreakdown.saves} onSave={(val) => handleSave('saves', val)} />
                <InteractionStat label="Comments" value={interactionsBreakdown.comments} onSave={(val) => handleSave('comments', val)} />
            </div>
        </div>
    );
}
