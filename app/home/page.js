import Image from "next/image";
import { getPhotos, getLocations, client } from "/sanity/sanity-utils";
import imageUrlBuilder from "@sanity/image-url";

export default async function Home() {
  const photos = await getPhotos();
  const locations = await getLocations();
  const sortLocations = locations.sort((a, b) => {
    return new Date(a._createdAt) - new Date(b._createdAt);
  });

  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }

  return (
    <>
      <div className="cursor">
        <span>•</span>
      </div>
      <div className="container">
        <nav>
          <p className="logo">Dat Nguyen</p>
          <ul>
            <li data-attribute-location="all" className="active">
              All
            </li>
            {sortLocations.reverse().map((location) => (
              <li key={location._id} data-attribute-location={location.slug}>
                {location.name}
              </li>
            ))}
          </ul>
          <div className="theme-toggle"></div>
        </nav>
        <div id="smooth-wrapper">
          <main id="smooth-content">
            {photos
              .sort((a, b) => {
                return new Date(a._createdAt) - new Date(b._createdAt);
              })
              .reverse()
              .map((a) => (
                <div
                  className="item-wrapper"
                  data-attribute-location={a.location.slug.current}
                  key={a._id}
                >
                  <div
                    className="item"
                    data-attribute-orientation={
                      a.ratio > 1 ? "landscape" : "portrait"
                    }
                  >
                    <Image
                      src={urlFor(a.image)
                        .size(a.ratio > 1 ? 1200 : 700, a.ratio > 1 ? 900 : 933)
                        .format("webp")
                        .quality(100)
                        .fit("crop")
                        .url()}
                      alt="Dat Nguyen Photography"
                      width={a.ratio > 1 ? 1200 : 700}
                      height={a.ratio > 1 ? 900 : 933}
                      unoptimized={true}
                      placeholder="blur"
                      blurDataURL={a.lqip}
                    />
                  </div>
                </div>
              ))}
          </main>
          <footer>
            <div className="inner">
              <a
                href="https://www.instagram.com/sonyzos/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Model @sonyzos
              </a>
            </div>
            <div className="inner">
              <a href="mailto:hi@dn.photos">hi@dn.photos</a>—
              <a
                href="https://www.instagram.com/dat.ngyn_/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @dat.ngyn_
              </a>
            </div>
          </footer>
        </div>
      </div>
      <div className="modal">
        <div className="close"></div>
        <div className="container">
          <div data-flip-id="img" className="modal-image">
            <img src="" />
          </div>
        </div>
      </div>
      <div className="loader">
        <div className="blur"></div>
        <div className="container">
          <p>Loading memories</p>
        </div>
      </div>
      <div className="noise"></div>
    </>
  );
}
