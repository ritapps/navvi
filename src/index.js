require("babel-polyfill");

console.log("LOL, script loaded!");

import { get_window_dimensions, find_propigated_style } from "./utils/funcs";
import { create_identifier_element, create_input_element } from "./comps/identifiers";

import { CIRCLE_CLASS_NAME, ESC_KEY_CODE, IDK_KEY_CODE, INPUT_FORM_ID } from "./utils/constants";

export let ONLY_VISIBLE_ELEMENTS = true;
let THE_UNIVERSAL_TRUTH = false;
let THE_UNIVERSAL_INDEX = 0;
let ELEMENT_MAP = {};
let IDENTIFIER_COORDINATE_MAP = {};

const show_identifiers = () => {
    const body = document.querySelector("body");
    const windim = get_window_dimensions();

    document.querySelectorAll("a, button").forEach((elem) => {
        let { left, top } = elem.getBoundingClientRect();

        if (ONLY_VISIBLE_ELEMENTS) {
            const outside = top + elem.offsetHeight < 0
                || top - elem.offsetHeight > windim.height
                || left + elem.offsetWidth < 0
                || left - elem.offsetWidth > windim.width;

            if (outside) {
                return
            }
        }

        top = top + window.scrollY;
        left = left + window.scrollX;

        const position = `${top}:${left}`;

        if (IDENTIFIER_COORDINATE_MAP[position]) {
            return
        }

        const not_visible = find_propigated_style(elem, "visibility", "hidden")
            || find_propigated_style(elem, "display", "none");

        if (not_visible) {
            return
        }

        const circle = create_identifier_element({
            top, left,
            fixed: false,
            className: CIRCLE_CLASS_NAME,
            index: THE_UNIVERSAL_INDEX
        });

        body.appendChild(circle);

        IDENTIFIER_COORDINATE_MAP[position] = true;
        ELEMENT_MAP[THE_UNIVERSAL_INDEX] = elem;
        THE_UNIVERSAL_INDEX += 1;
    });

    THE_UNIVERSAL_TRUTH = true;
}

const hide_identifiers = () => {
    var els = document.getElementsByClassName(CIRCLE_CLASS_NAME);
    while (els.length > 0) {
        els[0].parentNode.removeChild(els[0]);
    }
    IDENTIFIER_COORDINATE_MAP = {};
    ELEMENT_MAP = {};
    THE_UNIVERSAL_INDEX = 0;

    THE_UNIVERSAL_TRUTH = false;
}

let INPUT_FORM_VISIBLE = false;

const show_input = () => {
    const form = document.createElement("form");
    form.id = INPUT_FORM_ID;
    form.appendChild(create_input_element());

    form.addEventListener("submit", ((e) => {
        e.preventDefault();
        const value = e.target.querySelector('input').value;

        hide_identifiers();
        hide_input();

        const error = handle_user_input(value);
        if (error) {
            console.log("Error:", error);
        }
    }));

    const body = document.querySelector("body");
    body.appendChild(form);

    const input = document.getElementById(INPUT_FORM_ID).querySelector("input");
    input.focus();
    input.value = ":";

    document.addEventListener('input', (e) => {
        if (!INPUT_FORM_VISIBLE || !e.target.isSameNode(input)) {
            return
        }

        if (e.target.value === "") {
            hide_input();
            return
        }
    });

    INPUT_FORM_VISIBLE = true;
}

const hide_input = () => {
    var form = document.getElementById(INPUT_FORM_ID);
    form.parentNode.removeChild(form);

    INPUT_FORM_VISIBLE = false;
};


const handle_user_input = (value) => {
   
}

let OTHER_EVENT_LISTENERS_ADDED = false;

const add_other_listeners = () => {
    document.addEventListener("scroll", async () => {
        if (THE_UNIVERSAL_TRUTH) {
            hide_identifiers();
        }
    });

    OTHER_EVENT_LISTENERS_ADDED = true;
}

document.onkeypress = (e) => {
    e = e || window.event;

    if (e.keyCode === ESC_KEY_CODE) {
        if (!OTHER_EVENT_LISTENERS_ADDED) {
            add_other_listeners();
        }

        if (!THE_UNIVERSAL_TRUTH) {
            show_identifiers();
        } else {
            hide_identifiers();
        }
    } else if (THE_UNIVERSAL_TRUTH && e.keyCode === IDK_KEY_CODE) {
        e.preventDefault();
        show_input();
    } else {
        console.log("key ", e.keyCode);
    }
};
