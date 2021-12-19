import type { PrivateMessageModel } from "$lib/models/messaging/PrivateMessageModel";
import type { ServiceResponse } from "$lib/models/ServiceResponse";
import { post } from "$lib/utils/EndpointClient";

export async function sendPrivateMessage(model: PrivateMessageModel): Promise<ServiceResponse<void>> {
    try {
        var res = await post<PrivateMessageModel, void>('api/messaging/privateMessage', model);
        return res;
    } catch (err) {
        console.log(err);
    }
}