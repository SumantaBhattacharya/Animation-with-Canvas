# Development: Scrolling Web Image/Frame Sequence Animation Part-2

[![Learning from This Video](https://img.youtube.com/vi/ouq6ks1zVAs/hqdefault.jpg)](https://youtu.be/ouq6ks1zVAs?si=QVwmoR15_d-0U3IW)

```html
<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOZE-STUDIO</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @font-face {
            font-family: 'UncutSans';
            src: url('./UncutSans-Medium.woff2') format('woff2');
            font-weight: 500;
            font-style: normal;
        }
    
        body {
            font-family: 'UncutSans', sans-serif;
        }
    </style>
</head>

<body>
    <div class="main w-full bg-zinc-900">
        <div class="parent relative w-full h-[600vh] ">
            <div class="w-full h-screen sticky top-0 left-0">
                <canvas class="w-full h-screen" id="frame">

                </canvas>

                <div class="animate1 absolute z-[2] text-white bottom-10 w-1/2 left-10 ">
                    <h1 class="leading-20 font-[10] text-3xl ">
                        &copy; 2024 DOZE STD
                    </h1>
                    <h1 class="text-3xl font-[700]">Shaping brands → Crafting motion →</h1>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
        integrity="sha512-onMTRKJBKz8M1TnqqDuGBlowlH0ohFzMXYRNebz+yOcc5TQr/zAKsthzhuv0hiyUKEiQEQXEynnXCvNTOk50dg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script>

        const canvas = document.getElementById("frame")
        const ctx = canvas.getContext("2d")


        const frames = {
            currentIndex: 1,
            maxIndex: 1614
        }

        let imagesLoaded = 0; // this variable cannot be const
        const images = []

        function preloadImages() {
            for (let i = 1; i <= frames.maxIndex; i++) {
                const imageUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`;
                const img = new Image();
                img.src = imageUrl


                img.onload = function () {
                    imagesLoaded++;
                    if (imagesLoaded === frames.maxIndex) {
                        loadImage(frames.currentIndex);

                        startAnimation()
                    }
                }

                images.push(img);// all the image tag pushed in to the array

            }
        }

        function loadImage(index) {
            if (index >= 0 && index <= frames.maxIndex) {
                const img = images[index];

                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                

                // window.addEventListener('resize', () => {
                //     canvas.width = window.innerWidth;
                //     canvas.height = window.innerHeight;
                // });

                const scaleX = canvas.width / img.width;
                const scaleY = canvas.height / img.height

                const scale = Math.max(scaleX,scaleY);

                // const newWidth = img.width * scaleX
                // const newHeight = img.height * scaleY
                const newWidth = img.width * scale
                const newHeight = img.height * scale


                const offsetX = (canvas.width - newWidth) / 2;
                const offsetY = (canvas.height - newHeight) / 2;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high"
                ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);//backgroundImage- cover
                frames.currentIndex = index;

            }
        }

        function startAnimation() {
            var tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".parent", // Ensure this targets the correct element
                    start: "top top",
                    scrub: 2,
                    end: "bottom bottom",
                    pin: true // Pins the canvas during the scroll
                }
            });

            function updateFrame(index) {
                return{
                currentIndex: index, // frames.maxIndex - 1, // maxIndex - 1 to avoid out of bounds
                ease: "linear",
                onUpdate: function () {
                    loadImage(Math.floor(frames.currentIndex));
                }
            }}

            tl
            .to(frames, updateFrame(50))
            .to(".animate1", {opacity:0, ease: "linear"})

           
        }

        preloadImages();

    </script>
</body>

</html>
<!-- 
D:\Frames\All Files and Video\windows_files
`Frames-30/frame_${index.toString().padStart(4, "0")}.png`

let a = 12;
a.toString()
'12'
a.toString().padStart(4)
'0012'
a.toSttring().padStart(4, "0")
'0012' -->
```