import { v4 as uuidv4 } from 'uuid';

const TEAM_MEMBERS_KEY = 'teamMembers';
const FEEDBACKS_KEY = 'feedbacks';

// Function to get team members from local storage
export const getTeamMembers = () => {
  try {
    const storedTeamMembers = localStorage.getItem(TEAM_MEMBERS_KEY);
    return storedTeamMembers ? JSON.parse(storedTeamMembers) : [];
  } catch (error) {
    console.error("Error getting team members from local storage:", error);
    return []; // Return an empty array in case of an error
  }
};

// Function to save team members to local storage
export const saveTeamMembers = (teamMembers) => {
  try {
    localStorage.setItem(TEAM_MEMBERS_KEY, JSON.stringify(teamMembers));
  } catch (error) {
    console.error("Error saving team members to local storage:", error);
  }
};

// Function to get feedbacks from local storage
export const getFeedbacks = () => {
  try {
    const storedFeedbacks = localStorage.getItem(FEEDBACKS_KEY);
    return storedFeedbacks ? JSON.parse(storedFeedbacks) : {};
  } catch (error) {
    console.error("Error getting feedbacks from local storage:", error);
    return {}; // Return an empty object in case of an error
  }
};

// Function to save feedbacks to local storage
export const saveFeedbacks = (feedbacks) => {
  try {
    localStorage.setItem(FEEDBACKS_KEY, JSON.stringify(feedbacks));
  } catch (error) {
    console.error("Error saving feedbacks to local storage:", error);
  }
};

// Function to generate a unique ID for team members (if needed)
export const generateTeamMemberId = () => {
    return uuidv4();
};

// Function to generate a unique ID for feedback items (if needed)
export const generateFeedbackId = () => {
    return uuidv4();
};
