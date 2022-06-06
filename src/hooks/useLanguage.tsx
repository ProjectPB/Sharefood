import { State } from "../shared/types";
import { useSelector } from "react-redux";

import { ENG_HEADER, PL_HEADER } from './../assets/lang/header';
import { ENG_SIDEBAR, PL_SIDEBAR } from './../assets/lang/sidebar';
import { ENG_FILTERS, PL_FILTERS } from './../assets/lang/filters';
import { ENG_NEW_RECIPE, PL_NEW_RECIPE } from './../assets/lang/newRecipe';

const mapState = ({ ui }: State) => ({
  language: ui.language
})

const useLanguage = () => {
  const { language } = useSelector(mapState);

  switch (language) {
    case "english":
      return {
        HEADER: ENG_HEADER,
        SIDEBAR: ENG_SIDEBAR,
        FILTERS: ENG_FILTERS,
        NEW_RECIPE: ENG_NEW_RECIPE,
      }
    case "polish":
      return {
        HEADER: PL_HEADER,
        SIDEBAR: PL_SIDEBAR,
        FILTERS: PL_FILTERS,
        NEW_RECIPE: PL_NEW_RECIPE,
      }
  }
}

export default useLanguage;