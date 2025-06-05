## src/components/FeedbackInput.js
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { generateFeedbackId } from '../utils/localStorage';

const InputContainer = styled.div`
  padding: ${(props) => props.theme.spacing.medium};
  display: flex;
  flex-direction: column;
`;

const Input = styled.textarea`
  padding: ${(props) => props.theme.spacing.small};
  font-size: ${(props) => props.theme.fontSizes.medium};
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: ${(props) => props.theme.spacing.small};
  resize: none; /* Prevent manual resizing */
  height: 100px; /* Set a fixed height */
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const SaveButton = styled.button`
  padding: ${(props) => props.theme.spacing.small};
  font-size: ${(props) => props.theme.fontSizes.medium};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

/**
 * @param {string} selectedTeamMemberId - The ID of the selected team member.
 * @param {function} onSaveFeedback - The function to call when the feedback is saved.
 * @returns {JSX.Element} - The FeedbackInput component.
 */
const FeedbackInput = ({ selectedTeamMemberId = '', onSaveFeedback = () => {} }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSaveClick = () => {
    if (inputText.trim() !== '') {
      const newFeedback = {
        id: generateFeedbackId(),
        text: inputText,
        timestamp: Date.now(),
      };
      onSaveFeedback(newFeedback);
      setInputText(''); // Clear the input after saving
    }
  };

  const isSaveButtonDisabled = inputText.trim() === '';

  return (
    <InputContainer>
      <Input
        placeholder="Enter feedback here..."
        value={inputText}
        onChange={handleInputChange}
      />
      <SaveButton onClick={handleSaveClick} disabled={isSaveButtonDisabled}>
        Save Feedback
      </SaveButton>
    </InputContainer>
  );
};

FeedbackInput.propTypes = {
  selectedTeamMemberId: PropTypes.string,
  onSaveFeedback: PropTypes.func,
};

export default FeedbackInput;
