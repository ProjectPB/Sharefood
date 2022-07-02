import { State } from "../shared/types";
import { useSelector } from "react-redux";

import { ENG_MISC, PL_MISC, ENG_RECIPE, ENG_HEADER, ENG_SIDEBAR, ENG_FILTERS, ENG_NEW_RECIPE, ENG_AUTH, ENG_ERRORS, PL_HEADER, PL_SIDEBAR, PL_FILTERS, PL_NEW_RECIPE, PL_AUTH, PL_ERRORS, PL_RECIPE } from "../assets/lang";


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
        RECIPE: ENG_RECIPE,
        MISC: ENG_MISC,
      }
    case "polish":
      return {
        HEADER: PL_HEADER,
        SIDEBAR: PL_SIDEBAR,
        FILTERS: PL_FILTERS,
        NEW_RECIPE: PL_NEW_RECIPE,
        AUTH: PL_AUTH,
        ERRORS: PL_ERRORS,
        RECIPE: PL_RECIPE,
        MISC: PL_MISC,
      }
  }
}

export default useLanguage;