import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import HomePageParent from "./pages/Home/HomePage";
import Reini_1 from "./pages/auth/Reini-1";
import Reini_2 from "./pages/auth/Reini_2";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CompteParentPage from "./pages/Compte/CompteParentPage";
import ContactsParentPage from "./pages/Contacts/ContactsParentPage";
import CreateEventProf from "./pages/Events/CreateEventProf";
import { EventsPage } from "./pages/Events/EventsPage";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { SurveysPage } from "./pages/Surveys/SurveysPage";
import MyEventDetailParentPage from "./pages/Events/MyEventDetailParentPage";
import NotificationsPage from "./pages/Notifications/Notifications";
import SignUpParentPage from "./pages/auth/SignUpParentPage";
import SignUpTeacherPage from "./pages/auth/SignUpTeacherPage";
import { Chat } from "./pages/chat/chat";
import React from "react";
import SignInPage from "./pages/auth/SignInPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup_parent" element={<SignUpParentPage />} />
                <Route path="/signup_teacher" element={<SignUpTeacherPage />} />
                <Route path="/reini_1" element={<Reini_1 />} />
                <Route path="/reini_2" element={<Reini_2 />} />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <HomePageParent />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/compte"
                    element={
                        <PrivateRoute>
                            <CompteParentPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/contacts"
                    element={
                        <PrivateRoute>
                            <ContactsParentPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/add_event"
                    element={
                        <PrivateRoute>
                            <CreateEventProf />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/events"
                    element={
                        <PrivateRoute>
                            <EventsPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/events/suggestions"
                    element={
                        <PrivateRoute>
                            <EventsPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/surveys"
                    element={
                        <PrivateRoute>
                            <SurveysPage />
                        </PrivateRoute>
                    }
                />

                <Route path="/chat/:contactId" element={<Chat />} />

                <Route
                    path="/eventDetailParent"
                    element={<MyEventDetailParentPage />}
                />
                <Route path="/notifications" element={<NotificationsPage />} />
            </Routes>

            <ReactQueryDevtools />
        </>
    );
}

export default App;
