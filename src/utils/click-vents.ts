export function preventClickBehaviour(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
}