# RF Attenuator Designer & Analyzer

[Open the live calculator](https://k82vp9dbbp-art.github.io/rf-attenuator-designer/)

RF Attenuator Designer & Analyzer is a browser-based tool for designing and analyzing purely resistive attenuator pads. It supports T and π topologies and runs entirely in the browser.

## Features

- Design matched T and π pads for a selected attenuation, source impedance, and load impedance.
- Design unequal-impedance pads and show the minimum possible attenuation for the impedance transformation.
- Analyze the effect of actual source and load impedances without changing the original design targets.
- Edit individual resistor values or apply nearby E96 standard values to see the realized performance.
- Display voltage ratio, effective attenuation, input and output impedance, return loss, VSWR, node voltages, and resistor power dissipation.
- Split a high-attenuation design into two cascaded stages and compare resistor power dissipation.
- Estimate an unknown load impedance from a measured voltage ratio or attenuation.
- Accept input drive values in Vpk, Vrms, dBm, or watts.
- Provide built-in explanations for controls and results through the `?` help button.
- Run 19 calculation checks each time the app starts.

## iPhone and iPad

Open the [live calculator](https://k82vp9dbbp-art.github.io/rf-attenuator-designer/) in Safari, tap **Share**, and choose **Add to Home Screen**. The installed web app uses its own RF circuit icon and opens in a standalone window.

Offline use is supported after the app has loaded online at least once. After installing it, open it while connected, allow it to finish loading, then close and reopen it. It can then be opened from the Home Screen without an internet connection.

## Privacy

Calculations run locally in the browser. The values entered into the calculator are not uploaded or synchronized.

## Model limits

The calculator uses a purely resistive model. Real RF circuits are also affected by component tolerances, frequency response, layout, transmission lines, and parasitic inductance and capacitance. Verify important designs with trusted engineering references, suitable component ratings, and measurements of the completed circuit.

## Project structure

- `index.html` contains the calculator, styling, calculations, schematics, and built-in help.
- `manifest.webmanifest` defines the installed web app.
- `service-worker.js` provides versioned offline caching.
- `icons/` contains the browser and Home Screen icons.

The app is hosted as a static site with GitHub Pages and requires no server or build process.
