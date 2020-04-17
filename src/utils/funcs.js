// given an element, the function finds if a style is present in any of it's parents
export const find_propigated_style = (elem, key, value) => {
    while (elem.parentNode) {
        if (elem.style[key] === value) return true;
        elem = elem.parentNode;
    }
    return false;
}

// calculates and returns the size of visible part of the window
export const get_window_dimensions = () => {
    let d = document, root = d.documentElement, body = d.body;
    let width = window.innerWidth || root.clientWidth || body.clientWidth;
    let height = window.innerHeight || root.clientHeight || body.clientHeight;

    return { width, height };
}

