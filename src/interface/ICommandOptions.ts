import { IValueExtractors } from './IValueExtractors';

export interface ICommandOptions {
    exec: string;
    args: string[];
    cwd: string;
    detached: boolean;
    command: string;
    matchReady: RegExp;
    extract: IValueExtractors;
    fork: boolean;
    ipc: boolean;
    restartOnError: boolean;
}
