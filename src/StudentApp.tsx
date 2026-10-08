import '../src/StudentApp.css';
import type { RefCallback } from 'react';

export interface Option {
  label: string;
  value: string;
  correct?: boolean;
}

export interface Question {
  question: string;
  type:
    | 'text'
    | 'multiple-choice'
    | 'checkbox'
    | 'radio'
    | 'dropdown'
    | 'date'
    | 'number'
    | 'url'
    | 'file';
  required?: boolean;
  options?: Option[];
}

export interface AppProps {
  assignment: string;
  dueDate: string;
  questions?: Question[];
  iframeUrl?: string;
  canvasRef?: RefCallback<HTMLCanvasElement>;
}

export default function StudentApp({
  assignment,
  dueDate,
  questions = [],
  canvasRef,
}: AppProps) {
  const renderInputControl = (q: Question, qIndex: number) => {
    const inputName = `question-${qIndex}`;

    switch (q.type) {
      case 'dropdown':
        return (
          <select name={inputName} required={q.required} className="question-select">
            <option value="">-- Select an option --</option>
            {q.options?.map((opt, oIndex) => (
              <option key={oIndex} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
      case 'multiple-choice':
        return (
          <div className="options-group options-radio">
            {q.options?.map((opt, oIndex) => (
              <label key={oIndex} className="option-label">
                <input
                  type="radio"
                  name={inputName}
                  value={opt.value}
                  required={q.required}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="options-group options-checkbox">
            {q.options?.map((opt, oIndex) => (
              <label key={oIndex} className="option-label">
                <input
                  type="checkbox"
                  name={`${inputName}[]`}
                  value={opt.value}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case 'date':
        return <input type="date" name={inputName} required={q.required} className="question-input" />;

      case 'number':
        return <input type="number" name={inputName} required={q.required} className="question-input" />;

      case 'url':
        return (
          <input
            type="url"
            name={inputName}
            placeholder="https://..."
            required={q.required}
            className="question-input"
          />
        );

      case 'file':
        return <input type="file" name={inputName} required={q.required} className="question-input" />;

      case 'text':
      default:
        return (
          <input
            type="text"
            name={inputName}
            required={q.required}
            placeholder="Type your answer here..."
            className="question-input"
          />
        );
    }
  };

  return (
    <div className="student-app">
      <h1 className="assignment-title">{assignment}</h1>
      <p className="due-date">Due Date: {dueDate}</p>

      <div className="assignment-canvas-container">
        <h2>Launch Assignment {assignment}</h2>
        <canvas ref={canvasRef} aria-label="Interactive assignment canvas" className="assignment-canvas" />
      </div>

      <hr className="divider" />

      {questions.length > 0 && (
        <div className="questions-section">
          <h2>Questions</h2>
          <form className="assignment-form">
            <ul className="questions-list">
              {questions.map((q, index) => (
                <li key={index} className="question-item">
                  <label className="question-label">
                    <span className="question-number">{index + 1}.</span> {q.question}
                    {q.required && <span className="required">*</span>}
                  </label>
                  <div className="input-wrapper">{renderInputControl(q, index)}</div>
                </li>
              ))}
            </ul>
            <p className="required-notice">
              <span className="required">*</span> indicates a required field
            </p>
            <button type="submit" className="submit-button">
              Submit Assignment
            </button>
          </form>
        </div>
      )}
    </div>
  );
}