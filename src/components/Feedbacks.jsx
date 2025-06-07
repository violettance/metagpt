import React, { useState } from "react";
import styled from "styled-components";
import FeedbackCard from "./FeedbackCard.jsx";
import SubmitFeedbackForm from "./SubmitFeedbackForm.jsx";
import { is } from "date-fns/locale";

const FeedbacksContainer = styled.div`
  margin-top: ${(props) => props.theme.spacing.xlarge};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.sectionTitle};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

const AddButton = styled.button`
  background-color: ${(props) => props.theme.colors.button};
  color: ${(props) => props.theme.colors.text};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
`;

const DownloadButton = styled.button`
  background-color: ${(props) => props.theme.colors.button};
  color: ${(props) => props.theme.colors.text};
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const BgDownload = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(12px);
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TypeButtons = styled.button`
  hight: 200px;
  width; 200px;
  background-color: ${(props) => props.theme.colors.button};
  color: ${(props) => props.theme.colors.text};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;

`

const Feedbacks = ({
  feedbacks,
  selectedMemberId,
  onAddFeedback,
  onDeleteFeedback,
  openAddFeedbackModal,
}) => {
  const allFeedbacks = Object.values(feedbacks).flat();

  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = (filename, content, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };

  const DownloadFeedBack = (format) => {
    const rawData = JSON.parse(
      window.localStorage.getItem("feedbacks") || "{}"
    );

    if (!rawData || Object.keys(rawData).length === 0) {
      alert("No feedback found to download.");
      return;
    }

    const feedbackData = Object.values(rawData);

    if (format === "json") {
      const jsonString = JSON.stringify(feedbackData, null, 2);
      downloadFile("feedback.json", jsonString, "application/json");
    } else {
      const convertToCSV = (arr) => {
        if (!arr.length) return "";
        const headers = Object.keys(arr[0]);
        const rows = arr.map((obj) =>
          headers.map((field) => JSON.stringify(obj[field] ?? "")).join(",")
        );
        return [headers.join(","), ...rows].join("\n");
      };
      const CSVString = convertToCSV(feedbackData);
      downloadFile("feedbacks.csv", CSVString, "text/csv");
    }
    setIsDownloading(false);
  };

  return (
    <FeedbacksContainer>
      <SectionHeader>
        <SectionTitle>Feedbacks</SectionTitle>
        <ButtonContainer>
          <DownloadButton
            onClick={() => {
              setIsDownloading(!isDownloading);
              console.log(isDownloading);
            }}
          >
            Download
          </DownloadButton>
          <AddButton onClick={openAddFeedbackModal}>+ Add Feedback</AddButton>
        </ButtonContainer>
      </SectionHeader>

      {isDownloading && (
        <BgDownload>
          <ButtonBox>
            <TypeButtons onClick={() => DownloadFeedBack("json")}>JSON</TypeButtons>
            <TypeButtons onClick={() => DownloadFeedBack("csv")}>CSV</TypeButtons>
          </ButtonBox>
        </BgDownload>
      )}

      {/* The inline form is removed to match the image-based flow */}
      {/* {selectedMemberId && <SubmitFeedbackForm onSubmit={onAddFeedback} />} */}

      <FeedbackList>
        {allFeedbacks.map((feedback) => (
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
