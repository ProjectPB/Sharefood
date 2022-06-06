import { State } from "../shared/types";
import { useSelector } from "react-redux";

import { ENG_HEADER, PL_HEADER } from './../assets/lang/header';
import { ENG_SIDEBAR, PL_SIDEBAR } from './../assets/lang/sidebar';
import { ENG_FILTERS, PL_FILTERS } from './../assets/lang/filters';

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
      }
    case "polish":
      return {
        HEADER: PL_HEADER,
        SIDEBAR: PL_SIDEBAR,
        FILTERS: PL_FILTERS,
      }
  }
}

export default useLanguage;