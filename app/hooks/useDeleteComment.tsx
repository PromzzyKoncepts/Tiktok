import { database, storage, ID } from "@/libs/AppWriteClient";
import React from "react";

const useDeleteComment = async (id:string) => {
  try {
    await database.deleteDocument(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_COMMENT), //CHANGE IT TO POST IF IT FAILS
      id,
      
    );

    
  } catch (error) {
    throw error;
  }
};

export default useDeleteComment;
