import type { PrivateMessageModel } from "$lib/models/messaging/PrivateMessageModel";
import { getFailedResponse, getSuccessResponse } from "$lib/models/ServiceResponse";
import { supabase } from "$lib/utils/db";

export async function post(request: { body: string }) {

    let model: PrivateMessageModel = JSON.parse(request.body);

    console.log("adding message to db")
    console.dir(model)

    try {

        const { data, error } = await supabase
            .from('private_messages')
            .insert([
                {
                    from: model.from,
                    to: model.to,
                    title: model.title,
                    content: model.content
                }
            ])

            console.dir(error)

        return {
            status: 200,
            body: getSuccessResponse(data),
        };

    } catch (error: unknown) {
        console.log(error)

        return {
            status: 500,
            body: getFailedResponse(),
        };
    }
}
