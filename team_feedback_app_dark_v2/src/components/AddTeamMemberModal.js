## src/components/AddTeamMemberModal.js
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { generateTeamMemberId } from '../utils/localStorage';

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
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};
  border-radius: 5px;
  padding: ${(props) => props.theme.spacing.medium};
  width: 500px;
  max-width: 90%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.large};
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.large};
  cursor: pointer;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing.small};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

const InputField = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.small};
  font-size: ${(props) => props.theme.fontSizes.medium};
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: ${(props) => props.theme.spacing.medium};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const AddButton = styled.button`
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
`;

/**
 * @param {boolean} isOpen - Whether the modal is open.
 * @param {function} onClose - The function to call when the modal is closed.
 * @param {function} onAdd - The function to call when a team member is added.
 * @returns {JSX.Element} - The AddTeamMemberModal component.
 */
const AddTeamMemberModal = ({ isOpen = false, onClose = () => {}, onAdd = () => {} }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleAddClick = () => {
    if (name.trim() !== '' && role.trim() !== '') {
      const newTeamMember = {
        id: generateTeamMemberId(),
        name: name,
        role: role,
      };
      onAdd(newTeamMember);
      setName('');
      setRole('');
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
          <ModalTitle>Add Team Member</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <InputLabel htmlFor="name">Name:</InputLabel>
        <InputField
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter name"
        />
        <InputLabel htmlFor="role">Role:</InputLabel>
        <InputField
          type="text"
          id="role"
          value={role}
          onChange={handleRoleChange}
          placeholder="Enter role"
        />
        <AddButton onClick={handleAddClick}>Add</AddButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

AddTeamMemberModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddTeamMemberModal;
