import React from 'react';
import Cropper from "react-cropper";
import { RotateRight } from '@material-ui/icons';
import { Handler } from '../../../shared/types';

import Button from '../../forms/Button';
import ImgInput from '../../forms/ImgInput';

import './styles.scss';

interface Props {
  label: string,
  label_remove: string,
  label_accept: string,
  cropperImg: string,
  cropData: string,
  initCropper: (instance: any) => void;
  acceptCropData: (e: Handler['void']) => void;
  rotateCrop: (e: Handler['void']) => void;
  removeCrop: (e: Handler['void']) => void;
  changeImgFile: (e: Handler["file"]) => Promise<void>;
  loadingPicture: boolean;
}

const Picture: React.FC<Props> = ({ label, label_remove, label_accept, cropperImg, initCropper, acceptCropData, rotateCrop, removeCrop, cropData, changeImgFile, loadingPicture }) => {
  const acceptButtonConfig = {
    onClick: acceptCropData,
    secondary: false
  }

  const removeButtonConfig = {
    onClick: removeCrop,
    secondary: true,
  }

  const imgInputConfig = {
    handleChange: changeImgFile,
    type: "file",
    accept: "image/*",
    required: true,
    label: label,
  };

  return (
    <div className="picture">
      {!cropperImg && <ImgInput {...imgInputConfig} />}
      {(cropperImg && !cropData) &&
        <div className='picture__cropper'>
          <Cropper
            style={{ maxWidth: 400, margin: '0 auto' }}
            initialAspectRatio={1}
            aspectRatio={4 / 3}
            src={cropperImg}
            viewMode={1}
            background={false}
            autoCropArea={1}
            guides={true}
            onInitialized={initCropper}
          />

          {!loadingPicture && <div className="picture__settings">
            <div className="picture__rotateIcon">
              <RotateRight onClick={rotateCrop} />
            </div>
            <div className="picture__buttons">
              <Button {...removeButtonConfig}>{label_remove}</Button>
              <Button {...acceptButtonConfig}>{label_accept}</Button>
            </div>
          </div>}
        </div>
      }
      {cropData && <img className="picture__preview" src={cropData} alt="recipe preview" />}
    </div>
  )
}

export default Picture;