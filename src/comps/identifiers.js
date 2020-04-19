import { BACKGROUND_COLOR, BORDER_COLOR, TEXT_COLOR } from "../utils/constants";
import { get_window_dimensions } from "../utils/funcs";

export const create_identifier_element = ({ left, top, fixed, className, id }) => {
    let c = document.createElement("div");
    c.classList.add(className);

    c.style.backgroundColor = `${BACKGROUND_COLOR}`;
    c.style.border = `1px solid ${BORDER_COLOR}`;
    c.style.borderRadius = "4px";
    c.style.top = `${top}px`;
    c.style.left = `${left}px`;
    c.style.zIndex = 999997;

    if (fixed) c.style.position = "fixed";
    else c.style.position = "absolute";

    const p = document.createElement("p");

    p.style.color = `${TEXT_COLOR}`;
    p.style.fontSize = "12px";
    p.style.padding = "1px 4px";
    p.style.margin = "0px";

    p.appendChild(document.createTextNode(id));
    c.appendChild(p);

    return c;
};

export const create_input_element = () => {
    const input = document.createElement("input");

    input.style.backgroundColor = `${BACKGROUND_COLOR}`;
    input.style.border = `1px solid ${BORDER_COLOR}`;
    input.style.color = `${TEXT_COLOR}`;
    input.style.borderRadius = "4px";
    input.style.fontSize = "16px";

    const height = 20;
    const width = 200;
    const windim = get_window_dimensions();
    const top = windim.height - height - 50;
    const left = (windim.width - width) / 2;

    input.style.top = `${top}px`;
    input.style.left = `${left}px`;
    input.style.zIndex = 999998;

    input.style.position = "fixed";

    input.style.padding = "6px 10px";
    input.style.margin = "0px";

    input.addEventListener("focus", (e) => {
        e.target.style.outline = "none";
    });

    return input;
}

export const create_error_message_element = ({ errorMsg, idAttr }) => {
    const p = document.createElement("p");
    p.id = idAttr;

    p.style.backgroundColor = `${BACKGROUND_COLOR}`;
    p.style.border = `1px solid ${BORDER_COLOR}`;
    p.style.color = `${TEXT_COLOR}`;
    p.style.borderRadius = "4px";
    p.style.fontSize = "16px";

    const height = 20;
    const width = 200;
    const windim = get_window_dimensions();
    const top = windim.height - height - 50;
    const left = (windim.width - width) / 2;

    p.style.top = `${top}px`;
    p.style.left = `${left}px`;
    p.style.zIndex = 999999;

    p.style.position = "fixed";

    p.style.padding = "6px 10px";
    p.style.margin = "0px";

    p.addEventListener("focus", (e) => {
        e.target.style.outline = "none";
    });
    
    p.appendChild(document.createTextNode(errorMsg));
    return p;
}