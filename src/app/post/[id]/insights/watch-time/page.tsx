
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useInstaMockData } from '@/hooks/use-instamock-data';
import { ArrowLeft, MoreVertical, Info } from 'lucide-react';
import { EditableValue } from '@/components/editable-value';
import { Separator } from '@/components/ui/separator';
import { Slider } from "@/components/ui/slider"
import { Button } from '@/components/ui/button';
import { defaultData } from '@/lib/data';
import { Progress } from '@/components/ui/progress';


const OverviewStat = ({ label, value, onSave, labelClassName, valueClassName }: { label: string, value: string | number, onSave: (newValue: string) => void, labelClassName?: string, valueClassName?: string }) => {
    return (
        <div className="flex justify-between items-center text-sm">
            <span className={labelClassName || "text-zinc-300"}>{label}</span>
            <EditableValue 
                initialValue={typeof value === 'number' ? value.toLocaleString() : value}
                onSave={onSave}
                className={valueClassName || "font-bold"}
                inputClassName='w-24 text-right h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-sm font-bold'
            />
        </div>
    );
};

const ViewRateStat = ({ label, value, onSave, dotClassName }: { label: string, value: number, onSave: (newValue: string) => void, dotClassName: string }) => (
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


export default function WatchTimeInsightsPage() {
    const params = useParams();
    const router = useRouter();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const { data, updateData, loading } = useInstaMockData();
    const [post, setPost] = useState(data?.posts.find(p => p.id === id));
    
    // Initialize state with a fallback to defaultData if post or insights are missing
    const initialViewRate = post?.insights.watchTimeInsights?.viewRate ?? defaultData.posts.find(p=>p.id===id)?.insights.watchTimeInsights.viewRate ?? 60.3;
    const [viewRate, setViewRate] = useState(initialViewRate);

    useEffect(() => {
        if (data) {
            const foundPost = data.posts.find(p => p.id === id);
            if(foundPost) {
                setPost(foundPost);
                // Ensure watchTimeInsights exists before accessing viewRate
                const currentViewRate = foundPost.insights.watchTimeInsights?.viewRate ?? defaultData.posts.find(p=>p.id===id)?.insights.watchTimeInsights.viewRate ?? 60.3;
                setViewRate(currentViewRate);
            }
        }
    }, [data, id]);

    if (loading || !data) {
        return <div className="flex items-center justify-center h-screen bg-background text-foreground">Loading...</div>;
    }
    
    if (!post) {
        return <div className="flex items-center justify-center h-screen">Post not found</div>;
    }

    const handleSave = (field: string, newValue: string) => {
        if (!data) return;
        
        const parsedValue = parseFloat(newValue.replace(/[,%]/g, ''));
        const isNumber = !isNaN(parsedValue);

        const newPosts = data.posts.map(p => {
            if (p.id === id) {
                const newPost = JSON.parse(JSON.stringify(p)); // Deep copy for safety
                const defaultWatchTimeInsights = defaultData.posts.find(dp => dp.id === id)?.insights.watchTimeInsights ?? {
                    watchTime: '0h 0m 0s',
                    averageWatchTime: '0s',
                    viewRate: 0,
                    thisReelPercentage: 0,
                    typicalReelPercentage: 0,
                };
                
                const newWatchTimeInsights = { 
                    ...defaultWatchTimeInsights,
                    ...(newPost.insights.watchTimeInsights ?? {})
                };
                
                if (field === 'accountsReached' && isNumber) {
                    newPost.insights.accountsReached = parsedValue;
                } else if (field === 'watchTime') {
                    newWatchTimeInsights.watchTime = newValue;
                } else if (field === 'averageWatchTime') {
                    newWatchTimeInsights.averageWatchTime = newValue;
                } else if (field === 'thisReelPercentage' && isNumber) {
                    newWatchTimeInsights.thisReelPercentage = parsedValue;
                    newWatchTimeInsights.viewRate = parsedValue;
                    setViewRate(parsedValue);
                } else if (field === 'typicalReelPercentage' && isNumber) {
                    newWatchTimeInsights.typicalReelPercentage = parsedValue;
                }
                
                newPost.insights.watchTimeInsights = newWatchTimeInsights;
                return newPost;
            }
            return p;
        });

        updateData({ ...data, posts: newPosts });
    };

    const handleSliderChange = (value: number[]) => {
        const newValue = value[0];
        setViewRate(newValue);
        handleSave('thisReelPercentage', newValue.toString());
    }

    const watchTimeInsights = post.insights.watchTimeInsights ?? defaultData.posts.find(p=>p.id===id)?.insights.watchTimeInsights ?? {
        watchTime: '2h 41m 9s',
        averageWatchTime: '5s',
        viewRate: 60.3,
        thisReelPercentage: 60.3,
        typicalReelPercentage: 52.6,
    };
    
    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            <header className="flex items-center justify-between p-4 border-b border-zinc-800">
                 <div className="flex items-center gap-4">
                    <button onClick={() => router.back()}>
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="font-bold text-lg">Reel insights</h1>
                </div>
                <div className="w-6"><MoreVertical size={24} /></div>
            </header>

            <main className="flex-1 overflow-y-auto p-4">
                 <OverviewStat 
                    label="Accounts reached" 
                    value={post.insights.accountsReached} 
                    onSave={(val) => handleSave('accountsReached', val)}
                    labelClassName='text-sm'
                    valueClassName='text-sm font-normal'
                />

                <Separator className="my-6 bg-zinc-800" />
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className='flex items-center gap-2'>
                           <h2 className="font-bold text-lg">Watch time</h2>
                           <Info size={16} className="text-zinc-400" />
                        </div>
                        <EditableValue
                            initialValue={watchTimeInsights.watchTime}
                            onSave={(val) => handleSave('watchTime', val)}
                            className="font-bold text-lg"
                            inputClassName="w-32 text-right h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-lg font-bold"
                        />
                    </div>
                    <OverviewStat 
                        label="Average watch time" 
                        value={watchTimeInsights.averageWatchTime}
                        onSave={(val) => handleSave('averageWatchTime', val)}
                        labelClassName='text-sm'
                        valueClassName='text-sm'
                    />
                </div>
                
                <Separator className="my-6 bg-zinc-800" />
                
                <div className="space-y-4">
                    <h2 className="font-bold text-lg">View rate past first 3 seconds</h2>
                    <div className='flex gap-2'>
                        <Button variant="secondary" className="rounded-full bg-zinc-800 hover:bg-zinc-700 text-white">All</Button>
                        <Button variant="outline" className="rounded-full border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-white">Followers</Button>
                        <Button variant="outline" className="rounded-full border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-white">Non-followers</Button>
                    </div>

                    <div className='py-4'>
                         <Slider
                            value={[viewRate]}
                            onValueChange={handleSliderChange}
                            max={100}
                            step={0.1}
                            className="w-full"
                         />
                    </div>

                    <div className='space-y-3'>
                       <ViewRateStat 
                            label="This reel"
                            value={viewRate}
                            onSave={(val) => handleSave('thisReelPercentage', val)}
                            dotClassName='bg-fuchsia-500'
                       />
                       <ViewRateStat 
                            label="Your typical reel"
                            value={watchTimeInsights.typicalReelPercentage}
                            onSave={(val) => handleSave('typicalReelPercentage', val)}
                            dotClassName='bg-zinc-600'
                       />
                    </div>
                </div>

            </main>
        </div>
    );
}
