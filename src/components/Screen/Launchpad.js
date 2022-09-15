import React, { useRef, useEffect } from "react";
import cn from 'classnames';
import { normalizeUrbitColor } from '../../state/charges';

export default function Launchpad({ apps, windows, launchOpen, selectedWindow, hiddenWindow }) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => launchOpen.set(!launchOpen.value));
    return <div className="w-full h-full z-[1000] flex justify-center items-center transition-all">
        <div
            className={cn("bg-[rgba(0,0,0,0.25)] w-full h-full max-w-[1024px] max-h-[768px] z-[1000] rounded-xl m-4 flex flex-col items-center justify-center backdrop-blur-sm transition-all ease-in-out p-6",
                { "opacity-0 fade-in": launchOpen.value === true })}
            ref={wrapperRef}
        >
            <input type="text" placeholder="Search for providers..." className="rounded-xl my-4 p-1" />
            <div className="grow overflow-y-auto grid md:grid-cols-3 xl:grid-cols-4 gap-8">
                {Object.entries(apps?.charges || {}).map(([desk, charge]) => {
                    return <div className="flex flex-col items-center justify-center text-white space-y-4">
                        <div
                            className="h-[125px] w-[125px] rounded-xl overflow-hidden mx-2 cursor-pointer hover:brightness-110"
                            style={{ backgroundColor: normalizeUrbitColor(charge.color) }}
                            key={desk}
                            onClick={() => {
                                if (!windows.value.includes(charge)) {
                                    windows.set([...windows.value, charge]);
                                }
                                selectedWindow.set([charge, ...selectedWindow.value.filter((e) => e !== charge)])
                                hiddenWindow.set(hiddenWindow.value.filter((e) => e !== charge))
                                launchOpen.set(!launchOpen.value)
                            }}
                        >
                            {charge?.image && <img className="h-[125px] w-[125px]" src={charge.image} />}
                        </div>
                        <p>{charge.title}</p>
                    </div>
                })}
            </div>
        </div>
    </div>
}

function useOutsideAlerter(ref, callback) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [callback, ref]);
}