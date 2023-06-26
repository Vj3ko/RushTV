import { css } from 'styled-components';

export const mixins = {
  flex: (justify, align) => css`
    display: flex;
    justify-content: ${justify};
    align-items: ${align};
  `,
};
