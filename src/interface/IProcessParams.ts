export interface IShellParams {
    command?: string | IProcessSingleParams
    commands?: (string | IProcessSingleParams)[]
    detached?: boolean
    cwd?: string
    matchReady?: RegExp
    silent?: boolean
    parallel?: boolean
    fork?: boolean
    ipc?: boolean
    restartOnErrorExit?: boolean
    verbose?: boolean
    timeoutMs?: number
}

export interface IProcessSingleParams {
    command: string
    cwd?: string
    detached?: boolean
    matchReady?: RegExp
    fork?: boolean
    ipc?: boolean
    restartOnError?: boolean
    extract: {[ key: string ]: (output: string) => any }
}
