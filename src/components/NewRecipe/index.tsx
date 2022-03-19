import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  renderTags,
  capitalizeLetter,
  TextAreaToArray,
} from "../../util/formatText";
import { createRecipeStart } from "../../redux/Recipes/recipes.actions";
import { resizeFile } from '../../shared/functions'
import { Handler, State } from "../../shared/types";

import Button from "../forms/Button";
import Loading from "../Loading";
import Title from './Title';
import Type from './Type';
import Ingredients from './Ingredients';
import Method from './Method';
import Portions from './Portions';
import Picture from './Picture';

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
  const [ingredients, setIngredients] = useState("");
  const [method, setMethod] = useState("");
  const [portions, setPortions] = useState(1);
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState<any>();
  const [cropperImg, setCropperImg] = useState("");
  const [cropData, setCropData] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setLoading(false);
      close();
      alert("Recipe added");
      navigate("/");
    }
  }, [progress, close, navigate]);

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
        const resizedFile: any = await resizeFile(file);
        setImage(resizedFile);
        setCropData(URL.createObjectURL(resizedFile));
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
    setLoading(true);
    dispatch(
      createRecipeStart({
        authorId: currentUser.uid,
        type: type,
        title: capitalizeLetter(title),
        tags: renderTags(title, ingredients, type, currentUser.displayName),
        ingredients: TextAreaToArray(ingredients),
        method: TextAreaToArray(method),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        likesUsers: [],
        likesQuantity: 0,
        portions: portions,
        imgFile: image,
        handleProgress: (val: number) => setProgress(val),
      })
    );
  };

  const config = {
    title: {
      handler: (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value), value: title
    },
    ingredients: {
      handler: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setIngredients(e.target.value), value: ingredients
    },
    method: {
      handler: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setMethod(e.target.value), value: method
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
    },
    submitButton: {
      type: "submit",
      disabled: loading || (!image && cropperImg),
    }
  }

  return (
    <div className="newRecipe__container">
      <form className="newRecipe" onSubmit={handleCreate}>
        <Title {...config.title} />
        <Ingredients {...config.ingredients} />
        <Method {...config.method} />
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
