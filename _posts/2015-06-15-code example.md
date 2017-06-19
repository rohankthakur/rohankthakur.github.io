---
layout: inner
title: 'Post with some Javascript!'
date: 2017-06-15 16:12:00
categories: blog test
tags: js
lead_text: 'testing code highlighting'
---

Testing code highlighting ... see snippet below,

<pre><code>
function meow() {
    return 'meow';
}

function bark() {
    return 'woof';
}

function getRandomAnimal() {

    var animals = [
        'cat',
        'dog',
        'hippo',
        'lion',
        'bear',
        'zebra'
    ];

    return animals[Math.floor(Math.random()*animals.length)];
}

console.log(meow());
console.log(bark());
console.log(getRandomAnimal());
</code></pre>

Looks like it works!