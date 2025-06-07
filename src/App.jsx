import React, { useState } from 'react';
import styled from 'styled-components';
import Team from './components/Team.jsx';
import Feedbacks from './components/Feedbacks.jsx';
import AddTeamMemberModal from './components/AddTeamMemberModal.jsx';
import AddFeedbackModal from './components/AddFeedbackModal.jsx';
import { GlobalStyle, theme } from './styles/GlobalStyles.js';
import { ThemeProvider } from 'styled-components';
import { teamMembers as mockTeamMembers, feedbacks as mockFeedbacks } from './utils/mockData.js';
import { v4 as uuidv4 } from 'uuid';
import { getTeamMembers, saveTeamMembers, getFeedbacks, saveFeedbacks } from './utils/localStorage.js';

const AppContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: 100vh;
  padding: 48px 80px;
  max-width: 1280px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 24px 40px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 16px 20px;
  }
  margin: 0 auto;
`;

/**
 * Main application component.
 * Manages team members and feedbacks.
 * @returns {JSX.Element} - The App component.
 */
const App = () => {
  const getInitialTeamMembers = () => {
    const stored = getTeamMembers();
    return stored.length > 0 ? stored : mockTeamMembers;
  };
  const getInitialFeedbacks = () => {
    const stored = getFeedbacks();
    return Object.keys(stored).length > 0 ? stored : mockFeedbacks;
  };

  const [teamMembers, setTeamMembers] = useState(getInitialTeamMembers());
  const [feedbacks, setFeedbacks] = useState(getInitialFeedbacks());
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState(null);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isAddFeedbackModalOpen, setIsAddFeedbackModalOpen] = useState(false);

  // Save to localStorage when teamMembers or feedbacks change
  React.useEffect(() => {
    saveTeamMembers(teamMembers);
  }, [teamMembers]);
  React.useEffect(() => {
    saveFeedbacks(feedbacks);
  }, [feedbacks]);

  const handleSelectMember = (id) => {
    setSelectedTeamMemberId(prevId => (prevId === id ? null : id));
  };

  const handleAddTeamMember = (member) => {
    // Avatar random atanacak
    const avatars = ['bird.png', 'cat.png', 'dog.png', 'hedgehog.png', 'koala.png', 'llama.png', 'pinguin.png'];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const newMember = { ...member, id: uuidv4(), avatar: randomAvatar };
    setTeamMembers(prev => [...prev, newMember]);
  };

  const handleDeleteTeamMember = (id) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
    setFeedbacks(prev => {
      const newFeedbacks = { ...prev };
      delete newFeedbacks[id];
      return newFeedbacks;
    });
    if (selectedTeamMemberId === id) {
      setSelectedTeamMemberId(null);
    }
  };

  const handleAddFeedback = (feedbackText) => {
    if (!selectedTeamMemberId) {
        alert("Please select a team member before submitting feedback.");
        return;
    }
    const newFeedback = {
      id: uuidv4(),
      author: 'Mary',
      avatar: 'llama.png',
      text: feedbackText,
      timestamp: 'Just now',
    };
    setFeedbacks(prev => {
      const existingFeedbacks = prev[selectedTeamMemberId] || [];
      return {
        ...prev,
        [selectedTeamMemberId]: [...existingFeedbacks, newFeedback],
      };
    });
  };

  const handleDeleteFeedback = (feedbackId) => {
    setFeedbacks(prev => {
      const newFeedbacks = { ...prev };
      for (const memberId in newFeedbacks) {
        newFeedbacks[memberId] = newFeedbacks[memberId].filter(
          (feedback) => feedback.id !== feedbackId
        );
      }
      return newFeedbacks;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Team
          teamMembers={teamMembers}
          onSelectMember={handleSelectMember}
          selectedMemberId={selectedTeamMemberId}
          openAddMemberModal={() => setIsAddMemberModalOpen(true)}
          deleteTeamMember={handleDeleteTeamMember}
        />
        <Feedbacks
          feedbacks={feedbacks}
          onDeleteFeedback={handleDeleteFeedback}
          openAddFeedbackModal={() => setIsAddFeedbackModalOpen(true)}
        />
        <AddTeamMemberModal
          isOpen={isAddMemberModalOpen}
          onClose={() => setIsAddMemberModalOpen(false)}
          onAdd={handleAddTeamMember}
        />
        <AddFeedbackModal
          isOpen={isAddFeedbackModalOpen}
          onClose={() => setIsAddFeedbackModalOpen(false)}
          onAdd={handleAddFeedback}
        />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
