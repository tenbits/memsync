
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


type OnlyFieldsOfType<TSchema, FieldType = any, AssignableType = FieldType> = AcceptedFields<
    TSchema,
    FieldType,
    AssignableType
> &
    NotAcceptedFields<TSchema, FieldType> &
    DotAndArrayNotation<AssignableType>;


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
} &
    NotAcceptedFields<TSchema, any[] | undefined>) & {
    readonly [key: string]: AddToSetOperators<any> | any;
};

type KeysOfAType<TSchema, Type> = { [key in keyof TSchema]: NonNullable<TSchema[key]> extends Type ? key : never }[keyof TSchema];

type AddToSetOperators<Type> = {
    $each: Type;
};
type Unpacked<Type> = Type extends Array<infer Element> ? Element : Type;

type PullAllOperator<TSchema> = ({
    readonly [key in KeysOfAType<TSchema, any[]>]?: TSchema[key];
} &
    NotAcceptedFields<TSchema, any[]>) & {
    readonly [key: string]: any[];
};

type ObjectQuerySelector<T> = T extends object ? {[key in keyof T]?: QuerySelector<T[key]> } : QuerySelector<T>;


type PullOperator<TSchema> = ({
    readonly [key in KeysOfAType<TSchema, any[]>]?: Partial<Unpacked<TSchema[key]>> | ObjectQuerySelector<Unpacked<TSchema[key]>>;
} &
    NotAcceptedFields<TSchema, any[]>) & {
    readonly [key: string]: QuerySelector<any> | any;
};

type QuerySelector<T> = {
    // Comparison
    $eq?: T;
    $gt?: T;
    $gte?: T;
    $in?: T[];
    $lt?: T;
    $lte?: T;
    $ne?: T;
    $nin?: T[];
    // Logical
    $not?: T extends string ? (QuerySelector<T> | RegExp) : QuerySelector<T>;
    // Element
    /**
     * When `true`, `$exists` matches the documents that contain the field,
     * including documents where the field value is null.
     */
    $exists?: boolean;
    // Evaluation
    $expr?: any;
    $jsonSchema?: any;
    $mod?: T extends number ? [number, number] : never;
    $regex?: T extends string ? (RegExp | string) : never;
    $options?: T extends string ? string : never;
    // Geospatial
    // TODO: define better types for geo queries
    $geoIntersects?: { $geometry: object };
    $geoWithin?: object;
    $near?: object;
    $nearSphere?: object;
    $maxDistance?: number;
    // Array
    // TODO: define better types for $all and $elemMatch
    $all?: T extends Array<infer U> ? any[] : never;
    $elemMatch?: T extends Array<infer U> ? object : never;
    $size?: T extends Array<infer U> ? number : never;
};


type PushOperator<TSchema> = ({
    readonly [key in KeysOfAType<TSchema, any[]>]?: Unpacked<TSchema[key]> | ArrayOperator<Array<Unpacked<TSchema[key]>>>;
} &
    NotAcceptedFields<TSchema, any[]>) & {
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
