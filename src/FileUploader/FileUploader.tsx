import React from "react";
import styles from "./FileUploader.module.css";

interface fileDataType {
  url: string;
  name: string;
  size: number;
}

const FileUploader = () => {
  const [files, setFiles] = React.useState<fileDataType[]>([]);

  const [isDraging, setIsDraging] = React.useState<boolean>(false);
  const dragCounter = React.useRef(0);

  function setFileInState(file: File) {
    const url = URL.createObjectURL(file);
    const name = file.name;
    const size = file.size;

    const currentFileData = {
      url,
      name,
      size,
    };
    setFiles((prev) => [currentFileData, ...prev]);
  }

  function handleDragEnter(el: React.DragEvent<HTMLDivElement>) {
    el.preventDefault();
    dragCounter.current += 1;
    setIsDraging(true);
  }

  function handleDragExit(el: React.DragEvent<HTMLDivElement>) {
    el.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current == 0) {
      setIsDraging(false);
    }
  }

  function handleOnDrop(el: React.DragEvent<HTMLDivElement>) {
    el.preventDefault();
    const file = el.dataTransfer.files[0];
    if (file) {
      setFileInState(file);
      setIsDraging(false);
    }
  }

  function handleUploadFile() {
    const inputFile = document.createElement("input");
    inputFile.setAttribute("type", "file");
    inputFile.setAttribute("accept", "image/*");
    inputFile.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        setFileInState(file);
      }
    };
    inputFile.click();
  }

  function deleteFileFromUploaded(index: number) {
    setFiles((prev) => prev.filter((_, fIndex) => fIndex !== index));
  }

  return (
    <div className={styles.uploadContainer}>
      <div
        className={`${styles.uploadArea} ${isDraging && styles.active}`}
        onClick={handleUploadFile}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragExit}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={handleOnDrop}
      >
        <h2>Drag and Drop File here or</h2>
        <h3>Browser Files</h3>
      </div>
      {files.length > 0 && (
        <div className={styles.uploadFiles}>
          <h2>Upload Files</h2>
          <div className={styles.files}>
            {files.map((file, index) => (
              <div className={styles.file} key={index}>
                <div className={styles.fileInfo}>
                  <img src={file.url} alt="image" />
                  <div className={styles.fileTitles}>
                    <p className={styles.name}>{file.name}</p>
                    <p className={styles.size}>{file.size}</p>
                  </div>
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteFileFromUploaded(index)}
                >
                  ❌
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
