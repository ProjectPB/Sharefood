import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  renderTags,
  capitalizeLetter,
  TextAreaToArray,
} from "../../util/TextFormat";
import firebase from "firebase/app";
import { db, storage } from "../../firebase/utils";
import { CircularProgress } from "@material-ui/core";
import Input from "./../forms/Input";
import Textarea from "../forms/Textarea";
import Select from "../forms/Select";
import ImgInput from "../forms/ImgInput";
import Button from "./../forms/Button";
import "./styles.css";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const NewRecipe = ({ close }) => {
  const { currentUser } = useSelector(mapState);
  const [type, setType] = useState(null);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [method, setMethod] = useState("");
  const [portions, setPortions] = useState(1);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [previewImg, setPreviewImg] = useState(
    "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-7.jpg"
  );

  const changeImgFile = (e) => {
    const file = e.target.files[0];
    const typePattern = /image-*/;
    const maxSize = 20;

    if (!file?.type.match(typePattern)) {
      alert("Invalid format");
      return;
    } else if (file.size / (1024 * 1024) > maxSize) {
      alert(`Please attach an image with a size below ${maxSize}MB`);
      return;
    } else {
      setImage(e.target.files[0]);
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const imageName = new Date().getTime() + image.name;

    const uploadTask = storage.ref(`recipeImages/${imageName}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref("recipeImages")
          .child(imageName)
          .getDownloadURL()
          .then((url) => {
            db.collection("recipes").add({
              authorId: currentUser.uid,
              authorProfilePic: currentUser.profilePic,
              authorName: currentUser.displayName,
              type: type,
              title: capitalizeLetter(title),
              image: url,
              tags: renderTags(
                title,
                ingredients,
                type,
                currentUser.displayName
              ),
              ingredients: TextAreaToArray(ingredients),
              method: TextAreaToArray(method),
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              likesUsers: [],
              likesQuantity: 0,
              portions: portions,
            });
            alert("Recipe added, Please refresh the website");
            close();
          });
      }
    );
  };

  const titleConfig = {
    value: title,
    handleChange: (e) => setTitle(e.target.value),
    type: "text",
    required: true,
    spellCheck: false,
    label: "Title",
  };

  const ingredientsConfig = {
    value: ingredients,
    placeholder: "Use return buttons to separate ingredients",
    handleChange: (e) => setIngredients(e.target.value),
    spellCheck: false,
    label: "Ingredients",
    required: true,
  };

  const methodConfig = {
    value: method,
    placeholder: "Use return buttons to separate steps",
    handleChange: (e) => setMethod(e.target.value),
    spellCheck: false,
    label: "Method",
    required: true,
  };

  const portionsConfig = {
    value: portions,
    handleChange: (e) => setPortions(e.target.value),
    type: "number",
    min: "1",
    max: "20",
    required: true,
    label: "Portions",
  };

  const typeOptions = [
    {
      value: "",
      name: "Type",
      hidden: true,
    },
    {
      value: "breakfast",
      name: "Breakfast",
    },
    {
      value: "appetizer",
      name: "Appetizer",
    },
    {
      value: "soup",
      name: "Soup",
    },
    {
      value: "main",
      name: "Main",
    },
    {
      value: "dessert",
      name: "Dessert",
    },
    {
      value: "drink",
      name: "Drink",
    },
    {
      value: "other",
      name: "Other",
    },
  ];

  const typeConfig = {
    handleChange: (e) => setType(e.target.value),
    label: "Type",
    options: typeOptions,
    required: true,
  };

  const imgInputConfig = {
    image: image,
    previewImg: previewImg,
    handleChange: changeImgFile,
    type: "file",
    accept: "image/*",
    required: true,
  };

  return (
    <div className="newRecipe__container">
      {progress > 0 && progress < 100 && (
        <CircularProgress
          className="newRecipe__processingIcon"
          value={progress}
          size={60}
        />
      )}
      <form className="newRecipe" onSubmit={handleCreate}>
        <Input {...titleConfig} />
        <Textarea {...ingredientsConfig} />
        <Textarea {...methodConfig} />
        <Select {...typeConfig} />
        <Input {...portionsConfig} />
        <ImgInput {...imgInputConfig} />
        <div className="newRecipe__button">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
};

export default NewRecipe;
