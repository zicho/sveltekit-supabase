import type { PrivateMessageModel } from "$lib/models/messaging/PrivateMessageModel";
import { getFailedResponse, getSuccessResponse } from "$lib/models/ServiceResponse";
import { Tables } from "$lib/utils/DatabaseTypes";
import { RepositoryBase } from "$lib/utils/repositories/RepositoryBase";

export async function post(request: { body: string }) {

    let model: PrivateMessageModel = JSON.parse(request.body);

    try {
        
        await RepositoryBase.add(Tables.Messages, model)

        return {
            status: 200,
            body: getSuccessResponse()
        };

    } catch (error: unknown) {

        console.log(error)

        return {
            status: 500,
            body: getFailedResponse(),
        };
    }
}
