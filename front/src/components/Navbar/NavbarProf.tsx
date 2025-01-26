import { GoCalendar, GoPeople } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";
import { RxEnvelopeClosed } from "react-icons/rx";
import MenuProf from "../Menu/MenuProf";
import React from "react";

export default function Navbar({ avatar }: any) {
    return (
        <>
            <header className="relative w-full">
                <nav className="flex gap-8 pb-4 mt-10 border-b-2 justify-evenly border-cool-blue">
                    <MenuProf />
                    <img src="src/assets/img/design/logo.png" />

                    <img
                        src={avatar}
                        className="relative inline-block object-cover object-center rounded-full h-14 w-14 text-cool-blue"
                    />
                </nav>
            </header>

            <footer className="fixed bottom-0 left-0 z-10 w-full h-20">
                <nav className="flex py-2 bg-white border-t-2 justify-evenly text-cool-blue border-cool-blue">
                    <GoCalendar className="w-16 h-16" />
                    <AiOutlinePlus className="w-16 h-16 ml-0" />
                    <RxEnvelopeClosed className="w-16 h-16" />
                    <GoPeople className="w-16 h-16 " />
                </nav>
            </footer>
        </>
    );
}
