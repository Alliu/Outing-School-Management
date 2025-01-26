import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import UserContext from "../../contexts/user.context";
import React from "react";

export interface ItemInterface {
    title: string;
    params: string;
}
interface MenuDeroulantProps {
    itemList: ItemInterface[];
}
function MenuDeroulant(props: MenuDeroulantProps) {
    const { logout } = useContext(UserContext);
    const { itemList } = props;
    return (
        <Menu>
            <MenuHandler>
                <div className="flex items-center cursor-pointer text-cool-blue">
                    <RxHamburgerMenu size={48} />
                </div>
            </MenuHandler>
            <MenuList placeholder={undefined}>
                {itemList.map((item: ItemInterface) => (
                    <MenuItem
                        key={item.params}
                        className="text-2xl"
                        placeholder={undefined}
                    >
                        <NavLink
                            to={`/${item.params}`}
                            className={({ isActive }) =>
                                isActive ? "activeLink" : undefined
                            }
                        >
                            {item.title}
                        </NavLink>
                    </MenuItem>
                ))}
                <MenuItem
                    className="text-2xl font-bold text-red-300"
                    placeholder={undefined}
                    onClick={logout}
                >
                    Se déconnecter
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default MenuDeroulant;
