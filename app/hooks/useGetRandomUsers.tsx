import { database, Query } from "@/libs/AppWriteClient";
import React from "react";

const useGetRandomUsers = async () => {
  try {
    const profileResults = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
      [Query.limit(5)]
    );
    const documents = profileResults.documents;
    const objResults = documents.map((profile) => {
      return {
        id: profile?.user_id,
        name: profile?.name,
        username: profile?.username,
        image: profile?.image,
      };
    });

    const result = await Promise.all(objResults);
    return result;
  } catch (error) {
    throw error;
  }
};

export default useGetRandomUsers;
