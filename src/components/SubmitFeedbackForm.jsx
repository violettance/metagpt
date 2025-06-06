import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.large};
  border-radius: 12px;
  margin-bottom: 32px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.disabled};
  border-radius: 8px;
  padding: 12px;
  color: ${props => props.theme.colors.textSecondary};
  min-height: 80px;
  font-family: inherit;
  font-size: ${props => props.theme.fontSizes.medium};
  resize: vertical;
`;

const SubmitButton = styled.button`
  margin-top: ${props => props.theme.spacing.medium};
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.text};
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: ${props => props.theme.fontWeights.medium};
  cursor: pointer;
  
  &:disabled {
    background-color: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const SubmitFeedbackForm = ({ onSubmit }) => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedbackText.trim()) {
      onSubmit(feedbackText);
      setFeedbackText('');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTextarea
        placeholder="Write your feedback here..."
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
      />
      <SubmitButton type="submit" disabled={!feedbackText.trim()}>
        Submit Feedback
      </SubmitButton>
    </FormContainer>
  );
};

export default SubmitFeedbackForm; 