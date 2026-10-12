import styled from "styled-components";
import { Link } from "react-router-dom";

export const Page = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 30px 20px;
`;
export const Panel = styled.section`
  max-width: 1000px;
  margin: 10px auto;
  padding: 24px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #333;
  h1 { font-size: 26px; margin-top: 0; }
  h2 { font-size: 21px; }
`;
export const TableWrapper = styled.div`
  overflow-x: auto;
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  th { background: #eef5ff; color: #2e6fa0; }
  th, td { padding: 12px; border-bottom: 1px solid #ddd; }
  td { overflow-wrap: anywhere; }
`;
export const ActionLink = styled(Link)`
  display: inline-block;
  padding: 9px 12px;
  border-radius: 8px;
  background: #4a90e2;
  color: white;
  text-decoration: none;
  &:hover { background: #357ab8; }
`;
export const RetryButton = styled.button`
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: #4a90e2;
  color: white;
  font: inherit;
  cursor: pointer;
  &:hover { background: #357ab8; }
`;
export const ErrorMessage = styled.p`
  color: #b42332;
`;
export const Badge = styled.span`
  font-weight: 600;
  color: ${({ $active }) => $active ? "#217a38" : "#b42332"};
`;
export const Details = styled.dl`
  display: grid;
  grid-template-columns: minmax(100px, 160px) minmax(0, 1fr);
  gap: 12px;
  dt { font-weight: 600; }
  dd { margin: 0; overflow-wrap: anywhere; }
  @media (max-width: 480px) { grid-template-columns: 1fr; gap: 8px; }
`;
