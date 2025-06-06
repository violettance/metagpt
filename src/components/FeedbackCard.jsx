import React from 'react';
import styled from 'styled-components';

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
  z-index: 10;
`;

const CardContainer = styled.div`
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.large};
  border-radius: 12px;
  position: relative;

  &:hover ${DeleteButton} {
    display: block;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0;
`;

const Author = styled.div`
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: ${props => props.theme.fontSizes.cardTitle};
`;

const ForMember = styled.div`
  font-size: 12px;
  color: #a0a0a0;
`;

const Content = styled.p`
  font-size: ${props => props.theme.fontSizes.medium};
  line-height: 1.6;
  margin: 0;
  color: ${props => props.theme.colors.textSecondary};
`;

const Footer = styled.div`
  margin-top: ${props => props.theme.spacing.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Reactions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.small};
`;

const ReactionButton = styled.button`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.disabled};
  color: ${props => props.theme.colors.textSecondary};
  border-radius: 20px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
`;

const Timestamp = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.disabled};
`;

/**
 * @param {object} feedback - The feedback object.
 * @param {function} onDelete - The function to delete the feedback.
 * @param {string} memberName - The name of the member the feedback is for.
 * @returns {JSX.Element} - The FeedbackCard component.
 */
const FeedbackCard = ({ feedback, onDelete }) => {
  return (
    <CardContainer>
      <DeleteButton onClick={() => onDelete(feedback.id)}>×</DeleteButton>
      <Header>
        <Avatar src={`/avatars/${feedback.avatar}`} alt={feedback.author} />
        <Author>{feedback.author}</Author>
      </Header>
      <Content>{feedback.text}</Content>
      <Footer>
        <Timestamp>{feedback.timestamp}</Timestamp>
      </Footer>
    </CardContainer>
  );
};

export default FeedbackCard;
