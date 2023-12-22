"use client";
import { GetRuntimeAI } from "@/action";
import { IMarkDown, IResponse } from "@/utils/interface/interface";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Input } from "reactstrap";
import AnswerSpecialized from "../table/Table";
import Image from "next/image";
import ChatItem from "../chat/Chat";
import Setting from "../setting/Setting";

function BotAssistant() {
    const [modal, setModal] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [inputText, setInputText] = useState<string>("");
    const [result, setResult] = useState<IResponse<any> | null>(null);
    const [renderChat, setRenderChat] = useState<any[]>([]);
    const divRenderChat = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMute, setIsMute] = useState<boolean>(true);
    const [questionSuggest, setQuestionSuggest] = useState<string>("");
    const refAudio = useRef<SpeechRecognition | null>(null);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        setText("Xin chào, hiện tại bot có thể giúp gì cho bạn");
    }, []);

    useEffect(() => {
        if (isMute) {
            setText("");
            return;
        }
        if (modal) {
            const msg = new SpeechSynthesisUtterance();
            msg.text = text;
            window.speechSynthesis.speak(msg);
        }
        setText("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal, text]);

    const handleGetAudioAndSend = () => {
        if (!refAudio.current) return;
        refAudio.current.start();
    };

    const handleSendMessage = async () => {
        if (!inputText) return;
        const fetchAPI = async () => {
            const chatUser = {
                data: inputText,
                is_ai: false,
            };
            const chat_save = JSON.parse(localStorage.getItem("chats") || "[]");
            localStorage.setItem(
                "chats",
                JSON.stringify([...chat_save, chatUser])
            );
            setRenderChat([...chat_save, chatUser]);
            setIsLoading(true);
            const data = await GetRuntimeAI(inputText);
            setIsLoading(false);
            setResult(data);
        };
        fetchAPI();
    };

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        refAudio.current = recognition;
        recognition.continuous = false;
        recognition.lang = "vi";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = function (event) {
            setInputText(event.results[0][0].transcript);
        };

        recognition.onspeechend = function () {
            recognition.stop();
        };
        recognition.onspeechend = function (e) {
            console.log(e);
        };

        recognition.onerror = function (event) {
            console.log(event.error);
        };
    }, []);

    useEffect(() => {
        const chat_save = JSON.parse(localStorage.getItem("chats") || "[]");
        setRenderChat(chat_save);
    }, []);

    useEffect(() => {
        if (!result) return;
        console.log(result);
        if (result.is_mark_down && !result.is_table) {
            setText(result.data.content_mark_down);
        }
        const chat_save = JSON.parse(localStorage.getItem("chats") || "[]");
        setRenderChat((prev) => [...prev, result]);
        localStorage.setItem("chats", JSON.stringify([...chat_save, result]));
        setInputText("");
    }, [result]);

    useEffect(() => {
        if (!divRenderChat.current) return;
        divRenderChat.current.scrollIntoView();
    }, [renderChat]);

    useEffect(() => {
        if (!questionSuggest) return;
        const fetch = async () => {
            const chatUser = {
                data: questionSuggest,
                is_ai: false,
            };
            const chat_save = JSON.parse(localStorage.getItem("chats") || "[]");
            localStorage.setItem(
                "chats",
                JSON.stringify([...chat_save, chatUser])
            );
            setRenderChat([...chat_save, chatUser]);
            setIsLoading(true);
            const data = await GetRuntimeAI(questionSuggest);
            setIsLoading(false);
            setQuestionSuggest("");
            setResult(data);
        };
        fetch();
    }, [questionSuggest]);

    return (
        <div>
            <Button color="danger" onClick={toggle}>
                Click Me
            </Button>
            <Modal isOpen={modal} toggle={toggle} size="xl">
                <ModalHeader toggle={toggle}>
                    <h4
                        style={{
                            fontSize: 16,
                            fontStyle: "italic",
                        }}
                    >
                        trợ lí ảo tuyển sinh
                    </h4>
                </ModalHeader>
                <ModalBody>
                    <div
                        style={{
                            height: "80vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            position: "relative",
                        }}
                    >
                        <Setting
                            setQuestionSuggest={setQuestionSuggest}
                            isMute={isMute}
                            setIsMute={setIsMute}
                        />
                        <div
                            style={{
                                flex: 1,
                                overflow: "auto",
                            }}
                        >
                            {renderChat && renderChat.length ? (
                                renderChat.map(
                                    (chat: IResponse<any>, index) => {
                                        return (
                                            <ChatItem key={index} chat={chat} />
                                        );
                                    }
                                )
                            ) : (
                                <ChatItem
                                    chat={{
                                        is_ai: true,
                                        is_mark_down: true,
                                        data: {
                                            content_html: `<h3>
                                                Xin chào, hiện tại bot có
                                                thể giúp gì cho bạn
                                            </h3>`,
                                        },
                                        code: 200,
                                        is_table: false,
                                        match_ai: 1,
                                        match_query: 0,
                                        msg: "ok",
                                    }}
                                />
                            )}
                            {isLoading && (
                                <div
                                    className="is-typing"
                                    style={{
                                        paddingBottom: 40,
                                        marginTop: 50,
                                    }}
                                >
                                    <div className="jump1"></div>
                                    <div className="jump2"></div>
                                    <div className="jump3"></div>
                                </div>
                            )}
                            <div ref={divRenderChat} />
                        </div>
                        <div
                            className="d-flex"
                            style={{
                                height: 50,
                                padding: "10px 0",
                            }}
                        >
                            <input
                                className="input-send py-2"
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setInputText(e.target.value)
                                }
                                value={inputText}
                                onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                        handleSendMessage();
                                    }
                                }}
                                placeholder="Nhập thông tin muốn hỏi của bạn..."
                            />

                            {inputText.trim() ? (
                                <button
                                    className="btn"
                                    onClick={handleSendMessage}
                                >
                                    <i
                                        className="bi bi-send-fill"
                                        style={{
                                            color: "blue",
                                        }}
                                    ></i>
                                </button>
                            ) : (
                                <button
                                    className="btn"
                                    onClick={handleGetAudioAndSend}
                                >
                                    <i
                                        style={{
                                            color: "blue",
                                        }}
                                        className="bi bi-mic"
                                    ></i>
                                </button>
                            )}
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default BotAssistant;
