# buzz-buzzers - Use the Playstation Buzz  Buzzers with node.js

## Installation
`npm install buzz-buzzers`

## Usage
First plug in the USB dongle of your Playstation Buzz Buzzers. Connect/pair your controllers (see below for hints on that). Then you can use this library like this:

```
var buzzBuzzers = require('buzzBuzzers');
var buzzers = buzzBuzzers(); // initialize buzzers

buzzers.onPress(function(info) {
	// info is an object with two attributes:
	// - controller: Number from 1 to 4
	// - button: Number from 0 to 4. 0 is the big red button.
	console.log('Button ' + info.button + ' on controller ' + info.controller pressed');
});
buzzers.onRelease(function(info) {
	console.log('Button ' + info.button + ' on controller ' + info.controller released');
});

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

buzzers.onError(function(err) {
	console.log('Error: ', err);
});

// To remove a listener just call removeEventListener
// possible first parameter values are: press, release, change, error
buzzers.removeEventListener('press', callback);

buzzers.setLeds(true, false, false, false); // light up controller number 1
buzzers.setLeds(true, true, false, true); // light up all controllers except for number 3

```

## Hints on pairing the wireless buzz buzzers
First plug in the USB dongle. Next take your first controller and move the switch to the upper position and hold it like that until the blue led at the bottom lights up. Repeat this step for all controllers. When done press the button on your USB dongle until the blue LED lights up. Then release the button and press it once more.