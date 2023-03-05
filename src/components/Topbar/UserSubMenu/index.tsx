import React, { useCallback } from "react";
import axios from "axios";

import Menu from "components/Base/Menu";
import { useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { MenuContainer } from "components/Base/Menu/styles";
import CardItem from "../CardItem";

interface Props {
  showUserSubMenu: boolean;
  handleCloseMenu: () => void;
}
const UserSubMenu = ({ showUserSubMenu, handleCloseMenu }: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogOut = useCallback(() => {
    axios.get("/api/v1/auth/logout").then((res) => {
      queryClient.setQueryData("user", () => null);
    });
    handleCloseMenu();
    navigate("/login", { replace: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Menu showMenu={showUserSubMenu} onCloseModal={handleCloseMenu}>
      <MenuContainer>
        <CardItem>
          <button onClick={handleLogOut}>로그아웃</button>
        </CardItem>
        <CardItem>
          <Link onClick={handleCloseMenu} to={"/mypage"}>마이페이지</Link>
        </CardItem>
      </MenuContainer>
    </Menu>
  );
};

export default React.memo(UserSubMenu);
