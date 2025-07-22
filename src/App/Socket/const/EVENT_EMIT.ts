export const EVENT_EMIT = {
    "CONNECTION": "connection",
    "DISCONNECT": "disconnect",
    "SETNAME": "set-name",
    "LIST_USERS": "list-users",
    
    "JOIN_ROOM": "join-room",
    "CREATE_ROOM": "create-room",
    "DELETE_ROOM": "delete-room",
    "ROOM_JOINED":"room-joined",
    "ROOM_LIST":"room-list",
    "PLAYER_JOINED":"player-joined",
    "PLAYER_LEFT": "player-left",

    "SEND_WORD": "send-word",
    "RECV_WORD": "recv-word",
    "WORD_RESULT": "word-result",

    "GAME_START": "game-start",
    "NEW_TURN": "new-turn",
    "GAME_OVER": "game-over",

    "BOOM" : "game-boom",

    "ERROR": "error",
    "MESSAGE": "message"
} as const;