import { createContext } from 'react';
import { Frame } from './components/Window';

export const AppWindowContext = createContext();

export default function Window() {
  return (
    <AppWindowContext.Provider value={false}>
      <Frame 
        dragged={false}
        selectedWindow={false}
        launchOpen={false}
        win={null}
        href={'http://localhost/apps/webterm'}
        title={'webterm'}
        keyName={'something'}/>

        {/* <Frame */}
        {/*   dragged={drag} */}
        {/*   selectedWindow={selectedWindow} */}
        {/*   win={win} */}
        {/*   launchOpen={launchOpen} */}
        {/*   href={href} */}
        {/*   title={win.title} */}
        {/*   keyName={key} */}
        {/* /> */}
    </AppWindowContext.Provider>
  );
}
