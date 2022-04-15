import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createRecipeStart } from "../../redux/Recipes/recipes.actions";
import { capitalizeLetter, resizeFile } from '../../shared/functions'
import { Handler, State } from "../../shared/types";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";

import Button from "../forms/Button";
import Loading from "../Loading";
import Title from './Title';
import Type from './Type';
import Portions from './Portions';
import Picture from './Picture';
import TextEditor from "../TextEditor";

import "cropperjs/dist/cropper.css";
import "./styles.css";

const mapState = ({ user }: State) => ({
  currentUser: user.currentUser,
});

interface Props {
  close: () => void;
}

const NewRecipe: React.FC<Props> = ({ close }) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [portions, setPortions] = useState(1);
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
  const [methodEditor, setMethodEditor] = useState(() =>
    EditorState.createEmpty()
  );
  const [method, setMethod] = useState("");

  useEffect(() => {
    if (added) {
      setLoading(false);
      close();
      alert("Recipe added");
      navigate("/");
    }
  }, [added, close, navigate]);

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
      alert('Please enter ingredients');
      return
    };
    if (method.trim() === "<p></p>" || !method) {
      alert('Please enter a method');
      return
    };

    setLoading(true);
    dispatch(
      createRecipeStart({
        authorId: currentUser.uid,
        type: type,
        title: capitalizeLetter(title),
        ingredients: ingredients,
        method: method,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        likesUsers: [],
        likesQuantity: 0,
        portions: portions,
        imgFileHigh: imageHigh,
        imgFileLow: imageLow,
        handleAdd: (val: boolean) => setAdded(val),
      })
    );
  };

  const config = {
    title: {
      handler: (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value), value: title
    },

    type: {
      handler: (e: React.ChangeEvent<HTMLSelectElement>) =>
        setType(e.target.value), value: type,
    },
    portions: {
      handler: (e: Handler["number"]) => setPortions(e.target.value), value: portions
    },
    picture: {
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
    ingredients: {
      label: "Ingredients",
      editor: ingEditor,
      content: ingredients,
      update: (state: React.SetStateAction<EditorState> | any) => {
        setIngEditor(state);
        setIngredients(draftToHtml(convertToRaw(state.getCurrentContent())));
      },
    },
    method: {
      label: "Method",
      editor: methodEditor,
      content: method,
      update: (state: React.SetStateAction<EditorState> | any) => {
        setMethodEditor(state);
        setMethod(draftToHtml(convertToRaw(state.getCurrentContent())));
      },
    },
    submitButton: {
      type: "submit",
      disabled: loading || (!imageHigh && cropperImg),
    }
  }

  return (
    <div className="newRecipe__container">
      <form className="newRecipe" onSubmit={handleCreate}>
        <Title {...config.title} />
        <TextEditor {...config.ingredients} />
        <TextEditor {...config.method} />
        <Type {...config.type} />
        <Portions {...config.portions} />
        <Picture {...config.picture} />
        {loading && <Loading />}
        <div className="newRecipe__button">
          <Button {...config.submitButton}>Create</Button>
        </div>
      </form >
    </div >
  );
};

export default NewRecipe;
