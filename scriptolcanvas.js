/*
   SVG to Canvas 
   through JavaScript objets
   
   This lib convert SVG tags to Canvas commands
   once the SVG file est stored in a JS object
   by the Scriptol compiler.
*/

function canvasInit(id) {
    return document.getElementById(id).getContext("2d")
}

function SVGtoCanvas(obj, ctx) {
    for(var id in obj) {
        var el = obj[id]
        var tag, style   
        var x, x2, y, y2, cx, cy, rx, ry, w, h
        ctx.save()
        for(att in el) {
            case 'tag':
                tag = el['tag']
                break
            case 'stroke':
                ctx.strokeStyle=el['stroke'];
                break
            case 'stroke-width':
                break
            case 'fillStyle':
                ctx.fillStyle=el['fillStyle'];
                break                
            case 'x1':
                x = el['x1']
                break
            case 'y1':
                y = el['x1']
                break
            case 'x2':
                x2 = el['x2']
                break
            case 'y2':
                y2 = el['y2']
                break
            case 'cx':
                cx = el['cx']
                break
            case 'cy':
                cy = el['cx']
                break                
            case 'rx':
                rx = el['rx']
                break
            case 'ry':
                ry = el['ry']
                break                  
            case 'width':
                w = el['width']
                break
             case 'height':
                h = el['height']
                break               
             case 'style':
                style = el['style']
                break 
        }
        switch(tag) {
            case 'line':
                ctx.beginPath()
                ctx.moveTo(x,y)
                ctx.lineTo(x2,y2)
                ctx.stroke()
                break;
            case 'circle':
                ctx.beginPath();
                ctx.arc(cx, cy, rx, 0, 2 * Math.PI);
                ctx.stroke();                
                break;
            case 'ellipse':  
                ctx.beginPath();
                ctx.scale(1, rx / ry)
                ctx.arc(cx, cy, rx, 0, 2 * Math.PI);
                ctx.stroke();
            case 'rect':
                ctx.beginPath();
                ctx.rect(x, y, w, h);
                ctx.fill()
                ctx.stroke();                 
                break;
            case 'g':
                ctx.save()
                SVGtoCanvas(el[id])
                ctx.restore()
                break;
          }
          if(style != "") ctx.fill()
          ctx.restore()        
    }

}