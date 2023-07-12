export abstract class Render {
    public static append(source:HTMLDivElement, target:string):void {
        const DOMtarget = document.getElementById(target);
        DOMtarget?.append(source);
    }

    public static removeNode(target: string):void {
        const element = document.getElementById(target);
        element?.remove();
    }
}