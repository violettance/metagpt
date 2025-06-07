import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border-radius: 12px;
  padding: ${props => props.theme.spacing.large};
  width: 500px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.medium};
  }
  max-width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.large};
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${props => props.theme.fontSizes.large};
  font-weight: ${props => props.theme.fontWeights.medium};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.medium};
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.large};
  cursor: pointer;
`;

const FormTextarea = styled.textarea`
  width: calc(100% - 24px); /* Account for padding of parent */
  padding: 12px;
  font-size: ${props => props.theme.fontSizes.medium};
  border: 1px solid ${props => props.theme.colors.primary};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 10px;
    font-size: 14px;
    width: calc(100% - 20px); /* Account for new padding */
  }
  border-radius: 8px;
  margin-bottom: ${props => props.theme.spacing.large};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textSecondary};
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`;

const AddButton = styled.button`
  padding: 12px 24px;
  font-size: ${props => props.theme.fontSizes.medium};
  background-color: ${props => props.theme.colors.button};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 10px 20px;
    font-size: 14px;
  }
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;

const AddFeedbackModal = ({ isOpen, onClose, onAdd }) => {
  const [text, setText] = useState('');

  const handleAddClick = () => {
    if (text.trim() !== '') {
      onAdd(text);
      setText('');
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Add Feedback</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <FormTextarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your feedback"
        />
        <AddButton onClick={handleAddClick}>Add Feedback</AddButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AddFeedbackModal; 