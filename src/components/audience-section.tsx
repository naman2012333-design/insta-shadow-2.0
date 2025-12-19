
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useInstaMockData } from '@/hooks/use-instamock-data';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { EditableValue } from '@/components/editable-value';
import { defaultData } from '@/lib/data';

type AudienceTab = 'Gender' | 'Country' | 'Age';

const GenderStat = ({ label, value, onSave, indicatorClassName }: { label: string, value: number, onSave: (newValue: string) => void, indicatorClassName: string }) => {
    
    const handleSave = (newValue: string) => {
        const parsedValue = parseFloat(newValue.replace(/%/g, ''));
        if (!isNaN(parsedValue)) {
            onSave(newValue);
        }
    };
    
    return (
        <div className="text-sm">
            <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-300">{label}</span>
                 <EditableValue 
                    initialValue={`${value.toFixed(1)}%`}
                    onSave={handleSave}
                    className="font-bold"
                    inputClassName='w-16 text-right h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-sm font-bold'
                />
            </div>
            <Progress value={value} className="bg-zinc-700 h-2" indicatorClassName={indicatorClassName} />
        </div>
    );
};

const CountryStat = ({ name, percentage, onNameSave, onPercentageSave }: { name: string, percentage: number, onNameSave: (newName: string) => void, onPercentageSave: (newPercentage: string) => void }) => {
    return (
        <div className="text-sm">
            <div className="flex justify-between items-center mb-1">
                <EditableValue
                    initialValue={name}
                    onSave={onNameSave}
                    className="text-zinc-300"
                    inputClassName='w-24 text-left h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-sm'
                />
                <EditableValue 
                    initialValue={`${percentage.toFixed(1)}%`}
                    onSave={onPercentageSave}
                    className="font-bold"
                    inputClassName='w-16 text-right h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-sm font-bold'
                />
            </div>
            <Progress value={percentage} className="bg-zinc-700 h-2" indicatorClassName="bg-fuchsia-500" />
        </div>
    );
};

const AgeStat = ({ range, percentage, onSave }: { range: string, percentage: number, onSave: (newPercentage: string) => void }) => {
    return (
        <div className="text-sm">
            <div className="flex justify-between items-center mb-1">
                <span className="text-zinc-300 w-12">{range}</span>
                <div className="flex items-center flex-1 mx-4">
                    <Progress value={percentage} className="bg-zinc-700 h-2 flex-1" indicatorClassName="bg-fuchsia-500" />
                </div>
                <EditableValue 
                    initialValue={`${percentage.toFixed(1)}%`}
                    onSave={onSave}
                    className="font-bold w-12 text-right"
                    inputClassName='w-12 text-right h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-sm font-bold'
                />
            </div>
        </div>
    );
};

export function AudienceSection() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const { data, updateData, loading } = useInstaMockData();
    const [post, setPost] = useState(() => data?.posts.find(p => p.id === id));
    const [activeTab, setActiveTab] = useState<AudienceTab>('Gender');

    useEffect(() => {
        if (data) {
            setPost(data.posts.find(p => p.id === id));
        }
    }, [data, id]);

    if (loading || !data || !post) {
        return null;
    }

    const handleGenderSave = (gender: 'men' | 'women', newValue: string) => {
        if (!data || !post) return;
        const parsedValue = parseFloat(newValue.replace(/%/g, ''));
        if (isNaN(parsedValue)) return;
        
        const cappedValue = Math.max(0, Math.min(100, parsedValue));

        const newPosts = data.posts.map(p => {
            if (p.id === id) {
                const newPost = JSON.parse(JSON.stringify(p)); // Deep copy

                const defaultAudience = defaultData.posts.find(dp => dp.id === id)?.insights.audience ?? {
                    gender: { men: 0, women: 0 },
                    topCountries: [],
                    ageRanges: [],
                };

                const newAudience = {
                    ...defaultAudience,
                    ...(newPost.insights.audience ?? {}),
                    gender: {
                        ...(defaultAudience.gender ?? { men: 0, women: 0 }),
                        ...(newPost.insights.audience?.gender ?? {})
                    }
                };

                if (gender === 'men') {
                    newAudience.gender.men = cappedValue;
                    newAudience.gender.women = 100 - cappedValue;
                } else {
                    newAudience.gender.women = cappedValue;
                    newAudience.gender.men = 100 - cappedValue;
                }
                
                newPost.insights.audience = newAudience;
                return newPost;
            }
            return p;
        });
        updateData({ ...data, posts: newPosts });
    };

    const handleCountryPercentageSave = (index: number, newValue: string) => {
        if (!data || !post) return;
        const parsedValue = parseFloat(newValue.replace(/%/g, ''));
        if (isNaN(parsedValue)) return;

        const newPosts = data.posts.map(p => {
            if (p.id === id) {
                const newPost = JSON.parse(JSON.stringify(p));
                const topCountries = newPost.insights.audience?.topCountries ?? defaultData.posts.find(dp => dp.id === id)?.insights.audience?.topCountries ?? [];
                if (topCountries[index]) {
                    topCountries[index].percentage = parsedValue;
                }
                if(newPost.insights.audience) {
                    newPost.insights.audience.topCountries = topCountries;
                }
                return newPost;
            }
            return p;
        });
        updateData({ ...data, posts: newPosts });
    };
    
    const handleCountryNameSave = (index: number, newName: string) => {
        if (!data || !post) return;

        const newPosts = data.posts.map(p => {
            if (p.id === id) {
                const newPost = JSON.parse(JSON.stringify(p));
                const topCountries = newPost.insights.audience?.topCountries ?? defaultData.posts.find(dp => dp.id === id)?.insights.audience?.topCountries ?? [];
                if (topCountries[index]) {
                    topCountries[index].name = newName;
                }
                if(newPost.insights.audience) {
                    newPost.insights.audience.topCountries = topCountries;
                }
                return newPost;
            }
            return p;
        });
        updateData({ ...data, posts: newPosts });
    };

    const handleAgePercentageSave = (index: number, newValue: string) => {
        if (!data || !post) return;
        const parsedValue = parseFloat(newValue.replace(/%/g, ''));
        if (isNaN(parsedValue)) return;

        const newPosts = data.posts.map(p => {
            if (p.id === id) {
                const newPost = JSON.parse(JSON.stringify(p));
                const ageRanges = newPost.insights.audience?.ageRanges ?? defaultData.posts.find(dp => dp.id === id)?.insights.audience?.ageRanges ?? [];
                if (ageRanges[index]) {
                    ageRanges[index].percentage = parsedValue;
                }
                 if(newPost.insights.audience) {
                    newPost.insights.audience.ageRanges = ageRanges;
                }
                return newPost;
            }
            return p;
        });
        updateData({ ...data, posts: newPosts });
    };

    const audience = post.insights.audience ?? defaultData.posts.find(p => p.id === id)?.insights.audience ?? { gender: { men: 74.9, women: 25.1 }, topCountries: [], ageRanges: [] };
    const genderData = audience.gender ?? { men: 74.9, women: 25.1 };
    const countryData = audience.topCountries ?? defaultData.posts.find(p => p.id === id)?.insights.audience?.topCountries ?? [];
    const ageData = audience.ageRanges ?? defaultData.posts.find(p => p.id === id)?.insights.audience?.ageRanges ?? [];

    return (
        <div className="my-6">
            <div className="flex items-center gap-2 mb-4">
                <h2 className="font-bold text-lg">Audience</h2>
                <Info size={16} className="text-zinc-400" />
            </div>

            <div className='flex gap-2 mb-6'>
                <Button 
                    variant={activeTab === 'Gender' ? "secondary" : "outline"} 
                    onClick={() => setActiveTab('Gender')} 
                    className="rounded-full"
                >
                    Gender
                </Button>
                <Button 
                    variant={activeTab === 'Country' ? "secondary" : "outline"} 
                    onClick={() => setActiveTab('Country')} 
                    className="rounded-full"
                >
                    Country
                </Button>
                <Button 
                    variant={activeTab === 'Age' ? "secondary" : "outline"} 
                    onClick={() => setActiveTab('Age')} 
                    className="rounded-full"
                >
                    Age
                </Button>
            </div>

            {activeTab === 'Gender' && (
                <div className="space-y-4">
                    <GenderStat label="Men" value={genderData.men} onSave={(val) => handleGenderSave('men', val)} indicatorClassName="bg-fuchsia-500" />
                    <GenderStat label="Women" value={genderData.women} onSave={(val) => handleGenderSave('women', val)} indicatorClassName="bg-indigo-500" />
                </div>
            )}
            {activeTab === 'Country' && (
                <div className="space-y-4">
                    {countryData.map((country, index) => (
                        <CountryStat 
                            key={country.name + index}
                            name={country.name}
                            percentage={country.percentage}
                            onNameSave={(val) => handleCountryNameSave(index, val)}
                            onPercentageSave={(val) => handleCountryPercentageSave(index, val)}
                        />
                    ))}
                </div>
            )}
            {activeTab === 'Age' && (
                 <div className="space-y-2">
                    {ageData.map((age, index) => (
                        <AgeStat
                            key={age.range}
                            range={age.range}
                            percentage={age.percentage}
                            onSave={(val) => handleAgePercentageSave(index, val)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

    