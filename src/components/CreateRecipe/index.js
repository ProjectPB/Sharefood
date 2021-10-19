import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeNewRecipe,
  selectNewRecipeIsOpen,
} from "../../redux/features/newRecipeSlice";
import { selectUser } from "../../redux/features/userSlice";
import {
  renderTags,
  capitalizeLetter,
  TextAreaToArray,
} from "../../util/TextFormat";
import { Close } from "@material-ui/icons";
import { db, storage } from "../../firebase/firebase";
import firebase from "firebase/app";
import { CircularProgress } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./styles.css";

const CreateRecipe = () => {
  const [type, setType] = useState(null);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [method, setMethod] = useState("");
  const [portions, setPortions] = useState(1);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState(
    "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-7.jpg"
  );
  const dispatch = useDispatch();
  const newRecipeIsOpen = useSelector(selectNewRecipeIsOpen);
  const user = useSelector(selectUser);

  const closeRecipe = () => {
    if (newRecipeIsOpen) {
      dispatch(closeNewRecipe());
    }
  };

  const handleFileChange = (e) => {
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
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const validate = () => {
    const inputs = [type, title, ingredients, method, image, portions];

    let checkedInputs =
      inputs.every((input) => input) && portions > 0 && portions <= 99;

    return checkedInputs;
  };

  const handleCreate = (e) => {
    e.preventDefault();

    validate();

    if (!validate()) {
      return alert("Please make sure that all fields are filled properly.");
    }

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
              authorId: user.uid,
              authorProfilePic: user.profilePic,
              authorName: user.displayName,
              type: type,
              title: capitalizeLetter(title),
              image: url,
              tags: renderTags(title, ingredients, type, user.displayName),
              ingredients: TextAreaToArray(ingredients),
              method: TextAreaToArray(method),
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              likesUsers: [],
              likesQuantity: 0,
              portions: portions,
            });
            alert("Recipe added, Please refresh the website");
            dispatch(closeNewRecipe());
          });
      }
    );
  };

  return (
    <div className="createRecipe__container">
      {progress > 0 && progress < 100 && (
        <CircularProgress
          className="createRecipe__processingIcon"
          value={progress}
          size={60}
        />
      )}
      <form className="createRecipe">
        <Close className="createRecipe__close" onClick={closeRecipe} />
        <div className="createRecipe__title">
          <h3>Title</h3>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            required
            spellCheck="false"
          />
        </div>
        <div className="createRecipe__ingredientsText">
          <h3>Ingredients</h3>
          <textarea
            placeholder="Use return buttons to separate ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            spellCheck="false"
          />
        </div>
        <div className="createRecipe__methodText">
          <h3>Method</h3>
          <textarea
            placeholder="Use return buttons to separate steps"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            spellCheck="false"
          />
        </div>
        <div className="createRecipe__types">
          <h3>Type</h3>
          <select
            onChange={(e) => setType(e.target.value)}
            className="createRecipe__options"
          >
            <option value="" hidden>
              Type
            </option>
            <option value="breakfast">Breakfast</option>
            <option value="appetizer">Appetizer</option>
            <option value="soup">Soup</option>
            <option value="main">Main</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="createRecipe__portions">
          <h3>Portions</h3>
          <input
            value={portions}
            onChange={(e) => setPortions(e.target.value)}
            type="number"
            required
            min="1"
          />
        </div>
        <div className="createRecipe__image">
          <img src={previewImage} alt="image" />
          {!image && <p>For the best results, please attach 4:3 image</p>}
          {!image && <AddCircleIcon />}
          <input
            type="file"
            onChange={handleFileChange}
            className="createRecipe__imageInput"
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="createRecipe__button"
          onClick={handleCreate}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
