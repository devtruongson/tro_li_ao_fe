"use server";

import { IResponse } from "@/utils/interface/interface";

export async function GetRuntimeAI(q: string): Promise<IResponse<any>> {
    const res = await fetch(`http://localhost:8080/runtime-ai/v1?q=${q}`, {
        next: {
            revalidate: 846000 * 30,
        },
    });
    const data = await res.json();
    return data;
}
