import { Link } from "react-router-dom";
import { SubMenuItem, SubMenuList } from "./styles";
import Menu, { CustomCss } from "components/Base/Menu";

interface MenuItemType {
  id: number;
  path: string | null;
  targetName: string;
  handler?: any;
}

interface Props {
  customCss?: CustomCss;
  showSubMenu: boolean;
  onCloseMenu: () => void;
  menuItem: MenuItemType[];
}

const SubMenu = ({ menuItem, showSubMenu, onCloseMenu, customCss }: Props) => {
  return (
    <Menu
      showMenu={showSubMenu}
      onCloseMenu={onCloseMenu}
      customCss={customCss}
    >
      <SubMenuList width="110px">
        {menuItem.map((menu) =>
          menu.path ? (
            <SubMenuItem
              key={menu.id}
              className="menu-list"
              onClick={onCloseMenu}
            >
              <Link onClick={onCloseMenu} to={menu.path}>
                {menu.targetName}
              </Link>
            </SubMenuItem>
          ) : (
            <SubMenuItem
              key={menu.id}
              className="menu-list"
              onClick={menu.handler}
            >
              <button onClick={onCloseMenu}>{menu.targetName}</button>
            </SubMenuItem>
          )
        )}
      </SubMenuList>
    </Menu>
  );
};

export default SubMenu;
