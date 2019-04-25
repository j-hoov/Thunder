# Final Sketch - Thunder
Name: Juliana Hoover
Date: April 25, 2019
------
### Conceptual Description

This project plays on the idea of emerging storms - the ones we might not see coming. In the way the lightning comes before the thunder, the visual representation of the lightning in this piece is visually clear before the storm clouds slowly become visible. My goal with this piece was to take audio visualization in a conceptual direction, by using images, aesthetics, and layout that related to the content of the song. The song choice was obvious. "Thunder" by Imagine Dragons. This song has a strong back beat and a large range of amplitude, making it ideal for audio visualization.

### Interaction Description

Unlike the previous iteration of this piece, the user-determined aspects of "Thunder" are more constrained and understated. The amplitude of the audio determines the range of motion and also size of the shapes emanating from the cloud-representing gray ellipse. The user has control over the speed of rotation, by moving the position of the mouse. I like to think of this as analogy to the process of storm itself. No one can slow a storm or alter its course, but you have control over your own perspective. This piece allows users to control their perspective of the storm by slowing it down or speeding it up.

### Extension

![thunder](images/thunder1.PNG?raw=true "thunder")
![thunder](images/thunder2.PNG?raw=true "thunder")

The key elements I retained from the previous version of this piece are the alpha blended, semi-transparent background and the object classes I created previously. The segment and the bezier curve look different in this environment, translated to the top of the screen and with a high number of segments so that it retains a solid shape. Here I sued perlin noise values to make a lightning-like stroke that emanates from the top of the screen. In future extensions of this piece, I would play with perlin noise values to create lightning-like objects that iterate within the rotating shape. I enjoy the color transition, and I would make that even more extreme. I would also incorporate frequency as a measure determining dimensions and aspects of the sketch.

### Technical Details

This sketch uses p5.js, dom.js, and p5.sound.js. These three libraries naturally worked well together to produce the effect and aesthetic I was interested in. I explored some new techniques here as well, in the transparent image reveal and the pairing of audio amplitude with visual dimensions. Here are some code snippets from some of these new components. For now, this sketch is hosted on GitHub Pages. In future I would like to experiment with other platforms.

![amp](images/amp.PNG?raw=true "amp")
![dimensions](images/dimensions.PNG?raw=true "dimensions")
![perlin](images/perlin.PNG?raw=true "perlin noise")
![tinted image](images/tintimage.PNG?raw=true "tinted image")


