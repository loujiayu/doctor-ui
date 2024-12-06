export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo"
}

export interface Message {
  role: Role;
  content: string;
}

export interface Prompt {
  system: string;
  prompt: string;
}

export interface MedResponse {
  thread_id: string;
  message: string;
}

export type Role = "assistant" | "user" | "system";
