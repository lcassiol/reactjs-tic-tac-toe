import styled from 'styled-components';

export const Container = styled.div`
  border: 4px solid darkblue;
  border-radius: 10px;
  width: 250px;
  height: 250px;
  margin: 0 auto;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  margin-top: 10px;
`;
