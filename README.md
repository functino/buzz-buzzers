# `node-buzzers` - Use the wired or wireless "Playstation Buzz" Buzzers with node.js

## Forked from [functino/buzz-buzzers](https://github.com/functino/buzz-buzzers)

This fork:

- is working with Node 16
- has updated dependencies
- can work with more than 1 USB dongle (see `examples/multi-blink.js`)

## Installation

`npm install node-buzzers`

## Usage

Before you use this library you need to connect your buzzers:
- for the wired buzzers simply plug them in
- for the wireless Playsation Buzz Buzzers, first plug in the USB dongle of your buzzers. Connect/pair your controllers (see below for hints on that).

Then you can use this library like this:

### Examples

```js
var nodeBuzzers = require('node-buzzers');
var buzzers = nodeBuzzers();
var ledLight = true;

// Make all buzzers blinks
// this only works on the buzzers with an LED
setInterval(function () {
  ledLight = !ledLight;
  buzzers.setLeds(ledLight, ledLight, ledLight, ledLight);
}, 500);

// Get notified when a button is pressed
buzzers.onPress(function(ev) {
	// ev is an object with two attributes:
	// - controller: Number from 1 to 4
	// - button: Number from 0 to 4. 0 is the big red button.
	console.log('Button ' + ev.button + ' on controller ' + ev.controller + ' pressed');
});

// Get notified when a button is released
buzzers.onRelease(function(ev) {
	console.log('Button ' + ev.button + ' on controller ' + ev.controller + ' released');
});

// Get notified whenever something changes
buzzers.onChange(function(state) {
	// state is an array of booleans with all buttons
	// false means the button is not pressed
	// and true when a button is pressed
	/* An example could look like this, in this case the second color button
	of controller 2 was pressed and the big red button on controller four is pressed
	[
        false, false, false, false, false, // first controller
        false, false, true, false, false, // second controller
        false, false, false, false, false, // third controller
        true, false, false, false, false // fourth controller
    ]
	*/
});

// Get notified when an error happens
buzzers.onError(function(err) {
	console.log('Error: ', err);
});

// Remove event listeners
// To remove a listener just call removeEventListener
// possible first parameter values are: press, release, change, error

// buzzers.removeEventListener('press', callback);
```

## API

First you have to initialize the buzzers:
`var buzzers = require('node-buzzers')();`

`buzzers` now has the following API:

### `onPress(callback)`
Register a callback that is called whenever a button is pressed. It will be called with an event object in this format:

```
{
	controller: 1, // which controller/buzzer was used. Number form 1-4
	button: 0 // Which button was pressed. Number from 0 to 4. 0 is the big red button
}
```

### `onRelease(callback)`

Register a callback that is called whenever a button is released. It will be called with an event object in this format:

```
{
	controller: 1, // which controller/buzzer was used. Number form 1-4
	button: 0 // Which button was pressed. Number from 0 to 4. 0 is the big red button
}
```

### `onChange(callback)`

Register a callback that is called whenever any button changes it's state. Callback will be called with an array in the format

```
[
    false, false, false, false, false, // buttons 0-4 of the first controller. true means pressed
    false, false, true, false, false, // second controller
    false, false, false, false, false, // third controller
    true, false, false, false, false // fourth controller
]
```

### `onError(callback)`

Register a callback that is called when an error happens

### `setLeds(redButton1, redButton2, redButton3, redButton4)`:

To light up the red LEDs of a buzzer. Pass in `true` to switch a light on and `false` to switch it off. Note that this does not work on some older buzzers since they don't have an LED. For those devices `onError` will be called when you call `setLeds`

## Hints on pairing the wireless buzz buzzers

1. First plug in the USB dongle
2. Take a controller and move the switch to the upper position and hold it like that until the blue led at the bottom lights up
3. Repeat this step for all controllers
4. When done press the button on your USB dongle and hold it until the blue LED lights up

## Changelog

### 2.1.0
- Support for multiple USB dongles (see `examples/multi-blink.js`)

### 2.0.0
- Forked version from [functino/buzz-buzzers](https://github.com/functino/buzz-buzzers)
- Works with Node 16 and has updated dependencies
