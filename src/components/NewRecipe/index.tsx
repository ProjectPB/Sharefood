import React, { useEffect, useState } from "react";
import { useLanguage } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { capitalize, getValuesFromSelect, resizeFile } from '../../shared/functions'
import { Handler, Option, State } from "../../shared/types";
import { createRecipeStart } from "../../redux/Recipe/recipe.actions";
import { resetRecipes } from "../../redux/Recipes/recipes.actions";

import Button from "../forms/Button";
import Loading from "../Loading";
import Title from './Title';
import Type from './Type';
import Tags from './Tags';
import Portions from './Portions';
import Picture from './Picture';
import TextEditor from "../forms/TextEditor";

import "cropperjs/dist/cropper.css";
import "./styles.scss";

const mapState = ({ user, ui }: State) => ({
  currentUser: user.currentUser,
  language: ui.language,
});

interface Props {
  close: () => void;
}

const NewRecipe: React.FC<Props> = ({ close }) => {
  const { currentUser, language } = useSelector(mapState);
  const dispatch = useDispatch();
  const LANG = useLanguage();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [portions, setPortions] = useState(1);
  const [tags, setTags] = useState([]);
  const [imageHigh, setImageHigh] = useState(null);
  const [imageLow, setImageLow] = useState(null);
  const [cropper, setCropper] = useState<any>();
  const [cropperImg, setCropperImg] = useState("");
  const [cropData, setCropData] = useState("");
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ingEditor, setIngEditor] = useState(() =>
    EditorState.createEmpty()
  );
  const [ingredients, setIngredients] = useState("");
  const [descriptionEditor, setDescriptionEditor] = useState(() =>
    EditorState.createEmpty()
  );
  const [description, setDescription] = useState("");
  const [methodEditor, setMethodEditor] = useState(() =>
    EditorState.createEmpty()
  );
  const [method, setMethod] = useState("");

  useEffect(() => {
    if (added) {
      setLoading(false);
      close();
      alert("Recipe added");
      dispatch(resetRecipes());
    }
  }, [added, close, navigate, dispatch]);

  const changeImgFile = async (e: Handler["file"]) => {
    const file = e.target.files[0];
    setCropperImg(URL.createObjectURL(file));
  };

  const acceptCropData = (e: Handler['void']) => {
    e.preventDefault();
    if (typeof cropper !== "undefined") {
      setLoading(true);
      cropper.getCroppedCanvas().toBlob(async function (blob: Blob) {
        const file = new File([blob], currentUser.uid + title);
        const resizedFileHigh: any = await resizeFile(file, 400, 400);
        const resizedFileLow: any = await resizeFile(file, 100, 100);
        setImageHigh(resizedFileHigh);
        setImageLow(resizedFileLow);
        setCropData(URL.createObjectURL(resizedFileHigh));
        setLoading(false);
      }, 'image/jpg');
    }
  };

  const rotateCrop = (e: Handler['void']) => {
    e.preventDefault();
    cropper.rotate(90);
  }

  const removeCrop = (e: Handler['void']) => {
    e.preventDefault();
    setCropperImg('');
  }

  const handleCreate = (e: Handler["form"]) => {
    e.preventDefault();
    if (ingredients.trim() === "<p></p>" || !ingredients) {
      alert(LANG.NEW_RECIPE.NO_INGREDIENTS);
      return
    };

    if (method.trim() === "<p></p>" || !method) {
      alert(LANG.NEW_RECIPE.NO_METHOD);
      return
    };

    if (!type) {
      alert(LANG.NEW_RECIPE.NO_TYPE);
      return
    };

    setLoading(true);

    dispatch(
      createRecipeStart({
        authorId: currentUser.uid,
        type: type,
        title: capitalize(title),
        description: description,
        ingredients: ingredients,
        tags: getValuesFromSelect(tags),
        method: method,
        portions: portions,
        imgFileHigh: imageHigh,
        imgFileLow: imageLow,
        handleAdd: (val: boolean) => setAdded(val),
        language: language,
      })
    );
  };

  const config = {
    title: {
      label: LANG.NEW_RECIPE.TITLE,
      handler: (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value), value: title
    },
    portions: {
      label: LANG.NEW_RECIPE.PORTIONS,
      handler: (e: Handler["number"]) => setPortions(e.target.value), value: portions
    },
    picture: {
      label: LANG.NEW_RECIPE.IMG_PLACEHOLDER,
      label_remove: LANG.NEW_RECIPE.REMOVE_IMG,
      label_accept: LANG.NEW_RECIPE.ACCEPT_IMG,
      cropperImg: cropperImg,
      cropData: cropData,
      changeImgFile: changeImgFile,
      initCropper: (instance: any) => {
        setCropper(instance);
      },
      acceptCropData: acceptCropData,
      rotateCrop: rotateCrop,
      removeCrop: removeCrop,
      loadingPicture: loading
    },
    description: {
      label: LANG.NEW_RECIPE.DESCRIPTION,
      editor: descriptionEditor,
      content: description,
      update: (state: React.SetStateAction<EditorState> | any) => {
        setDescriptionEditor(state);
        setDescription(draftToHtml(convertToRaw(state.getCurrentContent())));
      },
    },
    ingredients: {
      label: LANG.NEW_RECIPE.INGREDIENTS,
      editor: ingEditor,
      content: ingredients,
      update: (state: React.SetStateAction<EditorState> | any) => {
        setIngEditor(state);
        setIngredients(draftToHtml(convertToRaw(state.getCurrentContent())));
      },
    },
    method: {
      label: LANG.NEW_RECIPE.METHOD,
      editor: methodEditor,
      content: method,
      update: (state: React.SetStateAction<EditorState> | any) => {
        setMethodEditor(state);
        setMethod(draftToHtml(convertToRaw(state.getCurrentContent())));
      },
    },
    type: {
      options: LANG.NEW_RECIPE.TYPE_OPTIONS,
      placeholder: LANG.NEW_RECIPE.SELECT_PLACEHOLDER,
      label: LANG.NEW_RECIPE.TYPE,
      update: (option: Option) => {
        setType(option.value);
      },
    },
    tags: {
      options: LANG.NEW_RECIPE.TAGS_OPTIONS,
      placeholder: LANG.NEW_RECIPE.SELECT_PLACEHOLDER,
      label: LANG.NEW_RECIPE.TAGS,
      update: (option: Option[]) => {
        setTags(option);
      },
    },
    submitButton: {
      type: "submit",
      disabled: loading || (!imageHigh && cropperImg),
    }
  }

  return (
    <div className="newRecipe" >
      <form className="newRecipe__body" onSubmit={handleCreate}>
        <div className="newRecipe__title">
          <h1>{LANG.NEW_RECIPE.LABEL}</h1>
        </div>

        <Title {...config.title} />
        <TextEditor {...config.description} />
        <TextEditor {...config.ingredients} />
        <TextEditor {...config.method} />
        <Portions {...config.portions} />
        <Type {...config.type} />
        <Tags {...config.tags} />
        <Picture {...config.picture} />
        {loading && <Loading />}
        <div className="newRecipe__button">
          <Button {...config.submitButton}>{LANG.NEW_RECIPE.CREATE}</Button>
        </div>
      </form>
    </div >
  );
};

export default NewRecipe;
