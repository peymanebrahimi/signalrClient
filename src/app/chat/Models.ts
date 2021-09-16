export interface UserMessageViewModel {
    messageContent: string;
    userName: string;
    messageDate: string;
    userId: string;
}

export interface UserNewMessageViewModel {
    messageContent: string;
}

export interface UserJoinedChatViewModel {
    userName: string;
}

export interface UserIsTypingViewModel {
    userName: string;
}

export interface ChatHistory {
    id: number;
    date: Date | string;
    messageContent: string;
    userId: string;
}
