import React from 'react';

export const IconShare = (props: any) => (
  <svg {...props} width='24' height='24' viewBox='0 0 24 24' fill='none'>
    <circle cx='18' cy='5' r='3' stroke='currentcolor' strokeWidth='2' />
    <circle cx='6' cy='12' r='3' stroke='currentcolor' strokeWidth='2' />
    <circle cx='18' cy='19' r='3' stroke='currentcolor' strokeWidth='2' />
    {/* Connectors stop on the circles' edges rather than their centres. */}
    <path
      d='M8.59 10.49L15.41 6.51'
      stroke='currentcolor'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <path
      d='M8.59 13.51L15.41 17.49'
      stroke='currentcolor'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);
