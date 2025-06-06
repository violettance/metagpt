import React from 'react';
import styled from 'styled-components';
import FeedbackCard from './FeedbackCard.jsx';
import SubmitFeedbackForm from './SubmitFeedbackForm.jsx';

const FeedbacksContainer = styled.div`
  margin-top: ${props => props.theme.spacing.xlarge};
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

const FeedbackList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Feedbacks = ({ feedbacks, selectedMemberId, onAddFeedback, onDeleteFeedback, openAddFeedbackModal }) => {
  const allFeedbacks = Object.values(feedbacks).flat();

  return (
    <FeedbacksContainer>
      <SectionHeader>
        <SectionTitle>Feedbacks</SectionTitle>
        <AddButton onClick={openAddFeedbackModal}>+ Add Feedback</AddButton>
      </SectionHeader>
      
      {/* The inline form is removed to match the image-based flow */}
      {/* {selectedMemberId && <SubmitFeedbackForm onSubmit={onAddFeedback} />} */}

      <FeedbackList>
        {allFeedbacks.map(feedback => (
          <FeedbackCard
            key={feedback.id}
            feedback={feedback}
            onDelete={onDeleteFeedback}
          />
        ))}
      </FeedbackList>
    </FeedbacksContainer>
  );
};

export default Feedbacks; 