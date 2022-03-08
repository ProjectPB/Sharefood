import Resizer from "react-image-file-resizer";

export const resizeFile = (file: Blob): Promise<string | unknown> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      400,
      400,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });