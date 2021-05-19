/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { ImageProps } from "context/assets";
import { fetchImages } from "services/firebase";

const imagePaths: { [K in string]: string[] } = {};
export default function useImageListener() {
  const [paths, setPaths] = useState(imagePaths);
  const [images, setImages] = useState<ImageProps>({});

  useEffect(() => {
    for (const [key, value] of Object.entries(paths))
      fetchImages(value, images, setImages, key);
  }, [paths]);

  const addPaths = (newPaths: string[], rootPath?: string) => {
    const r = rootPath || "images/public";
    imagePaths[r] = imagePaths[r] || [];
    for (const p of newPaths) {
      if (!imagePaths[r].includes(p)) imagePaths[r].push(p);
    }
    setPaths({ ...imagePaths });
  };

  /**
   *
   * @param username get the username
   * @returns The user's avatar url
   */
  const getAvatar = (username: string) => {
    addPaths([`${username}.jpg`], "images/public/avatars");
    return images[`${username}.jpg`];
  };

  return { images, addPaths, getAvatar };
}
