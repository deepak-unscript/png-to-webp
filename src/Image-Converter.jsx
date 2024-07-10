import { useState } from "react";
import imageCompression from "browser-image-compression";

const ImageConverter = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    // if (file && file.type === "image/png") {
    setOriginalFile(URL.createObjectURL(file));
    setOriginalSize(file.size);

    const options = {
      //   maxSizeMB: 1,
      useWebWorker: true,
      fileType: "image/webp",
    };

    try {
      const compressedFile = await imageCompression(file, options);
      setCompressedFile(URL.createObjectURL(compressedFile));
      setCompressedSize(compressedFile.size);
    } catch (error) {
      console.error("Error compressing the file", error);
    }
    // } else {
    //   alert("Please upload a PNG file");
    // }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {originalFile && (
        <div>
          <h3>Original File: PNG</h3>
          <img src={originalFile} alt="Original PNG" width="400" />
          <p>Size: {(originalSize / 1024).toFixed(2)} KB</p>
          <p>Size: {(originalSize / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      )}
      {compressedFile && (
        <div>
          <h3>Converted File (WebP):</h3>
          <img src={compressedFile} alt="Converted WebP" width="400" />
          <p>Size: {(compressedSize / 1024).toFixed(2)} KB</p>
          <p>Size: {(compressedSize / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
