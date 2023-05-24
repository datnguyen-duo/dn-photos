const photo = {
  name: "photo",
  title: "Photos",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "location",
      title: "Location",
      type: "reference",
      to: [{ type: "location" }],
    },
  ],
  preview: {
    select: {
      title: "location.name",
      media: "image",
    },
  },
};

export default photo;
