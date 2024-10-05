import { render } from '@testing-library/react';

import TaskItem from './TaskItem';

describe('TaskItem', () => {
   it('should render successfully', () => {
      const { baseElement } = render(<TaskItem />);
      expect(baseElement).toBeTruthy();
   });
});
