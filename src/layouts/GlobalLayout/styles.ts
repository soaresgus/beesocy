import styled, { css } from 'styled-components';
import { breakpoint } from '../../hooks/useMobile';

interface StyledContainer {
  hasVerticalScroll?: boolean;
  hasPaddingActive?: boolean;
}

export const Container = styled.main<StyledContainer>`
  width: 100%;
  height: 100%;

  ${props =>
    props.hasPaddingActive
      ? css`
          padding-top: 8.6rem;
          padding-left: 8rem;
          padding-right: ${props.hasVerticalScroll ? '2rem' : '1.2rem'};
          padding-bottom: 1.4rem;
        `
      : css`
          padding-top: 6.8rem;
          padding-left: 6.58rem;
        `}

  @media (max-width: ${breakpoint}) {
    padding-bottom: 8rem;

    ${props =>
      props.hasPaddingActive
        ? css`
            padding-inline: 2rem;
          `
        : css`
            padding-inline: 0;
          `}
  }
`;
