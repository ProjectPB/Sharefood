import React from "react";
import Resizer from "react-image-file-resizer";
import Card from "../components/Card";
import { Option, Recipe } from "./types";
import { PL_RECIPE } from './../assets/lang/recipe';

export const resizeFile = (file: Blob, maxWidth: number, maxHeight: number): Promise<string | unknown> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "WEBP",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

export const getRecipesCounter = (width: number, sidebarIsOpen: boolean) => {
  // narrow
  if (sidebarIsOpen) {
    if (width <= 1366 && width > 1200) {
      return 9;
    } else {
      return 8;
    }
  }

  //wide
  if (!sidebarIsOpen) {
    if (width <= 1200 && width > 992) {
      return 9;
    } else {
      return 8;
    }
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

export const capitalize = (str: string) => {
  const capitalStr = str[0].toUpperCase() + str.substring(1);
  const formatStr = capitalStr.trim();
  return formatStr;
};

export const translateType = (type: string, lang: string) => {
  if (lang === 'english') {
    return type;
  }

  if (lang === 'polish') {
    switch (type) {
      case "breakfast":
        return PL_RECIPE.BREAKFAST;
      case "appetizer":
        return PL_RECIPE.APPETIZER;
      case 'soup':
        return PL_RECIPE.SOUP;
      case 'main':
        return PL_RECIPE.MAIN;
      case 'drink':
        return PL_RECIPE.DRINK;
      case 'dessert':
        return PL_RECIPE.DESSERT;
      case 'other':
        return PL_RECIPE.OTHER;
    }
  }
}

export const translateCommentFilter = (filter: string, lang: string) => {
  if (lang === 'english') {
    return filter;
  }

  if (lang === 'polish') {
    switch (filter) {
      case "newest":
        return PL_RECIPE.NEWEST_FILTER_COMMENT;
      case "oldest":
        return PL_RECIPE.OLDEST_FILTER_COMMENT;
      case 'popular':
        return PL_RECIPE.POPULAR_FILTER_COMMENT;
    }
  }
}

export const translateTag = (tag: string, lang: string) => {
  if (lang === 'english') {
    switch (tag) {
      case "party":
        return 'Party'
      case "christmas":
        return 'Christmas'
      case 'grill':
        return 'Grill'
      case 'easter':
        return 'Easter'
      case 'fit':
        return 'Fit'
      case 'vegan':
        return 'Vegan'
      case 'vegetarian':
        return 'Vegetarian'
    }
  }

  if (lang === 'polish') {
    switch (tag) {
      case "party":
        return 'Impreza'
      case "christmas":
        return 'Boże Narodzenie'
      case 'grill':
        return 'Grill'
      case 'easter':
        return 'Wielkanoc'
      case 'fit':
        return 'Fit'
      case 'vegan':
        return 'Wegańskie'
      case 'vegetarian':
        return 'Wegetariańskie'
    }
  }
}

export const getValuesFromSelect = (array: Option[]) => {
  let result = array.map(option => option.value);
  return result
}

export const getLabelFromValue = (array: Option[], value: string) => {
  let obj = array.find(obj => {
    return obj.value === value;
  });

  return (obj.label);
}