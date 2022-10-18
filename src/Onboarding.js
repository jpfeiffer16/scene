import { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { tirrelServer } from "./lib/constants";

const { ipcRenderer } = require("electron");

export default function Onboarding() {
    const navigate = useNavigate();
    const [query, setQuery] = useSearchParams();
    const token = query.get("token");
    const [session, setSession] = useState({stage: undefined, id: undefined });
    const auth = useLoaderData();

    // We receive a "deepLink" event from electron.js when the OS sends us a scene:// link.
    // The scene:// link looks like `scene://?token=34232rfwefwefw` or etc.
    // We hand the ?token= param to the react-router as is, and navigate to it.
    useEffect(() => {
        ipcRenderer.once('deepLink', (event, url) => {
            navigate(url.slice(8));
        })
    }, [navigate]);

    // Because we are simultaneously listening to the token param in the useQuery() hook,
    // when it arrives, we can then instantiate the session.
    useEffect(() => {
        if (!token) { return; }
        if (session?.id) { return; }
        if (session?.stage === 'logged in') { return; }
        console.log('token submit');
        // dispatch the token from the email; the response sets the auth cookie
        fetch(`${tirrelServer}/third/session/${session.id || ""}`, {
            method: 'POST',
            headers: {
                'Content-type': 'text/json',
                'action': 'login',
            },
            credentials: 'include',
            body: atob(token),
        }).then(res => res.json())
        .then(res => setSession(p => ({...p, stage: res.grate})))
        // make another request to /third/session/ with the auth cookie, this
        // will yield our sesision id
        .then(() => fetch(`${tirrelServer}/third/session/`, {
            method: 'GET',
            credentials: 'include',
        })).then(res => res.json())
        .then(res => setSession(p => ({...p, id: res.session })))

    }, [session.id, session.stage, token]);

    useEffect(() => {
        if (auth.ship) {
            navigate("/app")
        }
    }, [auth.ship])

    return (
    <div className="h-screen w-screen bg-cover flex flex-col items-center justify-center" style={{ backgroundImage: "url('moon.png')" }}>
        <Outlet context={{ session, setSession }} />
    </div>
    );
}

export const useSessionContext = useOutletContext;
