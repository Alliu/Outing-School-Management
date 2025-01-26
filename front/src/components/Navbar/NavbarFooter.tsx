import { AiOutlinePlus } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import { RxEnvelopeClosed } from "react-icons/rx";
import { GoCalendar } from "react-icons/go";
import React from "react";
export default function NavbarFooter() {
    return (
        <>
            <nav className="flex justify-evenly border-t-2  text-cool-blue border-cool-blue py-4 bg-white">
                <GoCalendar className="h-16 w-16" />
                <AiOutlinePlus className="h-16 w-16 ml-0" />
                <RxEnvelopeClosed className="h-16 w-16" />
                <GoPeople className="h-16 w-16 " />
            </nav>
        </>
    );
}
