import React, { useState } from "react";
import "./styles.css";

import "!!style-loader!css-loader!./slds/styles/salesforce-lightning-design-system.min.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [isScientific, setIsScientific] = useState(false);

  const evalExpression = (expression) => {
    return eval(expression);
  };

  const customOutlinedButton = (value) => (
    <button
      onClick={() => onButtonPress(value)}
      className="slds-button slds-button_outline-brand outlined-button"
    >
      {value}
    </button>
  );

  const onButtonPress = (value) => {
    setResult("");

    setText((prevText) => {
      return value === "C"
        ? ""
        : value === "="
          ? evalExpression(prevText).toString()
          : value === "⌫"
            ? prevText.slice(0, -1)
            : value === "+/-"
              ? prevText.length > 0 && !prevText.startsWith("-")
                ? "-" + prevText
                : prevText.length > 0 && prevText.startsWith("-")
                  ? prevText.substring(1)
                  : prevText
              : value === "%"
                ? (evalExpression(prevText) / 100).toString()
                : prevText + value;
    });
  };

  return (
    <div className="slds-scope">
      <header className="slds-grid slds-grid_align-spread slds-p-around_medium slds-background_color-brand">
        <h1 className="slds-text-heading_large">
          {isScientific ? "Scientific Calculator" : "Calculator"}
        </h1>
        <div className="slds-form-element">
          <label className="slds-checkbox_toggle slds-grid">
            <span className="slds-form-element__label">Regular</span>
            <input
              type="checkbox"
              checked={isScientific}
              onChange={(e) => setIsScientific(e.target.checked)}
              className="slds-checkbox"
            />
            <span
              aria-live="assertive"
              aria-atomic="true"
              className="slds-checkbox_faux_container"
            >
              <span className="slds-checkbox_faux"></span>
              <span className="slds-checkbox_on">On</span>
              <span className="slds-checkbox_off">Off</span>
            </span>
          </label>
          <label className="slds-checkbox_toggle slds-grid">
            <span className="slds-form-element__label">Scientific</span>
          </label>
        </div>
      </header>
      <div className="slds-m-around_medium">
        <div className="slds-grid slds-grid_align-center">
          <div className="slds-size_1-of-1">
            <div className="slds-m-bottom_medium slds-grid slds-grid_align-center">
              <div className="slds-col">
                <div className="slds-box slds-box_x-small slds-theme_default">
                  {result === "" ? text : result}
                </div>
              </div>
            </div>
            <div className="slds-grid slds-grid_pull-padded">
              <div className="slds-p-horizontal_xx-small slds-size_1-of-4">
                {customOutlinedButton("C")}
              </div>
              <div className="slds-p-horizontal_xx-small slds-size_1-of-4">
                {customOutlinedButton("7")}
              </div>
              <div className="slds-p-horizontal_xx-small slds-size_1-of-4">
                {customOutlinedButton("8")}
              </div>
              <div className="slds-p-horizontal_xx-small slds-size_1-of-4">
                {customOutlinedButton("9")}
              </div>
              {/* ... rest of your button rows */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
