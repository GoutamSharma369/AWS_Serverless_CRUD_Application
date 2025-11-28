import { useEffect, useState } from "react";
import "./App.css";
import reactImg from "./assets/react.svg";
import { useAuth } from "react-oidc-context";
import Home from "./Home.jsx";

function App() {
    const auth = useAuth();

    const signOutRedirect = () => {
        const clientId = "5j9ev79s8unn61933qo4ibjnho";
        const logoutUri = "http://localhost:5173";
        const cognitoDomain = "https://us-east-1rzihk5vnr.auth.us-east-1.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <div>
                <button onClick={() => auth.removeUser()}>Sign out</button>
                <Home />
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => auth.signinRedirect()}>Sign in</button>
            <button onClick={() => signOutRedirect()}>Sign out</button>
        </div>
    );
}

export default App;