import * as HoverCard from '@radix-ui/react-hover-card';
import styled from 'styled-components';

export const CardIconProfile = styled.div`
  width: 64px;
  height: 64px;

  border-radius: 50%;

  overflow: hidden;

  cursor: pointer;
`;
export const StyledContent = styled(HoverCard.Content)`

  margin-top: 8rem;

  background-color: ${(props) => props.theme.colors.primary};

  border-radius: 2rem;
  padding: 2rem;

  animation: starting .5s;

  @keyframes starting {
    from{
      opacity: 0;
      transform: translateY(10px);
    }
  }

`;

export const Profile = styled.div`

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

`;
export const Img = styled.img`
    width: 100%;
    height: 100%;

    user-select: none;
    object-fit: cover;

`;

export const UserName = styled.span`

  font-size: 2rem;
  font-weight: bold;

`;

export const NickName = styled.div`
  color: ${(props) => props.theme.colors.light};
`;
export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  svg {
    width: 4rem;
    height: 4rem;
  }
  button{
    padding: .8rem;
  }
`;
export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;

`;
export const Description = styled.div`
  width: 300px;
  display: -webkit-box;
  display: -moz-box;

  margin-top: .8rem;

  -webkit-line-clamp: 4;

  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;

  white-space: normal;

  overflow: hidden;

  text-overflow: ellipsis;
`;


export const DownContainer = styled.div`
  margin-top: 2.8rem;

  display: flex;
  justify-content: space-between;

  padding: 0 2rem;
`;
export const Following = styled.span`
  font-size: 1.4rem;
`;
export const Followers = styled.span`
  font-size: 1.4rem;
`;
