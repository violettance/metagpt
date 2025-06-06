import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FeedbackCard from './FeedbackCard.jsx';

const ListContainer = styled.div`
  padding: ${(props) => props.theme.spacing.medium};
`;

const EmptyListMessage = styled.p`
  font-style: italic;
  color: #999;
  text-align: center;
`;

/**
 * @param {array} feedbacks - The array of feedback objects.
 * @returns {JSX.Element} - The FeedbackList component.
 */
const FeedbackList = ({ feedbacks = [] }) => {
  if (!feedbacks || feedbacks.length === 0) {
    return (
      <ListContainer>
        <EmptyListMessage>No feedback available for this team member.</EmptyListMessage>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {feedbacks.map((feedback) => (
        <FeedbackCard key={feedback.id} feedback={feedback} />
      ))}
    </ListContainer>
  );
};

FeedbackList.propTypes = {
  feedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default FeedbackList;
