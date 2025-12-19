
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useInstaMockData } from '@/hooks/use-instamock-data';
import { ArrowLeft, Info, MoreVertical } from 'lucide-react';
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


export default function InteractionsPage() {
    const params = useParams();
    const router = useRouter();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const { data, updateData, loading } = useInstaMockData();
    const [post, setPost] = useState(data?.posts.find(p => p.id === id));

    useEffect(() => {
        if (data) {
            setPost(data.posts.find(p => p.id === id));
        }
    }, [data, id]);

    if (loading || !data || !post) {
        return <div className="flex items-center justify-center h-screen bg-background text-foreground">Loading...</div>;
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

                if (field === 'followersPercentage') {
                    newInteractionsBreakdown.followersPercentage = parsedValue;
                    newInteractionsBreakdown.nonFollowersPercentage = 100 - parsedValue;
                } else if (field === 'nonFollowersPercentage') {
                    newInteractionsBreakdown.nonFollowersPercentage = parsedValue;
                    newInteractionsBreakdown.followersPercentage = 100 - parsedValue;
                } else if (field in newPost.insights) {
                    (newPost.insights as any)[field] = parsedValue;
                } else {
                    (newInteractionsBreakdown as any)[field] = parsedValue;
                }
                
                newPost.insights.interactionsBreakdown = newInteractionsBreakdown;
                
                // Also update the main insight values
                if (['likes', 'shares', 'saves', 'comments'].includes(field)) {
                    (newPost.insights as any)[field] = parsedValue;
                }

                return newPost;
            }
            return p;
        });
        updateData({ ...data, posts: newPosts });
    };

    const interactionsBreakdown = post.insights.interactionsBreakdown ?? defaultData.posts.find(p => p.id === id)?.insights.interactionsBreakdown ?? {
        followersPercentage: 91.7,
        nonFollowersPercentage: 8.3,
        likes: post.insights.likes,
        shares: post.insights.shares,
        saves: post.insights.saves,
        comments: post.insights.comments
    };

    const totalInteractions = post.insights.accountsEngaged;

    const circumference = 2 * Math.PI * 45; // r=45
    const followersStrokeDashoffset = circumference - (circumference * interactionsBreakdown.followersPercentage) / 100;
    const nonFollowersStrokeDashoffset = circumference - (circumference * (100-interactionsBreakdown.followersPercentage)) / 100;

    const followersRotation = -90;
    const nonFollowersRotation = -90 + (interactionsBreakdown.followersPercentage * 3.6);


    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            <header className="flex items-center justify-between p-4 border-b border-zinc-800">
                 <div className="flex items-center gap-4">
                    <button onClick={() => router.back()}>
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="font-bold text-lg">Interactions</h1>
                </div>
                <div className="w-6"><MoreVertical size={24} /></div>
            </header>

            <main className="flex-1 overflow-y-auto p-4">
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
                                onSave={(val) => {
                                    if (!data) return;
                                    const parsedVal = parseInt(val.replace(/,/g, ''));
                                    if(isNaN(parsedVal)) return;

                                    const newPosts = data.posts.map(p => p.id === id ? {...p, insights: {...p.insights, accountsEngaged: parsedVal}} : p);
                                    updateData({...data, posts: newPosts});
                                }}
                                className="text-4xl font-bold"
                                inputClassName="w-full h-auto text-center p-0 bg-transparent border-0 focus-visible:ring-0 text-4xl font-bold text-white"
                            />
                        </div>
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                className="text-zinc-800"
                                strokeWidth="6"
                                stroke="currentColor"
                                fill="transparent"
                                r="45"
                                cx="50"
                                cy="50"
                            />
                            <circle
                                className="text-fuchsia-600"
                                strokeWidth="6"
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
                                strokeWidth="6"
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
                    <AudienceStat label="Followers" value={interactionsBreakdown.followersPercentage} onSave={(val) => handleSave('followersPercentage', val)} dotClassName="bg-fuchsia-600" />
                    <AudienceStat label="Non-followers" value={interactionsBreakdown.nonFollowersPercentage} onSave={(val) => handleSave('nonFollowersPercentage', val)} dotClassName="bg-violet-600" />
                </div>
                
                <Separator className="my-6 bg-zinc-800" />

                <div className="space-y-1">
                    <InteractionStat label="Likes" value={interactionsBreakdown.likes} onSave={(val) => handleSave('likes', val)} />
                    <InteractionStat label="Shares" value={interactionsBreakdown.shares} onSave={(val) => handleSave('shares', val)} />
                    <InteractionStat label="Saves" value={interactionsBreakdown.saves} onSave={(val) => handleSave('saves', val)} />
                    <InteractionStat label="Comments" value={interactionsBreakdown.comments} onSave={(val) => handleSave('comments', val)} />
                </div>

            </main>
        </div>
    );
}
