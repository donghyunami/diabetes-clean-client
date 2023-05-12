import { useQuery } from "@tanstack/react-query";
import { CONTENTS_KEY } from "constants/query_key";
import { IContentsResponse } from "models/db";
import { getAllContents } from "utils/apis/contents";

const useContentsQuery = () => {
  return useQuery<IContentsResponse>({
    queryKey: [CONTENTS_KEY],
    queryFn: () => getAllContents(),
  });
};

export default useContentsQuery;