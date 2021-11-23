export enum ELogLevel {
    None = 0,
    Error = 1,
    Warn = 2,
    Info = 3
};

export class Logger {
    private level: ELogLevel = ELogLevel.None;

    info (message: string) {
        if (this.level === ELogLevel.Info) {
            console.log('Memshare Info:', message);
        }
    }
    warn (message: string) {
        if (this.level >= ELogLevel.Warn) {
            console.warn('Memshare Warn:', message);
        }
    }
    error (message: string) {
        if (this.level >= ELogLevel.Error) {
            console.error('Memshare Error:', message);
        }
    }
    setLevel (level: ELogLevel) {
        this.level = level;
    }
}
