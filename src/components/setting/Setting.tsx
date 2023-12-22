import React, { useState } from "react";
import Tippy from "@tippyjs/react";

interface ISetting {
    isMute: boolean;
    setIsMute: (status: boolean) => void;
    setQuestionSuggest: (text: string) => void;
}
const Setting = ({ isMute, setIsMute, setQuestionSuggest }: ISetting) => {
    const [isSetting, setIsSetting] = useState<boolean>(false);

    return (
        <div className="setting-wp">
            <Tippy content="cài đặt app của bạn">
                <button
                    className="setting-click-toggle"
                    onClick={() => setIsSetting(!isSetting)}
                >
                    <i className="bi bi-gear"></i>
                </button>
            </Tippy>
            {isSetting && (
                <div className="setting-body">
                    <h2>Câu hỏi đề xuất</h2>
                    <ul>
                        <li
                            onClick={() =>
                                setQuestionSuggest("Địa chỉ trường mình ở đâu?")
                            }
                        >
                            Địa chỉ trường mình ở đâu?
                        </li>
                        <li
                            onClick={() =>
                                setQuestionSuggest(
                                    "Mã đăng ký xét tuyển của trường mình là gì?"
                                )
                            }
                        >
                            Mã đăng ký xét tuyển của trường mình là gì?
                        </li>
                        <li
                            onClick={() =>
                                setQuestionSuggest(
                                    "Các chuyên nghành đào tạo của trường mình là gì?"
                                )
                            }
                        >
                            Các chuyên nghành đào tạo của trường mình là gì?
                        </li>
                    </ul>
                    <div className="mt-3 mute-btn">
                        <button
                            className={`${isMute ? "" : "active"}`}
                            onClick={() => setIsMute(false)}
                        >
                            Bật tiếng
                        </button>
                        <button
                            className={`${isMute ? "active" : ""}`}
                            onClick={() => setIsMute(true)}
                        >
                            Tắt tiếng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Setting;
