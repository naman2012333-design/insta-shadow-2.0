
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useInstaMockData } from '@/hooks/use-instamock-data';
import Image from 'next/image';
import { ArrowLeft, MoreVertical, Info, ChevronRight } from 'lucide-react';
import { EditableValue } from '@/components/editable-value';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { defaultData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { InteractionsSection } from '@/components/interactions-section';
import { ProfileActivitySection } from '@/components/profile-activity-section';
import { AudienceSection } from '@/components/audience-section';
import { MonetisationSection } from '@/components/monetisation-section';
import { AdSection } from '@/components/ad-section';
import { cn } from '@/lib/utils';


const StatIcon = ({ icon: Icon, value, onSave, className }: { icon: React.ElementType, value: string | number, onSave: (newValue: string) => void, className?: string }) => (
    <div className={cn("flex flex-col items-center", className)}>
        <Icon className="mb-1 text-white" width="24" height="24" fill="currentColor" />
        <EditableValue 
            initialValue={typeof value === 'number' ? value.toLocaleString() : value} 
            onSave={onSave}
            className="text-sm"
            inputClassName='w-12 text-center h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-sm'
        />
    </div>
);

const OverviewStat = ({ label, value, onSave, isLink, href, labelClassName, valueClassName }: { label: string, value: string | number, onSave: (newValue: string) => void, isLink?: boolean, href?: string, labelClassName?: string, valueClassName?: string }) => {
    const content = (
        <div className="flex justify-between items-center text-sm">
            <span className={labelClassName || "text-zinc-300"}>{label}</span>
            <div className="flex items-center gap-1">
                <EditableValue 
                    initialValue={typeof value === 'number' ? value.toLocaleString() : value}
                    onSave={onSave}
                    className={valueClassName || "font-bold"}
                    inputClassName='w-24 text-right h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-sm font-bold'
                />
                {isLink && <ChevronRight size={16} className="text-zinc-500" />}
            </div>
        </div>
    );
    
    return content;
};

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

const SourceStat = ({ source, percentage, onPercentageSave, onSourceSave }: { source: string, percentage: number, onPercentageSave: (newValue: string) => void, onSourceSave: (newValue: string) => void }) => {
    const [currentPercentage, setCurrentPercentage] = useState(percentage);

    useEffect(() => {
        setCurrentPercentage(percentage);
    }, [percentage]);

    const handlePercentageSave = (newValue: string) => {
        const parsedValue = parseFloat(newValue.replace(/%/g, ''));
        if (!isNaN(parsedValue)) {
            setCurrentPercentage(parsedValue);
            onPercentageSave(newValue);
        }
    };

    return (
        <div className="text-sm">
            <div className="flex justify-between items-center mb-1">
                 <EditableValue
                    initialValue={source}
                    onSave={onSourceSave}
                    className="text-zinc-300"
                    inputClassName='w-24 text-left h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-sm'
                />
                <EditableValue 
                    initialValue={`${currentPercentage.toFixed(1)}%`}
                    onSave={handlePercentageSave}
                    className="font-bold"
                    inputClassName='w-16 text-right h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-sm font-bold'
                />
            </div>
            <Progress value={currentPercentage} className="bg-zinc-700 h-2" indicatorClassName="bg-fuchsia-500" />
        </div>
    );
};


const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
);
const MessageCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
);
const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ transform: 'rotate(-40deg)' }}><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
);
const RepostIcon = ({ size = 24, color = "white" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 1l4 4-4 4" />
            <path d="M3 11V9a4 4 0 014-4h14" />
            <path d="M7 23l-4-4 4-4" />
            <path d="M21 13v2a4 4 0 01-4 4H3" />
        </svg>
    );
};
const BookmarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2z"/></svg>
);

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

export default function PostInsightsPage() {
    const params = useParams();
    const router = useRouter();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const { data, updateData, loading } = useInstaMockData();
    
    const [post, setPost] = useState(() => data?.posts.find(p => p.id === id));
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [viewRate, setViewRate] = useState(post?.insights.watchTimeInsights?.viewRate ?? defaultData.posts.find(p=>p.id===id)?.insights.watchTimeInsights.viewRate ?? 60.3);
    const [followersPercentage, setFollowersPercentage] = useState(post?.insights.viewsInsights.audience.followers ?? 0);
    
    useEffect(() => {
        if (data) {
            const currentPost = data.posts.find(p => p.id === id);
            setPost(currentPost);
        }
    }, [data, id]);
    
    useEffect(() => {
        if (post) {
            const currentViewRate = post.insights.watchTimeInsights?.viewRate ?? defaultData.posts.find(p=>p.id===id)?.insights.watchTimeInsights.viewRate ?? 60.3;
            setViewRate(currentViewRate);
            setFollowersPercentage(post.insights.viewsInsights.audience.followers);
        }
    }, [post]);

    if (loading || !data) {
        return <div className="flex items-center justify-center h-screen bg-background text-foreground">Loading...</div>;
    }
    
    if (!post) {
        return <div className="flex items-center justify-center h-screen">Post not found</div>;
    }

    const handleSave = (field: string, newValue: string, index?: number) => {
        if (!data || !post) return;
    
        const isNumericField = !['watchTime', 'averageWatchTime', 'date', 'duration', 'topSourceName'].includes(field);
        const parsedValue = isNumericField ? parseFloat(newValue.replace(/[,%]/g, '')) : newValue;

        if (isNumericField && isNaN(parsedValue as number)) return;

        const newPosts = data.posts.map(p => {
            if (p.id === id) {
                let newPost = JSON.parse(JSON.stringify(p)); // Deep copy for safety

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
                
                if (field === 'duration') {
                    newPost.duration = parsedValue as string;
                } else if (field === 'views') {
                    newPost.views = parsedValue as number;
                } else if (field === 'totalViews') {
                    newPost.insights.viewsInsights.totalViews = parsedValue as number;
                } else if (field === 'followers' || field === 'nonFollowers') {
                    const newPercent = parsedValue as number > 100 ? 100 : parsedValue as number < 0 ? 0 : parsedValue as number;
                    if (field === 'followers') {
                        newPost.insights.viewsInsights.audience.followers = newPercent;
                        newPost.insights.viewsInsights.audience.nonFollowers = 100 - newPercent;
                    } else { // nonFollowers
                        newPost.insights.viewsInsights.audience.nonFollowers = newPercent;
                        newPost.insights.viewsInsights.audience.followers = 100 - newPercent;
                    }
                    setFollowersPercentage(newPost.insights.viewsInsights.audience.followers); // Trigger re-render
                } else if (field === 'topSourcePercentage' && index !== undefined) {
                    newPost.insights.viewsInsights.topSources[index].percentage = parsedValue as number;
                } else if (field === 'topSourceName' && index !== undefined) {
                    newPost.insights.viewsInsights.topSources[index].source = parsedValue as string;
                } else if (field === 'accountsReached' && isNumericField) {
                    newPost.insights.accountsReached = parsedValue;
                } else if (field === 'watchTime') {
                    newWatchTimeInsights.watchTime = newValue;
                } else if (field === 'averageWatchTime') {
                    newWatchTimeInsights.averageWatchTime = newValue;
                } else if (field === 'thisReelPercentage' && isNumericField) {
                    newWatchTimeInsights.thisReelPercentage = parsedValue as number;
                    newWatchTimeInsights.viewRate = parsedValue as number;
                } else if (field === 'typicalReelPercentage' && isNumericField) {
                    newWatchTimeInsights.typicalReelPercentage = parsedValue as number;
                }
                else {
                    (newPost.insights as any)[field] = parsedValue;
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

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImageUrl = reader.result as string;
                if (!data) return;
                const newPosts = data.posts.map(p => 
                    p.id === id ? { ...p, imageUrl: newImageUrl } : p
                );
                updateData({ ...data, posts: newPosts });
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleCaptionSave = (newCaption: string) => {
        if (!data) return;
        const newPosts = data.posts.map(p => 
            p.id === id ? { ...p, caption: newCaption } : p
        );
        updateData({ ...data, posts: newPosts });
    };
    
    const nonFollowersPercentage = 100 - followersPercentage;
    const circumference = 2 * Math.PI * 45; // r = 45
    const followersStrokeDashoffset = circumference - (circumference * followersPercentage) / 100;
    const nonFollowersStrokeDashoffset = circumference - (circumference * nonFollowersPercentage) / 100;
    
    const followersRotation = -90;
    const nonFollowersRotation = -90 + (followersPercentage * 3.6);
    
    const watchTimeInsights = post.insights.watchTimeInsights ?? defaultData.posts.find(p=>p.id===id)?.insights.watchTimeInsights;


    return (
        <div className="flex flex-col h-full bg-background text-foreground">
            <header className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()}>
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="font-bold text-lg">Reel insights</h1>
                </div>
                <MoreVertical size={24} />
            </header>

            <main className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-28 h-48 relative rounded-lg overflow-hidden cursor-pointer" onClick={handleImageClick}>
                        <Image src={post.imageUrl} alt={post.caption} layout="fill" objectFit="cover" data-ai-hint={post.imageHint} />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                    <div className="text-center">
                      <EditableValue initialValue={post.caption} onSave={handleCaptionSave} className="font-bold" inputClassName='w-full text-center h-auto p-0 bg-transparent border-0 focus-visible:ring-0 font-bold' />
                      <div className="text-sm text-zinc-400 mt-1 flex items-center justify-center gap-1">
                          <EditableValue initialValue={post.insights.date} onSave={(newValue) => handleSave('date', newValue)} className="text-sm text-zinc-400" inputClassName='w-24 text-center h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-sm text-zinc-400' />
                          <span>•</span>
                          <span>Duration</span>
                          <EditableValue initialValue={post.duration || '0:13'} onSave={(newValue) => handleSave('duration', newValue)} className="text-sm text-zinc-400" inputClassName='w-12 text-left h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-sm text-zinc-400' />
                      </div>
                  </div>
                </div>

                <div className="my-6 flex justify-around items-start text-center text-sm py-2">
                    <StatIcon icon={HeartIcon} value={post.insights.likes} onSave={(newValue) => handleSave('likes', newValue)} />
                    <StatIcon icon={MessageCircleIcon} value={post.insights.comments} onSave={(newValue) => handleSave('comments', newValue)} />
                    <StatIcon icon={SendIcon} value={post.insights.shares} onSave={(newValue) => handleSave('shares', newValue)} />
                    <StatIcon icon={RepostIcon} value={post.insights.reposts} onSave={(newValue) => handleSave('reposts', newValue)} className="mt-1" />
                    <StatIcon icon={BookmarkIcon} value={post.insights.saves || 4} onSave={(newValue) => handleSave('saves', newValue)} />
                </div>
                
                <Separator className="bg-zinc-800" />

                 <div className="mt-6">
                     <div className="flex items-center gap-2 mb-4">
                        <h2 className="font-bold text-lg">Overview</h2>
                        <Info size={16} className="text-zinc-400" />
                     </div>
                     <div className="space-y-4">
                        <OverviewStat label="Views" value={post.views} onSave={(newValue) => handleSave('views', newValue)} />
                        <OverviewStat label="Watch time" value={post.insights.watchTime} onSave={(newValue) => handleSave('watchTime', newValue)} />
                        <OverviewStat label="Interactions" value={post.insights.accountsEngaged} onSave={(newValue) => handleSave('accountsEngaged', newValue)} />
                        <OverviewStat label="Profile activity" value={post.insights.profileActivity} onSave={(newValue) => handleSave('profileActivity', newValue)} />
                     </div>
                 </div>
                 
                 <Separator className="my-6 bg-zinc-800" />

                 <div className="my-6">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="font-bold text-lg">Views</h2>
                        <Info size={16} className="text-zinc-400" />
                    </div>
                    <div className="flex justify-center">
                        <div className="relative w-56 h-56">
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-sm text-zinc-400">Views</span>
                                <EditableValue
                                    initialValue={post.insights.viewsInsights.totalViews.toLocaleString()}
                                    onSave={(newValue) => handleSave('totalViews', newValue)}
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
                        <AudienceStat label="Followers" value={followersPercentage} onSave={(val) => handleSave('followers', val)} dotClassName="bg-fuchsia-600" />
                        <AudienceStat label="Non-followers" value={nonFollowersPercentage} onSave={(val) => handleSave('nonFollowers', val)} dotClassName="bg-violet-600" />
                    </div>
                    
                    <Separator className="my-6 bg-zinc-800" />

                    <div className="space-y-6">
                        <h2 className="font-bold text-lg">Top sources of views</h2>
                        {post.insights.viewsInsights.topSources.map((source, index) => (
                            <SourceStat 
                                key={index}
                                source={source.source}
                                percentage={source.percentage}
                                onPercentageSave={(val) => handleSave('topSourcePercentage', val, index)}
                                onSourceSave={(val) => handleSave('topSourceName', val, index)}
                            />
                        ))}
                    </div>
                 </div>

                 <Separator className="my-6 bg-zinc-800" />

                 <OverviewStat 
                    label="Accounts reached" 
                    value={post.insights.accountsReached} 
                    onSave={(val) => handleSave('accountsReached', val)}
                    labelClassName='text-sm'
                    valueClassName='text-sm font-normal'
                />

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

                <Separator className="my-6 bg-zinc-800" />
                
                <InteractionsSection />
                
                <Separator className="my-6 bg-zinc-800" />

                <ProfileActivitySection />

                <Separator className="my-6 bg-zinc-800" />

                <AudienceSection />

                <MonetisationSection />

                <AdSection />

            </main>
        </div>
    );
}

    