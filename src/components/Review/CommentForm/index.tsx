import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { CommentsFormContainer } from "./styles";
import Button from "components/Base/Button";
import { useRecoilValue } from "recoil";
import { userState } from "store/userState";
import { useCreateCommentMutation } from "hooks/services/mutations";
import Textarea from "components/Base/Textarea";
import useUpdateCommentMutation from "hooks/services/mutations/comment/useUpdateCommentMutation";
import alertHandler from "utils/functions/alertHandler";

interface IProps {
  contentsId: string;
  commentId?: string;
  editMode?: boolean;
  preContent?: string;
  onClose?: () => void;
}

const CommentForm = ({
  contentsId,
  commentId,
  preContent,
  editMode,
  onClose,
}: IProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { _id: userId } = useRecoilValue(userState);
  const [content, setContent] = useState("");
  const createCommentMmutation = useCreateCommentMutation();
  const updateCommentMutation = useUpdateCommentMutation();

  useEffect(() => {
    if (preContent) {
      setContent(preContent);
    }
  }, [preContent]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onReset = () => {
    if (textAreaRef.current) {
      textAreaRef.current.value = "";
      setContent("");
    }
  };

  const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (content) {
      const insertData = {
        writer: userId,
        contentsId,
        content,
      };

      editMode
        ? (() => {
            if (commentId && preContent !== content) {
              updateCommentMutation.mutate({ commentId, content });
              onClose && onClose();
            }
            onClose && onClose();
          })()
        : (() => {
            createCommentMmutation.mutate(insertData);
            onReset && onReset();
          })();
    } else {
      alertHandler.onDefaultAlert({ msg: "댓글을 입력해주세요!", pos: "top" });
    }
  };
  return (
    <CommentsFormContainer>
      <div className="comments-form">
        <div className="input-wrap">
          <Textarea
            ref={textAreaRef}
            value={content}
            onChange={onChange}
            rows={3}
            placeholder={content || "댓글을 입력해주세요."}
          />
        </div>
        <div className="button-wrap">
          {editMode ? (
            <Button onClick={onClose} text="수정 취소" type="button" />
          ) : (
            content !== "" && (
              <Button onClick={onReset} text="초기화" type="button" />
            )
          )}
          <Button
            onClick={onSubmit}
            text={editMode ? "댓글 수정" : "댓글 추가"}
            type="submit"
          />
        </div>
      </div>
    </CommentsFormContainer>
  );
};

export default CommentForm;