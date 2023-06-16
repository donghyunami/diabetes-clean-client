import { useMemo } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import gravatar from "gravatar";
import { useRecoilValue } from "recoil";
import Avatar from "components/Base/Avatar";
import Button from "components/Base/Button";
import { ROUTER_PATH } from "constants/router_path";
import { userState } from "store/userState";
import { useUserContentsQuery } from "hooks/services/queries";
import { PostItemWrap } from "components/Posts/styles";
import {
  MyFeedContainer,
  MyFeedWrap,
  Header,
  LeftSide,
  MainContents,
  MyFeedMain,
  UserInfo,
  UserStatus,
  ContentsMenu,
} from "./styles";

const MyFeed = () => {
  const { STORY } = ROUTER_PATH;
  const { username } = useParams();
  const { data } = useUserContentsQuery(username as string);
  const userInfo = useMemo(() => data?.contents[0]?.writer, [data?.contents]);

  const currentUser = useRecoilValue(userState);
  return (
    <MyFeedWrap>
      <MyFeedContainer>
        <Header>
          <span>{username}님 Story</span>
        </Header>
        <MyFeedMain>
          <LeftSide>
            <div className="inner">
              <UserInfo>
                <div className="profile-img">
                  <Avatar
                    imgName=""
                    size={150}
                    imgUrl={
                      userInfo?.imageSrc
                        ? userInfo?.imageSrc
                        : gravatar.url(userInfo?.nickname as string, {
                            s: "130px",
                            d: "retro",
                          })
                    }
                  />
                </div>
                <div className="user-fields">
                  <div>{userInfo?.nickname}</div>
                  <div>{userInfo?.email}</div>
                  <div>
                    {currentUser.nickname !== userInfo?.nickname && (
                      <Button
                        text="팔로우"
                        type="button"
                        style={{
                          margin: "10px 0",
                          width: 120,
                          height: 45,
                          fontSize: 18,
                          color: "#edf2ff",
                          background: "#637ed3",
                        }}
                      />
                    )}
                  </div>
                </div>
              </UserInfo>
              <UserStatus>
                <ul>
                  <li>
                    <span className="status-inner">
                      <span className="status">팔로잉</span>
                      <span>0</span>
                    </span>
                  </li>
                  <li>
                    <span className="status-inner">
                      <span className="status">팔로워</span>
                      <span>0</span>
                    </span>
                  </li>
                  <li>
                    <span className="status-inner">
                      <span className="status">게시글</span>
                      <span>{data?.contents.length}</span>
                    </span>
                  </li>
                </ul>
              </UserStatus>
            </div>
          </LeftSide>
          <MainContents>
            <ContentsMenu>
              <ul>
                <li>
                  <Link to={`${STORY}/${username}`}>내 게시글</Link>
                </li>
                <li>
                  <Link to={`${STORY}/${username}/empathy`}>관심 글</Link>
                </li>
                <li>
                  <Link to={`${STORY}/${username}/activity`}>활동 내역</Link>
                </li>
              </ul>
            </ContentsMenu>
            <Outlet />
          </MainContents>
        </MyFeedMain>
      </MyFeedContainer>
    </MyFeedWrap>
  );
};

export default MyFeed;