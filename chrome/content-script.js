console.log("LOL, working");


const EscKeyCode = 101;

let i = 0;

const BORDER_COLOR = "rgba(33, 33, 33, 0.5)";
const BACKGROUND_COLOR = "rgba(255, 255, 255, 0.5)";
const TEXT_COLOR = "rgba(33, 33, 33, 1)";

const make_id_element = ({ left, top }) => {
    const c = document.createElement("div");

    c.style.backgroundColor = `${BACKGROUND_COLOR}`;
    c.style.border = `1px solid ${BORDER_COLOR}`;
    c.style.borderRadius = "50%";
    c.style.position = "absolute";
    c.style.position = "absolute";
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

    p.appendChild(document.createTextNode(i));
    c.appendChild(p);
    // circle.insertBefore(document.createTextNode(i));
    i += 1;

    return c;
};

const show_numbers = () => {
    const body = document.querySelector("body");

    document.querySelectorAll("a").forEach((el, i) => {
        const not_visible = find_propigated_style(el, "visibility", "hidden")
            || find_propigated_style(el, "display", "none");
        
        if (not_visible) {
            return
        }

        const { left, top } = el.getBoundingClientRect();

        const circle = make_id_element({ left, top });

        body.appendChild(circle);
    })
}

document.onkeypress = (e) => {
    e = e || window.event;
    console.log(`e.keyCode = ${e.keyCode}, EscKeyCode = ${EscKeyCode}`);

    if (e.keyCode === EscKeyCode) {
        show_numbers();
    } else {
        console.log(e);
    }
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