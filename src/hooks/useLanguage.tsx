import { State } from "../shared/types";
import { useSelector } from "react-redux";

import { ENG_HEADER, PL_HEADER } from './../assets/lang/header';
import { ENG_SIDEBAR, PL_SIDEBAR } from './../assets/lang/sidebar';
import { ENG_FILTERS, PL_FILTERS } from './../assets/lang/filters';
import { ENG_NEW_RECIPE, PL_NEW_RECIPE } from './../assets/lang/newRecipe';
import { ENG_AUTH, PL_AUTH } from './../assets/lang/auth';
import { ENG_ERRORS, PL_ERRORS } from './../assets/lang/errors';

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
        AUTH: ENG_AUTH,
        ERRORS: ENG_ERRORS,
      }
    case "polish":
      return {
        HEADER: PL_HEADER,
        SIDEBAR: PL_SIDEBAR,
        FILTERS: PL_FILTERS,
        NEW_RECIPE: PL_NEW_RECIPE,
        AUTH: PL_AUTH,
        ERRORS: PL_ERRORS,
      }
  }
}

export default useLanguage;