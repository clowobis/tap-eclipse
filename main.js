// ==UserScript==
// @name         Clicker for tap.eclipse.xyz
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Clicker for the browser game Eclipse
// @author       0x
// @match        https://tap.eclipse.xyz/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // check page load interval - ms
    const CHECK_INTERVAL = 15000;

    // click interval - ms
    const CLICK_INTERVAL = 1500;

    const CANVAS_XPATH = '/html/body/div[1]/div[2]/main/div[2]/div[1]/div/div[1]/div[2]/div/div/canvas';

    function getElementByXPath(xpath) {
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    function clickElement(element) {
        if (element) {
            const rect = element.getBoundingClientRect();
            const x = rect.left + rect.width / 2; 
            const y = rect.top + rect.height / 2; 

            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: x,
                clientY: y,
            });

            element.dispatchEvent(clickEvent);
            console.log('Click');
        } else {
            console.error('Canvas not found');
        }
    }

    const canvasInterval = setInterval(() => {
        const canvasElement = getElementByXPath(CANVAS_XPATH); 
        if (canvasElement) {
            console.log('Canvas found! Lets start clicking.');
          
            clearInterval(canvasInterval);
          
            setInterval(() => {
                clickElement(canvasElement);
            }, CLICK_INTERVAL);
        } else {
            console.log('Canvas has not yet been uploaded...');
        }
    }, CHECK_INTERVAL);
})();
