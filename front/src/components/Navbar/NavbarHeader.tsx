import React from "react";
import MenuParent from "../Menu/MenuParent";

function NavbarHeader() {
    return (
        <>
            <nav className="flex gap-8 pb-4 mt-10 border-b-2 justify-evenly border-cool-blue ">
                <MenuParent itemList={[]} />
                <img src="assets/img/design/logo.png" />

                <img
                    src="assets/img/avatars/nora.png"
                    className="relative inline-block object-cover object-center rounded-full h-14 w-14 text-cool-blue"
                />
            </nav>
        </>
    );
}
export default NavbarHeader;
