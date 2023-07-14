export abstract class Render {
    public static append(source:HTMLDivElement, target:string):void {
        if (document.getElementById(source.id)) return;
        const DOMtarget = document.getElementById(target);
        if(DOMtarget) DOMtarget.append(source);
    }

    public static removeNode(target: string):void {
        const element = document.getElementById(target);
        if(element) element.remove();
    }
}