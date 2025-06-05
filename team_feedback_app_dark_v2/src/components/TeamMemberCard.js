import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContainer = styled.div`
  background-color: ${(props) => (props.isSelected ? props.theme.colors.primary : props.theme.colors.surface)};
  color: ${(props) => (props.isSelected ? props.theme.colors.text : props.theme.colors.text)};
  border-radius: 5px;
  padding: ${(props) => props.theme.spacing.medium};
  margin: ${(props) => props.theme.spacing.small};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.text};
  }
`;

const Name = styled.h3`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const Role = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

/**
 * @param {object} teamMember - The team member object.
 * @param {boolean} isSelected - Whether the team member is selected.
 * @param {function} onSelect - The function to call when the team member is selected.
 * @returns {JSX.Element} - The TeamMemberCard component.
 */
const TeamMemberCard = ({ teamMember, isSelected, onSelect }) => {
  const handleSelect = () => {
    onSelect(teamMember.id);
  };

  return (
    <CardContainer isSelected={isSelected} onClick={handleSelect}>
      <Name>{teamMember.name}</Name>
      <Role>{teamMember.role}</Role>
    </CardContainer>
  );
};

TeamMemberCard.propTypes = {
  teamMember: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default TeamMemberCard;
