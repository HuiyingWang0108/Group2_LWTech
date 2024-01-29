import React from 'react';

const FormStyles: React.FC = () => (
  <style>
    {`
      @charset "UTF-8";
      :root {
        --dark-blue: rgb(0, 95, 131);
        --font-size: 16px;
        --font-big-size: 30px;
        --border-radius: 16px;
        --font-style: Arial, Helvetica, sans-serif;
        --backgroud-color: rgba(0, 95, 131, 0.05);
      }
      
      .question-head {
        color: var(--dark-blue);
        font-family: Arial, Helvetica, sans-serif;
        font-size: var(--font-size);
        font-style: normal;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0.32px;
      }
      .custom-container {
        height: 350px;
        border-radius: var(--border-radius);
        margin: 10px;
      }
      .question-head {
        padding: 12px 13px;
        align-items: center;
        background: rgb(0, 95, 131);
        color: #FFF;
      }
      .question-choice {
        color: var(--dark-blue);
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 700;
      }
      .custom-row {
        padding: 30px;
      }
      #submit,
      #sendEmail {
        width: fit-content;
        background-color: var(--dark-blue);
        color: white;
        font-size: var(--font-big-size);
        margin-bottom: 60px;
      }
      .paragraph_description {
        color: var(--dark-blue);
        font-size: var(--font-size);
        font-family: var(--font-style);
        font-style: normal;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0.32px;
        padding: 10px;
      }
      h3 {
        font-family: var(--font-style);
        color: var(--dark-blue);
      }
      .custom-recommend-program {
        /* padding-top: 20px; */
        background-color: var(--backgroud-color);
      }
      .custom-option {
        border-radius: var(--border-radius);
        background-color: white;
        padding: 20px;
      }
      #myText {
        width: fit-content;
      }
      .form-select {
        width: fit-content;
      }
    `}
  </style>
);

export default FormStyles;
