import { BACKGROUND_COLOR, BORDER_COLOR, TEXT_COLOR } from "../utils/constants";

export const new_identifier_element = ({ left, top, fixed, className, index }) => {
    let c = document.createElement("div");
    c.classList.add(className);

    c.style.backgroundColor = `${BACKGROUND_COLOR}`;
    c.style.border = `1px solid ${BORDER_COLOR}`;
    c.style.borderRadius = "50%";
    c.style.top = `${top}px`;
    c.style.left = `${left}px`;
    c.style.zIndex = 99;

    if (fixed) c.style.position = "fixed";
    else c.style.position = "absolute";

    const p = document.createElement("p");

    p.style.color = `${TEXT_COLOR}`;
    p.style.fontSize = "10px";
    p.style.padding = "2px 2px 2px 2px";
    p.style.margin = "0px";

    p.appendChild(document.createTextNode(index));
    c.appendChild(p);

    return c;
};