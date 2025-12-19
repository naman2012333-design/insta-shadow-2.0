
export interface Post {
    id: string;
    imageUrl: string;
    imageHint: string;
    caption: string;
    views: number;
    duration?: string;
    insights: {
        likes: number;
        comments: number;
        shares: number;
        reposts: number;
        saves: number;
        plays: number;
        accountsReached: number;
        accountsEngaged: number; // This can be used for "Interactions"
        profileActivity: number;
        watchTime: string;
        averageWatchTime: string;
        date: string;
        viewsInsights: {
          totalViews: number;
          audience: {
            followers: number;
            nonFollowers: number;
          };
          topSources: {
            source: string;
            percentage: number;
          }[];
        };
        watchTimeInsights: {
          watchTime: string;
          averageWatchTime: string;
          viewRate: number;
          thisReelPercentage: number;
          typicalReelPercentage: number;
        };
        interactionsBreakdown?: {
          followersPercentage: number;
          nonFollowersPercentage: number;
          likes: number;
          shares: number;
          saves: number;
          comments: number;
        };
        profileActivityBreakdown?: {
            follows: number;
        };
        audience?: {
            gender: {
                men: number;
                women: number;
            };
            topCountries?: {
                name: string;
                percentage: number;
            }[];
            ageRanges?: {
                range: string;
                percentage: number;
            }[];
        };
        monetisation?: {
            approximateEarnings: number;
        }
    };
  }
  
  export interface InstaMockData {
    username: string;
    profilePictureUrl: string;
    profilePictureHint: string;
    stats: {
      posts: number;
      followers: number;
      following: number;
    };
    bio: {
      name: string;
      description: string[];
    };
    professionalDashboard: {
      views: string;
    };
    posts: Post[];
  }
  
  export const defaultData: InstaMockData = {
    username: 'crescemecum',
    profilePictureUrl: 'https://picsum.photos/seed/1/200/200',
    profilePictureHint: 'logo initial M',
    stats: {
      posts: 7,
      followers: 18,
      following: 8,
    },
    bio: {
      name: 'Cresce mecum',
      description: [
        'Cresce mecum • Grow with me 🌱',
        'Self-improvement, habits & mindset',
        'Turn discipline into a lifestyle',
        'Follow for daily 1% better',
      ],
    },
    professionalDashboard: {
      views: '11.5K',
    },
    posts: [
      {
        id: 'post1',
        imageUrl: 'https://picsum.photos/seed/101/400/400',
        imageHint: 'text on black background',
        caption: 'Bored ? Search these on You... and thank me later.',
        views: 2267,
        duration: '0:13',
        insights: {
            likes: 105,
            comments: 5,
            shares: 12,
            reposts: 2,
            saves: 10,
            plays: 2267,
            accountsReached: 1803,
            accountsEngaged: 64,
            profileActivity: 23,
            watchTime: '18m 23s',
            averageWatchTime: '0m 22s',
            date: 'May 3, 2024',
            viewsInsights: {
              totalViews: 2308,
              audience: {
                followers: 3.1,
                nonFollowers: 96.9,
              },
              topSources: [
                { source: 'Reels tab', percentage: 83.7 },
                { source: 'Explore', percentage: 11.0 },
                { source: 'Profile', percentage: 1.0 },
                { source: 'Feed', percentage: 0.2 },
                { source: 'Stories', percentage: 0.1 },
              ],
            },
            watchTimeInsights: {
                watchTime: '2h 41m 9s',
                averageWatchTime: '5s',
                viewRate: 60.3,
                thisReelPercentage: 60.3,
                typicalReelPercentage: 52.6,
            },
            interactionsBreakdown: {
                followersPercentage: 91.7,
                nonFollowersPercentage: 8.3,
                likes: 44,
                shares: 12,
                saves: 7,
                comments: 1,
            },
            profileActivityBreakdown: {
                follows: 23,
            },
            audience: {
                gender: {
                    men: 74.9,
                    women: 25.1
                },
                topCountries: [
                    { name: 'India', percentage: 68.4 },
                    { name: 'Pakistan', percentage: 7.2 },
                    { name: 'Philippines', percentage: 2.8 },
                    { name: 'United States', percentage: 2.4 },
                    { name: 'Canada', percentage: 1.5 },
                ],
                ageRanges: [
                    { range: '13-17', percentage: 7.5 },
                    { range: '18-24', percentage: 49.9 },
                    { range: '25-34', percentage: 35.1 },
                    { range: '35-44', percentage: 5.2 },
                    { range: '45-54', percentage: 1.6 },
                    { range: '55-64', percentage: 0.4 },
                    { range: '65+', percentage: 0.4 },
                ]
            },
            monetisation: {
                approximateEarnings: 0.00
            }
        }
      },
      {
        id: 'post2',
        imageUrl: 'https://picsum.photos/seed/102/400/400',
        imageHint: 'text on black background',
        caption: "Study these and you'll understand people 10x bet...",
        views: 4552,
        duration: '0:15',
        insights: {
            likes: 230,
            comments: 18,
            shares: 45,
            reposts: 8,
            saves: 50,
            plays: 4552,
            accountsReached: 3912,
            accountsEngaged: 343,
            profileActivity: 88,
            watchTime: '35m 12s',
            averageWatchTime: '0m 28s',
            date: 'May 1, 2024',
            viewsInsights: {
              totalViews: 4600,
              audience: {
                followers: 1.5,
                nonFollowers: 98.5,
              },
              topSources: [
                { source: 'Reels tab', percentage: 75.2 },
                { source: 'Explore', percentage: 20.1 },
                { source: 'Profile', percentage: 2.5 },
                { source: 'Feed', percentage: 1.2 },
                { source: 'Stories', percentage: 1.0 },
              ],
            },
            watchTimeInsights: {
                watchTime: '3h 1m 2s',
                averageWatchTime: '6s',
                viewRate: 65.1,
                thisReelPercentage: 65.1,
                typicalReelPercentage: 55.0,
            },
            interactionsBreakdown: {
                followersPercentage: 90.0,
                nonFollowersPercentage: 10.0,
                likes: 230,
                shares: 45,
                saves: 50,
                comments: 18,
            },
            profileActivityBreakdown: {
                follows: 88,
            },
            audience: {
                gender: {
                    men: 74.9,
                    women: 25.1
                },
                topCountries: [
                    { name: 'India', percentage: 68.4 },
                    { name: 'Pakistan', percentage: 7.2 },
                    { name: 'Philippines', percentage: 2.8 },
                    { name: 'United States', percentage: 2.4 },
                    { name: 'Canada', percentage: 1.5 },
                ],
                ageRanges: [
                    { range: '13-17', percentage: 7.5 },
                    { range: '18-24', percentage: 49.9 },
                    { range: '25-34', percentage: 35.1 },
                    { range: '35-44', percentage: 5.2 },
                    { range: '45-54', percentage: 1.6 },
                    { range: '55-64', percentage: 0.4 },
                    { range: '65+', percentage: 0.4 },
                ]
            },
            monetisation: {
                approximateEarnings: 0.00
            }
        }
      },
      {
        id: 'post3',
        imageUrl: 'https://picsum.photos/seed/103/400/400',
        imageHint: 'text on black background',
        caption: "15 Sign's you hav high testosterone",
        views: 1961,
        duration: '0:10',
        insights: {
            likes: 98,
            comments: 1,
            shares: 8,
            reposts: 1,
            saves: 5,
            plays: 1961,
            accountsReached: 1500,
            accountsEngaged: 112,
            profileActivity: 12,
            watchTime: '15m 54s',
            averageWatchTime: '0m 19s',
            date: 'April 28, 2024',
            viewsInsights: {
              totalViews: 1961,
              audience: {
                followers: 0.5,
                nonFollowers: 99.5,
              },
              topSources: [
                { source: 'Reels tab', percentage: 90.0 },
                { source: 'Explore', percentage: 5.0 },
                { source: 'Profile', percentage: 2.0 },
                { source: 'Feed', percentage: 1.5 },
                { source: 'Stories', percentage: 1.5 },
              ],
            },
            watchTimeInsights: {
                watchTime: '1h 20m 30s',
                averageWatchTime: '4s',
                viewRate: 58.2,
                thisReelPercentage: 58.2,
                typicalReelPercentage: 51.5,
            },
            interactionsBreakdown: {
                followersPercentage: 95.0,
                nonFollowersPercentage: 5.0,
                likes: 98,
                shares: 8,
                saves: 5,
                comments: 1,
            },
            profileActivityBreakdown: {
                follows: 12,
            },
            audience: {
                gender: {
                    men: 74.9,
                    women: 25.1
                },
                topCountries: [
                    { name: 'India', percentage: 68.4 },
                    { name: 'Pakistan', percentage: 7.2 },
                    { name: 'Philippines', percentage: 2.8 },
                    { name: 'United States', percentage: 2.4 },
                    { name: 'Canada', percentage: 1.5 },
                ],
                ageRanges: [
                    { range: '13-17', percentage: 7.5 },
                    { range: '18-24', percentage: 49.9 },
                    { range: '25-34', percentage: 35.1 },
                    { range: '35-44', percentage: 5.2 },
                    { range: '45-54', percentage: 1.6 },
                    { range: '55-64', percentage: 0.4 },
                    { range: '65+', percentage: 0.4 },
                ]
            },
            monetisation: {
                approximateEarnings: 0.00
            }
        }
      },
      {
        id: 'post4',
        imageUrl: 'https://picsum.photos/seed/104/400/400',
        imageHint: 'text on black background',
        caption: 'POV : You understood the 1 business credit creat...',
        views: 341,
        duration: '0:13',
        insights: {
            likes: 12,
            comments: 4,
            shares: 3,
            reposts: 0,
            saves: 4,
            plays: 341,
            accountsReached: 300,
            accountsEngaged: 23,
            profileActivity: 0,
            watchTime: '24m 58s',
            averageWatchTime: '0m 25s',
            date: 'December 14, 2023',
            viewsInsights: {
              totalViews: 341,
              audience: {
                followers: 10.0,
                nonFollowers: 90.0,
              },
              topSources: [
                { source: 'Reels tab', percentage: 60.0 },
                { source: 'Explore', percentage: 20.0 },
                { source: 'Profile', percentage: 10.0 },
                { source: 'Feed', percentage: 5.0 },
                { source: 'Stories', percentage: 5.0 },
              ],
            },
            watchTimeInsights: {
                watchTime: '30m 0s',
                averageWatchTime: '7s',
                viewRate: 70.0,
                thisReelPercentage: 70.0,
                typicalReelPercentage: 60.1,
            },
            interactionsBreakdown: {
                followersPercentage: 80.0,
                nonFollowersPercentage: 20.0,
                likes: 12,
                shares: 3,
                saves: 4,
                comments: 4,
            },
            profileActivityBreakdown: {
                follows: 0,
            },
            audience: {
                gender: {
                    men: 74.9,
                    women: 25.1
                },
                topCountries: [
                    { name: 'India', percentage: 68.4 },
                    { name: 'Pakistan', percentage: 7.2 },
                    { name: 'Philippines', percentage: 2.8 },
                    { name: 'United States', percentage: 2.4 },
                    { name: 'Canada', percentage: 1.5 },
                ],
                ageRanges: [
                    { range: '13-17', percentage: 7.5 },
                    { range: '18-24', percentage: 49.9 },
                    { range: '25-34', percentage: 35.1 },
                    { range: '35-44', percentage: 5.2 },
                    { range: '45-54', percentage: 1.6 },
                    { range: '55-64', percentage: 0.4 },
                    { range: '65+', percentage: 0.4 },
                ]
            },
            monetisation: {
                approximateEarnings: 0.00
            }
        }
      },
      {
        id: 'post5',
        imageUrl: 'https://picsum.photos/seed/105/400/400',
        imageHint: 'text on black background',
        caption: 'Avoid these things n or regret it for years.',
        views: 1200,
        duration: '0:18',
        insights: {
            likes: 80,
            comments: 10,
            shares: 5,
            reposts: 0,
            saves: 15,
            plays: 1200,
            accountsReached: 1000,
            accountsEngaged: 110,
            profileActivity: 10,
            watchTime: '10m 0s',
            averageWatchTime: '0m 15s',
            date: 'April 22, 2024',
            viewsInsights: {
              totalViews: 1200,
              audience: {
                followers: 2.0,
                nonFollowers: 98.0,
              },
              topSources: [
                { source: 'Reels tab', percentage: 80.0 },
                { source: 'Explore', percentage: 10.0 },
                { source: 'Profile', percentage: 5.0 },
                { source: 'Feed', percentage: 3.0 },
                { source: 'Stories', percentage: 2.0 },
              ],
            },
            watchTimeInsights: {
                watchTime: '55m 10s',
                averageWatchTime: '5s',
                viewRate: 62.5,
                thisReelPercentage: 62.5,
                typicalReelPercentage: 54.3,
            },
            interactionsBreakdown: {
                followersPercentage: 85.0,
                nonFollowersPercentage: 15.0,
                likes: 80,
                shares: 5,
                saves: 15,
                comments: 10,
            },
            profileActivityBreakdown: {
                follows: 10,
            },
            audience: {
                gender: {
                    men: 74.9,
                    women: 25.1
                },
                topCountries: [
                    { name: 'India', percentage: 68.4 },
                    { name: 'Pakistan', percentage: 7.2 },
                    { name: 'Philippines', percentage: 2.8 },
                    { name: 'United States', percentage: 2.4 },
                    { name: 'Canada', percentage: 1.5 },
                ],
                ageRanges: [
                    { range: '13-17', percentage: 7.5 },
                    { range: '18-24', percentage: 49.9 },
                    { range: '25-34', percentage: 35.1 },
                    { range: '35-44', percentage: 5.2 },
                    { range: '45-54', percentage: 1.6 },
                    { range: '55-64', percentage: 0.4 },
                    { range: '65+', percentage: 0.4 },
                ]
            },
            monetisation: {
                approximateEarnings: 0.00
            }
        }
      },
      {
        id: 'post6',
        imageUrl: 'https://picsum.photos/seed/106/400/400',
        imageHint: 'text on black background',
        caption: 'A neurologist just exposed th truth about random body twi....s.',
        views: 500,
        duration: '0:20',
        insights: {
            likes: 25,
            comments: 2,
            shares: 1,
            reposts: 0,
            saves: 3,
            plays: 500,
            accountsReached: 450,
            accountsEngaged: 31,
            profileActivity: 5,
            watchTime: '5m 0s',
            averageWatchTime: '0m 18s',
            date: 'April 20, 2024',
            viewsInsights: {
              totalViews: 500,
              audience: {
                followers: 3.0,
                nonFollowers: 97.0,
              },
              topSources: [
                { source: 'Reels tab', percentage: 85.0 },
                { source: 'Explore', percentage: 8.0 },
                { source: 'Profile', percentage: 4.0 },
                { source: 'Feed', percentage: 2.0 },
                { source: 'Stories', percentage: 1.0 },
              ],
            },
            watchTimeInsights: {
                watchTime: '40m 5s',
                averageWatchTime: '8s',
                viewRate: 75.0,
                thisReelPercentage: 75.0,
                typicalReelPercentage: 62.0,
            },
            interactionsBreakdown: {
                followersPercentage: 92.0,
                nonFollowersPercentage: 8.0,
                likes: 25,
                shares: 1,
                saves: 3,
                comments: 2,
            },
            profileActivityBreakdown: {
                follows: 5,
            },
            audience: {
                gender: {
                    men: 74.9,
                    women: 25.1
                },
                topCountries: [
                    { name: 'India', percentage: 68.4 },
                    { name: 'Pakistan', percentage: 7.2 },
                    { name: 'Philippines', percentage: 2.8 },
                    { name: 'United States', percentage: 2.4 },
                    { name: 'Canada', percentage: 1.5 },
                ],
                ageRanges: [
                    { range: '13-17', percentage: 7.5 },
                    { range: '18-24', percentage: 49.9 },
                    { range: '25-34', percentage: 35.1 },
                    { range: '35-44', percentage: 5.2 },
                    { range: '45-54', percentage: 1.6 },
                    { range: '55-64', percentage: 0.4 },
                    { range: '65+', percentage: 0.4 },
                ]
            },
            monetisation: {
                approximateEarnings: 0.00
            }
        }
      },
    ],
  };
