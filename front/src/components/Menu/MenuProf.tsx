import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import React, { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import UserContext from "../../contexts/user.context";
function MenuDeroulant() {
    const { logout } = useContext(UserContext);
    const iconStyle = { color: "#005581" };
    return (
        <Menu>
            <MenuHandler style={iconStyle}>
                <div className="flex items-center cursor-pointer ">
                    <RxHamburgerMenu size={48} />
                </div>
            </MenuHandler>
            <MenuList placeholder={undefined}>
                <MenuItem className="text-base" placeholder={undefined}>
                    Accueil
                </MenuItem>
                <MenuItem className="text-base" placeholder={undefined}>
                    Mon compte
                </MenuItem>
                <MenuItem className="text-base" placeholder={undefined}>
                    Mes Classes
                </MenuItem>
                <MenuItem className="text-base" placeholder={undefined}>
                    Mes contacts
                </MenuItem>
                <MenuItem className="text-base" placeholder={undefined}>
                    Mes évènements
                </MenuItem>
                <MenuItem className="text-base" placeholder={undefined}>
                    Messagerie
                </MenuItem>
                <MenuItem className="text-base" placeholder={undefined}>
                    Album photos
                </MenuItem>
                <MenuItem
                    className="font-semibold text-base mt-4"
                    placeholder={undefined}
                    onClick={logout}
                >
                    Me déconnecter
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default MenuDeroulant;
