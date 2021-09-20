import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LifelineMap from '../src/components/LifelineMap/LifelineMap';

import sampleLifepathData from './data/lifepath';


export default {
  title: 'Components/LifelineMap',
  component: LifelineMap,
  argTypes: {
    markercolor: { control: 'color' }
  },
} as ComponentMeta<typeof LifelineMap>;

const Template: ComponentStory<typeof LifelineMap> = (args) => <LifelineMap {...args} />;

export const Default = Template.bind({});
Default.parameters = { controls: { exclude: ['titlelabel', 'titlelabelplacement'] } };
Default.args = {
  zoom: 0,
  center: sampleLifepathData[0].coords,
  lifepath: sampleLifepathData

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
