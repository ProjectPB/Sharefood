import React from "react";
import Resizer from "react-image-file-resizer";
import Card from "../components/Card";
import { Recipe } from "./types";

export const resizeFile = (file: Blob, maxWidth: number, maxHeight: number): Promise<string | unknown> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

export const getRecipesCounter = (width: number) => {
  if (width <= 1200 && width > 992) {
    return 9;
  } else {
    return 8;
  }
}


export const fillWithHiddenCards = (data: Recipe[] | []) => {
  if (data?.length === 1) {
    return (
      <>
        <Card hidden />
        <Card hidden />
        <Card hidden />
      </>
    );
  } else if (data?.length === 2) {
    return (
      <>
        <Card hidden />
        <Card hidden />
      </>
    );
  } else if (data?.length === 3) {
    return (
      <>
        <Card hidden />
      </>
    );
  }
};

export const invokeOnBottom = (ref: React.MutableRefObject<HTMLDivElement>, action: () => void) => {
  if (ref.current) {
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    if (
      Math.ceil(scrollTop + clientHeight) === scrollHeight ||
      Math.ceil(scrollTop + clientHeight) - 1 === scrollHeight
    ) {
      action();
    }
  }
};