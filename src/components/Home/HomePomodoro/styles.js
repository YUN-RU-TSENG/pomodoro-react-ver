import styled from "styled-components";

export const PomodoroWrapper = styled.div`
  background: #d34e4e;
  position: fixed;
  transition: all 0.3s ease-out, top 0.25s ease-out;
  left: ${(props) => (props.isBig ? "0" : "calc(50vw - 160px)")};
  right: ${(props) => (props.isBig ? "0" : "calc(50vw - 160px)")};

  bottom: ${(props) => (props.isBig ? "0" : "12px")};
  top: ${(props) => (props.isBig ? "0" : "calc(100vh - 64px)")};
  margin: ${(props) => (props.isBig ? "0" : "auto")};
  width: ${(props) => (props.isBig ? "auto" : "320px")};
  border-radius: ${(props) => (props.isBig ? "0" : "4px")};
`;

// === open ===

export const OpenWrapper = styled.div`
  position: relative;
  padding-top: 100px;
`;

export const Toggle = styled.button`
  position: absolute;
  top: 12px;
  left: 12px;
`;

export const Icon = styled.img`
  display: block;
`;

export const TaskCard = styled.section`
  position: relative;
  padding: 8px;
  display: flex;
  align-items: center;
  background: #fff;
  gap: 0px 12px;
  width: 420px;
  margin: 0 auto;
  border-radius: 4px;
  margin-bottom: 60px;
`;

export const TaskClose = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const PomodoroClock = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

export const PomodoroToggleButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0px 4px;
`;

export const Button = styled.button`
  padding: 0px;
`;

// === close ===

export const CloseWrapper = styled.div`
  padding: 8px 12px;
  display: flex;
  color: #fff;
  align-items: center;
  gap: 0px 4px;

  > *:nth-child(3) {
    margin-left: auto;
  }
`;
