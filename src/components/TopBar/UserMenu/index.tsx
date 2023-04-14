import React, { useState,useEffect,useCallback } from "react";
import { Link } from "react-router-dom";
import { FcCollapse, FcExpand } from "react-icons/fc";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import gravatar from "gravatar";
import { IUserResponse } from "models/db";
import UserSubMenu from "components/TopBar/UserSubMenu";
import Avatar from "components/Base/Avatar";
import { getUserApi } from "utils/apis/userApis";
import useStorage from "utils/functions/useStorage";
import { userState } from "store/userState";
import { ROUTER_PATH } from "constants/router_path";
import { MenuList, ProfileWrap, UserItem } from "./styles";

const UserMenu = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const { LOGIN, SIGNUP, SAVE_MEMO_DIABETES} =
  ROUTER_PATH;
  const token = useStorage.getStorage("accessToken");
  const {
    data: userData,
    error,
    isError,
    isLoading,
  } = useQuery<IUserResponse>("user", getUserApi);
  const [showUserSubMenu, setShowUserSubMenu] = useState(false);
  const handleShowUserSubMenu = useCallback(() => {
    setShowUserSubMenu(!showUserSubMenu);
  }, [showUserSubMenu]);

  const handleCloseMenu = useCallback(() => {
    setShowUserSubMenu(false);
  }, []);

  useEffect(() => {
    console.log(userData)
    if(userData) {
      setUserInfo(userData.userInfo)
    }
  }, [setUserInfo, userData])

  const renderMenu = (token: string | null) => {
    if (!token) {
      return (
        <>
          <UserItem>
            <Link to={LOGIN}>로그인</Link>
          </UserItem>
          <UserItem>
            <Link to={SIGNUP}>회원가입</Link>
          </UserItem>
        </>
      );
    } else {
      return (
        <>
          <MenuList>
            <UserItem>
              <Link to={SAVE_MEMO_DIABETES}>기록 하기</Link>
            </UserItem>
            <UserItem>
              {userData && (
                <ProfileWrap onClick={handleShowUserSubMenu}>
                  <Avatar
                    size={32}
                    imgName="profile-img"
                    imgUrl={
                      userData?.userInfo?.imageSrc
                        ? userData?.userInfo?.imageSrc
                        : gravatar.url(userData?.userInfo?.email, {
                            s: "32px",
                            d: "retro",
                          })
                    }
                  />
                  <span className="menuIcon">
                    {showUserSubMenu ? <FcCollapse /> : <FcExpand />}
                  </span>
                </ProfileWrap>
              )}
            </UserItem>
          </MenuList>

          {showUserSubMenu && (
            <UserSubMenu
              showUserSubMenu={showUserSubMenu}
              handleCloseMenu={handleCloseMenu}
            />
          )}
        </>
      );
    }
  };

  return <>{renderMenu(token)}</>;
};

export default React.memo(UserMenu);