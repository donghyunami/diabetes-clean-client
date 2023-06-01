import { useMutation, useQueryClient } from '@tanstack/react-query';
import { COMMENT_KEY } from 'constants/query_key';
import { ICommentRequest } from 'models/db';
import { createComment } from 'utils/apis/comment';
import alertHandler from 'utils/functions/alertHandler';

const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(createComment<ICommentRequest>, {
    onSuccess: (data) => {
      queryClient.invalidateQueries<string>([COMMENT_KEY]);
      alertHandler.onToast({ msg: data.msg });
    },
    onError: err => {
      console.log({error: err})
      return err;
    }
  })
}

export default useCreateCommentMutation;