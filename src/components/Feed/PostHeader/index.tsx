import { useState, useCallback, useMemo } from "react";
import { PostHeaderBlock, Icons } from "../PostCards/styles";
import { FiMoreHorizontal } from "react-icons/fi";
import ContentsInfo from "components/Base/ContentsInfo";
import SubMenu from "../../Base/SubMenu";
import { useRecoilValue } from "recoil";
import { userState } from "store/userState";
import { IWriterInfo } from "models/db";
import { useDelContentsMutation } from "hooks/services/mutations";
import alertHandler from "utils/functions/alertHandler";

interface IProps {
  writer: IWriterInfo;
  contentId: string;
  isDeleted: boolean;
}
const PostHeader = ({ writer, contentId, isDeleted }: IProps) => {
  const { _id: userId } = useRecoilValue(userState);
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
  const mutation = useDelContentsMutation();
  const onToggleMenu = useCallback(() => {
    setShowSubMenu((prev) => !prev);
  }, []);

  const onCloseMenu = useCallback(() => {
    setShowSubMenu(false);
  }, []);

  const onDelPost = useCallback(() => {
    if (contentId) {
      alertHandler
        .onConfirm({
          msg: "삭제하면 복구하기 어렵습니다. 그래도 삭제하실건가요?",
        })
        .then((result) => {
          if (result.isConfirmed) {
            mutation.mutate(contentId);
          }
        });
    }
  }, [mutation, contentId]);

  const onReportPost = useCallback(() => {
    console.log("ReportPost");
  }, []);

  const onHidePost = useCallback(() => {
    console.log("HidePost");
  }, []);

  const menuItem = useMemo(() => {
    if (userId === writer._id) {
      return [
        {
          id: 1,
          path: "/mypage",
          targetName: "게시물 수정",
        },
        {
          id: 2,
          path: null,
          targetName: "게시물 삭제",
          handler: onDelPost,
        },
      ];
    }
    return [
      {
        id: 1,
        path: null,
        targetName: "게시물 숨기기",
        handler: onHidePost,
      },
      {
        id: 2,
        path: null,
        targetName: "게시물 신고",
        handler: onReportPost,
      },
    ];
  }, [onDelPost, onHidePost, onReportPost, userId, writer._id]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <PostHeaderBlock>
        <ContentsInfo
          userName={writer.nickname}
          imgUrl={writer.imageSrc}
          link={`/story/${writer.nickname}`}
        />
        {!isDeleted && (
          <Icons
            onClick={onToggleMenu}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <span>
              <FiMoreHorizontal />
            </span>
          </Icons>
        )}
        {!isDeleted && showSubMenu && (
          <SubMenu
            customCss={{posX: '125px'}}
            menuItem={menuItem}
            showSubMenu={showSubMenu}
            onCloseMenu={onCloseMenu}
          />
        )}
      </PostHeaderBlock>
    </div>
  );
};

export default PostHeader;
