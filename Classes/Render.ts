export abstract class Render {
    public static append(source:HTMLDivElement, target:string) {
        const DOMtarget = document.getElementById(target);
        DOMtarget?.append(source);
    }

    public static emptyNode(target: string) {
        const element = document.getElementById(target);
        if (element) {
            element.innerHTML = "";
        }
    }
}