## Code: src/components/FeedbackCard.js
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContainer = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};
  border-radius: 5px;
  padding: ${(props) => props.theme.spacing.medium};
  margin: ${(props) => props.theme.spacing.small};
  width: 100%;
  box-sizing: border-box;
`;

const FeedbackText = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

const Timestamp = styled.small`
  color: #999;
  display: block;
  text-align: right;
`;

/**
 * @param {object} feedback - The feedback object.
 * @returns {JSX.Element} - The FeedbackCard component.
 */
const FeedbackCard = ({ feedback }) => {
  const timestamp = new Date(feedback.timestamp).toLocaleString();

  return (
    <CardContainer>
      <FeedbackText>{feedback.text}</FeedbackText>
      <Timestamp>{timestamp}</Timestamp>
    </CardContainer>
  );
};

FeedbackCard.propTypes = {
  feedback: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired, // Changed to number for timestamp
  }).isRequired,
};

export default FeedbackCard;
