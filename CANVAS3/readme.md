# Development: Scrolling Web Image/Frame Sequence Animation

I am learning from this video:

[![Learning from This Video](https://img.youtube.com/vi/6c2m0RjwRPY/hqdefault.jpg)](https://youtu.be/6c2m0RjwRPY?si=vX0aQ7DnQ7zmRyWE)



Topic: **Scrolling Web Image/Frame Sequence Animation**



```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body>
    <div class="w-full bg-zinc-900 ">
        <div class="canvas-container relative top-0 left-0 w-full h-[700vh]">
            <div class=" canv w-full sticky top-0 left-0 h-screen">
                <canvas id="frame" class="w-full h-screen"></canvas>
            </div>
        </div>
    </div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
    integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
    integrity="sha512-onMTRKJBKz8M1TnqqDuGBlowlH0ohFzMXYRNebz+yOcc5TQr/zAKsthzhuv0hiyUKEiQEQXEynnXCvNTOk50dg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>

    const canvas = document.querySelector("#frame");
    const ctx = canvas.getContext('2d')


    const frames = {
        currentIndex: 1,
        maxIndex: 113

    };

    let imagesLoaded = 0;
    const images = []

    function preloadImages() {
        for (let index = 1; index <= frames.maxIndex; index++) {
            const imageUrl = `Frames-30/frame_${index.toString().padStart(4, "0")}.png`;
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === frames.maxIndex) {
                    loadImage(frames.currentIndex)
                    startAnimation();
                }
            }

            images.push(img);// all the image tag pushed in to the array

            // img.onerror = (error) => console.error(`Failed to load image: ${imageUrl}`, error);
        }
    }

    function loadImage(index) {
        if (index >= 0 && index <= frames.maxIndex) {
            const img = images[index];
            canvas.width = window.innerWidth;// =screen
            canvas.height = window.innerHeight;

            const scaleX = canvas.width / img.width;
            const scaleY = canvas.height / img.height

            const scale = Math.max(scaleX, scaleY)

            const newWidth = img.width * scale;
            const newHeight = img.height * scale;

            const offsetX = (canvas.width - newWidth) / 2;
            const offsetY = (canvas.height - newHeight) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high"
            ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
            frames.currentIndex = index;
        }
    }

    function startAnimation(params) {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".canvas-container",
                start: " top top",
                scrub: 2,
                // markers: true
            }
        })
        tl.from(frames, {
            currentIndex: frames.maxIndex,
            onUpdate: function name() {
                loadImage(Math.floor(frames.currentIndex))
            }
        })
    }

    preloadImages();



</script>

</html>

<!-- ffmpeg -i "C:\Users\SUDIP BHATTACHARYA\Desktop\Canvas\CANVAS3\f8078d53126c8662b86f41287a7d806b.gif" -vf "fps=30" "C:\Users\SUDIP BHATTACHARYA\Desktop\Canvas\CANVAS3\Frames-30\frame_%04d.png"
     C:\Users\SUDIP BHATTACHARYA>dir "C:\Users\SUDIP BHATTACHARYA\Desktop\Canvas\CANVAS3\Frames-30\*.png" /b | find /c /v ""
    
    let a = 12;
    a.toString()
    '12'
    a.toString().padStart(4)
    '0012'
    a.toSttring().padStart(4, "0")
    '0012'

    const img = new Image(); //113 times image tag will be created
            img.src = imageUrl // creating the images we mention the link or path of the page to the src
            img.onload = ()=>{
                imagesLoaded++
                if(imagesLoaded === frames.maxIndex){
                    console.log("all images are loaded");
                    
                }
            }
-->
```