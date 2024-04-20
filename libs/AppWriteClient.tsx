import { Client, Account, ID, Databases, Query, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66051b20439611545a99");

  const account = new Account(client)
  const database = new Databases(client)
  const storage = new Storage(client)
