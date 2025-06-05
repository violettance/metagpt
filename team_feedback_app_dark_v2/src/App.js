## src/App.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TeamMemberList from './components/TeamMemberList';
import FeedbackList from './components/FeedbackList';
import FeedbackInput from './components/FeedbackInput';
import AddTeamMemberModal from './components/AddTeamMemberModal';
import { getTeamMembers, saveTeamMembers, getFeedbacks, saveFeedbacks, generateTeamMemberId, generateFeedbackId } from './utils/localStorage';
import { GlobalStyle, theme } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.medium};
`;

const Content = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.medium};
`;

const AddTeamMemberButton = styled.button`
  padding: ${props => props.theme.spacing.small};
  font-size: ${props => props.theme.fontSizes.medium};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: ${props => props.theme.spacing.medium};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const ToastMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1001;
`;

/**
 * Main application component.
 * Manages team members, feedbacks, and UI state.
 * @returns {JSX.Element} - The App component.
 */
const App = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState('');
  const [feedbacks, setFeedbacks] = useState({});
  const [isAddTeamMemberModalOpen, setIsAddTeamMemberModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Load data from local storage on component mount
    const storedTeamMembers = getTeamMembers();
    const storedFeedbacks = getFeedbacks();
    setTeamMembers(storedTeamMembers);
    setFeedbacks(storedFeedbacks);
  }, []);

  useEffect(() => {
    // Save team members to local storage whenever it changes
    saveTeamMembers(teamMembers);
  }, [teamMembers]);

  useEffect(() => {
    // Save feedbacks to local storage whenever it changes
    saveFeedbacks(feedbacks);
  }, [feedbacks]);

  const handleTeamMemberSelect = (teamMemberId) => {
    setSelectedTeamMemberId(teamMemberId);
  };

  const handleSaveFeedback = (newFeedback) => {
    if (!selectedTeamMemberId) {
      return;
    }

    const updatedFeedbacks = {
      ...feedbacks,
      [selectedTeamMemberId]: [...(feedbacks[selectedTeamMemberId] || []), newFeedback],
    };
    setFeedbacks(updatedFeedbacks);
    showToastMessage('Feedback saved!');
  };

  const handleAddTeamMember = (newTeamMember) => {
    setTeamMembers([...teamMembers, newTeamMember]);
    showToastMessage('Team member added!');
  };

  const handleOpenAddTeamMemberModal = () => {
    setIsAddTeamMemberModalOpen(true);
  };

  const handleCloseAddTeamMemberModal = () => {
    setIsAddTeamMemberModalOpen(false);
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000); // Message disappears after 3 seconds
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <MainContent>
          <Sidebar>
            <AddTeamMemberButton onClick={handleOpenAddTeamMemberModal}>
              Add Team Member
            </AddTeamMemberButton>
            <TeamMemberList
              teamMembers={teamMembers}
              selectedTeamMemberId={selectedTeamMemberId}
              onSelect={handleTeamMemberSelect}
            />
          </Sidebar>
          <Content>
            <FeedbackList feedbacks={feedbacks[selectedTeamMemberId] || []} />
            <FeedbackInput
              selectedTeamMemberId={selectedTeamMemberId}
              onSaveFeedback={handleSaveFeedback}
            />
          </Content>
        </MainContent>
        <AddTeamMemberModal
          isOpen={isAddTeamMemberModalOpen}
          onClose={handleCloseAddTeamMemberModal}
          onAdd={handleAddTeamMember}
        />
        {toastMessage && <ToastMessage>{toastMessage}</ToastMessage>}
      </AppContainer>
    </ThemeProvider>
  );
};

App.propTypes = {
  // No props expected
};

export default App;
