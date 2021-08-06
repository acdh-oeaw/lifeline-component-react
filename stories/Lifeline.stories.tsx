import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Lifeline from '../src/components/Lifeline/Lifeline';

import sampleLifepathData from './data/lifepath';

export default {
  title: 'Components/Lifeline',
  component: Lifeline,
  argTypes: {
    lifelinecolor: { control: 'color' },
    lifeeventcolor: { control: 'color' },
    lifeeventopacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 }
    },
  },
  parameters: {
    layout:'centered'
  }
} as ComponentMeta<typeof Lifeline>;

const Template: ComponentStory<typeof Lifeline> = (args) => <Lifeline {...args} />;

export const Default = Template.bind({});
Default.parameters = { controls: { exclude: ['titlelabel', 'titlelabelplacement'] } };
Default.args = {
  lifepath: sampleLifepathData
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  lifepath: sampleLifepathData,
  titlelabel: 'Nicola Tesla',
  titlelabelplacement: 'topCenter'
};


/*export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};*/
