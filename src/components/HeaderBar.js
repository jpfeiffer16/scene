import { sigil, reactRenderer } from '@tlon/sigil-js';
import ob from 'urbit-ob'
import { useState, useRef } from 'react';
import { useNotifications } from "./../lib/useNotifications"
import { api } from "../state/api";
import { useOutsideAlerter } from '../lib/hooks';
import HamburgerIcon from './icons/hamburger';
import BellIcon from './icons/bell';
import { docketUninstall } from '@urbit/api';
import { getAuth } from '../lib/auth';

export default function HeaderBar({
  selectedWindow,
  windows,
  toggleHamburger,
  toggleNotifs,
  togglePlanetMenu,
  updateAvailable,
  children
}) {
  const patp = window.ship;
  const [windowMenu, setWindowMenu] = useState(false);
  const windowMenuRef = useRef(null);
  useOutsideAlerter(windowMenuRef, () => setWindowMenu(false));
  const { count } = useNotifications();

  return (
    <>
      <div className="text-white w-full bg-[rgba(0,0,0,0.7)] backdrop-blur-sm flex justify-between items-center min-h-[2.25rem] px-4 cursor-default border-b border-[rgba(0,0,0,0.15)] z-[9999] relative">
        <div className="flex" style={{ gap: '1rem' }}>
          <button
            id="planet-menu-toggle"
            onClick={togglePlanetMenu}
            className={`border-none rounded-lg px-2 bg-[#FFF3] text-white flex-1 flex flex-column justify-center items-center ${updateAvailable ? 'bg-rose-400' : ''}`}>
            {sigil({
              patp: (ob.isValidPatp(`~${patp}`) && (patp.length <= 13)) ? `~${patp}` : '~zod',
              renderer: reactRenderer,
              size: 16,
              colors: ['transparent', 'white'],
            })}
          </button>
          <p
            className="relative rounded-lg hover:bg-[rgba(255,255,255,0.1)]"
            onClick={() => setWindowMenu(!windowMenu)}
          >
            {selectedWindow.value?.[0]?.title || " "}
          </p>
        </div>
        <div ref={windowMenuRef}>
          {windowMenu && (
            <div className="absolute top-10 left-1 w-full max-w-xs bg-white text-black rounded-xl p-4 flex flex-col space-y-2 shadow-sm shadow-[rgba(0,0,0,0.1)]">
              <a
                onClick={() => {
                  windows.set(windows.value.filter((e) => e !== selectedWindow.value?.[0]));
                  selectedWindow.set(selectedWindow.value.filter((e) => e !== selectedWindow.value?.[0]));
                  setWindowMenu(false);
                }}
                className="block py-1 hover:bg-[rgba(0,0,0,0.1)]">Close app</a>
              <a
                onClick={() => {
                  windows.set(windows.value.filter((e) => e !== selectedWindow.value?.[0]));
                  selectedWindow.set(selectedWindow.value.filter((e) => e !== selectedWindow.value?.[0]));
                  api.poke(docketUninstall(selectedWindow.value?.[0].desk));
                  setWindowMenu(false);
                }}
                className="block py-1 hover:bg-[rgba(0,0,0,0.1)]">Uninstall app</a>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            id="notifications-toggle"
            className={`border-none text-white flex-1 flex flex-column justify-center items-center ${count > 0 ? 'bg-rose-400' : ''}`}
            onClick={toggleNotifs}>
            <BellIcon />
          </button>

          <button
            id="hamburger-toggle"
            className="border-none text-white flex-1 flex flex-column justify-center items-center"
            onClick={toggleHamburger}>
            <HamburgerIcon />
          </button>
        </div>
      </div>
      {children}
    </>
  )
}
