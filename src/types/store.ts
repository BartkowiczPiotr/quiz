import { Answer } from '@/views/Quiz/Quiz.types';

export type SessionConfiguration = {
    userName: string,
    difficulty: string,
    category: string,
} 

export type SessionSummary = {
    name: string,
    player: string,
    results: Answer[],
}