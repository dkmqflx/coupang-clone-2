import { css } from '@emotion/react';
import styled from '@emotion/styled';

const DeliveryType = ({ type }: { type?: string }) => {
  const typeText = (type: string | undefined) => {
    switch (type) {
      case 'fresh':
        return '로켓와우 가능';
      case 'wow':
        return '로켓프레시 가능';
      default:
        return '기본배송지';
    }
  };

  return <DefaultAddressText type={type}>{typeText(type)}</DefaultAddressText>;
};

export default DeliveryType;

const DefaultAddressText = styled.span<{ type?: string }>`
  color: #555;
  border: 1px solid #555;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 10px;
  vertical-align: middle;
  margin-right: 4px;
  height: 14px;
  ${({ type }) =>
    type &&
    css`
      color: ${type === 'fresh' ? '#00891a' : '#487fda'};
      border-color: ${type === 'fresh' ? '#00891a' : '#487fda'};
    `}
`;
