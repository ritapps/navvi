console.log("LOL, working");


const EscKeyCode = 101;

const show_numbers = () => {
    document.querySelectorAll("a").forEach((el, i) => {
        console.log(i);
        el.style.textDecoration = "underline";
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