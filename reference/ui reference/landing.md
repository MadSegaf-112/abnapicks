<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Vantage - Stop Digging</title>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=hankenGrotesk:wght@100..900&family=sora:wght@100..900&display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "tertiary": "#ffffff",
                        "error-container": "#93000a",
                        "on-error-container": "#ffdad6",
                        "inverse-on-surface": "#313030",
                        "on-background": "#e6e1e1",
                        "inverse-surface": "#e6e1e1",
                        "primary-fixed-dim": "#c6c6c7",
                        "surface": "#141313",
                        "on-tertiary-fixed-variant": "#474746",
                        "on-primary-fixed-variant": "#454747",
                        "on-tertiary-fixed": "#1c1b1b",
                        "background": "#141313",
                        "surface-dim": "#141313",
                        "surface-container-highest": "#363435",
                        "outline": "#8e9192",
                        "on-primary": "#2f3131",
                        "on-surface-variant": "#c4c7c8",
                        "inverse-primary": "#5d5f5f",
                        "primary-fixed": "#e2e2e2",
                        "primary": "#ffffff",
                        "surface-container": "#201f20",
                        "secondary-container": "#474747",
                        "on-primary-fixed": "#1a1c1c",
                        "surface-container-low": "#1c1b1c",
                        "secondary": "#c6c6c6",
                        "on-tertiary": "#313030",
                        "on-error": "#690005",
                        "surface-variant": "#363435",
                        "tertiary-container": "#e5e2e1",
                        "surface-container-high": "#2b2a2a",
                        "on-secondary-container": "#b5b5b5",
                        "tertiary-fixed": "#e5e2e1",
                        "surface-container-lowest": "#0f0e0e",
                        "on-secondary": "#303030",
                        "secondary-fixed-dim": "#c6c6c6",
                        "on-secondary-fixed": "#1b1b1b",
                        "error": "#ffb4ab",
                        "outline-variant": "#444748",
                        "on-secondary-fixed-variant": "#474747",
                        "surface-bright": "#3a3939",
                        "on-tertiary-container": "#656464",
                        "secondary-fixed": "#e2e2e2",
                        "tertiary-fixed-dim": "#c8c6c5",
                        "on-primary-container": "#636565",
                        "on-surface": "#e6e1e1",
                        "surface-tint": "#c6c6c7",
                        "primary-container": "#e2e2e2"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "stack-md": "24px",
                        "stack-lg": "48px",
                        "section-gap": "160px",
                        "stack-sm": "8px",
                        "margin-desktop": "80px",
                        "gutter": "24px",
                        "margin-mobile": "20px"
                    },
                    "fontFamily": {
                        "display-xl-mobile": ["sora"],
                        "headline-lg": ["sora"],
                        "label-caps": ["hankenGrotesk"],
                        "display-xl": ["sora"],
                        "body-lg": ["hankenGrotesk"],
                        "headline-sm": ["sora"],
                        "nav-link": ["hankenGrotesk"],
                        "body-md": ["hankenGrotesk"],
                        "reference-sans": ["Reference Sans", "sans-serif"],
                        "reference-display": ["Reference Display", "sans-serif"]
                    }
                }
            }
        }
    </script>
<style>
        /* Glassmorphism Styles */
        .glass-panel {
            background-color: rgba(20, 19, 19, 0.4);
            backdrop-filter: blur(16px) saturate(108%);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            border-left: 1px solid rgba(255, 255, 255, 0.1);
            border-right: 1px solid rgba(255, 255, 255, 0.05);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .glass-pill {
            background-color: rgba(20, 19, 19, 0.2);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.13);
        }

        /* Typography Customizations */
        .headline-text {
            font-family: 'Reference Display', sans-serif;
            font-weight: 500;
        }

        .title-line-1 {
            transform: scaleX(0.775);
            transform-origin: left;
            color: #ffffff;
        }

        .title-line-2 {
            transform: scaleX(0.793);
            transform-origin: left;
            color: rgba(211, 207, 207, 0.78);
        }

        .body-copy {
            font-family: 'Reference Sans', sans-serif;
            font-weight: 350;
            color: rgba(226, 229, 228, 0.84);
        }

        /* Animation Choreography */
        .motion-pending {
            opacity: 0;
            transform: translateY(20px);
        }

        .animate-in {
            animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideUpFade {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .delay-brand { animation-delay: 500ms; }
        .delay-nav { animation-delay: 800ms; }
        .delay-title-1 { animation-delay: 1100ms; }
        .delay-title-2 { animation-delay: 1300ms; }
        .delay-copy { animation-delay: 1600ms; }
        .delay-cta { animation-delay: 1900ms; }
        .delay-card { animation-delay: 2200ms; }
    </style>

</head>
<body class="bg-background text-on-surface h-screen w-screen overflow-hidden font-reference-sans selection:bg-primary selection:text-on-primary">
<!-- Video Background -->
<div class="fixed inset-0 w-full h-full z-0">
<video autoplay="" class="w-full h-full object-cover opacity-70" loop="" muted="" playsinline="">
<source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_064556_051587f1-74a1-4336-8c05-4dde3594ed05.mp4" type="video/mp4"/>
</video>
<!-- Dark Overlay for better contrast -->
<div class="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
<div class="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent"></div>
</div>
<!-- Main Content Container -->
<main class="relative z-10 w-full h-full flex flex-col justify-between p-margin-mobile md:p-margin-desktop">
<!-- Header (TopNavBar Blueprint) -->
<header class="w-full flex justify-between items-center bg-transparent">
<!-- Brand -->
<div class="flex items-center gap-4 motion-pending animate-in delay-brand">
<svg fill="none" height="25" viewbox="0 0 25 25" width="25" xmlns="http://www.w3.org/2000/svg">
<circle cx="12.5" cy="12.5" fill="white" r="12.5"></circle>
<path d="M12.5 5L18 17H7L12.5 5Z" fill="black"></path>
</svg>
<span class="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">Vantage</span>
</div>
<!-- Nav (Desktop) -->
<nav class="hidden md:flex items-center gap-8 glass-pill px-8 py-3 rounded-full motion-pending animate-in delay-nav">
<a class="font-nav-link text-nav-link text-primary border-b-2 border-primary pb-1" href="#">Home</a>
<a class="font-nav-link text-nav-link text-on-surface-variant hover:text-primary transition-colors" href="#">About</a>
<a class="font-nav-link text-nav-link text-on-surface-variant hover:text-primary transition-colors" href="#">Services</a>
<a class="font-nav-link text-nav-link text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a>
</nav>
<!-- Actions -->
<div class="hidden md:flex items-center gap-6 motion-pending animate-in delay-nav">
<div class="text-sm font-label-caps tracking-widest text-on-surface-variant flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Local Time: 9:47 PM • 14 July 2026
                </div>
<button class="bg-primary text-on-primary font-nav-link px-6 py-3 rounded-full hover:bg-tertiary-container transition-colors">
                    Sign Up
                </button>
</div>
<!-- Mobile Menu Toggle -->
<button class="md:hidden text-primary p-2 glass-pill rounded-full" id="mobile-menu-btn">
<span class="material-symbols-outlined">menu</span>
</button>
</header>
<!-- Bottom Layout -->
<div class="w-full flex flex-col md:flex-row justify-between items-end gap-12 md:gap-0 pb-12 md:pb-0">
<!-- Hero Content -->
<div class="flex flex-col max-w-3xl">
<h1 class="headline-text text-[60px] md:text-[100px] leading-[0.9] tracking-tighter mb-8">
<div class="title-line-1 motion-pending animate-in delay-title-1 block">Stop Digging</div>
<div class="title-line-2 motion-pending animate-in delay-title-2 block">Through Dashboards.</div>
</h1>
<p class="body-copy text-[18px] md:text-[22px] leading-relaxed mb-10 motion-pending animate-in delay-copy max-w-2xl">
                    Your metrics are scattered across a dozen dashboards.<br class="hidden md:block"/>
                    Vantage bring them into one clear signal, so every<br class="hidden md:block"/>
                    decision is backed by data you actually trust.
                </p>
<div class="motion-pending animate-in delay-cta">
<button class="group bg-primary text-on-primary font-nav-link pl-8 pr-2 py-2 rounded-full flex items-center gap-4 hover:scale-95 transition-transform duration-300">
<span class="font-medium text-lg">Get Started</span>
<div class="bg-surface text-primary p-2 rounded-full flex items-center justify-center group-hover:bg-on-primary-fixed-variant transition-colors">
<span class="material-symbols-outlined">arrow_forward</span>
</div>
</button>
</div>
</div>
<!-- Demo Card -->
<div class="w-full md:w-[400px] glass-panel rounded-2xl p-4 motion-pending animate-in delay-card group cursor-pointer hover:bg-surface/60 transition-colors duration-500">
<div class="relative w-full aspect-video rounded-xl overflow-hidden mb-4 bg-surface-container">
<!-- Abstract Smoke Thumbnail Placeholder -->
<div class="w-full h-full bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700" data-alt="Abstract cinematic macro shot of ethereal glowing white and cyan smoke billowing gracefully against a deep black void. The lighting is highly directional, creating sharp highlights and deep shadows, giving the smoke a three-dimensional, volumetric quality. The aesthetic is extremely premium, minimalist, and tech-forward." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCy_vR2nc1NW-lBTUGqX9QTlSMOANWLToIlw0XHOp62y5vZgHySzjuHLHuwFT269evdxWcJfYsXlXSNeIiCu10_rDg3Y2YauUgVrY91G3fmSwZSNqhpUdnvoZK-eUXkAWpqN-IzTagELeau-38hoK5QHsiSzCED93U7_IoYvyyqaiVckcds9cXzBd5bTW-gKkdlC4rPKZK6bfULxqooNBZmQr5SIjPExoYMoMoPNLauC6mSRe8ba3fktw')"></div>
<!-- Play Button Overlay -->
<div class="absolute inset-0 flex items-center justify-center">
<div class="w-12 h-12 rounded-full glass-pill flex items-center justify-center text-primary backdrop-blur-md">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</div>
</div>
</div>
<div class="flex justify-between items-center px-2">
<div>
<h3 class="font-headline-sm text-lg text-primary mb-1">Watch Demo</h3>
<p class="font-body-md text-sm text-on-surface-variant">See the unified signal in action.</p>
</div>
<span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">arrow_outward</span>
</div>
</div>
</div>
</main>
<!-- Mobile Navigation Overlay (Hidden by default) -->
<div class="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex flex-col p-margin-mobile opacity-0 pointer-events-none transition-opacity duration-300" id="mobile-menu">
<div class="flex justify-between items-center mb-12">
<div class="flex items-center gap-4">
<svg fill="none" height="25" viewbox="0 0 25 25" width="25" xmlns="http://www.w3.org/2000/svg">
<circle cx="12.5" cy="12.5" fill="white" r="12.5"></circle>
<path d="M12.5 5L18 17H7L12.5 5Z" fill="black"></path>
</svg>
<span class="font-headline-sm text-headline-sm font-bold text-primary">Vantage</span>
</div>
<button class="text-primary p-2 glass-pill rounded-full" id="close-menu-btn">
<span class="material-symbols-outlined">close</span>
</button>
</div>
<nav class="flex flex-col gap-8 text-center mt-12">
<a class="font-display-xl-mobile text-display-xl-mobile text-primary" href="#">Home</a>
<a class="font-display-xl-mobile text-display-xl-mobile text-on-surface-variant" href="#">About</a>
<a class="font-display-xl-mobile text-display-xl-mobile text-on-surface-variant" href="#">Services</a>
<a class="font-display-xl-mobile text-display-xl-mobile text-on-surface-variant" href="#">Contact</a>
</nav>
<div class="mt-auto mb-8 flex flex-col gap-6">
<button class="w-full bg-primary text-on-primary font-nav-link py-4 rounded-full text-lg">
                Sign Up
            </button>
</div>
</div>
<script>
        // Simple entrance choreography fallback script just in case CSS fails, though classes handle it.
        document.addEventListener('DOMContentLoaded', () => {
            // Remove motion-pending classes after animation completes to avoid re-triggering issues
            setTimeout(() => {
                const elements = document.querySelectorAll('.motion-pending');
                elements.forEach(el => {
                    el.classList.remove('motion-pending');
                });
            }, 3500);

            // Mobile Menu Logic
            const mobileBtn = document.getElementById('mobile-menu-btn');
            const closeBtn = document.getElementById('close-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');

            mobileBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            });

            closeBtn.addEventListener('click', () => {
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            });
        });
    </script>

</body></html>
