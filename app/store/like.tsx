import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { Like, Post, PostWithProfile, PostWithProfile2 } from '../types';
import useGetAllPosts from '../hooks/useGetAllPosts';
import useGetPostById from '../hooks/useGetPostById';
import useGetPostsByUser from '../hooks/useGetPostsByUser';
import useGetLikesByPostId from '../hooks/useGetLikesByPostId';
  
interface LikeStore {
    likesByPost: Like[],
    setLikesByPost:(postId:string) => void
}

export const useLikeStore = create<LikeStore>()( 
    devtools(
        persist(
            (set) => ({
               likesByPost: [],
               setLikesByPost: async(postId:string) => {
                const result = await useGetLikesByPostId(postId)
                set({likesByPost:result})
               }
            }),
            { 
                name: 'store', 
                storage: createJSONStorage(() => localStorage) 
            }
        )
    )
)