'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';

const TOTAL_FRAMES = 40; // Set to 40 based on available files. Update to 120 if files are added.
const FRAME_PREFIX = 'ezgif-frame-';
const FRAME_EXT = '.jpg';
const FRAMES_DIR = '/frames/';

export default function AIDJProScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    // We use the container for scroll progress tracking.
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll progress to animation frames. 
    // We want the animation to complete slightly before the end of the scroll section so the final state holds.
    const animationProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            // console.log("Starting image load...");
            const promises: Promise<HTMLImageElement>[] = [];

            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const promise = new Promise<HTMLImageElement>((resolve) => {
                    const img = new Image();
                    const frameIndex = String(i).padStart(3, '0');
                    img.src = `${FRAMES_DIR}${FRAME_PREFIX}${frameIndex}${FRAME_EXT}`;
                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        console.error(`Failed to load frame ${frameIndex}`);
                        resolve(img);
                    };
                });
                promises.push(promise);
            }

            try {
                const loadedImgs = await Promise.all(promises);
                console.log(`Loaded ${loadedImgs.length} images`);
                imagesRef.current = loadedImgs;
                setLoaded(true);
            } catch (e) {
                console.error("Error loading images", e);
            }
        };

        loadImages();
    }, []);

    const drawFrame = (index: number) => {
        const canvas = canvasRef.current;
        const imgs = imagesRef.current;
        if (!canvas || !imgs[index]) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = imgs[index];

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const w = canvas.width;
        const h = canvas.height;

        // Contain logic
        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;

        let drawW, drawH;

        if (canvasRatio > imgRatio) {
            drawH = h;
            drawW = h * imgRatio;
        } else {
            drawW = w;
            drawH = w / imgRatio;
        }

        const x = (w - drawW) / 2;
        const y = (h - drawH) / 2;

        ctx.drawImage(img, x, y, drawW, drawH);
    };

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                if (loaded && imagesRef.current.length > 0) {
                    drawFrame(0);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [loaded]);

    // Sync Scroll to Frame
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!loaded || imagesRef.current.length === 0) return;

        const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(latest * TOTAL_FRAMES)
        );

        requestAnimationFrame(() => drawFrame(frameIndex));
    });

    // Initial Draw
    useEffect(() => {
        if (loaded && imagesRef.current.length > 0 && canvasRef.current) {
            drawFrame(0);
        }
    }, [loaded]);

    // Text Animations
    // Text 1: 0% - 20%
    const opacity1 = useTransform(animationProgress, [0, 0.15, 0.20], [1, 1, 0]);
    const y1 = useTransform(animationProgress, [0, 0.20], [0, -50]);

    // Text 2: 30% - 50%
    const opacity2 = useTransform(animationProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
    const x2 = useTransform(animationProgress, [0.25, 0.45], [-50, 0]);

    // Text 3: 60% - 80%
    const opacity3 = useTransform(animationProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
    const x3 = useTransform(animationProgress, [0.55, 0.75], [50, 0]);

    // Text 4: 90%
    const opacity4 = useTransform(animationProgress, [0.85, 0.95], [0, 1]);
    const scale4 = useTransform(animationProgress, [0.85, 1], [0.9, 1]);

    if (!loaded) {
        return (
            <section ref={containerRef} className="relative h-screen bg-[#050505] flex items-center justify-center text-white overflow-hidden">
                <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
                <p className="ml-4 text-sm tracking-widest uppercase text-white/60">Initializing AI DJ Pro...</p>
            </section>
        );
    }

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                />

                {/* Text Overlays */}
                <div className="relative z-10 pointer-events-none w-full max-w-7xl mx-auto h-full flex flex-col justify-center">

                    {/* 1. Title */}
                    <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                            The Future of<br />DJing Is Here.
                        </h1>
                    </motion.div>

                    {/* 2. Co-Pilot */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        style={{ opacity: opacity2, x: x2 }}
                        className="absolute inset-0 flex items-center justify-start px-8 md:px-20"
                    >
                        <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/5 max-w-lg">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">Your AI Co-Pilot</h2>
                            <p className="text-lg md:text-xl text-white/60">Analyzes track structure, key, and energy in real-time. It doesn't just mix; it understands.</p>
                        </div>
                    </motion.div>

                    {/* 3. Festival Stages */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        style={{ opacity: opacity3, x: x3 }}
                        className="absolute inset-0 flex items-center justify-end px-8 md:px-20"
                    >
                        <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/5 max-w-lg text-right">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">From Bedroom<br />to Festival Stages</h2>
                            <p className="text-lg md:text-xl text-white/60">Seamless hardware integration that scales with your ambition. Build complex routines in seconds.</p>
                        </div>
                    </motion.div>

                    {/* 4. CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        style={{ opacity: opacity4, scale: scale4 }}
                        className="absolute inset-0 flex items-center justify-center flex-col"
                    >
                        <h2 className="text-4xl md:text-7xl font-bold text-center mb-6">More Than Mixing.<br /><span className="text-white/50">It’s Performance Intelligence.</span></h2>
                        <button className="pointer-events-auto mt-8 px-10 py-4 bg-white text-black font-bold rounded-full text-lg hover:bg-gray-200 transition-all hover:scale-105 active:scale-95">
                            GET EARLY ACCESS
                        </button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
