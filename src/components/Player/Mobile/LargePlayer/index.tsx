import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IconContext } from 'react-icons';

import {
  MdExpandMore,
  MdMoreVert,
  MdMusicNote,
  MdPauseCircleFilled,
  MdPersonAdd,
  MdPlayCircleFilled,
  MdPlaylistAdd,
  MdRepeat,
  MdRepeatOne,
  MdShare,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious
} from 'react-icons/md';
import { SheetRef } from 'react-modal-sheet';

import {
  useEffectOnce,
  useHoverDirty,
  useLifecycles,
  useLockBodyScroll
} from 'react-use';
import {
  handleChangeTimeInSlider,
  handleNextMusic,
  handlePlayMusic,
  handlePreviousMusic,
  handleToggleRepeatMode
} from '../..';
import { useModal } from '../../../../context/ModalProvider/useModal';
import { usePlayer } from '../../../../context/PlayerProvider/usePlayer';
import { useTheme } from '../../../../context/ThemeProvider/useTheme';
import { Title } from '../../../General/Title';
import { PlaylistList } from '../../../MusicFeed/PlaylistList';
import { SheetMusicMenu } from '../../../MusicFeed/SheetMusicMenu';
import { LikeButton } from '../../../Widgets/Buttons/ActionButtons/LikeButton';
import { Button } from '../../../Widgets/Buttons/Button';
import { TracksList } from '../../TracksList';
import {
  StyledSheet,
  Header,
  MusicCover,
  MusicCoverActions,
  Specs,
  TimebarRange,
  TimebarSlider,
  TimebarThumb,
  TimebarTrack,
  TimeContainer,
  TimeSeconds,
  Controls,
  ShuffleButton,
  StyledTitle,
  Artists,
  TrackListSheet,
  TrackListSheetHeader
} from './styles';

export function MobileLargePlayer() {
  const player = usePlayer();

  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const [trackListIsOpen, setTrackListIsOpen] = useState<boolean>(true);

  const [coverActionsIsActive, setCoverActionsIsActive] =
    useState<boolean>(false);

  const { colors } = useTheme();

  const { handleCallModal } = useModal();

  const MusicCoverRef = useRef<HTMLDivElement>(null);

  const isHoverMusicCover = useHoverDirty(MusicCoverRef);

  const DetailsContainerRef = useRef<HTMLDivElement>(null);

  const TitleSpanRef = useRef<HTMLSpanElement>(null);

  const TrackListSheetRef = useRef<SheetRef>(null);

  useLockBodyScroll(player.getLarge());

  useEffect(() => {
    if (DetailsContainerRef.current && TitleSpanRef.current) {
      if (
        TitleSpanRef.current?.scrollWidth >
        DetailsContainerRef.current?.offsetWidth
      ) {
        let invertScroll = true;

        setInterval(() => {
          if (invertScroll) {
            TitleSpanRef.current?.scrollTo({
              left: (TitleSpanRef.current.scrollLeft -= 1),
              behavior: 'smooth'
            });
          } else {
            TitleSpanRef.current?.scrollTo({
              left: (TitleSpanRef.current.scrollLeft += 1),
              behavior: 'smooth'
            });
          }

          if (TitleSpanRef.current && TitleSpanRef.current.scrollLeft == 0) {
            setTimeout(() => {
              invertScroll = false;
            }, 2000);
          }

          if (
            TitleSpanRef.current &&
            TitleSpanRef.current.offsetWidth +
              Math.round(TitleSpanRef.current.scrollLeft) ==
              TitleSpanRef.current.scrollWidth
          ) {
            setTimeout(() => {
              invertScroll = true;
            }, 1000);
          }
        }, 50);
      }
    }
  }, [TitleSpanRef.current]);

  useEffect(() => {
    setCoverActionsIsActive(isHoverMusicCover);
  }, [isHoverMusicCover]);

  useEffect(() => {
    if (!trackListIsOpen) {
      setTrackListIsOpen(true);
    }
  }, [trackListIsOpen]);

  useEffectOnce(() => {
    // player.handleChangeVolume(100);
  });

  return (
    <>
      <StyledSheet
        isOpen={player.getLarge()}
        onClose={() => player.handleChangeLarge(false)}
      >
        <StyledSheet.Container>
          <StyledSheet.Content>
            <Header>
              <Button
                onClick={() => player.handleChangeLarge(false)}
                full={false}
                rounded
              >
                <MdExpandMore />
              </Button>

              <Button onClick={() => setMenuIsOpen(true)} full={false} rounded>
                <MdMoreVert />
              </Button>
            </Header>

            <MusicCover
              ref={MusicCoverRef}
              onClick={() => setCoverActionsIsActive(state => !state)}
            >
              {coverActionsIsActive && (
                <MusicCoverActions active={coverActionsIsActive}>
                  <Button
                    full={false}
                    rounded
                    onClick={event => event.stopPropagation()}
                  >
                    <MdShare />
                  </Button>

                  <Button
                    full={false}
                    rounded
                    onClick={event => {
                      event.stopPropagation();
                      handleCallModal(
                        <PlaylistList track={player.getCurrentTrack()} />,
                        {
                          title: 'Escolha uma playlist',
                          overlay: true,
                          easyClose: true,
                          center: true
                        }
                      );
                    }}
                  >
                    <MdPlaylistAdd />
                  </Button>

                  <LikeButton />

                  <Button
                    full={false}
                    rounded
                    onClick={event => event.stopPropagation()}
                  >
                    <MdPersonAdd />
                  </Button>
                </MusicCoverActions>
              )}

              <img
                src={player.getCurrentTrack().imageUrl}
                alt={`Capa da música ${player.getCurrentTrack().name}`}
                loading={'lazy'}
              />
            </MusicCover>

            <Specs ref={DetailsContainerRef}>
              <StyledTitle size="medium" ref={TitleSpanRef}>
                {player.getCurrentTrack().name}
              </StyledTitle>
              <Artists>
                {player.formatArtists(player.getCurrentTrack().artists)}
              </Artists>

              <TimeContainer
                onClick={event => {
                  event.stopPropagation();
                }}
              >
                <TimeSeconds>
                  {player.formatSeconds(player.getCurrentSeconds())}
                </TimeSeconds>

                <TimebarSlider
                  max={player.getCurrentTrack().duration}
                  onValueChange={value => {
                    handleChangeTimeInSlider(value[0]);
                  }}
                  value={[player.getCurrentSeconds()]}
                >
                  <TimebarTrack>
                    <TimebarRange />
                  </TimebarTrack>

                  <TimebarThumb />
                </TimebarSlider>

                <TimeSeconds>
                  {player.formatSeconds(
                    player.getCurrentTrack().duration
                      ? player.getCurrentTrack().duration
                      : 0
                  )}
                </TimeSeconds>
              </TimeContainer>

              <Controls
                onClick={event => {
                  event.stopPropagation();
                }}
              >
                <IconContext.Provider value={{ size: '32' }}>
                  <Button onClick={handleToggleRepeatMode} rounded full={false}>
                    {player.getRepeat() != 'single' ? (
                      <MdRepeat
                        style={
                          player.getRepeat() == 'all'
                            ? { fill: colors.bee }
                            : { fill: colors.text }
                        }
                      />
                    ) : (
                      <MdRepeatOne style={{ fill: colors.bee }} />
                    )}
                  </Button>

                  <Button onClick={handlePreviousMusic} rounded full={false}>
                    <MdSkipPrevious />
                  </Button>

                  <Button onClick={handlePlayMusic} rounded full={false}>
                    {player.getPlaying() ? (
                      <MdPauseCircleFilled
                        style={{ transform: 'scale(1.5)' }}
                      />
                    ) : (
                      <MdPlayCircleFilled style={{ transform: 'scale(1.5)' }} />
                    )}
                  </Button>

                  <Button onClick={handleNextMusic} rounded full={false}>
                    <MdSkipNext />
                  </Button>

                  <ShuffleButton
                    onClick={player.shuffleTrackList}
                    rounded
                    full={false}
                  >
                    <MdShuffle />
                  </ShuffleButton>
                </IconContext.Provider>
              </Controls>
            </Specs>
          </StyledSheet.Content>

          {player.getLarge() && (
            <TrackListSheet
              isOpen={trackListIsOpen}
              onClose={() => setTrackListIsOpen(false)}
              snapPoints={[0.9, 0.08]}
              initialSnap={1}
              ref={TrackListSheetRef}
            >
              <TrackListSheet.Container>
                <TrackListSheet.Header>
                  <TrackListSheetHeader>
                    <MdMusicNote />
                    <span>Próximas músicas</span>
                  </TrackListSheetHeader>
                </TrackListSheet.Header>

                <TrackListSheet.Content>
                  <TracksList />
                </TrackListSheet.Content>
              </TrackListSheet.Container>
            </TrackListSheet>
          )}
        </StyledSheet.Container>
      </StyledSheet>

      <SheetMusicMenu
        open={menuIsOpen}
        onClose={() => setMenuIsOpen(false)}
        track={player.getCurrentTrack()}
      />
    </>
  );
}