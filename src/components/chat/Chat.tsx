import { IResponse } from "@/utils/interface/interface";
import Image from "next/image";
import React from "react";
import AnswerSpecialized from "../table/Table";

const ChatItem = ({ chat }: { chat: IResponse<any> }) => {
    if (chat.is_ai) {
        if (chat.is_table) {
            return (
                <div className="ai-chat">
                    <Image
                        width={28}
                        height={28}
                        alt="Hình ảnh trợ lí ảo"
                        src="/avatar-ai.jpg"
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: 10,
                        }}
                        priority
                    />
                    <div>
                        <AnswerSpecialized dataAnswer={chat.data.table} />
                    </div>
                </div>
            );
        }

        if (chat.is_mark_down) {
            return (
                <div className="ai-chat">
                    <Image
                        width={28}
                        height={28}
                        alt="Hình ảnh trợ lí ảo"
                        src="/avatar-ai.jpg"
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: 10,
                        }}
                        priority
                    />
                    <div>
                        <PercentMatchAI chat={chat} />
                        <div
                            className="preview-markdown"
                            dangerouslySetInnerHTML={{
                                __html: chat.data.content_html,
                            }}
                        ></div>
                    </div>
                </div>
            );
        }

        if (chat.is_mark_down === false && !chat.is_point) {
            return (
                <div className="ai-chat">
                    <Image
                        width={28}
                        height={28}
                        alt="Hình ảnh trợ lí ảo"
                        src="/avatar-ai.jpg"
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: 10,
                        }}
                        priority
                    />
                    <div>
                        {" "}
                        <PercentMatchAI chat={chat} />
                        {chat.data}
                    </div>
                </div>
            );
        }

        if (chat.is_point) {
            return (
                <div className="ai-chat">
                    <Image
                        width={28}
                        height={28}
                        alt="Hình ảnh trợ lí ảo"
                        src="/avatar-ai.jpg"
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: 10,
                        }}
                        priority
                    />
                    <div>
                        <PercentMatchAI chat={chat} />
                        {(chat.data as any[]).map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        marginBottom: 20,
                                    }}
                                >
                                    <h4
                                        style={{
                                            fontWeight: 700,
                                            fontSize: 24,
                                        }}
                                    >
                                        {item.title}
                                    </h4>
                                    <div>
                                        {(item.image_url as string[]).map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    style={{
                                                        marginBottom: 30,
                                                    }}
                                                >
                                                    <Image
                                                        width={600}
                                                        height={600}
                                                        alt="Hình ảnh trợ lí ảo"
                                                        src={`http://localhost:8080/upload/folder/app/${item}`}
                                                        style={{
                                                            border: "1px solid #ccc",
                                                            objectFit:
                                                                "contain",
                                                            width: "100%",
                                                            height: "300px",
                                                            borderRadius: 10,
                                                        }}
                                                        priority
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    } else {
        if (!chat.is_ai) {
            return (
                <div className="user-chat">
                    <div>{chat.data}</div>
                    <Image
                        width={28}
                        height={28}
                        alt="Hình ảnh user"
                        src="/not-avatar.jpg"
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginLeft: 10,
                        }}
                        priority
                    />
                </div>
            );
        }
    }
};

export default ChatItem;

function PercentMatchAI({ chat }: { chat: IResponse<any> }) {
    return (
        <div
            style={{
                position: "absolute",
                bottom: 40,
                fontSize: 10,
                padding: 4,
                opacity: 0.6,
                fontWeight: 600,
            }}
        >
            <div>AI dự đoán {Math.floor(chat.match_ai * 100)}% độ phù hợp</div>
            {chat.match_query ? (
                <div>Phù hợp với bạn {Math.floor(chat.match_query * 100)}%</div>
            ) : (
                ""
            )}
        </div>
    );
}
