import { getSuccessResponse } from "$lib/models/ServiceResponse";
import type { UserProfileModel } from "$lib/models/user/UserProfileModel";
import { Tables } from "$lib/utils/DatabaseTypes";
import { RepositoryBase} from "$lib/utils/repositories/RepositoryBase";

export async function get() {

    const data = await RepositoryBase.getAll<UserProfileModel>(Tables.Profiles);

    return {
        status: 200,
        body: data,
    };
}