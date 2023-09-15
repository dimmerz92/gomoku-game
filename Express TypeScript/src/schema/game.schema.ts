import { object, string, number, TypeOf } from "zod";

const postPayload = {
    body: object({
        size: number({
            required_error: "Size is required"
        }).nonnegative()
    })
}

const putPayload = {
    body: object({
        index: number({
            required_error: "Cell index is required"
        }).nonnegative(),
        colour: string({
            required_error: "Stone colour is required"
        })
    })
}

const getParams = {
    params: object({
        game_id: string({
            required_error: "Game ID is required"
        })
    })
}

const postParams = {
    params: object({
        game_id: string({
            required_error: "Game ID is required"
        })
    })
}

const putParams = {
    params: object({
        game_id: string({
            required_error: "Game ID is required"
        })
    })
}

const deleteParams = {
    params: object({
        game_id: string({
            required_error: "Game ID is required"
        })
    })
}

export const getGameSchema = object({
    ...getParams
});
export const createGameSchema = object({
    ...postPayload
});
export const updateGameSchema = object({
    ...putPayload,
    ...putParams
});
export const resetGameSchema = object({
    ...postParams
});
export const deleteGameSchema = object({
    ...deleteParams
});

export type CreateGameInput = TypeOf<typeof createGameSchema>;
export type UpdateGameInput = TypeOf<typeof updateGameSchema>;
export type ReadGameInput = TypeOf<typeof getGameSchema>;