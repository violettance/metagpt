import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TeamMemberCard from './TeamMemberCard.jsx';

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: ${(props) => props.theme.spacing.medium};
`;

/**
 * @param {array} teamMembers - The array of team member objects.
 * @param {string} selectedTeamMemberId - The ID of the selected team member.
 * @param {function} onSelect - The function to call when a team member is selected.
 * @returns {JSX.Element} - The TeamMemberList component.
 */
const TeamMemberList = ({ teamMembers = [], selectedTeamMemberId = '', onSelect = () => {} }) => {
  return (
    <ListContainer>
      {teamMembers.map((teamMember) => (
        <TeamMemberCard
          key={teamMember.id}
          teamMember={teamMember}
          isSelected={teamMember.id === selectedTeamMemberId}
          onSelect={onSelect}
        />
      ))}
    </ListContainer>
  );
};

TeamMemberList.propTypes = {
  teamMembers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedTeamMemberId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default TeamMemberList;
