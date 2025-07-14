export const EVENT_EMIT = {
    "CONNECTION": "connection",
    "DISCONNECT": "disconnect",
    
    "JOIN_ROOM": "join-room",
    "CREATE_ROOM": "create-room",
    "DELETE_ROOM": "delete-room",
    "ROOM_JOINED":"room-joined",
    "PLAYER_JOINED":"player-joined",
    "PLAYER_LEFT": "player-left",

    "SEND_WORD": "send-word",
    "WORD_RESULT": "word-result",

    "NEW_TURN": "new-turn",
    "GAME_OVER": "game-over",

    "ERROR": "error",
    "MESSAGE": "message"
} as const;