import { useState, useEffect, useContext } from "react";
import { Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../../contexts/user.context";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { getUserFullname, getUserMessages } from "../../api/User/Users";
import { SimpleCard } from "../../components/Message/CardMessage";
import Navbar from "../../components/Navbar/Navbar";
import { refreshToken } from "../../hook/useApi/useApi";

const socket = io("http://localhost:3000", {
    autoConnect: false,
    withCredentials: true,
});
interface Message {
    author: string;
    body: string;
}

export const Chat = () => {
    const { user } = useContext(UserContext);
    const { contactId } = useParams();
    const { data: userMessages } = useQuery<[]>({
        queryKey: ["userMessages"],
        queryFn: () => getUserMessages(user.id, +contactId),
        staleTime: 0,
        enabled: true,
    });

    const { data: contact } = useQuery<string>({
        queryKey: ["contact"],
        queryFn: () => getUserFullname(contactId),
        staleTime: 0,
        enabled: true,
    });

    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            console.log("Socket connected");
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        socket.on("chat", async (newMessage) => {
            console.log("New message added", newMessage);
            setMessages((previousMessages) => [
                ...previousMessages,
                newMessage,
            ]);
            const newToken = await refreshToken();
            if (newToken)
                localStorage.setItem("access_token", newToken.access_token);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("chat");

            if (socket) {
                socket.disconnect();
                console.log("Déconnecté du WebSocket");
            }
        };
    }, []);

    const sendClickMessage = (e: React.FormEvent) => {
        e.preventDefault();

        socket.emit("chat", {
            author: user.firstname,
            body: message.trim(),
            writer_id: user.id,
            receiver_id: +contactId,
        });

        setMessage("");
    };

    return (
        <div>
            <Navbar />
            <div className="bg-cool-blueClaire h-screen flex flex-col justify-between p-4 overflow-auto gap-4 ">
                <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-2 text-center text-cool-blue"
                >
                    {contact}
                </Typography>

                <div>
                    <div>
                        {userMessages?.length ? (
                            <div>
                                {" "}
                                {userMessages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={
                                            msg["writer_id"] == user.id
                                                ? "flex flex-col items-start"
                                                : "flex flex-col items-end"
                                        }
                                    >
                                        <div className="w-2/3">
                                            <SimpleCard
                                                content={msg["content"]}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div>Derniers messages</div>
                            </div>
                        ) : (
                            "Aucun message"
                        )}
                    </div>

                    <div>
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={
                                    msg.author === user.firstname
                                        ? "flex flex-col items-start"
                                        : "flex flex-col items-end"
                                }
                            >
                                <div className="w-2/3">
                                    <SimpleCard content={msg.body} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <form className="flex justify-between mb-20 gap-2" action="">
                    <input
                        className="w-screen p-2"
                        type="text"
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit" onClick={sendClickMessage}>
                        Envoyer
                    </button>
                </form>
            </div>
        </div>
    );
};
