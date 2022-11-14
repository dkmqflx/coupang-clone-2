import styled from '@emotion/styled';

export const Title = styled.h3`
  font-size: 30px;
  color: #111;
  margin: 0;
`;

export const Table = styled.table`
  border-top: 2px solid #cecece;
  border-collapse: collapse;
  width: 100%;
  margin-top: 28px;

  & caption {
    text-align: left;
    padding-left: 2px;
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: 700;
    color: #333;
  }
`;

export const Tr = styled.tr`
  font-size: 12px;
  color: #333;

  th {
    width: 104px;
    font-weight: 700;
    text-align: right;
    background: #f4f4f4;
    padding: 7px 10px 7px 15px;
    border: solid #e4e4e4;
    border-width: 0 1px 1px 0;
  }
  td:last-child {
    border-bottom: 1px solid #e4e4e4;
    padding: 10px 16px;
  }
`;
