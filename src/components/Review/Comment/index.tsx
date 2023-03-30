import ContentsInfo from "components/Base/ContentsInfo";
import { CommentContainer } from "./styles";

const Comment = () => {
  const imgUrl = "https://mui.com/static/images/avatar/3.jpg";

  return (
    <CommentContainer>
      <div className="comment-header">
        <ContentsInfo
          imgUrl={imgUrl}
          imgSize={40}
          userName={"sugarclean119"}
          link={"/mypage"}
        />
      </div>
      <div className="comment-contents">
        <p>바다 정말 이쁘네용 ^^</p>
      </div>
    </CommentContainer>
  );
};

export default Comment;