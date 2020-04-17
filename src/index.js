console.log("LOL, script loaded!");

import { get_window_dimensions, find_propigated_style } from "./utils/funcs";
import { new_identifier_element } from "./comps/identifiers";

import { CIRCLE_CLASS_NAME, ESC_KEY_CODE } from "./utils/constants";

export let ONLY_VISIBLE_ELEMENTS = true;
let THE_UNIVERSAL_TRUTH = false;
let THE_UNIVERSAL_INDEX = 0;
let ELEMENT_MAP = {};

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

        const not_visible = find_propigated_style(elem, "visibility", "hidden")
            || find_propigated_style(elem, "display", "none");

        if (not_visible) {
            return
        }

        const circle = new_identifier_element({
            top: top + window.scrollY,
            left: left + window.scrollX,
            fixed: false,
            className: CIRCLE_CLASS_NAME,
            index: THE_UNIVERSAL_INDEX
        });


        body.appendChild(circle);

        ELEMENT_MAP[THE_UNIVERSAL_INDEX] = elem;
        THE_UNIVERSAL_INDEX += 1;
    })
}

const hide_identifiers = () => {
    var els = document.getElementsByClassName(CIRCLE_CLASS_NAME);
    while (els.length > 0) {
        els[0].parentNode.removeChild(els[0]);
    }
    ELEMENT_MAP = {};
}

const add_other_listeners = () => {
    document.addEventListener("scroll", async () => {
        if (THE_UNIVERSAL_TRUTH) {
            hide_identifiers();
            THE_UNIVERSAL_TRUTH = false;
            THE_UNIVERSAL_INDEX = 0;
        }
    });
}

(() => {
    add_other_listeners();
});

document.onkeypress = (e) => {
    e = e || window.event;

    if (e.keyCode === ESC_KEY_CODE) {
        if (!THE_UNIVERSAL_TRUTH) {
            show_identifiers();
            THE_UNIVERSAL_TRUTH = true;
        }
    } else {
        console.log(e.keyCode, ESC_KEY_CODE);
    }
};


document.on = (e) => {
    e = e || window.event;

    if (e.keyCode === EscKeyCode) {
        show_identifiers();
    } else {
        console.log(e);
    }
};
