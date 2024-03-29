// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../atma-utils

declare module 'memsync' {
    export { MemSync } from 'memsync/MemSync';
}

declare module 'memsync/MemSync' {
    import { class_EventEmitter } from 'atma-utils';
    import { IPipeType } from 'memsync/interface/IPipeType';
    import { IpcPipe, IpcPipeOptions } from 'memsync/IpcPipe';
    import { IPatch } from 'memsync/SharedObject';
    import { UpdateQuery } from 'memsync/util/types';
    interface IMemSyncEvents<T> {
        receivedPatches(patches: IPatch<T>[]): any;
        connected(type: IPipeType): any;
        disconnected(type: IPipeType): any;
    }
    export interface IMemSyncOptions extends IpcPipeOptions {
        server?: {
            port: number;
        };
    }
    export class MemSync<T> extends class_EventEmitter<IMemSyncEvents<T>> {
        name: string;
        defaultObject: T;
        options: IMemSyncOptions;
        ipc: IpcPipe<any>;
        data: T;
        constructor(name: string, defaultObject?: T, options?: IMemSyncOptions);
        start(): Promise<"host" | "client" | "none" | "start-host" | "start-client" | "stopped">;
        stop(): Promise<void>;
        patch(patch: UpdateQuery<T>): Promise<void>;
        onceAsync<TKey extends keyof IMemSyncEvents<T>>(event: TKey): Promise<Parameters<IMemSyncEvents<T>[TKey]>[0]>;
        hasPeers(path?: string): Promise<unknown>;
        observe(property: string, cb: (val: any) => void): this;
        getStatus(): any;
        setOptions(opts?: {
            logLevel: 'none' | 'error' | 'info';
        }): void;
    }
    export {};
}

declare module 'memsync/interface/IPipeType' {
    export type IPipeType = 'host' | 'client';
}

declare module 'memsync/IpcPipe' {
    import { class_EventEmitter } from 'atma-utils';
    import { IPipeType } from 'memsync/interface/IPipeType';
    import { IPatch, SharedObject } from 'memsync/SharedObject';
    import { UpdateQuery } from 'memsync/util/types';
    export interface IpcPipeEvents<T> {
        starting(type: IPipeType): any;
        startingFailed(type: IPipeType, error?: any): any;
        connected(type: IPipeType): any;
        disconnected(type: IPipeType): any;
        receivedPatches(patches: IPatch<T>[]): any;
    }
    export interface IpcPipeOptions {
        serverOnly?: boolean;
        clientOnly?: boolean;
        logEvents?: boolean;
    }
    export class IpcPipe<T = any> extends class_EventEmitter<IpcPipeEvents<T>> {
        name: string;
        options?: IpcPipeOptions;
        startedAt: Date;
        status: 'none' | 'start-host' | 'start-client' | 'host' | 'client' | 'stopped';
        connection: 'none' | 'connected';
        shared: SharedObject<T>;
        constructor(name: string, defaultObject: any, options?: IpcPipeOptions);
        start(): Promise<"host" | "client" | "none" | "start-host" | "start-client" | "stopped">;
        stop(): Promise<void>;
        patch(update: UpdateQuery<T>): Promise<void>;
        getStatus(): any;
        hasPeers(path: string): Promise<unknown>;
        emit<TKey extends keyof IpcPipeEvents<T>>(event: TKey, ...args: Parameters<IpcPipeEvents<T>[TKey]>): this;
    }
}

declare module 'memsync/SharedObject' {
    import { UpdateQuery } from 'memsync/util/types';
    export class SharedObject<T = any> {
        version: number;
        timestamp: number;
        data: T;
        patches: IPatch<T>[];
        observers: {
            [path: string]: Function[];
        };
        constructor(defaultObject?: any);
        patch(update: UpdateQuery<T>, version?: number): {
            version: number;
            timestamp: number;
            patch: UpdateQuery<T>;
        };
        observe(path: string, cb: any): void;
        toJson(): {
            version: number;
            timestamp: number;
            data: T;
        };
        setData(data: T, timestamp: number, version: number): void;
    }
    export interface IPatch<T = any> {
        version: number;
        timestamp: number;
        patch: UpdateQuery<T>;
    }
}

declare module 'memsync/util/types' {
    /** https://docs.mongodb.com/manual/reference/operator/update */
    export type UpdateQuery<TSchema> = {
            /** https://docs.mongodb.com/manual/reference/operator/update-field/ */
            $inc?: OnlyFieldsOfType<TSchema, number | undefined>;
            $set?: MatchKeysAndValues<TSchema>;
            $unset?: OnlyFieldsOfType<TSchema, any, '' | 1 | true>;
            /** https://docs.mongodb.com/manual/reference/operator/update-array/ */
            $addToSet?: SetFields<TSchema>;
            $pop?: OnlyFieldsOfType<TSchema, any[], 1 | -1>;
            $pull?: PullOperator<TSchema>;
            $push?: PushOperator<TSchema>;
            $pullAll?: PullAllOperator<TSchema>;
    };
    type OnlyFieldsOfType<TSchema, FieldType = any, AssignableType = FieldType> = AcceptedFields<TSchema, FieldType, AssignableType> & NotAcceptedFields<TSchema, FieldType> & DotAndArrayNotation<AssignableType>;
    /** It avoid uses fields of non Type */
    type NotAcceptedFields<TSchema, FieldType> = {
            readonly [key in KeysOfOtherType<TSchema, FieldType>]?: never;
    };
    type DotAndArrayNotation<AssignableType> = {
            readonly [key: string]: AssignableType;
    };
    type KeysOfOtherType<TSchema, Type> = {
            [key in keyof TSchema]: NonNullable<TSchema[key]> extends Type ? never : key;
    }[keyof TSchema];
    type SetFields<TSchema> = ({
            readonly [key in KeysOfAType<TSchema, any[] | undefined>]?: Unpacked<TSchema[key]> | AddToSetOperators<Array<Unpacked<TSchema[key]>>>;
    } & NotAcceptedFields<TSchema, any[] | undefined>) & {
            readonly [key: string]: AddToSetOperators<any> | any;
    };
    type KeysOfAType<TSchema, Type> = {
            [key in keyof TSchema]: NonNullable<TSchema[key]> extends Type ? key : never;
    }[keyof TSchema];
    type AddToSetOperators<Type> = {
            $each: Type;
    };
    type Unpacked<Type> = Type extends Array<infer Element> ? Element : Type;
    type PullAllOperator<TSchema> = ({
            readonly [key in KeysOfAType<TSchema, any[]>]?: TSchema[key];
    } & NotAcceptedFields<TSchema, any[]>) & {
            readonly [key: string]: any[];
    };
    type ObjectQuerySelector<T> = T extends object ? {
            [key in keyof T]?: QuerySelector<T[key]>;
    } : QuerySelector<T>;
    type PullOperator<TSchema> = ({
            readonly [key in KeysOfAType<TSchema, any[]>]?: Partial<Unpacked<TSchema[key]>> | ObjectQuerySelector<Unpacked<TSchema[key]>>;
    } & NotAcceptedFields<TSchema, any[]>) & {
            readonly [key: string]: QuerySelector<any> | any;
    };
    type QuerySelector<T> = {
            $eq?: T;
            $gt?: T;
            $gte?: T;
            $in?: T[];
            $lt?: T;
            $lte?: T;
            $ne?: T;
            $nin?: T[];
            $not?: T extends string ? (QuerySelector<T> | RegExp) : QuerySelector<T>;
            /**
                * When `true`, `$exists` matches the documents that contain the field,
                * including documents where the field value is null.
                */
            $exists?: boolean;
            $expr?: any;
            $jsonSchema?: any;
            $mod?: T extends number ? [number, number] : never;
            $regex?: T extends string ? (RegExp | string) : never;
            $options?: T extends string ? string : never;
            $geoIntersects?: {
                    $geometry: object;
            };
            $geoWithin?: object;
            $near?: object;
            $nearSphere?: object;
            $maxDistance?: number;
            $all?: T extends Array<infer U> ? any[] : never;
            $elemMatch?: T extends Array<infer U> ? object : never;
            $size?: T extends Array<infer U> ? number : never;
    };
    type PushOperator<TSchema> = ({
            readonly [key in KeysOfAType<TSchema, any[]>]?: Unpacked<TSchema[key]> | ArrayOperator<Array<Unpacked<TSchema[key]>>>;
    } & NotAcceptedFields<TSchema, any[]>) & {
            readonly [key: string]: ArrayOperator<any> | any;
    };
    type MatchKeysAndValues<TSchema> = ReadonlyPartial<TSchema> & DotAndArrayNotation<any>;
    type ArrayOperator<Type> = {
            $each: Type;
            $slice?: number;
            $position?: number;
            $sort?: SortValues | Record<string, SortValues>;
    };
    type ReadonlyPartial<TSchema> = {
            readonly [key in keyof TSchema]?: TSchema[key];
    };
    type SortValues = -1 | 1;
    type AcceptedFields<TSchema, FieldType, AssignableType> = {
            readonly [key in KeysOfAType<TSchema, FieldType>]?: AssignableType;
    };
    export {};
}

