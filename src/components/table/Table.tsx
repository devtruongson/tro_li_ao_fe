"use client";
import React from "react";

function AnswerSpecialized({ dataAnswer }: { dataAnswer: any }) {
    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Tên Ngành</th>
                        <th scope="col">Thạc Sĩ</th>
                        <th scope="col">Đại Học</th>
                        <th scope="col">Cao Đẳng</th>
                        <th scope="col">Tham khảo thêm</th>
                    </tr>
                </thead>
                <tbody>
                    {dataAnswer.map((item: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.master ? item.master : null}</td>
                                <td>
                                    {item.university ? item.university : null}
                                </td>
                                <td>{item.college ? item.college : null}</td>
                                <td>
                                    <a href={item.url_path}>
                                        {item.url_path
                                            ? "Link tham khảo chi tiết về ngành"
                                            : null}
                                    </a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default AnswerSpecialized;
