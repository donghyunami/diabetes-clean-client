import { palette } from "libs/palette";
import styled from "@emotion/styled";

export const FormWrap = styled.div`
  padding: 10px;
  width: 100%;
  min-width: 300px;
  position: relative;
  box-shadow: ${({ theme }) => theme.boxShadow.middle};
  form {
    margin-top: 45px;
  }
`;

export const InputGroup = styled.div`
  margin-top: 13px;
  display: flex;
  width: 100%;
  height: 30px;
  gap: 5px;
`;
export const LabelWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 58px;
  font-weight: 700;
`;
export const InputWrap = styled.div`
  input,
  select,
  textarea {
    outline: none;
  }
`;

export const UnitTextWrap = styled.div`
  font-size: 16px;
  span {
    line-height: 30px;
  }
`;

export const TextareaGroup = styled.div`
  margin-top: 13px;
  padding: 10px;
  width: 100%;
  height: 300px;
  textarea {
    border: 1px solid ${palette.gray[2]};
    padding: 12px;
    width: 100%;
    height: 100%;
    resize: none;
    outline: none;
    font-size: 16px;

    &:focus {
      border: 2px solid ${palette.gray[3]};
    }
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 100%;
  padding: 5px;
  outline: none;
  font-size: 16px;
  border-radius: 8px;
  border: solid 1px #c4c4c4;
`;

export const ButtonGroup = styled.div`
  position: absolute;
  width: 100%;
  bottom: -30px;
  left: 0;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48%;
    position: absolute;
    top: 0;
    height: 30px;
    padding: 20px;
    border: none;
    font-size: 16px;
    border-radius: 3px;
    box-shadow: 0 0 0 0 rgb(0 0 0 / 10%), 0 2px 5px rgb(0 0 0 / 10%);
    cursor: pointer;

    &:hover {
      background: rgb(0 0 0 / 10%);
    }

    &:active {
      margin-top: -2px;
    }
  }

  button:nth-of-type(1) {
    left: 0;
  }

  button:nth-of-type(2) {
    right: 0;
  }
`;