import styled from "@emotion/styled";
import { palette } from "libs/palette";

export const SubMenuWrap = styled.div`
  position: absolute;
  top: 40px;
  right: 18px;
  z-index: 2;
  background: #fff;
`;

export const SubMenuContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.boxShadow.middle};

  .menu-list {
    padding: 8px;
    width: 100%;
    cursor: pointer;
    border-bottom: 1px solid ${palette.gray[1]};
    a,
    button {
      font-size: inherit;
      border: none;
      border-radius: 4px;
      background: transparent;
      cursor: pointer;
    }
    &:hover {
      background-color: ${palette.gray[1]};
    }
  }
`;
