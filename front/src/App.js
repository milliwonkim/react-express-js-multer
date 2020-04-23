import React, { useState } from "react";
import axios from "axios";
const BASE_URL = "http://localhost:5000";
export default function App() {

  const [content, setContent] = useState("");
  const [uploadedImg, setUploadedImg] = useState({
    fileName: "",
    fillPath: ""
  });

  const onChange = e => {
    setContent(e.target.files[0]);
  };

  const onSubmit = e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("img", content);

    axios
      .post("/upload", formData)
      .then(res => {
        const { fileName } = res.data;
        console.log(fileName);

        setUploadedImg({ fileName, filePath: `${BASE_URL}/img/${fileName}` });
        alert("The file is successfully uploaded");
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div style={{"display": "flex", "justify-content": "center", "align-items": "center", "width": "100vw", "height": "100vh"}}>
      <form onSubmit={onSubmit}>
        {uploadedImg ? (
          <div style={{"border": "3px solid black", "width": "400px", "height": "400px", "margin": "10px 0"}}>
            <img src={uploadedImg.filePath} width="400px" height="400px" alt="" />
            <h3>{uploadedImg.fileName}</h3>
          </div>
        ) : (
          ""
        )}
        <div>
          <input type="file" onChange={onChange} />
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );

}