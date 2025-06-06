import React from 'react';
import styled from 'styled-components';
import TeamMember from './TeamMember.jsx';

const TeamContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.xlarge};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.sectionTitle};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const AddButton = styled.button`
  background-color: ${props => props.theme.colors.button};
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
`;

const TeamMemberList = styled.div`
  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: ${props => props.theme.spacing.medium};
  padding-bottom: ${props => props.theme.spacing.medium};

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    height: 8px;
    background: ${props => props.theme.colors.background};
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }
  scrollbar-color: ${props => props.theme.colors.primary} ${props => props.theme.colors.background};
  scrollbar-width: thin;
`;

const Team = ({ teamMembers, onSelectMember, selectedMemberId, openAddMemberModal, deleteTeamMember }) => {
  return (
    <TeamContainer>
      <SectionHeader>
        <SectionTitle>Team</SectionTitle>
        <AddButton onClick={openAddMemberModal}>+ Add Member</AddButton>
      </SectionHeader>
      <TeamMemberList>
        {teamMembers.map(member => (
          <TeamMember
            key={member.id}
            member={member}
            onSelect={onSelectMember}
            isSelected={selectedMemberId === member.id}
            deleteTeamMember={deleteTeamMember}
          />
        ))}
      </TeamMemberList>
    </TeamContainer>
  );
};

export default Team; 