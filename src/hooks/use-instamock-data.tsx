
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { InstaMockData, defaultData, Post } from '@/lib/data';

const STORAGE_KEY = 'instamock-data';

interface InstaMockContextType {
  data: InstaMockData | null;
  updateData: (newData: InstaMockData) => void;
  loading: boolean;
}

const InstaMockContext = createContext<InstaMockContextType | undefined>(undefined);

// Function to ensure data integrity
const ensureDataIntegrity = (data: any): InstaMockData => {
  // If there's no data or it's not an object, return a fresh copy of the default data.
  if (!data || typeof data !== 'object') {
    return JSON.parse(JSON.stringify(defaultData));
  }

  // Start with a deep copy of the default data structure to ensure all keys exist.
  const verifiedData = JSON.parse(JSON.stringify(defaultData));

  // Merge top-level properties from the loaded data.
  Object.assign(verifiedData, {
    username: data.username || defaultData.username,
    profilePictureUrl: data.profilePictureUrl || defaultData.profilePictureUrl,
    profilePictureHint: data.profilePictureHint || defaultData.profilePictureHint,
  });

  // Deep merge nested objects to ensure their properties exist.
  verifiedData.stats = { ...defaultData.stats, ...(data.stats || {}) };
  verifiedData.bio = { ...defaultData.bio, ...(data.bio || {}) };
  verifiedData.professionalDashboard = { ...defaultData.professionalDashboard, ...(data.professionalDashboard || {}) };
  
  // Critically, verify and fix the posts array.
  if (Array.isArray(data.posts)) {
    verifiedData.posts = data.posts.map((post: any, index: number) => {
      const defaultPost = defaultData.posts.find(p => p.id === post?.id) || defaultData.posts[index] || defaultData.posts[0];
      
      if (!post || typeof post !== 'object') {
        return JSON.parse(JSON.stringify(defaultPost));
      }

      const newPost = JSON.parse(JSON.stringify(defaultPost));
      
      const { insights, ...postProperties } = post;
      Object.assign(newPost, postProperties);

      newPost.insights = { ...defaultPost.insights, ...(post.insights || {}) };
      
      // Merge watchTimeInsights specifically
      newPost.insights.watchTimeInsights = { 
        ...defaultPost.insights.watchTimeInsights, 
        ...(post.insights?.watchTimeInsights || {}) 
      };
      
      // Merge audience insights
      newPost.insights.audience = {
          ...defaultPost.insights.audience,
          ...(post.insights?.audience || {}),
          gender: {
              ...(defaultPost.insights.audience?.gender || {}),
              ...(post.insights?.audience?.gender || {})
          }
      };
      
      return newPost;
    });
  } else {
    verifiedData.posts = defaultData.posts;
  }

  return verifiedData as InstaMockData;
};


export function InstaMockDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<InstaMockData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      if (item) {
        const parsedData = JSON.parse(item);
        const verifiedData = ensureDataIntegrity(parsedData);
        setData(verifiedData);
        if (JSON.stringify(parsedData) !== JSON.stringify(verifiedData)) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(verifiedData));
        }
      } else {
        const verifiedDefault = ensureDataIntegrity(defaultData);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(verifiedDefault));
        setData(verifiedDefault);
      }
    } catch (error) {
      console.error("Failed to read or parse from localStorage, resetting to default.", error);
      const verifiedDefault = ensureDataIntegrity(defaultData);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(verifiedDefault));
      setData(verifiedDefault);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateData = (newData: InstaMockData) => {
    try {
      const verifiedData = ensureDataIntegrity(newData);
      setData(verifiedData);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(verifiedData));
    } catch (error) {
      console.error("Failed to write to localStorage", error);
    }
  };

  const contextValue = { data, updateData, loading };

  return (
    <InstaMockContext.Provider value={contextValue}>
      {children}
    </InstaMockContext.Provider>
  );
}

export const useInstaMockData = (): InstaMockContextType => {
  const context = useContext(InstaMockContext);
  if (context === undefined) {
    throw new Error('useInstaMockData must be used within an InstaMockDataProvider');
  }
  return context;
};
