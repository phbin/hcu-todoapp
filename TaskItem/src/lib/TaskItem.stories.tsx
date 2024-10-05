import type { Meta, StoryObj } from '@storybook/react';
import { TaskItem } from './TaskItem';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { uid } from 'uid';

const meta: Meta<typeof TaskItem> = {
   component: TaskItem,
   title: 'TaskItem',
};
export default meta;
type Story = StoryObj<typeof TaskItem>;

export const Primary = {
   args: {
      data: { id: uid(), name: 'Test', checked: 1, createdAt: new Date(), duration: new Date() },
      onCheck: () => {},
      onRemove: () => {},
   },
};

export const Heading: Story = {
   args: {
      data: { id: uid(), name: 'Test', checked: 1, createdAt: new Date(), duration: new Date() },
      onCheck: () => {},
      onRemove: () => {},
   },
   play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      expect(canvas.getByText(/Welcome to TaskItem!/gi)).toBeTruthy();
   },
};
