import styled from "styled-components";

export const BoxCardStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;

    overflow-y: auto;
    width: 24.5rem;
    height: 100%;
    gap: 0.1rem;
    border-right: 0.1rem solid ${props => props.theme.colors.light};
`

export const ContainerSla = styled.section`
    width: 100%;
    height: 100vh;
    background: red;
`

export const SectionBoxChat = styled.section`
    display: flex;
`
