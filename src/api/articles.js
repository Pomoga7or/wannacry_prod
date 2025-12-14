import { readItems } from "@directus/sdk";
import { directus } from "../lib/directus";

export async function getСollections() {
  return directus.request(readItems('collections'))
}

export async function getHeaderText() {
  const global = await directus.request(readItems('text_header'));
  return {
    props: {
      global,
    },
  };
}

export async function getCollectionItems() {
  const items = await directus.request(readItems('collection_items'));
  return {
    props: {
      items,
    },
  };
}


