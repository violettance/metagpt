import React from 'react';
import styled from 'styled-components';

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  top: 5px;
  right: 5px;
  display: none;
  z-index: 10;
`;

const TeamMemberContainer = styled.div`
  background-color: ${props => (props.isSelected ? props.theme.colors.primary : 'transparent')};
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  position: relative;
  width: 150px;
  height: 180px;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }

  &:hover ${DeleteButton} {
    display: block;
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const InfoContainer = styled.div`
  text-align: center;
`;

const Name = styled.div`
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: ${props => props.theme.fontSizes.cardTitle};
  color: ${props => props.theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Role = styled.div`
  font-size: ${props => props.theme.fontSizes.cardSubtitle};
  color: ${props => props.theme.colors.textSecondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TeamMember = ({ member, onSelect, isSelected, deleteTeamMember }) => {
  const handleDelete = (e) => {
    e.stopPropagation(); // prevent card selection when deleting
    deleteTeamMember(member.id);
  };

  return (
    <TeamMemberContainer
      onClick={() => onSelect(member.id)}
      isSelected={isSelected}
    >
      <DeleteButton onClick={handleDelete}>×</DeleteButton>
      <Avatar src={`/avatars/${member.avatar}`} alt={member.name} />
      <InfoContainer>
        <Name>{member.name}</Name>
        <Role>{member.role}</Role>
      </InfoContainer>
    </TeamMemberContainer>
  );
};

export default TeamMember; 