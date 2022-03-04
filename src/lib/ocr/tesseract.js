/**
 * @module TesseractOCR Used as OCR engine.
 * @author Vasile Pește <sirvasile@protonmail.ch>
*/

export const TesseractOCR = (
    function (undefined)
    {
        /**
         * _detect Used to recognize the text in a image.
         * @param {String} url The URL of the image to recognize.
         * @return {Promise}
        */
        
        const _detect = (url) => {
            return Tesseract.recognize(url, {
                lang: "eng",
                tessedit_char_whitelist: "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789"
            });
        };
        
        // Return the public context.
        return (url) => _detect(url);
    }
());