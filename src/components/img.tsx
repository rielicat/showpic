import React from "react";
import Skeleton from "react-loading-skeleton";

type SkeletonSize = { height: number; width: number };

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  circle?: boolean;
  skeletonSize?: SkeletonSize;
}

export default function Img(props: Props) {
  const { src, alt, className, skeletonSize, circle, ...rest } = props;
  return !src ? (
    <Skeleton
      circle={circle}
      count={1}
      className={className}
      {...skeletonSize}
    />
  ) : (
    <img loading="lazy" src={src} alt={alt} className={className} {...rest} />
  );
}
