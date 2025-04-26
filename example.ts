import * as PoweredUP from 'node-poweredup';
const poweredUP = new PoweredUP.PoweredUP();

function nextColorRGB(color, speed = 5) {
let [r, g, b] = color;

// Increase red until max, then green, then blue
if (r < 255 && g === 0 && b === 0) {
    r = Math.min(255, r + speed);
} else if (r === 255 && g < 255 && b === 0) {
    g = Math.min(255, g + speed);
} else if (r > 0 && g === 255 && b === 0) {
    r = Math.max(0, r - speed);
} else if (r === 0 && g === 255 && b < 255) {
    b = Math.min(255, b + speed);
} else if (r === 0 && g > 0 && b === 255) {
    g = Math.max(0, g - speed);
} else if (r < 255 && g === 0 && b === 255) {
    r = Math.min(255, r + speed);
} else if (r === 255 && g === 0 && b > 0) {
    b = Math.max(0, b - speed);
}
return [r, g, b];
}
poweredUP.on("discover", async (hub) => { // Wait to discover a Hub
    console.log(`Discovered ${hub.name}!`);
    await hub.connect(); // Connect to the Hub

    console.log("Connected!");
    // const led = await hub.waitForDeviceByType(PoweredUP.Consts.DeviceType.HUB_LED);
    // console.log("Found LED device!");

    const speaker = await hub.waitForDeviceByType(PoweredUP.Consts.DeviceType.DUPLO_TRAIN_BASE_SPEAKER);

    // led.setRGB(255, 0, 0); // Set LED to red

    // let currentColor = [0, 0, 0]; // Start with black
    // while(true) {
    //     const color = nextColorRGB(currentColor);
    //     const [r, g, b] = color;
    //     console.log(`Setting color to: ${r}, ${g}, ${b}`);
    //     led.setRGB(r, g, b);
    //     currentColor = color;
    //     await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100ms
    // }

    // write code to cycle through all 20 sounds on the speaker
    let soundIndex = 0;
    while (true) {
        console.log(`Playing sound ${soundIndex}`);
        await speaker.playSound(soundIndex);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        await speaker.playTone(soundIndex);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        soundIndex = (soundIndex + 1) % 20; // Loop back to 0 after 19
    }

});

poweredUP.scan(); // Start scanning for Hubs
console.log("Scanning for Hubs...");

