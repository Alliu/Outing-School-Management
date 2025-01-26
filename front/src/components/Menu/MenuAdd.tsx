import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

function MenuDeroulant() {
    const iconStyle = { color: "#005581" };
    return (
        <Menu>
            <MenuHandler style={iconStyle}>
                <div className="flex items-center cursor-pointer ">
                    <AiOutlinePlus size={50} />
                </div>
            </MenuHandler>
            <MenuList placeholder={undefined}>
                <MenuItem className="text-base" placeholder={undefined}>
                    Créer un événement
                </MenuItem>
                <MenuItem className="text-base" placeholder={undefined}>
                    Créer un sondage
                </MenuItem>
                <MenuItem className="text-base" placeholder={undefined}>
                    Créer une classe
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default MenuDeroulant;
