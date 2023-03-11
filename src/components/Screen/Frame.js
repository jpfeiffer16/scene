import cn from "classnames";

const Frame = ({
  dragged,
  selectedWindow,
  launchOpen,
  win,
  href,
  title,
  keyName,
}) => {
  return (
    <iframe
      className={cn("w-full h-full bg-white min-h-0 select-none", {
        "pointer-events-none":
          selectedWindow.value?.[0]?.title !== win.title ||
          launchOpen.value ||
          dragged,
      })}
      src={href}
      title={title}
      key={keyName}
    />
  );
};

export default Frame;
