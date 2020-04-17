console.log("LOL, working");

let THE_UNIVERSAL_TRUTH = false;
let THE_UNIVERSAL_INDEX = 0;

const EscKeyCode = 101;

const BORDER_COLOR = "rgba(33, 33, 33, 0.5)";
const BACKGROUND_COLOR = "rgba(255, 255, 255, 0.5)";
const TEXT_COLOR = "rgba(33, 33, 33, 1)";
const CIRCLE_CLASS_NAME = "CIRCLE_CLASS_NAME";

const make_id_element = ({ left, top, fixed }) => {
    const c = document.createElement("div");
    c.classList.add(CIRCLE_CLASS_NAME);

    c.style.backgroundColor = `${BACKGROUND_COLOR}`;
    c.style.border = `1px solid ${BORDER_COLOR}`;
    c.style.borderRadius = "50%";
    if (fixed) {
        c.style.position = "fixed";
    } else {
        c.style.position = "absolute";
    }
    c.style.top = `${top}px`;
    c.style.left = `${left}px`;
    c.style.zIndex = 99;

    // console.log({ left, top });

    const p = document.createElement("p");
    p.style.color = `${TEXT_COLOR}`;
    p.style.fontSize = "10px";
    p.style.padding = "2px 2px 2px 2px";
    p.style.margin = "0px";
    // p.style.opacity = 0.2;

    p.appendChild(document.createTextNode(THE_UNIVERSAL_INDEX));
    c.appendChild(p);
    // circle.insertBefore(document.createTextNode(i));
    THE_UNIVERSAL_INDEX += 1;
    // console.log("THE_UNIVERSAL_INDEX", THE_UNIVERSAL_INDEX);
    

    return [c, THE_UNIVERSAL_INDEX];
};

const find_propigated_style = (el, key, value) => {
    while (el.parentNode) {
        if (el.style[key] === value) {
            return true;
        }

        el = el.parentNode;
    }

    return false;
}

const ONLY_VISIBLE_ELEMENTS = true;

let ELEMENT_MAP = {};

const show_numbers = () => {

    const body = document.querySelector("body");
    const windim = get_window_size();

    document.querySelectorAll("a, button").forEach((el, i) => {
        let { left, top } = el.getBoundingClientRect();

        if (ONLY_VISIBLE_ELEMENTS) {
            const outside = top + el.offsetHeight < 0
                || top - el.offsetHeight > windim.height
                || left + el.offsetWidth < 0
                || left - el.offsetWidth > windim.width;
            
            if (outside) {
                return
            }
        }

        const not_visible = find_propigated_style(el, "visibility", "hidden")
            || find_propigated_style(el, "display", "none");

        if (not_visible) {
            return
        }

        // const circle = make_id_element({ left, top: top + document.documentElement.scrollTop, fixed: false });
        const [circle, id] = make_id_element({ left: left + window.scrollX, top: top + window.scrollY, fixed: false });

        body.appendChild(circle);

        ELEMENT_MAP[id] = el;
    })
}

const hide_numbers = () => {
    var els = document.getElementsByClassName(CIRCLE_CLASS_NAME);
    while (els.length > 0) {
        els[0].parentNode.removeChild(els[0]);
    }
    ELEMENT_MAP = {};
}

document.onkeypress = (e) => {
    e = e || window.event;
    console.log(`e.keyCode = ${e.keyCode}, EscKeyCode = ${EscKeyCode}`);

    if (e.keyCode === EscKeyCode) {
        add_other_listeners();
        if (!THE_UNIVERSAL_TRUTH) {
            show_numbers();
            THE_UNIVERSAL_TRUTH = true;
        }
        console.log("ELEMENT_MAP", ELEMENT_MAP);
    } else {
        console.log(e);
    }
};

const add_other_listeners = () => {
    document.addEventListener("scroll", async () => {
        if (THE_UNIVERSAL_TRUTH) {
            hide_numbers();
            THE_UNIVERSAL_TRUTH = false;
            THE_UNIVERSAL_INDEX = 0;
        }
    });
}

document.on = (e) => {
    e = e || window.event;
    console.log(`e.keyCode = ${e.keyCode}, EscKeyCode = ${EscKeyCode}`);

    if (e.keyCode === EscKeyCode) {
        show_numbers();
    } else {
        console.log(e);
    }
};

const get_window_size = () => {
    let d = document, root = d.documentElement, body = d.body;
    let width = window.innerWidth || root.clientWidth || body.clientWidth;
    let height = window.innerHeight || root.clientHeight || body.clientHeight;
    
    return { width, height };
}

