# buzz-buzzers - Use the wired or wireless "Playstation Buzz" Buzzers with node.js

## Installation
`npm install buzz-buzzers`

## Usage
For the wired buzzers simply plug them in and you're ready to go.
For the wireless Playsation Buzz Buzzers, first plug in the USB dongle of your huzzers. Connect/pair your controllers (see below for hints on that). Then you can use this library like this:


### Initialize
```js
var buzzBuzzers = require('buzzBuzzers');
var buzzers = buzzBuzzers(); // initialize buzzers
```
### Get notified when button is pressed
```js
buzzers.onPress(function(ev) {
	// ev is an object with two attributes:
	// - controller: Number from 1 to 4
	// - button: Number from 0 to 4. 0 is the big red button.
	console.log('Button ' + ev.button + ' on controller ' + ev.controller + ' pressed');
});
```

### Get notified when button is released
```js
buzzers.onRelease(function(ev) {
	console.log('Button ' + ev.button + ' on controller ' + ev.controller + ' released');
});
```


### Get notified whenever something changes

```js
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
```

### Get notfied when an error happens

```js
buzzers.onError(function(err) {
	console.log('Error: ', err);
});
```

### Remove event listeners

```js
// To remove a listener just call removeEventListener
// possible first parameter values are: press, release, change, error
buzzers.removeEventListener('press', callback);
```

### Make a buzzer light up

Note that this does not work on some older buzz-buzzers since they don't have an LED. For those devices `onError` will be called when you call `setLeds`

```js
buzzers.setLeds(true, false, false, false); // light up controller number 1
buzzers.setLeds(true, true, false, true); // light up all controllers except for number 3

```

## Hints on pairing the wireless buzz buzzers
First plug in the USB dongle. Next take your first controller and move the switch to the upper position and hold it like that until the blue led at the bottom lights up. Repeat this step for all controllers. When done press the button on your USB dongle until the blue LED lights up. Then release the button and press it once more.

## Changelog

### 1.0.1
Older devices (e.g. the non wireless version for playstation 2) don't allow lighting up the LEDs. Previously calling `setLeds` lead to a crash - now we catch those cases and call the error callback.