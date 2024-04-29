import { database, ID } from "@/libs/AppWriteClient";
import React from "react";

const useCreateLike = async (userId:string, postId:string) => {
  try {
    await database.createDocument(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE),
      ID.unique(),
      {
        user_id: userId,
        post_id: postId,
      }
    );
  } catch (error) {
    throw error;
  }
};

export default useCreateLike;
