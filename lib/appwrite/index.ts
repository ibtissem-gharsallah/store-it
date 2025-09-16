"use server";
import { appwriteConfig } from "@/lib/appwrite/config";
import { cookies } from "next/headers";
import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointURL)
    .setProject(appwriteConfig.projectId);
  const session = (await cookies()).get("appwrite-session");
  if (!session || !session.value) throw new Error("Could not find session");
  client.setSession(session.value);
  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};
export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointURL)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);
  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
};
