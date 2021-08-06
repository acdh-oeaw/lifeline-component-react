import React from 'react'

import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from '../../../stories/Lifeline.stories'; // import all stories from the stories file

// Every component that is returned maps 1:1 with the stories, but they already contain all decorators from story level, meta level and global level.
const { Default, WithTitle } = composeStories(stories);

test('renders default lifeline with default args', () => {
  render(<Default data-testid="t1" />);
  
  const lifelineElement = screen.getByTestId("t1");
  expect(lifelineElement).not.toBeNull();
});

test('renders lifeline with title args', async () => {
  render(<WithTitle />);

  const lifelineElement = await screen.findByText(WithTitle.args.titlelabel);
  expect(lifelineElement).not.toBeNull();
});