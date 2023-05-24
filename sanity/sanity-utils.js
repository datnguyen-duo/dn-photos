import { createClient, groq } from "next-sanity";

export const client = createClient({
  projectId: "0p77p9q1",
  dataset: "production",
  apiVersion: "2023-05-05",
  useCdn: true,
});

export async function getPhotos() {
  return client.fetch(
    groq`*[_type == "photo"]{
        _id,
        _createdAt,
        "image": image.asset->url,
        "ratio": image.asset->metadata.dimensions.aspectRatio,
        location -> {
          slug
        },
        "lqip": image.asset->metadata.lqip
    }`
  );
}

export async function getLocations() {
  return client.fetch(
    groq`*[_type == "location"]{
          _id,
          _createdAt,
          name,
          "slug": slug.current,
      }`
  );
}
