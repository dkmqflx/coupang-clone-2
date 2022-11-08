import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Tr = styled.tr`
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  overflow: visible;
`;

export const Th = styled.th`
  background: #fafafa;
  text-align: center;
  height: 40px;
  font-size: 13px;
`;

export const Td = styled.td<{ align?: string }>`
  border-bottom: 1px solid #ddd;
  color: #111;
  padding: 10px 0;
  position: relative;

  ${({ align = 'center' }) =>
    align &&
    css`
      text-align: ${align};
    `}
`;
