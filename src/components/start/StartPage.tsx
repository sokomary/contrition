import React, { useState } from 'react';
import styled from 'styled-components';
import papaparse from 'papaparse';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Recepie = {
  name: string;
  link: string;
  calories: number;
  protein: number;
  fats: number;
  carbohydrates: number;
  weight: number;
};

const StartPage = () => {
  const [recepies, setRecepies] = useState<Recepie[]>([]);

  fetch('recepies.csv')
    .then((response) => response.text())
    .then((responseText) => {
      setRecepies(papaparse.parse(responseText, { header: true }).data as unknown as Recepie[]);
    });

  return (
    <Page>
      {recepies.map((r, i) => (
        <div key={i}>
          <div>{r.name}</div>
          <a href={r.link}>{r.link}</a>
          <div>{r.calories}</div>
          <div>{r.protein}</div>
          <div>{r.fats}</div>
          <div>{r.carbohydrates}</div>
          <div>{r.weight}</div>
          <Divider />
        </div>
      ))}
    </Page>
  );
};

const Page = styled.div`
  height: 100vh;
  padding: 30px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: grey;
  width: 100%;
  margin: 30px 0;
`;

export { StartPage };
