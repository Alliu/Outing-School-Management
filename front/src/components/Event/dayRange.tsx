import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function DatePickerRange({ onChange, selectedRange, id }) {
    return (
        <div>
            <Typography
                variant="lead"
                className="block mb-2 ml-2 text-black"
                placeholder={undefined}
            >
                Date(s) de l'événement
            </Typography>

            <DayPicker
                id={id}
                mode="range"
                selected={selectedRange}
                onSelect={onChange}
            />
            {selectedRange && selectedRange.from && selectedRange.to && (
                <p className="p-2 text-lg ">
                    Du {selectedRange.from.toLocaleDateString()} au{" "}
                    {selectedRange.to.toLocaleDateString()}
                </p>
            )}
        </div>
    );
}
