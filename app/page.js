"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import Flip from "gsap/Flip";

import Home from "./home/page";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Flip);

export default function Index() {
  const main = useRef();
  const smoother = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      smoother.current = ScrollSmoother.create({
        smooth: 1.5,
      });

      gsap.set(".cursor", { xPercent: 25, yPercent: 25 });
      var cursor = document.querySelector(".cursor");

      var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      var mouse = { x: pos.x, y: pos.y };
      var speed = 0.1;
      var fpms = 60 / 1000;
      var xSet = gsap.quickSetter(cursor, "x", "px");
      var ySet = gsap.quickSetter(cursor, "y", "px");

      document.body.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
      });

      gsap.ticker.add((time, deltaTime) => {
        var delta = deltaTime * fpms;
        var dt = 1.0 - Math.pow(1.0 - speed, delta);
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        xSet(pos.x);
        ySet(pos.y);
      });

      const filters = gsap.utils.toArray("nav li"),
        itemWrapper = gsap.utils.toArray(".item-wrapper"),
        items = gsap.utils.toArray(".item"),
        modal = document.querySelector(".modal"),
        modalImage = modal.querySelector(".modal-image"),
        toggle = document.querySelector(".theme-toggle"),
        loader = document.querySelector(".loader"),
        loaderContainer = loader.querySelector(".container"),
        loaderBlur = loader.querySelector(".blur"),
        loaderTl = gsap.timeline();

      setTimeout(() => {
        loaderTl.add(() => {
          smoother.current.scrollTo(0, false);
          loader.querySelector("p").textContent = "";
        }, "+=.8");
        loaderTl.to(loaderContainer, { opacity: 0 });
        loaderTl.to(
          loaderBlur,
          {
            backdropFilter: "blur(0px)",
            duration: 0.5,
          },
          "<.1"
        );
        loaderTl.add(() => {
          loader.remove();
          document.body.classList.remove("loading");
        });
      }, 1500);

      toggle.addEventListener("click", function () {
        document.body.classList.toggle("toggle");
      });

      toggle.addEventListener("mouseenter", () => {
        cursor.querySelector("span").textContent = "switch";
      });
      toggle.addEventListener("mouseleave", () => {
        cursor.querySelector("span").textContent = "•";
      });

      let activeImg, activeImgContainer;

      items.forEach((container) => {
        var image = container.querySelector("img"),
          orientation = container.getAttribute("data-attribute-orientation");

        container.addEventListener("click", () => {
          activeImg = container;
          activeImgContainer = container.closest(".item-wrapper");
          document.body.classList.add("init__modal");
          container.classList.add("active");
          activeImgContainer.classList.add("active");

          container.dataset.flipId = "img";
          gsap.set(container, { opacity: 0 });
          orientation == "landscape" ? modal.classList.add("landscape") : "";

          const state = Flip.getState([container, modalImage]);

          modalImage.querySelector("img").setAttribute("src", image.src);

          Flip.from(state, {
            duration: 0.6,
            ease: "power1.inOut",
          });
        });

        container.addEventListener("mouseenter", () => {
          cursor.querySelector("span").textContent = "view";
        });
        container.addEventListener("mouseleave", () => {
          cursor.querySelector("span").textContent = "•";
        });
      });
      modal.addEventListener("click", () => {
        activeImg.dataset.flipId = "img";
        gsap.set(activeImg, { opacity: 1 });
        const state = Flip.getState([modalImage, activeImg]);
        document.body.classList.remove("init__modal");
        Flip.from(state, {
          duration: 0.6,
          ease: "power1.inOut",
          absolute: true,
          onComplete: () => {
            modalImage.querySelector("img").setAttribute("src", "");
            modal.classList.remove("landscape");
            activeImg.classList.remove("active");
            activeImgContainer.classList.remove("active");
            activeImg.dataset.flipId = "img";
          },
        });
      });

      modal.addEventListener("mouseenter", () => {
        cursor.querySelector("span").textContent = "back";
      });
      modal.addEventListener("mouseleave", () => {
        cursor.querySelector("span").textContent = "•";
      });
      filters.forEach((filter) => {
        filter.addEventListener("click", function () {
          const state = Flip.getState(itemWrapper),
            location = filter.getAttribute("data-attribute-location");
          filters.forEach((filterClass) => {
            filterClass.classList.remove("active");
          });
          this.classList.add("active");

          itemWrapper.forEach((item) => {
            var itemLocation = item.getAttribute("data-attribute-location");
            if (location == "all") {
              item.style.display = "flex";
            } else {
              if (itemLocation == location) {
                item.style.display = "flex";
              } else {
                item.style.display = "none";
              }
            }
          });

          Flip.from(state, {
            duration: 0.7,
            scale: true,
            ease: "power1.inOut",
            stagger: 0.02,
            absolute: true,
            onEnter: (elements) =>
              gsap.fromTo(
                elements,
                { opacity: 0 },
                { opacity: 1, duration: 0.4 }
              ),
            onLeave: (elements) =>
              gsap.to(elements, { opacity: 0, duration: 0.4 }),
          });
        });

        filter.addEventListener("mouseenter", () => {
          cursor.querySelector("span").textContent = "go";
        });
        filter.addEventListener("mouseleave", () => {
          cursor.querySelector("span").textContent = "•";
        });
      });
    });
  }, []);
  return (
    <>
      <div id="app" ref={main}>
        <Home />
      </div>
    </>
  );
}
