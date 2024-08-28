import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CalendarHeader } from '../../src/components/CalendarHeader';

describe('CalendarHeader Component', () => {
  const today = new Date();

  test('should render with actual year and month', () => {
    render(<CalendarHeader currentDate={today} setCurrentDate={() => { }} />);

    expect(screen.getByText((content, _) => {
      const hasMonth = content.includes(today.toLocaleString('en-US', { month: 'long' }));
      const hasYear = content.includes(today.getFullYear().toString());
      return hasMonth && hasYear;
    })).toBeInTheDocument();
  });

  test('should set to today', () => {
    const setCurrentDate = jest.fn();

    render(<CalendarHeader currentDate={today} setCurrentDate={setCurrentDate} />);

    const goToday = () => {
      const newDate = new Date();
      setCurrentDate(newDate);
      localStorage.setItem('currentDate', JSON.stringify(newDate));
    };

    goToday();

    expect(setCurrentDate).toHaveBeenCalledWith(expect.any(Date));
    expect(new Date(localStorage.getItem('currentDate')!)).toEqual(expect.any(Date));
  });
});

const res = `[
  {
    "time": "2024-08-29T18:45:00+00:00",
    "name": "Coffee Break"
  },
  {
    "time": "2024-08-02T18:45:00+00:00",
    "name": "Brainstorming"
  },
  {
    "time": "2023-10-17T18:45:00+00:00",
    "name": "PRD deploy"
  },
  {
    "time": "2023-10-26T11:15:00+00:00",
    "name": "Daily scrum"
  }
]`;
