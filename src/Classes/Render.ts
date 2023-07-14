export abstract class Render {
    // takes a html element and renders it to the DOM at the specified id
    public static append(source:HTMLDivElement, target:string):void {
        if (document.getElementById(source.id)) return;
        const DOMtarget = document.getElementById(target);
        if(DOMtarget) DOMtarget.append(source);
    }

    // removes a node with the specified id
    public static removeNode(target: string):void {
        const element = document.getElementById(target);
        if(element) element.remove();
    }
}