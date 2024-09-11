import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { Comment, CommentWithProfile, Like, Post, PostWithProfile, PostWithProfile2 } from '../types';
import useGetAllPosts from '../hooks/useGetAllPosts';
import useGetPostById from '../hooks/useGetPostById';
import useGetPostsByUser from '../hooks/useGetPostsByUser';
import useGetLikesByPostId from '../hooks/useGetLikesByPostId';
import useGetCommentsByPostId from '../hooks/useGetCommentsByPostId';
  
interface CommentStore {
    commentsByPost: CommentWithProfile[],
    setCommentsByPost:(postId:string) => void
}

export const useCommentStore = create<CommentStore>()( 
    devtools(
        persist(
            (set) => ({
               commentsByPost: [],
               setCommentsByPost: async(postId:string) => {
                const result = await useGetCommentsByPostId(postId)
                set({commentsByPost:result})
               }
            }),
            { 
                name: 'store', 
                storage: createJSONStorage(() => localStorage) 
            }
        )
    )
)