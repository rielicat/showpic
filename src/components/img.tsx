import React from "react";
import Skeleton from "react-loading-skeleton";

type SkeletonSize = {
  width?: number | string;
  height?: number | string;
};

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  circle?: boolean;
  skeletonSize?: SkeletonSize;
  skeletonStyle?: React.CSSProperties;
}

const style: React.CSSProperties = {
  lineHeight: 1.5,
};

export default function Img(props: Props) {
  const {
    src,
    alt,
    className,
    skeletonSize,
    skeletonStyle: propsStyle,
    circle,
    ...rest
  } = props;
  const skeletonStyle = { ...style, ...propsStyle };

  return !src ? (
    <Skeleton
      circle={circle}
      count={1}
      className={className}
      style={
        circle ? { ...skeletonStyle, borderRadius: "100%" } : skeletonStyle
      }
      {...skeletonSize}
    />
  ) : (
    <img loading="lazy" src={src} alt={alt} className={className} {...rest} />
  );
}
