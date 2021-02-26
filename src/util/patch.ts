import { obj_getProperty, obj_setProperty, is_Array } from 'atma-utils';
import { arr_remove } from './array';
import { UpdateQuery } from './types';


export function obj_patch<T>(obj: T, patch: UpdateQuery<T>) {

    for (const key in patch) {

        let patcher = patches[key];
        if (patcher) {
            let [walkerFn, modifierFn] = patcher;
            walkerFn(obj, patch[key], modifierFn);
        } else {
            console.error('Unknown or not implemented patcher', key);
        }
    }
    return obj;
};
export function obj_patchConflict<T = any>(a: UpdateQuery<T>, b: UpdateQuery<T>) {
    if (a.$set && b.$set) {
        for (let key in a.$set) {
            if (key in b.$set) {
                let aVal = a.$set[key];
                let bVal = b.$set[key];
                /** unstrict check */
                if (aVal == bVal) {
                    continue;
                }
                return {
                    $set: {
                        [key]: {
                            a: aVal,
                            b: bVal,
                        }
                    }
                };
            }
        }
    }
}

export function obj_partialToUpdateQuery<T = any>(data: UpdateQuery<T> | Partial<T>, isOptional?: boolean): UpdateQuery<T> {
    if (obj_isPatch(data)) {
        return data;
    }
    let hasData = false;
    let $set: any = {};
    for (let key in data) {
        let val = data[key];
        if (typeof val === 'function') {
            // skip any methods
            continue;
        }
        hasData = true;
        $set[key] = val;
    }
    if (hasData === false && isOptional === true) {
        return null;
    }
    return { $set };
}

export function obj_patchValidate(patch) {
    if (patch == null)
        return 'Patch in undefined';

    var has = false;
    for (var key in patch) {
        has = true;

        if (patches[key] == null)
            return 'Unsupported patcher: ' + key;
    }
    if (has === false)
        return 'No data';

    return null;
};


export function obj_isPatch(patch) {
    if (patch == null) {
        return false;
    }
    for (let key in patches) {
        if (key in patch) {
            for (let inner in patch[key]) {
                return true;
            }
        }
    }
    return false;
};

// === private

function walk_mutator<T = any>(obj: T, data, mutatorFn: (currentValue, mutatorData, key: string, obj: T) => any) {
    for (const key in data) {
        mutatorFn(obj_getProperty(obj, key), data[key], key, obj);
    }
}

function walk_modifier(obj, data, fn) {
    for (var key in data) {
        obj_setProperty(
            obj,
            key,
            fn(obj_getProperty(obj, key), data[key], key)
        );
    }
}

function fn_IoC(...fns) {
    return function (val, mix, prop) {
        for (var i = 0, fn, imax = fns.length; i < imax; i++) {
            fn = fns[i];
            if (fn(val, mix, prop) === false)
                return;
        }
    }
}

function arr_checkArray(val, mix, prop) {
    if (is_Array(val) === false) {
        // if DEBUG
        console.warn('<patch> property is not an array', prop);
        // endif
        return false;
    }
}

function arr_push(currentVal, mix, prop, obj) {
    if (currentVal == null) {
        obj[prop] = [mix];
        return;
    }
    if (mix.hasOwnProperty('$each')) {
        for (var i = 0, imax = mix.$each.length; i < imax; i++) {
            currentVal.push(mix.$each[i]);
        }
        return;
    }
    currentVal.push(mix);
}

function arr_pop(currentVal, mix, prop) {
    currentVal?.[mix > 0 ? 'pop' : 'shift']();
}
function arr_pull(val, mix, prop) {
    arr_remove(val, function (item) {
        return query_match(item, mix);
    });
}

function val_inc(val, mix, key) {
    return val + mix;
}
function val_set(val, mix, key) {
    return mix;
}
function val_unset() {
    return void 0;
}

function val_bit(val, mix) {
    if (mix.or)
        return val | mix.or;

    if (mix.and)
        return val & mix.and;

    return val;
}

var query_match;
(function () {
    /** @TODO improve object matcher */
    query_match = function (obj, mix) {
        for (var key in mix) {
            if (obj[key] !== mix[key])
                return false;
        }
        return true;
    };
}());


var fn_WALKER = 0,
    fn_MODIFIER = 1
    ;

var patches = {
    '$push': [walk_mutator, arr_push],
    '$pop': [walk_mutator, arr_pop],
    '$pull': [walk_mutator, arr_pull],

    '$inc': [walk_modifier, val_inc],
    '$set': [walk_modifier, val_set],
    '$unset': [walk_modifier, val_unset],
    '$bit': [walk_modifier, val_bit],
} as const;

