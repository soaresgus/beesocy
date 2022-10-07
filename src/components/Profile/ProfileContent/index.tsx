import { useNavigate } from 'react-router-dom';
import { useProfileCategory } from '../../../context/ProfileCategoryProvider/useProfileCategory';
import { IImagePost } from '../../../types/imagePost';
import { IMusicPost } from '../../../types/musicPost';
import { ImageCard } from '../../Cards/ImageCard';
import { MusicCard } from '../../Cards/MusicCard';
import { Container } from './styles';

interface IProfileContentProps {
  userMusic: IMusicPost[];
  userImage: IImagePost[];
}

export function ProfileContent({ userMusic, userImage }: IProfileContentProps) {
  const { activeCategory } = useProfileCategory();

  const navigate = useNavigate();

  function handleImagePostClick(postId: string) {
    return navigate(`/image/post/${postId}`);
  }

  return (
    <Container activeCategory={activeCategory}>
      {activeCategory === 'music' &&
        userMusic.map(music => <MusicCard large {...music} />)}

      {activeCategory === 'image' &&
        userImage.map(image => (
          <ImageCard
            multiple={image.img.length > 1}
            onClick={() => handleImagePostClick(image.identification)}
            {...image}
          />
        ))}
    </Container>
  );
}
