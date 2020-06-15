import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.span`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 36px;
  font-weight: bold;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;

  margin-top: 30px;
  margin-bottom: 30px;

  input {
    height: 30px;
    font-size: 16px;
  }

  input + input {
    margin-top: 5px;
  }

  button {
    margin-top: 15px;
    height: 30px;
    font-size: 16px;
    font-weight: bold;
    background-color: lightgreen;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 16px;
    font-weight: bold;
  }

  span {
    button {
      height: 28px;
      font-size: 16px;
      margin-bottom: 5px;
    }
  }
`;

export const Ranking = styled.div`
  position: absolute;

  right: 30px;
  top: 0;

  p {
    font-size: 24px;
    font-weight: bold;
    border-bottom: 2px solid #999;
  }
`;

export const Players = styled.div`
  margin-top: 5px;
`;

export const Position = styled.span``;

export const PlayerName = styled.span`
  margin-left: 5px;
`;
