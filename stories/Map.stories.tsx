import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Map from '../src/components/Map/Map';

import sampleLifepathData from './data/lifepath';
import { popup } from 'leaflet';

export default {
  title: 'Components/Map',
  component: Map,
  argTypes: {
    markercolor: { control: 'color' }
  },
} as ComponentMeta<typeof Map>;

const Template: ComponentStory<typeof Map> = (args) => <Map {...args} />;

export const Default = Template.bind({});
Default.parameters = { controls: { exclude: ['titlelabel', 'titlelabelplacement'] } };
Default.args = {
  zoom: 0,
  center: [0,0],
  markers: [{
      coords:[0,0],
      popupcontent: 'Demo Popup'
    }]
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
