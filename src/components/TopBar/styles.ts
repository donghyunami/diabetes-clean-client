import { palette } from "libs/palette";
import styled from "@emotion/styled";

export const Navbar = styled.div`
  padding: 5px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .menu-left {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-center {
    width: 680px;
  }
  .menu-right {
    display: flex;
    justify-content: center;
    padding: 5px 12px;
  }
  .menu-bars {
    background: none;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.bgColor.main};
    cursor: pointer;

    & > span {
      display: inline-block;
      padding: 5px 12px;
      font-size: 25px;
    }
  }
  .page-title {
    position: relative;
    left: 0;
    top: 3px;
    margin-left: 0;
    height: 100%;
    font-size: 20px;
    line-height: 40px;
    color: ${({ theme }) => theme.bgColor.main};
    font-weight: 600;
  }
`;
export const OverWrap = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const NavContents = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px 8px;
  list-style: none;
  height: 60px;

  & > a {
    width: 95%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    border: 1px solid lightgray;
    border-radius: 4px;

    &:hover {
      font-weight: 700;
      background-color: ${palette.gray[1]};
    }
  }
`;
