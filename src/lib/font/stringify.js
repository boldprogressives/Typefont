/**
 * @module FontStringify Used to deserialize a font file (TTF, OTF, WOFF, SVG, EOT).
 * @author Vasile Pește <sirvasile@protonmail.ch>
*/

import ImageDrawing from "../image/drawing.js";

export const FontStringify = (
    function (undefined)
    {
        /**
         * _prepareFontFace Used to create a CSS font face rule.
         * @param {String} name The name of the font.
         * @param {String} src The source of the font.
         * @return {String} The font face rule.
        */
        
        const _prepareFontFace = (name, src) => {
            return `@font-face { font-family: "${name}"; src: url("${src}"); }`;
        };
        
        /**
         * _appendStyleSheet Used to append a style sheet to the document.
         * @param {String} content
        */
        
        const _appendStyleSheet = (content) => {
            const style = document.createElement("style");
            
            style.setAttribute("type", "text/css");
            style.appendChild(document.createTextNode(content));
            
            document.head.appendChild(style);  
        };
        
        /**
         * _drawFont Deserialize a font file.
         * @param {String} name The name of the font.
         * @param {Object} [options = {}]
         * @return {Object}
        */
        
        const _drawFont = (name, options = {}) => {
            const {
                // Used as characters to deserialize.
                str = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789",
                // Used as deserialized characters size.
                size = 128
            } = options;
            const drawing = new ImageDrawing();
            const ctx = drawing.context;
            const result = {};
            
            drawing.canvas.width = size;
            drawing.canvas.height = size;
            
            ctx.font = `${size}px ${name}`;
            ctx.fillStyle = "black";
            ctx.textBaseline = "top";
            
            for (const symbol of str.split(""))
            {
                ctx.fillText(symbol, 0, 0, size);
                result[symbol] = drawing.toDataURL();
                ctx.clearRect(0, 0, size, size);
            }
            
            return result;
        };
        
        /**
         * _requestFont Used to load and deserialize a new font (TTF, OTF, WOFF, SVG, EOT).
         * @param {String} name The name of the font.
         * @param {String} src The source of the font.
         * @param {Object} [options = {}]
         * @return {Promise}
        */
        
        const _requestFont = (name, src, options = {}) => {
            const {
                // Used as time to wait before deserializing the font (because we don't know when the font is loaded).
                timeout = 8000
            } = options;
            
            _appendStyleSheet(_prepareFontFace(name, src));
            document.body.style.fontFamily = name;
            
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve(_drawFont(name, options)), timeout); 
            });
        };
        
        return (name, src, options) => _requestFont(name, src, options);
    }
());