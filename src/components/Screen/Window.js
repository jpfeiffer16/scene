import { Rnd } from "react-rnd";
import { useState, useContext } from "react";
import cn from "classnames";
import CloseIcon from "../icons/close";
import MinimizeIcon from "../icons/minimize";
import RefreshIcon from "../icons/refresh";
import { screenPadding } from "../../lib/constants";
import { ThemeContext } from "../../App";
import Frame from './Frame';

const Window = ({
  win,
  index,
  windows,
  selectedWindow,
  launchOpen,
  hiddenWindow,
}) => {
  const [key, setKey] = useState(0);
  const [drag, setDrag] = useState(false);
  const href =
    "glob" in win.chad
      ? `${window.url}/apps/${win.href.glob.base}`
      : `${window.url}${win.href.site}`;
  const isSelected = selectedWindow.value?.[0] === win;
  const palette = useContext(ThemeContext);
  return (
    <Rnd
      bounds="parent"
      className={cn("rounded-xl overflow-hidden shadow-xl",
        "border-x border-b", {
        "shadow-[rgba(0,0,0,0.8)]": isSelected,
        "shadow-[rgba(0,0,0,0.4)]": !isSelected,
      })}
      style={{
        borderColor: `rgb(${palette?.["DarkMuted"]?.join(",") || "0,0,0"})`,
        zIndex: ([...selectedWindow.value].reverse().indexOf(win) + 1) * 10,
        visibility: hiddenWindow.value.includes(win) ? "hidden" : "visible",
      }}
      onDragStart={() => setDrag(true)}
      onDragStop={() => setDrag(false)}
      default={{
        // add 600 px to accommodate padding for offscreen scrolling
        x: (index + 1) * 100 + screenPadding.inline,
        y: (index + 1) * 100,
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
      }}
    >
      <div className="w-full h-full flex flex-col cursor-default"
        style={{
          backgroundColor: `rgb(${palette?.["Muted"]?.join(",") || "0,0,0"})`
        }}>
        <div
          className="min-h-[2.25rem] text-white w-full flex justify-between items-center px-1"
          onMouseDown={() =>
            selectedWindow.set([
              win,
              ...selectedWindow.value.filter((e) => e.desk !== win.desk),
            ])
          }
        >
          <div
            style={{
              "--close-icon-bg": "#FF605C",
              "--minimize-icon-bg": "#FFBD44",
              "--refresh-icon-bg": "#2FB3FF",
            }}
            className="px-2 flex space-x-2 items-center"
          >
            <button
              className="weird text-black bg-white rounded-full cursor-pointer hover:brightness-75"
              onClick={() => {
                windows.set(windows.value.filter((e) => e.desk !== win.desk));
                selectedWindow.set(
                  selectedWindow.value.filter((e) => e.desk !== win.desk)
                );
              }}
            >
              <CloseIcon />
            </button>
            <button
              className="weird text-black rounded-full cursor-pointer hover:brightness-75"
              onClick={() => hiddenWindow.set([...hiddenWindow.value, win])}
            >
              <MinimizeIcon />
            </button>
            <button
              className="weird text-black rounded-full cursor-pointer hover:brightness-75"
              onClick={() => setKey(key + 1)}
            >
              <RefreshIcon />
            </button>
          </div>
        </div>
        <div
          className="w-full h-full"
          onClickCapture={() => {
            selectedWindow.set([
              win,
              ...selectedWindow.value.filter((e) => e.desk !== win.desk),
            ]);
          }}
          onClick={() => launchOpen.set(false)}
        >
          <Frame
            dragged={drag}
            selectedWindow={selectedWindow}
            win={win}
            launchOpen={launchOpen}
            href={href}
            title={win.title}
            keyName={key}
          />
        </div>
      </div>
    </Rnd>
  );
};

export default Window;
