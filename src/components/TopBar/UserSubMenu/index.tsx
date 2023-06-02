import React, { useCallback, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SubMenu from "components/Base/SubMenu";
import api from "utils/axios";
import useStorage from "utils/functions/useStorage";
import { userState } from "store/userState";
import { ROUTER_PATH } from "constants/router_path";

interface IProps {
  showSubMenu: boolean;
  onCloseMenu: () => void;
}
const UserSubMenu = ({ showSubMenu, onCloseMenu }: IProps) => {
  const { MYPAGE, STORY } = ROUTER_PATH;
  const userInfo = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { removeStorage } = useStorage;
  const handleLogOut = useCallback(() => {
    api.get("/api/v1/auth/logout", { withCredentials: true }).then((res) => {
      removeStorage("accessToken");
      queryClient.setQueryData(["user"], false);
      navigate("/login", { replace: true });
    });

    onCloseMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuItem = useMemo(
    () => [
      {
        id: 1,
        path: `${MYPAGE}`,
        label: "마이페이지",
      },
      {
        id: 2,
        path: `${STORY}/${userInfo.nickname}`,
        label: "내피드",
      },
      {
        id: 3,
        path: null,
        label: "로그아웃",
        handler: handleLogOut,
      },
    ],
    [MYPAGE, STORY, handleLogOut, userInfo.nickname]
  );

  return (
    <>
      {showSubMenu && (
        <SubMenu
          menuItem={menuItem}
          showSubMenu={showSubMenu}
          onCloseMenu={onCloseMenu}
          customCss={{
            posX: '135px',
            posY: '60px',
          }}
        />
      )}
    </>
  );
};

export default React.memo(UserSubMenu);
