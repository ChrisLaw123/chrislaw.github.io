const site = {
    statement: 'I\'m Chris, a computer engineering student at Waterloo. I enjoy working on both software and hardware.',
    standfirst: 'Computer engineering at the University of Waterloo. The first revision of a custom ESP32-S3 board is built and on its way to me now, ready for bring-up.',

    projects: [
        {
            title: 'ESP32-S3 Development Board',
            fact: '4-layer PCB, Altium',
            note: 'A custom four-layer board taken from schematic to manufactured PCB.',
            deck: 'A custom ESP32-S3 development board designed from scratch in Altium Designer and taken through fabrication and assembly at JLCPCB.',
            images: [
                {
                    src: 'images/esp32/board-top.jpg',
                    label: 'Top 3D',
                    tint: '#216B47',
                    caption: 'Top side. The UART and native-USB connectors sit at left with the USB1/+5V/USB2 selection jumper beside them, and the module\'s antenna overhangs the board edge at right so no copper sits under the radiator.'
                },
                {
                    src: 'images/esp32/board-bottom.jpg',
                    label: 'Bottom 3D',
                    tint: '#246865',
                    caption: 'The underside silkscreen labels every GPIO, header and control, so the board can be wired without opening the schematic. GPIO35 to 37 are absent from the list because the octal PSRAM uses them internally.'
                },
                {
                    src: 'images/esp32/layout-top.png',
                    label: 'Top Layer',
                    tint: '#A73737',
                    caption: 'Top copper. The 3 x 3 thermal via array tying the module\'s exposed pad to the ground planes is visible at right.'
                },
                {
                    src: 'images/esp32/layout-bottom.png',
                    label: 'Bottom Layer',
                    tint: '#315CA8',
                    caption: 'Bottom copper, carrying most of the GPIO fan-out from the module to the two header rows. The wide pours at left distribute 5 V and the regulated 3.3 V.'
                },
                {
                    src: 'images/esp32/schematic.png',
                    label: 'Schematic',
                    tint: '#956314',
                    caption: 'The full sheet: both USB-C front ends, the 5 V and 3.3 V selection jumpers, the FT231XQ UART path, the two-transistor auto-programming circuit driven by DTR and RTS, and the module itself.'
                }
            ],
            body: [
                'I wanted to understand how a development board actually works, so I designed one. It is built around the ESP32-S3-WROOM-1-N8R8 module, which carries 8 MB of flash, 8 MB of octal PSRAM, and an integrated PCB antenna. The longer-term point of the board is to become the controller for a 3D-printed robot with motors, sensors, and eventually a vision peripheral, so it needed to be a platform rather than a one-off.',
                'The starting point was <a href=\'https://fedevel.com/blog/how-to-make-custom-esp32-board-in-altium-designer-full-tutorial\' target=\'_blank\' rel=\'noopener noreferrer\'>Robert Feranec\'s custom ESP32 board tutorial</a> at FEDEVEL, which is what taught me the process end to end. I built around a different module, and that changed most of it: moving from the MINI to the WROOM meant a new schematic symbol, a new footprint with an exposed pad, a different pin map, and a different antenna strategy. It also cost me three GPIOs: on the N8R8 the octal PSRAM occupies GPIO35, 36 and 37 internally, so the schematic deliberately never exposes them. Every choice was cross-checked against Espressif\'s reference documentation, the DevKitC schematic, and the component datasheets rather than the tutorial.',
                'The board takes power from either of two USB-C connectors. A three-pin header with a jumper shunt selects which VBUS reaches the 5 V rail, so the two supplies are never tied together. A TL1963A-33 regulator drops that to 3.3 V, and a second jumper chooses between the regulator output and 3.3 V supplied from outside. One connector is a conventional USB-to-UART path through an FT231XQ bridge; the other is the ESP32-S3\'s native USB on GPIO19 and GPIO20, routed as a differential pair under Altium pair rules targeting 90 Ω. Both ports get independent 5.1 kΩ CC resistors, ESD protection at the connector, and 27 Ω series termination.',
                'The part I did not expect to learn was manufacturing. The first JLCPCB submission failed audit because the NC drill files were not inside the Gerber archive. They had been generated correctly, just not uploaded. Then the thermal vias under the module\'s exposed pad came back flagged: at 0.20 mm drill with 0.40 mm copper they crossed a threshold that triggers a mandatory four-wire Kelvin test surcharge. Widening them to 0.45 mm kept the thermal path and removed the fee. A board can be electrically correct and still cost more to build than it needs to.',
                'Two pairs of alternative 0 Ω footprints physically overlap on the layout, and only one of each pair should ever be fitted. Rather than trusting a note at checkout, I built an Altium prototype variant so the unfitted parts are excluded from the pick-and-place output entirely, and wrote targeted clearance rules that permit the intentional overlap without weakening component clearance across the rest of the board. Early DRC runs threw hundreds of violations: mask slivers, silkscreen clearance, exposed-pad clearance, unrouted nets. Most of them cleared once I set the board up against JLCPCB\'s own design constraints rather than generic defaults, and I closed the rest with specific rules instead of switching checks off.',
                'Five bare boards were fabricated and two were assembled, which is enough to tell a design fault apart from a single bad component once bring-up starts. They are shipping to me now. The through-hole headers and jumper shunts are cheap enough to hand-solder. Next is checking the 5 V and 3.3 V rails before the module sees full power, then RESET and BOOT, UART flashing through the FT231X, native USB, and finally Wi-Fi.'
            ],
            notes: [
                'GPIO35 to 37 are never exposed, because the octal PSRAM uses them internally',
                'The module antenna extends past the carrier-board edge, so no board copper sits under the radiator',
                'A 3 × 3 thermal via array ties the module\'s exposed pad to the ground planes',
                'Two-transistor auto-programming circuit driven by the bridge\'s DTR and RTS lines',
                'Layer 3 is an Altium negative internal plane, so its Gerber is negative polarity by design',
                'Underside silkscreen labels every GPIO, header, and control so the board is usable without the schematic'
            ],
            spec: [
                ['Module', 'ESP32-S3-WROOM-1-N8R8'],
                ['Memory', '8 MB flash, 8 MB octal PSRAM'],
                ['Stack-up', '4 layers'],
                ['Board size', '68.58 × 27.94 mm'],
                ['Regulator', 'TL1963A-33'],
                ['USB', 'FT231XQ bridge and native S3'],
                ['Differential pair', '90 Ω routing target'],
                ['Designed in', 'Altium Designer'],
                ['Fabrication', 'JLCPCB'],
                ['Verification', '0 DRC violations, 0 unrouted nets (design check, not a functional test)'],
                ['Status', 'Built and shipping, bring-up pending']
            ],
            links: []
        },
        {
            title: 'Trading Simulator',
            fact: 'C++20, PostgreSQL',
            note: 'Real US stocks, virtual money, market data from Alpaca and a leaderboard.',
            deck: 'A full-stack stock trading simulator: live US market data, virtual portfolios, and a leaderboard, served by a C++ backend.',
            images: [],
            body: [
                'A simulator for trading real US stocks with virtual money. Every account opens with $100,000, prices come live from the Alpaca Markets API across ten tickers, and a leaderboard ranks players by total account value. Each ticker carries a hundred hours of history behind its candlestick chart.',
                'The backend is C++20, which was not the obvious choice. A Crow HTTP server handles the API, PostgreSQL holds accounts, positions, and the full trade history through libpqxx, and libcurl fetches quotes from Alpaca. I chose C++ because I wanted to use it beyond coursework and learn how to build a backend around it, which meant handling connections, JSON parsing, and request routing myself.',
                'The frontend is deliberately thin. React 18 from a CDN with TradingView\'s Lightweight Charts for the candlesticks. Cash, equity, and unrealised profit and loss all revalue against live prices, and every fill is written to a trade history you can read back.'
            ],
            notes: [
                'Quotes for ten US tickers from the Alpaca Markets API',
                '$100,000 virtual starting balance with buy and sell execution',
                'Candlestick charts over 100 hours of historical data',
                'Cash, equity, and unrealised PnL revalued in real time',
                'Full trade history logged per account',
                'Leaderboard ranked by total account value',
                'Password-protected user accounts'
            ],
            spec: [
                ['Backend', 'C++20, Crow'],
                ['Database', 'PostgreSQL 15, libpqxx'],
                ['Market data', 'Alpaca Markets API'],
                ['HTTP client', 'libcurl'],
                ['JSON', 'nlohmann/json'],
                ['Build', 'CMake, Conan'],
                ['Frontend', 'React 18, Lightweight Charts']
            ],
            links: [{ label: 'View the source', href: 'https://github.com/ChrisLaw123/trading-sim' }]
        },
        {
            title: 'Terraria Content Mod',
            fact: 'C#, 672 subscribers',
            note: 'Custom items, ores, and a biome written into world generation.',
            deck: 'A content mod for Terraria, published on the Steam Workshop, where 672 people have subscribed to it.',
            images: [
                {
                    src: 'images/Terraria_Mod.png',
                    caption: 'Steam Workshop lifetime stats: 672 unique subscribers, 273 currently subscribed, and 1,069 unique visits to the mod page.'
                }
            ],
            body: [
                'A content mod written in C# and published to the Steam Workshop. It adds custom items and ores with their own crafting recipes, and a biome that is written into world generation so it appears in freshly created worlds rather than being placed after the fact.',
                'It was the first thing I built that strangers used. Once other people were playing it, what I worked on next stopped being what I found interesting and started being whatever was broken in their worlds, which turned out to be a much better teacher than working alone.'
            ],
            notes: [
                'Custom items and ores with their own crafting recipes',
                'A procedurally generated biome hooked into world generation',
                'Maintained on the Workshop against player bug reports'
            ],
            spec: [
                ['Language', 'C#'],
                ['Platform', 'Steam Workshop'],
                ['Subscribers', '672 unique, 273 current'],
                ['Page visits', '1,069 unique']
            ],
            links: [{ label: 'View on Steam Workshop', href: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2898549980' }]
        },
        {
            title: 'Automated CAM Assessment',
            fact: 'Arduino, C++',
            note: 'A bedside delirium screening test, administered and scored on-device.',
            deck: 'An Arduino system that runs the Confusion Assessment Method for cognitive screening and scores the responses on its own.',
            images: [
                {
                    src: 'images/CAM.jpg',
                    caption: 'Wiring for the build: an Arduino Uno R4 Minima driving a microphone breakout, a micro-SD card module, a PAM8302A class-D amplifier with speaker, and an OLED display on the breadboard.'
                }
            ],
            body: [
                'The Confusion Assessment Method is a short bedside test used to screen for delirium, and it is normally administered and scored by hand. This build automates it. An Arduino Uno R4 Minima plays the prompts through an amplified speaker, captures the response through a microphone module, writes audio and results to a micro-SD card, and applies the CAM rubric without anyone having to keep score.',
                'The interesting constraint was doing all of it on a microcontroller with no operating system underneath. Audio capture, storage, timing, and display all sharing one small board.'
            ],
            notes: [
                'Audio capture through a microphone breakout board',
                'Audio and assessment data logged to micro-SD',
                'Automated scoring against the CAM rubric',
                'On-device OLED display for operator prompts'
            ],
            spec: [
                ['Controller', 'Arduino Uno R4 Minima'],
                ['Language', 'C++'],
                ['Storage', 'Micro-SD card module'],
                ['Audio', 'PAM8302A amplifier, microphone breakout'],
                ['Display', 'OLED']
            ],
            links: []
        },
        {
            title: 'Curve Fitter',
            fact: 'JavaScript, least squares',
            note: 'Polynomial regression in the browser, solver written from scratch.',
            deck: 'A browser tool that fits a polynomial to a set of points and plots the result, with the least-squares solver written by hand.',
            images: [
                {
                    src: 'images/Curve_Fitter.png',
                    caption: 'Fitting a quartic to an uploaded data set. The solver returns y = x⁴ − x³ − x + 1 at R² = 1.0000, and the panel underneath evaluates that curve at x = 1.5.'
                }
            ],
            body: [
                'Points go in by hand or as a .csv or .txt upload, the polynomial degree is selectable, and the fitted equation, its R² score, and the plotted curve all update together. A second panel evaluates the fitted curve at any x you give it.',
                'The point of building it was the regression itself. I built the solver to understand how least squares fits a polynomial to data; solving the normal equations by hand meant actually understanding what least squares is doing to the data.'
            ],
            notes: [
                'Least-squares regression implemented from scratch',
                'Points entered by hand or uploaded as .csv or .txt',
                'Selectable polynomial degree',
                'R² reported alongside the fitted equation',
                'Evaluates the fitted curve at an arbitrary x'
            ],
            spec: [
                ['Language', 'JavaScript'],
                ['Plotting', 'Chart.js'],
                ['Method', 'Least-squares regression'],
                ['Input', 'Manual entry or .csv / .txt']
            ],
            links: [
                { label: 'Open the live demo', href: 'https://chrislaw123.github.io/curve-fitter-webapp/' },
                { label: 'View the source', href: 'https://github.com/ChrisLaw123/curve-fitter-webapp' }
            ]
        },
        {
            title: 'NEAT Flappy Bird AI',
            fact: 'Python, NEAT',
            note: 'Neural networks that evolve their own topology until they can play.',
            deck: 'An implementation of NeuroEvolution of Augmenting Topologies that learns to play Flappy Bird with no hand-written strategy.',
            images: [
                {
                    src: 'images/FlappyBird.png',
                    caption: 'Generation 2 mid-run: six birds from the population still alive at a score of 3. The overlay tracks generation, survivors, and score as training continues.'
                }
            ],
            body: [
                'Each bird is driven by its own small network reading the distance to the next pipe gap. Birds that survive longer score higher fitness and pass their topology on, so the population evolves over generations without anyone telling it what a good move looks like.',
                'The whole run renders while it trains, which makes the failure modes obvious. You can watch an entire generation commit to the same bad habit and die together.'
            ],
            notes: [
                'Uses NEAT-Python to evolve network topology, not a reimplementation of the algorithm',
                'Fitness scored on survival time and pipes cleared',
                'Whole population trains and renders in real time'
            ],
            spec: [
                ['Language', 'Python'],
                ['Library', 'NEAT-Python'],
                ['Rendering', 'Pygame']
            ],
            links: []
        }
    ],

    about: {
        photo: 'images/me-carcross.jpg',
        photoAlt: 'Chris Law at the Carcross Desert in Yukon, looking out over the lake and mountains',
        place: 'Carcross Desert, Yukon',
        placeCoord: '60.19° N  134.70° W',
        lead: 'I\'m Chris. I grew up in Coquitlam, BC, and I\'m studying computer engineering at Waterloo.',
        body: [
            'I grew up with Lego, got into coding and robotics in high school, and moved across the country to Waterloo, where I\'m starting to find my passion in hardware and software.',
            'The rest of the time I\'m outside, usually with Maverick and Charlie, a black lab and a golden lab who are very good at making sure I don\'t stay in.',
            'I like going places, too. Last August some friends and I drove from BC up to Whitehorse, which is where this photo is from. Before that I went to Dallas to help with animal-behaviour research around the solar eclipse, and I\'ve travelled through Vietnam, Cambodia and Thailand.'
        ]
    },

    record: [
        {
            when: 'Sept 2025 to current',
            what: 'University of Waterloo',
            detail: 'BASc Computer Engineering. 3.84 / 4.00 GPA, President\'s Scholarship of Distinction.'
        },
        {
            when: 'May – Aug 2026',
            what: 'Real Estate Institute of Canada',
            detail: 'Client project through Waterloo\'s WE Accelerate program, working as a UX/UI and SEO analyst. Audited five pages, rebuilt course discovery in Wix Studio for three career-stage audiences, and presented the recommendations to REIC leadership.'
        },
        {
            when: 'Nov 2024',
            what: 'After-school coding program',
            detail: 'Co-facilitated weekly Scratch sessions for 30 students, introducing programming fundamentals.'
        },
        {
            when: 'Apr 2024',
            what: 'Payment Source',
            detail: 'Web development co-op. Built responsive PaySimply interfaces from Figma mockups, adapted layouts across screen sizes, and integrated a help-centre widget. Shipped through Git branches and pull requests.'
        },
        {
            when: 'Aug 2022 – Aug 2025',
            what: 'Real Canadian Superstore',
            detail: 'Part-time produce clerk. Coordinated incoming pallets with receiving and onboarded new staff alongside full-time study.'
        }
    ],

    skills: [
        ['Hardware', 'Altium Designer, schematic capture, multilayer PCB layout, design for manufacture, Verilog, Quartus'],
        ['Embedded', 'C, C++, Arduino, UART and USB interfacing'],
        ['Languages', 'C#, Java, Python, JavaScript, SQL'],
        ['Backend', 'PostgreSQL, Crow, REST APIs'],
        ['Frontend', 'React, HTML and CSS, Chart.js'],
        ['Workflow', 'Git, Figma, Wix Studio, JLCPCB fabrication and assembly']
    ]
};

/* ---------- page furniture -------------------------------------- */

/* The board leads the page on its own; the rest share the grid below it. */
const FLAGSHIP = 0;

/* The Altium rule categories that had to close before the board could be
   released. Every one of them reads zero, which is the whole point. */

const stats = [
    ['Studying', 'Computer engineering at Waterloo, 3.84 GPA'],
    ['Right now', 'First boards built and shipping from JLCPCB'],
    ['Looking for', 'Jan to Apr 2027 co-op in software or hardware, and open to other opportunities']
];

/* Four decisions, each with the reason attached. The parameters are all in
   the specification table inside the project sheet; nobody is persuaded by
   a trace impedance on its own. */
/* The overview first. The GPIO reservations, antenna placement and via
   changes need context to land, so they live in the detailed write-up
   rather than here. */
const boardPanels = [
    ['Microcontroller', 'ESP32-S3-WROOM-1 (N8R8), with a dual-core processor, Wi-Fi, Bluetooth LE, 8 MB flash and 8 MB PSRAM.'],
    ['USB-C and power', 'One USB-C port connects through an FT231XQ USB-to-UART bridge; the other provides native USB. Jumpers select the USB power input and either regulated or external 3.3 V power.'],
    ['Design rules', 'Configured Altium' + String.fromCharCode(8217) + 's clearance, via and solder-mask rules around JLCPCB' + String.fromCharCode(8217) + 's manufacturing limits. Final design-rule check: 0 violations.'],
    ['Manufacturing outputs', 'Generated Gerber and NC drill files for fabrication, plus the bill of materials and pick-and-place files for assembly. Submitted the manufacturing package to JLCPCB.']
];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const overlay = document.getElementById('recordOverlay');
const recordContent = document.getElementById('recordContent');

const shots = { index: 0, count: 0, images: [] };
let historyOpen = false;
let lastFocused = null;



/* ---------- sections -------------------------------------------- */

function paintStrip() {
    document.getElementById('strip').innerHTML = stats
        .map(([key, value]) => `
            <div class="stat">
                <span class="stat-key">${key}</span>
                <span class="stat-val">${value}</span>
            </div>`)
        .join('');
}

/* Stands in for the Altium render until it lands, and still reads as a
   board rather than as a missing image. */
function platePlaceholder() {
    return `
        <svg class="plate-art" viewBox="0 0 340 150" role="img"
             aria-label="Outline of the ESP32-S3 board: module and antenna at one end, two USB-C connectors at the other">
            <!-- Substrate, drawn at the real 68.58 x 27.94 mm proportion. -->
            <rect class="sub" x="12" y="12" width="316" height="126" rx="5"/>

            <!-- Header rows along both long edges. -->
            <g class="pad">
                ${Array.from({ length: 9 }, (_, i) => `<rect x="${74 + i * 22}" y="16" width="9" height="9" rx="1"/>`).join('')}
                ${Array.from({ length: 9 }, (_, i) => `<rect x="${74 + i * 22}" y="125" width="9" height="9" rx="1"/>`).join('')}
            </g>

            <g class="t">
                <path d="M141 52 H186 L206 42 H268"/>
                <path d="M141 64 H196 L214 74 H268"/>
                <path d="M141 76 H180 L198 94 H262"/>
                <path d="M141 88 H172 L188 104 H236 L248 116"/>
                <path d="M96 30 V44 H128"/>
                <path d="M140 30 V40"/>
                <path d="M184 30 V52"/>
                <path d="M228 30 V46 H252"/>
                <path d="M96 120 V108 H132"/>
                <path d="M140 120 V112"/>
                <path d="M206 120 V110 H240"/>
            </g>

            <!-- Module. The antenna sits past the board edge so no copper
                 runs underneath the radiator. -->
            <rect class="m" x="22" y="34" width="118" height="82" rx="2"/>
            <g class="ant">
                <path d="M30 46 h8 v6 h-8 v6 h8 v6 h-8 v6 h8 v6 h-8 v6 h8"/>
            </g>
            <g class="via">
                ${[0, 1, 2].map((r) => [0, 1, 2].map((c) =>
                    `<circle cx="${86 + c * 13}" cy="${64 + r * 13}" r="2.6"/>`).join('')).join('')}
            </g>

            <!-- Two USB-C ports: one through the bridge, one native. -->
            <g class="conn">
                <rect x="266" y="36" width="34" height="22" rx="3"/>
                <rect x="266" y="92" width="34" height="22" rx="3"/>
            </g>

            <text class="lbl" x="26" y="130">U1</text>
            <text class="lbl" x="268" y="70">J1</text>
            <text class="lbl" x="268" y="124">J2</text>
        </svg>`;
}

/* A folder of every board view, sitting where the single render used to.
   The cards behind the front one stay visible so it reads as a stack with
   more in it, and the whole set is flippable in place - you no longer have
   to open the project sheet to see the layout or the schematic. */
function folderMarkup(project) {
    const images = project.images;
    if (!images.length) {
        return `<div class="board-plate reveal">${platePlaceholder()}
                    <span class="plate-mark">Waiting on the assembled boards</span>
                </div>`;
    }

    const cards = images
        .map((image, i) => `
            <figure class="folder-card" data-card="${i}">
                <img src="${image.src}" alt="${project.title}, ${(image.label || '').toLowerCase()}" loading="lazy">
            </figure>`)
        .join('');

    const tabs = images
        .map((image, i) => `
            <button class="folder-tab${i === 0 ? ' is-on' : ''}" type="button" role="tab"
                    data-folder="${i}" aria-selected="${i === 0}"
                    style="--tint: ${image.tint || 'var(--accent)'}">${image.label || 'View ' + (i + 1)}</button>`)
        .join('');

    return `
        <div class="folder reveal" id="folder">
            <div class="folder-tabs" role="tablist" aria-label="Board views">${tabs}</div>
            <div class="folder-stack" id="folderStack" title="Click to enlarge">${cards}</div>
            <p class="folder-cap" id="folderCap">${images[0].caption || ''}</p>
        </div>`;
}

const folder = { index: 0, count: 0, images: [] };

function paintFolder() {
    if (!folder.count) return;

    document.querySelectorAll('.folder-card').forEach((card, i) => {
        const depth = (i - folder.index + folder.count) % folder.count;
        card.style.setProperty('--depth', depth);
        card.classList.toggle('is-front', depth === 0);
        card.classList.toggle('is-deep', depth > 2);
        card.setAttribute('aria-hidden', depth === 0 ? 'false' : 'true');
    });

    document.querySelectorAll('.folder-tab').forEach((tab, i) => {
        const on = i === folder.index;
        tab.classList.toggle('is-on', on);
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    const cap = document.getElementById('folderCap');
    if (cap) cap.textContent = folder.images[folder.index].caption || '';


}

function bindFolder() {
    const root = document.getElementById('folder');
    if (!root) return;

    folder.images = site.projects[FLAGSHIP].images;
    folder.count = folder.images.length;
    folder.index = 0;

    /* Clicking the stack itself deals the next card to the front. */
    const stack = document.getElementById('folderStack');
    stack.addEventListener('click', () => openZoom(folder.index));

    root.querySelector('.folder-tabs').addEventListener('click', (event) => {
        const tab = event.target.closest('.folder-tab');
        if (!tab) return;
        const target = Number(tab.dataset.folder);
        if (Number.isInteger(target)) {
            folder.index = target;
            paintFolder();
        }
    });

    paintFolder();
}

/* The board is the lead project, not a separate department: this returns
   markup that paintWork() drops in above the other five. */
function flagshipMarkup() {
    const project = site.projects[FLAGSHIP];
    const cover = project.images[0];

    const plate = cover
        ? `<img src="${cover.src}" alt="${project.title}">`
        : platePlaceholder();

    return `
            <div class="board-grid" id="board">
                <div class="board-copy">
                    <h3>${project.title}</h3>
                    <p>I designed a four-layer ESP32-S3 development board in Altium and prepared the manufacturing files for fabrication and assembly through JLCPCB.</p>

                    <dl class="board-panels">
                        ${boardPanels
                            .map(([key, reason]) => `
                            <div class="panel">
                                <dt>${key}</dt>
                                <dd>${reason}</dd>
                            </div>`)
                            .join('')}
                    </dl>

                    <div class="board-actions">
                        <button class="btn btn-accent" type="button" data-project="${FLAGSHIP}">How I built it</button>
                    </div>
                </div>

                ${folderMarkup(project)}
            </div>`;
}


function card(project, index) {
    const cover = project.images[0];

    /* A project without a screenshot shows its specification instead. A
       hole in the grid is worse than plain data. */
    const shot = cover
        ? `<img src="${cover.src}" alt="${project.title}" loading="lazy">`
        : `<span class="shot-spec">${project.spec
              .slice(0, 4)
              .map(([key, value]) => `<span class="sr"><span>${key}</span><span>${value}</span></span>`)
              .join('')}</span>`;

    return `
        <button class="card reveal" type="button"
                data-project="${index}" style="--d:${(index - 1) * 55}ms">
            <span class="card-shot">${shot}</span>
            <span class="card-body">
                <span class="card-title">${project.title}</span>
                <span class="card-note">${project.note}</span>
                <span class="card-foot">
                    <span class="card-stack">${project.fact}</span>
                    <span class="card-open">View project</span>
                </span>
            </span>
        </button>`;
}

function paintWork() {
    const rest = site.projects
        .map((project, index) => (index === FLAGSHIP ? '' : card(project, index)))
        .join('');

    document.getElementById('work').innerHTML = `
        <div class="wrap">
            <div class="sec-head">
                <h2>Projects</h2>
            </div>

            ${flagshipMarkup()}

            <div class="sec-head sec-head-sub">
                <h2>Other projects</h2>
                <p>Firmware, backends and small tools. Most of them started as something I didn&rsquo;t know how to finish.</p>
            </div>
            <div class="cards">${rest}</div>
        </div>`;
}

/* The photo runs the full width behind the copy. Its subject sits in the
   right third, so the text column takes the left and nothing important is
   covered. The scrim is a legibility floor, not decoration - without it
   body text would sit on sky. */
function paintAbout() {
    const about = site.about;

    document.getElementById('about').innerHTML = `
        <img class="about-photo" src="${about.photo}" alt="${about.photoAlt}" loading="lazy">
        <div class="about-scrim" aria-hidden="true"></div>
        <figcaption class="geo">
            <svg class="geo-pin" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 22s7-7.1 7-12a7 7 0 1 0-14 0c0 4.9 7 12 7 12z"
                      fill="none" stroke="currentColor" stroke-width="1.7"
                      stroke-linejoin="round"/>
                <circle cx="12" cy="10" r="2.4" fill="currentColor"/>
            </svg>
            <span class="geo-text">
                <span class="geo-name">${about.place}</span>
                <span class="geo-coord">${about.placeCoord}</span>
            </span>
        </figcaption>
        <div class="wrap about-inner">
            <div class="sec-head"><h2>About</h2></div>
            <div class="prose">
                <p class="lead">${about.lead}</p>
                ${about.body.map((paragraph) => `<p>${paragraph}</p>`).join('')}
            </div>
        </div>`;
}

function paintRecord() {
    document.getElementById('record').innerHTML = `
        <div class="wrap">
            <div class="sec-head"><h2>Education and experience</h2></div>
            <table class="rows">
                <tbody>
                    ${site.record
                        .map((item) => `
                        <tr>
                            <th scope="row">${item.when}</th>
                            <td>
                                <div class="row-title">${item.what}</div>
                                <div class="row-detail">${item.detail}</div>
                            </td>
                        </tr>`)
                        .join('')}
                </tbody>
            </table>

            <div class="sec-head" style="margin-top:clamp(40px,6vw,72px)"><h2>Tools and languages</h2></div>
            <table class="rows">
                <tbody>
                    ${site.skills
                        .map(([group, items]) => `
                        <tr>
                            <th scope="row">${group}</th>
                            <td class="row-list">${items}</td>
                        </tr>`)
                        .join('')}
                </tbody>
            </table>
        </div>`;
}

/* ---------- project sheet --------------------------------------- */

function shotsMarkup(images, title) {
    if (!images.length) return '';

    /* alt names the view; the caption underneath carries the explanation.
       Repeating a full caption into alt makes a screen reader read the same
       sentence twice. */
    const slides = images
        .map((image) => {
            const alt = image.label ? `${title}, ${image.label.toLowerCase()}` : title;
            return `<figure class="shot-slide"><img src="${image.src}" alt="${alt}"></figure>`;
        })
        .join('');

    /* Floating arrows over the image were easy to miss and said nothing
       about what you would get. A named tab per view shows every option
       at once, so picking one is a choice rather than a discovery. */
    const tabs = images.length > 1
        ? `<div class="shot-tabs" role="tablist" aria-label="Views">` +
          images.map((image, i) => `
                <button class="shot-tab${i === 0 ? ' is-on' : ''}" type="button"
                        role="tab" aria-selected="${i === 0}" data-shot="${i}">
                    ${image.label || 'View ' + (i + 1)}
                </button>`).join('') +
          `</div>`
        : '';

    return `
        <div class="shots">
            <div class="shot-frame" id="shotFrame">
                <div class="shot-track" id="shotTrack">${slides}</div>
            </div>
            ${tabs}
            <div class="shot-meta">
                <p class="shot-caption" id="shotCaption">${images[0].caption || ''}</p>
            </div>
        </div>`;
}

function openProject(index) {
    const project = site.projects[index];
    if (!project) return;

    lastFocused = document.activeElement;
    shots.images = project.images;
    shots.count = project.images.length;
    shots.index = 0;

    const links = project.links.length
        ? `<div class="links">${project.links
              .map((link) => `<a class="btn" href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`)
              .join('')}</div>`
        : '<p class="no-link">No public link for this one yet</p>';

    recordContent.innerHTML = `
        <header class="sheet-head">
            <div class="figref-row">
                <span class="hero-fig" style="display:inline-flex">
                    <span class="figref">Project</span>
                    <span class="figref-name">${project.fact}</span>
                </span>
            </div>
            <h2 id="recordTitle">${project.title}</h2>
            <p class="sheet-deck">${project.deck}</p>
        </header>

        ${shotsMarkup(project.images, project.title)}

        <div class="sheet-body">
            <div>
                <div class="sheet-prose">
                    ${project.body.map((paragraph) => `<p>${paragraph}</p>`).join('')}
                </div>
                <div class="notes">
                    <h3>Design notes</h3>
                    <ul>${project.notes.map((note) => `<li>${note}</li>`).join('')}</ul>
                </div>
            </div>
            <aside>
                <div class="spec-panel">
                    <table class="spec">
                        <tbody>
                            ${project.spec.map(([key, value]) => `<tr><th scope="row">${key}</th><td>${value}</td></tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                ${links}
            </aside>
        </div>`;

    overlay.hidden = false;
    overlay.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    setBackgroundInert(true);
    bindShots();
    updateShots();
    document.getElementById('recordClose').focus();

    /* A history entry so Back closes the sheet instead of leaving the site.
       On a phone Back is the gesture people actually reach for. */
    if (!historyOpen) {
        historyOpen = true;
        history.pushState({ sheet: index }, '');
    }
}

/* Everything outside the dialog stops taking focus or pointer events while
   it is open. aria-modal alone does not do this. */
function setBackgroundInert(on) {
    ['.masthead', '#main', '.contact'].forEach((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        if (on) el.setAttribute('inert', '');
        else el.removeAttribute('inert');
    });
}

/* Tab must not walk out of the sheet and into the page behind it. */
function trapTab(event) {
    const sheet = overlay.querySelector('.sheet');
    if (!sheet) return;
    const items = [...sheet.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )].filter((el) => el.offsetParent !== null);
    if (!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];
    const here = document.activeElement;

    if (event.shiftKey && (here === first || !sheet.contains(here))) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && here === last) {
        event.preventDefault();
        first.focus();
    }
}

/* fromPop is true when the browser already moved us back, so we must not
   call history.back() again and skip a second entry. */
function closeProject(fromPop) {
    if (overlay.hidden) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
    setBackgroundInert(false);
    recordContent.innerHTML = '';
    shots.images = [];
    shots.count = 0;
    if (lastFocused) lastFocused.focus();

    if (historyOpen && !fromPop) {
        historyOpen = false;
        history.back();
    } else {
        historyOpen = false;
    }
}

function updateShots() {
    if (!shots.count) return;

    const track = document.getElementById('shotTrack');
    const caption = document.getElementById('shotCaption');

    track.style.transform = `translateX(-${shots.index * 100}%)`;
    caption.textContent = shots.images[shots.index].caption || '';

    document.querySelectorAll('.shot-tab').forEach((tab, i) => {
        const on = i === shots.index;
        tab.classList.toggle('is-on', on);
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
}

function stepShots(delta) {
    if (shots.count < 2) return;
    const target = shots.index + delta;
    if (target < 0 || target > shots.count - 1) return;
    shots.index = target;
    updateShots();
}

function bindShots() {
    const frame = document.getElementById('shotFrame');
    if (!frame) return;

    const tabs = frame.parentElement.querySelector('.shot-tabs');
    if (tabs) {
        tabs.addEventListener('click', (event) => {
            const tab = event.target.closest('.shot-tab');
            if (!tab) return;
            const target = Number(tab.dataset.shot);
            if (Number.isInteger(target) && target !== shots.index) {
                shots.index = target;
                updateShots();
            }
        });
    }

    let startX = null;
    frame.addEventListener('touchstart', (event) => {
        startX = event.changedTouches[0].clientX;
    }, { passive: true });

    frame.addEventListener('touchend', (event) => {
        if (startX === null) return;
        const delta = event.changedTouches[0].clientX - startX;
        if (Math.abs(delta) > 45) stepShots(delta < 0 ? 1 : -1);
        startX = null;
    }, { passive: true });
}

/* ---------- observers ------------------------------------------- */

function watchReveals() {
    const targets = document.querySelectorAll('.reveal');

    if (reduceMotion || !('IntersectionObserver' in window)) {
        targets.forEach((el) => el.classList.add('is-in'));
        return;
    }

    document.documentElement.classList.add('reveals');

    /* Nothing on this page is worth hiding for longer than a moment. If a
       reveal has not been tripped by now, show it anyway. */
    setTimeout(() => targets.forEach((el) => el.classList.add('is-in')), 2200);

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });

    targets.forEach((el) => io.observe(el));
}

/* Marks the nav item for whichever section owns the middle of the screen. */
function watchSections() {
    const links = Array.from(document.querySelectorAll('.nav-link'));
    const sections = links
        .map((link) => document.getElementById(link.dataset.spy))
        .filter(Boolean);

    if (!sections.length || !('IntersectionObserver' in window)) return;

    const seen = new Map();

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => seen.set(entry.target.id, entry.intersectionRatio));

        let best = null;
        let bestRatio = 0;
        seen.forEach((ratio, id) => {
            if (ratio > bestRatio) { bestRatio = ratio; best = id; }
        });

        links.forEach((link) => {
            link.classList.toggle('is-active', bestRatio > 0 && link.dataset.spy === best);
        });
    }, { threshold: [0, 0.15, 0.35, 0.6, 0.85] });

    sections.forEach((section) => io.observe(section));
}

/* ---------- events ---------------------------------------------- */

document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-project]');
    if (trigger) openProject(Number(trigger.dataset.project));
});

document.getElementById('recordClose').addEventListener('click', closeProject);

overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeProject();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !document.getElementById('zoom').hidden) {
        closeZoom();
        return;
    }
    if (overlay.hidden) return;
    if (event.key === 'Escape') closeProject();
    if (event.key === 'Tab') trapTab(event);
    if (event.key === 'ArrowLeft') stepShots(-1);
    if (event.key === 'ArrowRight') stepShots(1);
});

window.addEventListener('popstate', () => closeProject(true));

/* ---------- theme ------------------------------------------------ */

const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

function effectiveTheme() {
    const set = root.getAttribute('data-theme');
    if (set === 'light' || set === 'dark') return set;
    return darkQuery.matches ? 'dark' : 'light';
}

function syncToggleLabel() {
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${next} mode`);
}

themeToggle.addEventListener('click', () => {
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
        localStorage.setItem('theme', next);
    } catch (e) {}
    syncToggleLabel();
});

darkQuery.addEventListener('change', syncToggleLabel);
syncToggleLabel();

/* ---------- hatch parallax --------------------------------------- */

/* The hatched ground plane travels at about a third of the page's speed,
   which puts it on a plane behind the content instead of printed on it.
   Motion is entirely scroll-driven - nothing animates on its own.

   One custom property on :root drives all seven bands, so a frame costs a
   single style write. The rAF gate keeps that to once per painted frame no
   matter how many scroll events fire. */
function watchHatch() {
    if (reduceMotion) return;

    const root = document.documentElement;
    let last = null;
    let queued = false;

    function paint() {
        queued = false;
        const y = Math.round(window.scrollY * -0.34);
        if (y === last) return;
        last = y;
        root.style.setProperty('--hatch-y', y + 'px');
        /* The About band's wave edges slide sideways on the same scroll.
           Slower than the hatch, and wrapped to the 640px tile so the value
           never grows without bound. */
        root.style.setProperty('--wave-x', ((window.scrollY * 0.14) % 640) + 'px');
    }

    window.addEventListener('scroll', () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(paint);
    }, { passive: true });

    paint();
}

/* ---------- enlarge ---------------------------------------------- */

/* The schematic is a full A2 sheet; at folder size it reads as a map, not
   a drawing. Clicking any view opens it as large as the window allows. */
let zoomReturn = null;

function openZoom(index) {
    const image = folder.images[index];
    if (!image) return;

    const box = document.getElementById('zoom');
    const img = document.getElementById('zoomImg');
    const cap = document.getElementById('zoomCap');

    zoomReturn = document.activeElement;
    img.src = image.src;
    img.alt = site.projects[FLAGSHIP].title + ', ' + (image.label || '').toLowerCase();
    cap.textContent = image.caption || '';
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('zoomClose').focus();
}

function closeZoom() {
    const box = document.getElementById('zoom');
    if (box.hidden) return;
    box.hidden = true;
    document.getElementById('zoomImg').src = '';
    if (overlay.hidden) document.body.style.overflow = '';
    if (zoomReturn) zoomReturn.focus();
}

function bindZoom() {
    const box = document.getElementById('zoom');
    if (!box) return;
    document.getElementById('zoomClose').addEventListener('click', closeZoom);
    /* Clicking the backdrop closes; clicking the image itself does not. */
    box.addEventListener('click', (event) => {
        if (event.target === box || event.target.classList.contains('zoom-inner')) closeZoom();
    });
}

/* ---------- deep links ------------------------------------------- */

/* Sections are painted by JS, so by the time #about exists the browser has
   already given up resolving the hash and left the page at the top. Anyone
   pasting a section link into an application would land in the wrong place,
   so the jump is redone once the content is there. */
function restoreHash() {
    const id = location.hash.slice(1);
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    const masthead = document.querySelector('.masthead');
    const offset = masthead ? masthead.getBoundingClientRect().height + 12 : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    const jump = () => window.scrollTo({ top, behavior: 'auto' });
    jump();
    /* Images above the target settle after load and move it, so the jump is
       repeated once everything has a measured height. */
    window.addEventListener('load', () => {
        const settled = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: settled, behavior: 'auto' });
    }, { once: true });
}

/* ---------- boot ------------------------------------------------ */

paintStrip();
paintWork();
bindFolder();
paintAbout();
paintRecord();
watchReveals();
watchSections();
watchHatch();
bindZoom();
restoreHash();
