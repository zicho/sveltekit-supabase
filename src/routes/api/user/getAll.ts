import { getSuccessResponse } from "$lib/models/ServiceResponse";
import type { UserProfileModel } from "$lib/models/user/UserProfileModel";
import { RepositoryBase, Table } from "$lib/utils/repositories/RepositoryBase";

export async function get() {

    const data = await RepositoryBase.getAll<UserProfileModel>(Table.Profiles);

    return {
        status: 200,
        body: getSuccessResponse(data),
    };
}