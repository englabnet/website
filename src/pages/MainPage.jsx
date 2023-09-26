import React, { useState } from 'react';
import { Center } from '@mantine/core';

import styled, { keyframes } from 'styled-components';
import SearchBar from '../components/SearchBar';

const searchAnimation = keyframes`
  from {height: 90%}
  to {height: 95px}
`;

const AnimatedCenter = styled(Center)`
  height: 95px;
  animation-name: ${searchAnimation};
  animation-duration: 500ms;
  animation-iteration-count: 1;
`;

function MainPage() {
  const [playAnimation, setPlayAnimation] = useState(false);
  const [searchValues, setSearchValues] = useState();

  const searchHandler = (values) => {
    setSearchValues(values);
    setPlayAnimation(true);
  };

  const searchBar = (
    <SearchBar delay={500} onSearch={(values) => searchHandler(values)} {...searchValues} />
  );

  return (
    <div style={{ height: '100%' }}>
      {playAnimation ? (
        <AnimatedCenter style={{ height: '95px' }}>
          {searchBar}
        </AnimatedCenter>
      ) : (
        <Center style={{ height: '90%' }}>
          {searchBar}
        </Center>
      )}
    </div>
  );
}

export default MainPage;
