import React, { useState } from 'react';

export default function TextForm(props) {
  const [text, setText] = useState("");

  // Convert text to uppercase
  const handleUpClick = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to Uppercase!", "success");
  };

  // Convert text to lowercase
  const handleLoClick = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to Lowercase!", "success");
  };

  // Clear text
  const handleClearClick = () => {
    setText("");
    props.showAlert("Text cleared!", "success");
  };

  // Handle textarea change
  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  // Copy text to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text copied!", "success");
  };

  // Remove extra spaces
  const handleExtraSpaces = () => {
    setText(text.split(/[ ]+/).join(" "));
    props.showAlert("Removed extra spaces!", "success");
  };

  // Styling for textarea
  const textAreaStyle = {
    backgroundColor:
      props.modeGreen === 'green' ? '#84d486ff' :
      props.mode === 'dark' ? '#13466e' :
      'white',
    color:
      props.modeGreen === 'green' ? '#11231a' :
      props.mode === 'dark' ? 'white' :
      'black'
  };

  // Styling for text summary container
  const containerTextColor = {
    color:
      props.modeGreen === 'green' ? '#101a15' :
      props.mode === 'dark' ? 'white' :
      'black'
  };

  // Word count logic
  const wordCount = text.trim().split(/\s+/).filter(e => e.length !== 0).length;

  return (
    <>
      <div className="container" style={containerTextColor}>
        <h1 className="mb-2">{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={textAreaStyle}
            id="myBox"
            rows="8"
          ></textarea>
        </div>

        {/* Buttons */}
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
      </div>

      {/* Text summary */}
      <div className="container my-3" style={containerTextColor}>
        <h2>Your text summary</h2>
        <p>{wordCount} words and {text.length} characters</p>
        <p>{(0.008 * wordCount).toFixed(2)} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview"}</p>
      </div>
    </>
  );
}
