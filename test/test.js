/**
 * @module Test
 * @author Vasile Pește <sirvasile@protonmail.ch>
*/

import { Typefont } from "../src/index.js";

const test = async (options) => {
    const dir = "images/";
    const images = [
        "book.png",
        "book1.png",
        "web.png"
    ];
    const results = [
        ["Roboto", "Ubuntu", "Nunito Sans", "Aldrich", "Raleway", "Lora", "Times New Roman"],
        ["Lora", "Times New Roman", "Ubuntu", "Nunito Sans", "Roboto", "Raleway", "Aldrich"],
        ["Nunito Sans", "Roboto", "Raleway", "Ubuntu", "Aldrich", "Lora", "Times New Roman"]
    ];
    
    for (let i = 0, ll = images.length; i < ll; ++i)
    {
        const res = await Typefont(`${dir}${images[i]}`, options);
        let ex = 0;
        
        for (let j = 0, llj = results[i].length; j < llj; ++j)
            if (results[i][j] != res[j].name)
            {
                ++ex;
                console.warn(`Test ${i} at j => ${j} [expected: ${results[i][j]} but recevied ${res[j].name}]`);
            }
        
        console.log(`Test ${i}`, res, !ex ? "Passed" : "Not Passed");
    }
};

test({
    fontsIndex: "../storage/index.json",
    fontsDirectory: "../storage/fonts/"
});