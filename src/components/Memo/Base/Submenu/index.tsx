import { SubmenuContainer } from "pages/Memo/styles";
import NavMenu from "components/Base/NavMenu";
import { ROUTER_PATH } from "constants/router_path";

const Submenu = () => {
  const { MEMO_DIABETES, MEMO_DIET } = ROUTER_PATH;
  const subMenus = [
    { id: 1, text: "당수치 내역", url: `${MEMO_DIABETES}` },
    { id: 2, text: "식단 내역", url: `${MEMO_DIET}` }
  ];

  return (
    <SubmenuContainer>
      <NavMenu
        lists={subMenus}
        bgColor="#f1f3f5"
        style={{ boxShadow: "0px 0px 12px -3px rgb(0 0 0 / 30%)" }}
      />
    </SubmenuContainer>
  );
};

export default Submenu;
