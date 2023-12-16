"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Input } from "reactstrap";

function BotAssistant() {
    const [modal, setModal] = useState<boolean>(false);
    const [text, setText] = useState<string>("Xin chào bạn nhe");
    const [inputText, setInputText] = useState<string>("");

    const refAudio = useRef<SpeechRecognition | null>(null);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        if (modal) {
            const msg = new SpeechSynthesisUtterance();
            msg.text = text;
            window.speechSynthesis.speak(msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal, text]);

    const fetchAPI = async () => {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then((response) => response.json())
            .then(async (json) => {
                setText("Dữ liệu CALL API" + Math.random());
            });
    };

    const handleGetAudioAndSend = () => {
        if (!refAudio.current) return;
        refAudio.current.start();
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
            setText(event.results[0][0].transcript);
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

    return (
        <div>
            <Button color="danger" onClick={toggle}>
                Click Me
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Trợ Lí Ảo Tuyển Sinh</ModalHeader>
                <ModalBody>
                    <div>
                        <Button className="btn btn-primary" onClick={fetchAPI}>
                            Fetch API
                        </Button>
                        <div className="d-flex">
                            <Input
                                className="form-control"
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setInputText(e.target.value)
                                }
                                value={inputText}
                            />
                            <button
                                className="btn"
                                onClick={handleGetAudioAndSend}
                            >
                                {inputText.trim() ? (
                                    <i
                                        className="bi bi-send-fill"
                                        style={{
                                            color: "blue",
                                        }}
                                    ></i>
                                ) : (
                                    <i className="bi bi-mic"></i>
                                )}
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default BotAssistant;
