import type { ReactNode } from "react";
import { TRUCK_IMAGES } from "../constants/truck-images";

type PageHeroMediaProps = {
  image: string;
  blur?: number;
  children: ReactNode;
  className?: string;
};

export function PageHeroMedia({ image, blur = 8, children, className = "" }: PageHeroMediaProps) {
  return (
    <section className={`page-hero-media ${className}`.trim()}>
      <div
        className="page-hero-media__bg"
        style={{ backgroundImage: `url(${image})`, filter: `blur(${blur}px)` }}
        aria-hidden="true"
      />
      <div className="page-hero-media__overlay" aria-hidden="true" />
      <div className="page-hero-media__content">{children}</div>
    </section>
  );
}

type MediaFigureProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
};

export function MediaFigure({ src, alt, caption, className = "" }: MediaFigureProps) {
  return (
    <figure className={`media-figure ${className}`.trim()}>
      <img src={src} alt={alt} loading="lazy" className="media-figure__img" />
      {caption ? <figcaption className="media-figure__cap">{caption}</figcaption> : null}
    </figure>
  );
}

type MediaSplitProps = {
  image: string;
  alt: string;
  reverse?: boolean;
  className?: string;
  children: ReactNode;
};

export function MediaSplit({ image, alt, reverse = false, className = "", children }: MediaSplitProps) {
  return (
    <div className={`media-split ${reverse ? "media-split--reverse" : ""} ${className}`.trim()}>
      <MediaFigure src={image} alt={alt} className="media-figure--cover" />
      <div className="media-split__body">{children}</div>
    </div>
  );
}

type MediaGalleryProps = {
  items: { src: string; alt: string; label: string }[];
};

export function MediaGallery({ items }: MediaGalleryProps) {
  return (
    <div className="media-gallery">
      {items.map((item) => (
        <figure key={item.src} className="media-gallery__item">
          <img src={item.src} alt={item.alt} loading="lazy" />
          <figcaption>{item.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

type ContactPageShellProps = {
  children: ReactNode;
};

export function ContactPageShell({ children }: ContactPageShellProps) {
  return (
    <div className="com-page">
      <div
        className="com-page__bg"
        style={{ backgroundImage: `url(${TRUCK_IMAGES.contact})` }}
        aria-hidden="true"
      />
      <div className="com-page__overlay" aria-hidden="true" />
      <div className="com-page__inner">{children}</div>
    </div>
  );
}
