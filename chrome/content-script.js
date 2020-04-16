console.log("LOL, working");


const EscKeyCode = 101;

let i = 0;

const make_id_element = ({ left, top }) => {
    const circle = document.createElement("div");

    circle.style.backgroundColor = "white";
    circle.style.color = "#333333";
    circle.style.border = "1px solid #333333";
    circle.style.borderRadius = "50%";
    circle.style.fontSize = "12px";
    // circle.style.display = "inline-block";
    circle.style.position = "absolute";
    circle.style.position = "absolute";
    // circle.style.top = top;
    // circle.style.left = left;
    circle.style.top = `${top}px`;
    circle.style.left = `${left}px`;
    circle.style.zIndex = 99;

    // console.log({ left, top });
    
    circle.appendChild(document.createTextNode(i));
    // circle.insertBefore(document.createTextNode(i));
    i += 1;

    return circle;
};

const show_numbers = () => {
    document.querySelectorAll("a").forEach((el, i) => {
        el.style.textDecoration = "underline";
        
        const { left, top } = el.getBoundingClientRect();
        
        const circle = make_id_element({ left, top });

        // el.appendChild(circle);
        document
            .querySelector("body")
            .appendChild(circle);
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