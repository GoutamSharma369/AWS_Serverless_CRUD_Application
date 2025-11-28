import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ItemDetails from "./ItemDetails";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_RzIHk5VNr",
    client_id: "5j9ev79s8unn61933qo4ibjnho",
    redirect_uri: "http://localhost:5173",
    response_type: "code",
    scope: "email openid phone",
};

createRoot(document.getElementById("root")).render(
    <AuthProvider {...cognitoAuthConfig}>
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/details/:id" element={<ItemDetails />} />
                </Routes>
            </div>
        </Router>
    </AuthProvider>
);