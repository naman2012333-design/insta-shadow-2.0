
'use client';
import Image from 'next/image';
import { useInstaMockData } from '@/hooks/use-instamock-data';
import { Grid3x3, UserSquare2, BarChart2 } from 'lucide-react';
import { EditableValue } from './editable-value';
import { Button } from './ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingIndicator } from './loading-indicator';

export function PostGrid() {
  const { data, updateData, loading } = useInstaMockData();
  const [showLoading, setShowLoading] = useState(false);
  const router = useRouter();

  if (loading || !data) {
    return (
      <div className="grid grid-cols-3 gap-0.5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-square bg-zinc-800 animate-pulse"></div>
        ))}
      </div>
    );
  }

  const handleCaptionSave = (postId: string, newCaption: string) => {
    if (!data) return;
    const newPosts = data.posts.map(p => p.id === postId ? {...p, caption: newCaption} : p);
    updateData({...data, posts: newPosts});
  }

  const handleLikesSave = (postId: string, newLikes: string) => {
    if (!data) return;
    const numValue = parseInt(newLikes.replace(/,/g, ''), 10);
    if (!isNaN(numValue)) {
      const newPosts = data.posts.map(p => {
        if (p.id === postId) {
          const newInsights = { ...p.insights, likes: numValue };
          return { ...p, insights: newInsights };
        }
        return p;
      });
      updateData({ ...data, posts: newPosts });
    }
  };
  
  const handleImageClick = (postId: string) => {
    if (!data) return;
    const post = data.posts.find(p => p.id === postId);
    if (!post) return;

    const newImageUrl = prompt("Enter new image URL:", post.imageUrl);
    if (newImageUrl) {
        const newPosts = data.posts.map(p => p.id === postId ? {...p, imageUrl: newImageUrl} : p);
        updateData({...data, posts: newPosts});
    }
  }

  const handleViewInsightsClick = (postId: string) => {
    setShowLoading(true);
    setTimeout(() => {
        router.push(`/post/${postId}/insights`);
        // No need to setShowLoading(false) as we are navigating away.
    }, 1000);
  }

  const ReelsIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      fill="currentColor"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 6.25a1.25 1.25 0 0 1 1.25 -1.25h13.5a1.25 1.25 0 0 1 1.25 1.25v11.5a1.25 1.25 0 0 1 -1.25 -1.25h-13.5a1.25 1.25 0 0 1 -1.25 -1.25v-11.5z"></path>
        <path d="M10 9.75l4 2.25l-4 2.25z" fill="var(--background)"></path>
    </svg>
  );


  return (
    <div>
      {showLoading && <LoadingIndicator />}
      <div className="flex justify-around border-t border-b border-zinc-700">
        <button className="p-2 border-b-2 border-white flex-1"><Grid3x3 className="mx-auto" /></button>
        <button className="p-2 text-zinc-500 flex-1"><ReelsIcon className="w-6 h-6 mx-auto" /></button>
        <button className="p-2 text-zinc-500 flex-1"><UserSquare2 className="mx-auto" /></button>
      </div>
      <div className="grid grid-cols-3 gap-0.5 mt-0.5">
        {data.posts.map((post) => (
          <div key={post.id} className="relative aspect-square group">
            <div className='cursor-pointer w-full h-full' onClick={() => handleImageClick(post.id)}>
                <Image src={post.imageUrl} alt={post.caption} layout="fill" objectFit="cover" data-ai-hint={post.imageHint} />
            </div>
            <div 
                className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 flex flex-col justify-between" 
            >
              <div>
                {post.insights.likes > 0 && (
                  <div className="flex items-center gap-1 text-white text-xs font-bold">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>
                      <EditableValue 
                          initialValue={post.insights.likes.toLocaleString()} 
                          onSave={(val) => handleLikesSave(post.id, val)}
                          className="text-xs"
                          inputClassName="w-16 h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-white text-xs"
                      />
                  </div>
                )}
              </div>

              <div>
                <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full bg-zinc-800/80 hover:bg-zinc-700/80 text-white h-8 mb-1 text-xs"
                    onClick={() => handleViewInsightsClick(post.id)}
                >
                    <BarChart2 className="mr-2 h-4 w-4" />
                    View Insights
                </Button>
                <EditableValue 
                  initialValue={post.caption} 
                  onSave={(val) => handleCaptionSave(post.id, val)}
                  className="text-white text-xs truncate"
                  inputClassName="w-full h-auto p-0 bg-transparent border-0 focus-visible:ring-0 text-white text-xs"
                  />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
