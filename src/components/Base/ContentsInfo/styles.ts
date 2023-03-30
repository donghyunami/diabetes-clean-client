import styled from "@emotion/styled";

export const ContentsInfoInterface = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  border-radius: 5px;

  .left-img {
    flex: 1;
    display: flex;
  }

  .right-info {
    flex: 8;
    display: flex;
    flex-direction: column;
    font-weight: 200;
    font-size: 15px;
    .user_name {
      cursor: pointer;

      &:hover {
        color: #868e96;
      }
    }
  }
`;