import { database, ID, Query } from '@/libs/AppWriteClient';

const useCreateProfile = async(userId:string, name:string, username:string, bio: string, image:string) => {
    try{
        await database.createDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
            ID.unique(),
            {
                user_id: userId,
                name: name,
                username:username,
                bio: bio,
                image: image,
            }

        )
        
    }
    catch(error) {
        throw error
    }
}

export default useCreateProfile
