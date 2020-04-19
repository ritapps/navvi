
const NumToKeyMap = {
    0: "h",
    1: "j",
    2: "k",
    3: "l",
    4: "a",
    5: "s",
    6: "d",
    7: "f",
}

const KeyToNumMap = {
    "h": 0,
    "j": 1,
    "k": 2,
    "l": 3,
    "a": 4,
    "s": 5,
    "d": 6,
    "f": 7,
}

export const num_to_key = (num) => {
    let str = parseInt(num).toString(8);
    let res = "";

    for (let i = 0; i < str.length; i++) {
        res += NumToKeyMap[str[i]];
    }

    return res;
    // return res.toUpperCase();
};

export const key_to_num = (keys) => {
    // keys = keys.toLowerCase();

    let num = -1;

    for (let i = 0; i < keys.length; i++) {
        const nc = KeyToNumMap[keys[i]];
        if (isNaN(nc)) {
            break;
        }

        if (num === -1) {
            num = 0;
        }

        num = (num * 8) + parseInt(nc, 8)
    }

    return num === -1 ? num : parseInt(num.toString(10), 10);
};

// console.log(`result:\t jlk = ${key_to_num("kha")}`);
// console.log(`expect:\t jlk = 132`);


// console.log(`result:\t 132 = ${num_to_key(132)}`);
// console.log(`expect:\t 132 = jlk`);

// const NumToKeyMap = {
//     0: "h",
//     1: "j",
//     2: "k",
//     3: "l",
//     4: "a",
//     5: "s",
//     6: "d",
//     7: "f",
//     8: "g",
//     9: "p",
// }

// const KeyToNumMap = {
//     "h": 0,
//     "j": 1,
//     "k": 2,
//     "l": 3,
//     "a": 4,
//     "s": 5,
//     "d": 6,
//     "f": 7,
//     "g": 8,
//     "p": 9,
// }