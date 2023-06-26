import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { styled } from 'styled-components';
import { mixins } from '../../styles/utils';

const StyledSpinner = styled.div`
  height: 50vh;
  ${mixins.flex('center', 'center')}
`;

const SpinnerComponent = ({ height }) => {
  let color = '#5468ff';

  return (
    <StyledSpinner height={height}>
      <ClipLoader
        color={color}
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </StyledSpinner>
  );
};

export const Spinner = React.memo(SpinnerComponent);
