require("babel-polyfill");

import { get_window_dimensions, find_propigated_style } from "./utils/funcs";
import {
    create_identifier_element,
    create_input_element,
    create_error_message_element
} from "./comps/identifiers";

import {
    CIRCLE_CLASS_NAME,
    ESC_KEY_CODE,
    KEY_CODE_E,
    IDK_KEY_CODE,
    INPUT_FORM_ID,
} from "./utils/constants";
import { num_to_key, key_to_num } from "./keymaps";

// if `true`, it only shows identifiers to
// elements that are visible on the window
let ONLY_VISIBLE_ELEMENTS = true;

// global boolean for identifier visibility state
let IS_IDENTIFIER_VISIBLE = false;

// a map, key = identifier `id/number/index`,
// and value = referenced element
let REFERENCE_ELEMENT_MAP = {};

// a map, with keys of identifier start coordinate (top+left as string)
// and, boolean as value to represent if an identifier is persent
// at that exact coordinate
let IDENTIFIER_COORDINATE_MAP = {};

// calculates (coordinates), creates, and
// mounts identifier elements on the DOM
const show_identifiers = () => {
    const body = document.querySelector("body");
    const windim = get_window_dimensions();
    let index = 0;

    document.querySelectorAll("a, button, input, textarea").forEach((elem) => {
        let { left, top } = elem.getBoundingClientRect();

        if (ONLY_VISIBLE_ELEMENTS) {
            const outside =
                top + elem.offsetHeight < 0 ||
                top - elem.offsetHeight > windim.height ||
                left + elem.offsetWidth < 0 ||
                left - elem.offsetWidth > windim.width;

            if (outside) {
                return;
            }
        }

        top = top + window.scrollY;
        left = left + window.scrollX;

        const position = `${top}:${left}`;

        if (IDENTIFIER_COORDINATE_MAP[position]) {
            return;
        }

        const not_visible =
            find_propigated_style(elem, "visibility", "hidden") ||
            find_propigated_style(elem, "display", "none");

        if (not_visible) {
            return;
        }

        const circle = create_identifier_element({
            top,
            left,
            fixed: false,
            className: CIRCLE_CLASS_NAME,
            id: num_to_key(index),
        });

        body.appendChild(circle);

        IDENTIFIER_COORDINATE_MAP[position] = true;
        REFERENCE_ELEMENT_MAP[index] = elem;
        index++;
    });

    IS_IDENTIFIER_VISIBLE = true;
};

// removes all identifier elements from DOM
const hide_identifiers = () => {
    var els = document.getElementsByClassName(CIRCLE_CLASS_NAME);
    while (els.length > 0) {
        els[0].parentNode.removeChild(els[0]);
    }
    IDENTIFIER_COORDINATE_MAP = {};
    REFERENCE_ELEMENT_MAP = {};

    IS_IDENTIFIER_VISIBLE = false;
};

// global state forn representing the input (technically
// `form`) element's visibility (mount/unmount actually)
let IS_INPUT_FORM_VISIBLE = false;

// mount's input form on teh DOM
const show_input = () => {
    const form = document.createElement("form");
    form.id = INPUT_FORM_ID;
    form.appendChild(create_input_element());

    // for handling user-input submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = e.target.querySelector("input").value;

        const error = handle_user_input(value);

        if (IS_IDENTIFIER_VISIBLE) {
            hide_identifiers();
        }
        if (IS_INPUT_FORM_VISIBLE) {
            hide_input();
        }

        if (error) {
            show_error_message(error);
            setTimeout(() => {
                if (IS_ERROR_MESSAGE_VISIBLE) {
                    hide_error_message();
                }
            }, 2000);
        }
    });

    const body = document.querySelector("body");
    body.appendChild(form);

    const input = document.getElementById(INPUT_FORM_ID).querySelector("input");
    input.focus();
    input.value = ":";

    document.addEventListener("input", (e) => {
        if (!IS_INPUT_FORM_VISIBLE || !e.target.isSameNode(input)) {
            return;
        }

        // if value of input is empty, closes input
        if (e.target.value === "") {
            if (IS_IDENTIFIER_VISIBLE) {
                hide_identifiers();
            }
            if (IS_INPUT_FORM_VISIBLE) {
                // it had some unexpected behaviour
                // on chrome what setTimeout solves
                setTimeout(() => {
                    hide_input();
                }, 0);
            }
        }
    });

    IS_INPUT_FORM_VISIBLE = true;
};

// unmounts input element/element's from teh DOM
const hide_input = () => {
    var form = document.getElementById(INPUT_FORM_ID);
    form.parentNode.removeChild(form);

    IS_INPUT_FORM_VISIBLE = false;
};

let IS_ERROR_MESSAGE_VISIBLE = false;
const ERROR_MESSAGE_ELEMENT_ID = "ERROR_MESSAGE_ELEMENT_ID";

const show_error_message = (errorMsg) => {
    if (IS_INPUT_FORM_VISIBLE) {
        hide_input();
    }
    if (IS_ERROR_MESSAGE_VISIBLE) {
        hide_error_message();
    }

    const errmsg = create_error_message_element({ errorMsg, idAttr: ERROR_MESSAGE_ELEMENT_ID });

    const body = document.querySelector("body");
    body.appendChild(errmsg);

    IS_ERROR_MESSAGE_VISIBLE = true;
};

const hide_error_message = () => {
    var errmsg = document.getElementById(ERROR_MESSAGE_ELEMENT_ID);
    form.parentNode.removeChild(errmsg);

    IS_ERROR_MESSAGE_VISIBLE = false;
};

// to handle user input and perform actions
const handle_user_input = (value) => {
    if (value.length === 0 || value[0] !== ":") {
        return "invalid input value";
    }

    if (value.length === 1) {
        return 'no input value, just ":" is not expected';
    }

    let keystr = "";
    let i = 1;

    while (i < value.length) {
        const char = value[i];
        if (char === " ") {
            break;
        }

        keystr += char;
        i++;
    }

    keystr = keystr.trim();

    const specific_action = check_for_specific_actions(keystr);
    if (specific_action) {
        specific_action();
    }

    const number = key_to_num(keystr);

    let action = value.slice(i).trim();
    const targetElem = REFERENCE_ELEMENT_MAP[number];

    if (!targetElem) {
        return `identifier "${keystr}" not found "${keystr}", no action "${keystr}"`;
    }

    if (!action || action.length === 0) {
        action = get_default_action(targetElem.tagName);
    }

    // Opens link in the same tab
    if (ACTION_ID_o.some((str) => str === action)) {
        const href = targetElem.getAttribute("href").trim();
        window.open(href, "_self");
        return
    }

    // Opens link in a new tab
    if (ACTION_ID_p.some((str) => str === action)) {
        const href = targetElem.getAttribute("href").trim();
        window.open(href, "_blank");
        return
    }

    if (ACTION_ID_c.some((str) => str === action)) {
        targetElem.click();
        return
    }

    if (ACTION_ID_f.some((str) => str === action)) {
        targetElem.focus();
        return
    }

    return `invalid action "${action}"`;
};

// variables for keeping full action
// string and short string together
const ACTION_ID_o = ["o", "open"];
const ACTION_ID_p = ["p", "opennewtab"];
const ACTION_ID_c = ["c", "click"];
const ACTION_ID_f = ["f", "focus"];

// given a tagname, it returns it's default click action
const get_default_action = (tagName) => {
    switch (tagName.toLowerCase()) {
        case "a":
            return ACTION_ID_o[0];
        case "button":
            return ACTION_ID_c[0];
        case "input":
            return ACTION_ID_f[0];
        case "textarea":
            return ACTION_ID_f[0];
    }
}

const check_for_specific_actions = (keystr) => {
    switch (keystr.length && keystr.toLowerCase()[0]) {
        case "w":
            return () => {
                window.history.go(1)
            };
        case "b":
            return () => {
                window.history.go(-1)
            };
        default:
            return null;
    }
}

// other event listener needed to be added only
// once, so this makes sure it doesn't repeat
let OTHER_EVENT_LISTENERS_ADDED = false;

// other event listeners, liek hiding identifiers and input on scroll
const add_other_listeners = () => {
    if (!OTHER_EVENT_LISTENERS_ADDED) {

        document.addEventListener("scroll", async () => {
            if (IS_IDENTIFIER_VISIBLE) {
                hide_identifiers();
            }
            if (IS_INPUT_FORM_VISIBLE) {
                hide_input();
            }
            if (IS_ERROR_MESSAGE_VISIBLE) {
                hide_error_message();
            }
        });

        OTHER_EVENT_LISTENERS_ADDED = true;
    }
};

document.onkeyup = (e) => {
    e = e || window.event;

    if (e.keyCode === ESC_KEY_CODE) {

        if (!IS_IDENTIFIER_VISIBLE) {
            show_identifiers();
        } else {
            hide_identifiers();
            if (IS_INPUT_FORM_VISIBLE) {
                hide_input();
            }
            if (IS_ERROR_MESSAGE_VISIBLE) {
                hide_error_message();
            }
        }

        add_other_listeners();
    }
}

document.onkeypress = (e) => {
    e = e || window.event;

    const tagName = e.target.tagName.toLowerCase();
    if (tagName === "input" || tagName === "textarea" || tagName === "select") {
        return;
    }

    e.preventDefault();

    if (e.keyCode === IDK_KEY_CODE) {
        if (!IS_IDENTIFIER_VISIBLE) {
            show_identifiers();
        }
        if (IS_ERROR_MESSAGE_VISIBLE) {
            hide_error_message();
        }

        show_input();
        add_other_listeners();
    }
};
