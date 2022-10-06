import React from 'react';
import { MdMic, MdOutlinePermMedia } from 'react-icons/md';
import { Button } from '../../../../Widgets/Buttons/Button';
import { ContainerInput } from '../ContainerInput';
import { FakeInput } from '../FakeInput';
import { InputMsg } from '../InputMsg';
import { SectionInput } from './styles';

export const InputMessege = () => {
  return (
    <ContainerInput>
      <FakeInput>
        <SectionInput>
          <InputMsg />
        </SectionInput>
        <Button rounded full={false}>
          <MdMic />
        </Button>
      </FakeInput>

      <Button rounded full={false}>
        <MdOutlinePermMedia />
      </Button>
    </ContainerInput>
  );
};