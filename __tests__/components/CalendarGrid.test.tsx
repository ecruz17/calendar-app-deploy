import React from 'react';
import { render } from '@testing-library/react';
import { CalendarGrid } from '../../src/components/CalendarGrid';

describe('CalendarGrid Component', () => {

  test('should render with todays date as argument', () => {
    const today = new Date();
    render(<CalendarGrid currentDate={today} />);
  });

});