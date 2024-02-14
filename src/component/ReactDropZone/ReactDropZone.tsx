import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import useImageUpload from "../../hooks/useImageUpload";
import "./ReactDropZone.css";
import { CustomFile, ReactDropZoneProps } from "../../types/types.portal";

const ReactDropZone: React.FC<ReactDropZoneProps> = ({
  setImageUrl,
  setFiles,
  files,
}) => {
  const [inValidMessages, setInValidMessages] = useState("");

  const [downloadUrl] = useImageUpload(files);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".png"],
      },
      onDrop: async (acceptedFiles) => {
        const isValidFile = await Promise.all(
          acceptedFiles.map((file) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                if (img.width === 160 && img.height === 80) {
                  setInValidMessages("");
                  resolve(true);
                } else {
                  setInValidMessages("Invalid image size");
                  resolve(false);
                }
              };
              img.src = URL.createObjectURL(file);
            });
          })
        );

        if (isValidFile.every((isValid) => isValid)) {
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
        } else {
          setImageUrl("");
          setInValidMessages("Please upload images with dimensions 160x80");
        }
      },
    });

  useEffect(() => {
    return () => {
      (files as CustomFile[]).forEach((file) =>
        URL.revokeObjectURL(file.preview)
      );
    };
  }, [files]);

  const thumbs = (files as CustomFile[]).map((file) => (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        <img
          src={file?.preview}
          className="img"
          alt={file.name}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const cssClasses = useMemo(() => {
    let classes = "dropzone-container";
    if (isFocused) classes += " focused";
    if (isDragAccept) classes += " accept";
    if (isDragReject) classes += " reject";
    return classes;
  }, [isFocused, isDragAccept, isDragReject]);

  useEffect(() => {
    if (downloadUrl) {
      setImageUrl(downloadUrl);
    }
  }, [downloadUrl]);

  return (
    <div>
      <div className="container">
        <div className={cssClasses} {...getRootProps()}>
          <input {...getInputProps()} />
          <span className="text-black text-sm">
            {inValidMessages ? (
              inValidMessages
            ) : (
              <aside className="thumbsContainer">{thumbs}</aside>
            )}
          </span>
          <p className="text-black text-sm">
            Drag 'n' drop some files here, or click to select files
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReactDropZone;
