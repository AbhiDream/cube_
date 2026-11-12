// =====================
// Settings and variables
// =====================

let CUBE_SIZE = 500;            // size of one face in px (becomes smaller on small screens)
let HALF = CUBE_SIZE / 2;

let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let velocity = { x: 0, y: 0 };

let isSnapping = false;         // true while the cube is turning to a face after a navbar click
const targetQuaternion = new THREE.Quaternion();   // the rotation where the cube should stop

let zoom = 0;                   // how much the mouse wheel moved the camera

// Touch variables (see the touch part in setupEvents)
let touchMode = null;           // 'rotate', 'scroll' or null (not decided yet)
let touchStart = { x: 0, y: 0 };
let touchOnScrollableFace = false;

const scene = new THREE.Scene();

// The camera distance is set later in updateCameraDistance()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

const renderer = new THREE.CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('cube-container').appendChild(renderer.domElement);

const cubeGroup = new THREE.Group();
scene.add(cubeGroup);


// =====================
// Navbar (same on every face)
// =====================

// "face" must match the face names in setupCubeFaces()
const navItems = [
    { face: 'home',       label: 'Home' },
    { face: 'education',  label: 'Education' },
    { face: 'skills',     label: 'Skills' },
    { face: 'projects',   label: 'Projects' },
    { face: 'activities', label: 'Activities' },
    { face: 'contact',    label: 'Contact' }
];

// activeFace = the face on which this navbar is shown (its link gets highlighted)
function getNavbarHTML(activeFace) {
    let linksHTML = '';

    navItems.forEach(function(item) {
        const activeClass = (item.face === activeFace) ? ' class="active"' : '';
        linksHTML += '<li><a href="#" data-face="' + item.face + '"' + activeClass + '>' + item.label + '</a></li>';
    });

    return `
    <nav class="navbar">
        <span class="site-name">Abhishek Saini</span>
        <ul class="nav-links">
            ${linksHTML}
        </ul>
    </nav>`;
}


// =====================
// Content of the faces
// =====================

function getHomeHTML() {
    return getNavbarHTML('home') + `
    <div class="hero-section">
        <img
            src="https://github.com/AbhiDream.png"
            alt="Abhishek Saini"
            referrerpolicy="no-referrer"
            onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=Abhishek+Saini&size=180&background=1565C0&color=fff&bold=true'">
        <h1>Abhishek Saini</h1>
        <p>B.Tech IT Student at IIIT Sonepat</p>
        <p>Coding | AI/ML | Video Editing</p>
        <span class="badge">1st Year &middot; 2026 Batch</span>
    </div>
    <div class="section">
        <h2><span class="material-icons">person</span> About Me</h2>
        <p>
            Hello! My name is Abhishek Saini. I am a first semester student of
            Information Technology at IIIT Sonepat. I did my schooling from
            Jawahar Navodaya Vidyalaya, Saharanpur.
        </p>
        <p>
            I like coding and I am learning new things every day.
            I am also interested in AI/ML. Other than coding I like video editing and reading books.
        </p>
    </div>`;
}

function getEducationHTML() {
    return getNavbarHTML('education') + `
    <div class="section">
        <h2><span class="material-icons">school</span> Academic Details</h2>
        <table class="edu-table">
            <tr>
                <th>Class / Course</th>
                <th>School / College</th>
                <th>Year / %</th>
            </tr>
            <tr>
                <td>B.Tech (IT)</td>
                <td>IIIT Sonepat</td>
                <td>2026 - 2030 (Pursuing)</td>
            </tr>
            <tr>
                <td>Class 12th</td>
                <td>JNV Saharanpur</td>
                <td>89%</td>
            </tr>
            <tr>
                <td>Class 10th</td>
                <td>JNV Saharanpur</td>
                <td>94%</td>
            </tr>
        </table>
    </div>`;
}

function getSkillsHTML() {
    return getNavbarHTML('skills') + `
    <div class="section">
        <h2><span class="material-icons">code</span> Skills</h2>

        <h3>Tech Stack</h3>
        <div>
            <span class="skill-tag">HTML</span>
            <span class="skill-tag">CSS</span>
            <span class="skill-tag">JavaScript</span>
            <span class="skill-tag">Node.js</span>
            <span class="skill-tag">Express</span>
            <span class="skill-tag">Python</span>
            <span class="skill-tag">C Programming</span>
        </div>

        <h3>Currently Learning</h3>
        <div>
            <span class="skill-tag">AI / ML</span>
        </div>

        <h3>Software I Know</h3>
        <div>
            <span class="skill-tag">Adobe Premiere Pro</span>
            <span class="skill-tag">Adobe After Effects</span>
            <span class="skill-tag">CapCut</span>
            <span class="skill-tag">Canva</span>
        </div>
    </div>
    <div class="section">
        <h2><span class="material-icons">favorite</span> Hobbies</h2>
        <h3>Video Editing</h3>
        <p>
            I like editing videos using Adobe Premiere Pro and After Effects.
            I have also done freelance podcast editing.
        </p>
        <h3>Reading Books</h3>
        <p>
            I read novels and self-help books.
            My favourite novel is <b>The Alchemist</b>.
        </p>
    </div>`;
}

function getProjectsHTML() {
    return getNavbarHTML('projects') + `
    <div class="section">
        <h2><span class="material-icons">folder</span> My Projects</h2>

        <div class="card">
            <h3>1. Twitter Hashtag Automation (Python)</h3>
            <p>My first big practical project in Python. Made it in my final year of school.</p>
            <h4>What it does:</h4>
            <ul>
                <li>Automated login using browser cookie data</li>
                <li>Searches a hashtag and scrolls through posts automatically</li>
            </ul>
            <h4>What I learned:</h4>
            <ul>
                <li>Web scraping and browser automation</li>
                <li>Working with cookies</li>
                <li>Debugging real-world coding problems</li>
            </ul>
            <p style="margin-top: 6px;">
                <a href="https://www.linkedin.com/posts/abhishek-saini-385952241_economy-python-coding-activity-7267218806014373888-WBZk" target="_blank">
                    Watch project video on LinkedIn &rarr;
                </a>
            </p>
        </div>

        <div class="card">
            <h3>2. Melodify - Music Player Web App</h3>
            <p>Open source music player like a Spotify alternative. Plays from YouTube without ads.</p>
            <h4>Features:</h4>
            <ul>
                <li>Smart Autoplay Queue</li>
                <li>Chunk Streaming - audio starts fast</li>
                <li>Fast seeking with caching</li>
                <li>Trending section and search</li>
            </ul>
            <h4>Tech used:</h4>
            <ul>
                <li>JavaScript (Web Audio API)</li>
                <li>Node.js + Express</li>
                <li>yt-dlp + FFmpeg</li>
            </ul>
            <p style="margin-top: 6px;">
                <a href="https://github.com/AbhiDream/melodify-app" target="_blank">View on GitHub &rarr;</a>
            </p>
        </div>
    </div>`;
}

function getContactHTML() {
    return getNavbarHTML('contact') + `
    <div class="section">
        <h2><span class="material-icons">email</span> Contact Me</h2>

        <div class="contact-row">
            <span class="material-icons">email</span>
            <a href="mailto:abhidream04@gmail.com">abhidream04@gmail.com</a>
        </div>
        <div class="contact-row">
            <span class="material-icons">code</span>
            <a href="https://github.com/AbhiDream" target="_blank">github.com/AbhiDream</a>
        </div>
        <div class="contact-row">
            <span class="material-icons">work</span>
            <a href="https://in.linkedin.com/in/abhishek-saini-385952241" target="_blank">Abhishek Saini - LinkedIn</a>
        </div>
    </div>
    <div class="section">
        <h2><span class="material-icons">info</span> Quick Info</h2>
        <p><b>Name:</b> Abhishek Saini</p>
        <p><b>College:</b> IIIT Sonepat</p>
        <p><b>Branch:</b> Information Technology</p>
        <p><b>Year:</b> 1st Year (2026 - 2030)</p>
        <p><b>School:</b> Jawahar Navodaya Vidyalaya, Saharanpur</p>
        <p><b>Interests:</b> Coding, AI/ML, Video Editing</p>
        <p><b>Favourite Book:</b> The Alchemist</p>
    </div>`;
}

function getActivitiesHTML() {
    return getNavbarHTML('activities') + `
    <div class="section">
        <h2><span class="material-icons">groups</span> Societies and Activities</h2>
        <p>I am a core member of two societies in my college.</p>

        <div class="card">
            <h3>Technical Society - IIIT Sonepat</h3>
            <p><b>Role:</b> Technical Team Core Member</p>
            <p>Actively contribute to organizing technical events, hackathons, and coding competitions.
               Volunteered in Codathon and Hackathon organized by the Technical Society.</p>
        </div>

        <div class="card">
            <h3>Impact Club - IIIT Sonepat</h3>
            <p><b>Role:</b> Social Media Manager</p>
            <p>Creating and editing engaging content. Managing the club's online presence
               to boost reach and audience engagement.</p>
        </div>

        <div class="card">
            <h3>Freelance Video Editing</h3>
            <p>In class 11th I did freelancing in video editing.
               I used to edit podcasts for a client from Mumbai.</p>
        </div>

        <div class="card">
            <h3>Team Lead | Smart India Hackathon 2026</h3>
            <p>Served as Team Lead at SIH 2026 organized by the Government of India.
               Led the team through building a functional prototype and presentation.
               We won the hackathon.</p>
        </div>
    </div>`;
}


// =====================
// Building the Cube
// =====================

// Every face is saved here (name, html element, 3D object, direction, rotation)
const cubeFaces = [];

function createFaceElement(htmlContent) {
    const div = document.createElement('div');
    div.className = 'cube-face';
    div.innerHTML = htmlContent;
    return div;
}

function setupCubeFaces() {
    // direction = on which side of the cube the face sits (x, y, z)
    // rotation  = turns the face so that it looks outside
    const faceData = [
        { name: 'home',       html: getHomeHTML(),       direction: [0, 0, 1],  rotation: [0, 0, 0] },
        { name: 'contact',    html: getContactHTML(),    direction: [0, 0, -1], rotation: [0, Math.PI, 0] },
        { name: 'education',  html: getEducationHTML(),  direction: [1, 0, 0],  rotation: [0, Math.PI / 2, 0] },
        { name: 'skills',     html: getSkillsHTML(),     direction: [-1, 0, 0], rotation: [0, -Math.PI / 2, 0] },
        { name: 'projects',   html: getProjectsHTML(),   direction: [0, 1, 0],  rotation: [-Math.PI / 2, 0, 0] },
        { name: 'activities', html: getActivitiesHTML(), direction: [0, -1, 0], rotation: [Math.PI / 2, 0, 0] }
    ];

    faceData.forEach(function(data) {
        const element = createFaceElement(data.html);
        const cssObject = new THREE.CSS3DObject(element);
        cssObject.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2]);
        cubeGroup.add(cssObject);

        cubeFaces.push({
            name: data.name,
            element: element,
            cssObject: cssObject,
            direction: data.direction,
            rotation: data.rotation
        });
    });

    updateCubeSize();
}

// Sets the size and the position of every face.
// Called once at the start and again whenever the window is resized.
function updateCubeSize() {
    // 500px on big screens, smaller on phones so that the cube fits the screen
    CUBE_SIZE = Math.min(500, window.innerWidth - 40, window.innerHeight - 100);
    CUBE_SIZE = Math.max(CUBE_SIZE, 260);   // but not too small
    HALF = CUBE_SIZE / 2;

    cubeFaces.forEach(function(face) {
        face.element.style.width = CUBE_SIZE + 'px';
        face.element.style.height = CUBE_SIZE + 'px';
        face.cssObject.position.set(
            face.direction[0] * HALF,
            face.direction[1] * HALF,
            face.direction[2] * HALF
        );
    });

    updateCameraDistance();
}

// If the camera is at this distance, the front face is shown in its real size
// (so 11px text really looks like 11px, on every screen).
// The camera angle is 45 degree, so half of it is 22.5 degree.
function updateCameraDistance() {
    const halfAngle = 22.5 * Math.PI / 180;
    const idealDistance = (window.innerHeight / 2) / Math.tan(halfAngle);
    camera.position.z = idealDistance + HALF + zoom;
}


// =====================
// Rotating the cube
// =====================

const xAxis = new THREE.Vector3(1, 0, 0);
const yAxis = new THREE.Vector3(0, 1, 0);

// Rotates around the screen's axes, so dragging always feels natural
// (even when the cube is upside down)
function rotateCube(aroundY, aroundX) {
    cubeGroup.rotateOnWorldAxis(yAxis, aroundY);
    cubeGroup.rotateOnWorldAxis(xAxis, aroundX);
}

// Turns the cube so that the given face comes in front (used by the navbar)
function goToFace(faceName) {
    const face = cubeFaces.find(function(f) {
        return f.name === faceName;
    });
    if (!face) return;

    // To bring a face in front, the cube must turn opposite to that face's rotation
    const euler = new THREE.Euler(-face.rotation[0], -face.rotation[1], -face.rotation[2]);
    targetQuaternion.setFromEuler(euler);

    velocity = { x: 0, y: 0 };
    isSnapping = true;
}


// =====================
// Mouse and touch events
// =====================

const interactiveTags = ['INPUT', 'TEXTAREA', 'BUTTON', 'A', 'SELECT', 'LABEL'];

function startDrag(x, y) {
    isDragging = true;
    isSnapping = false;     // stop the navbar animation if it is running
    prevMouse = { x: x, y: y };
    velocity = { x: 0, y: 0 };
    document.body.classList.add('dragging');
}

function onDragStart(x, y, target) {
    if (interactiveTags.includes(target.tagName) || (target.closest && target.closest('a, button'))) {
        return;
    }
    startDrag(x, y);
}

function onDragMove(x, y) {
    if (!isDragging) return;
    const deltaX = x - prevMouse.x;
    const deltaY = y - prevMouse.y;
    velocity.y = deltaX * 0.006;
    velocity.x = deltaY * 0.006;
    rotateCube(velocity.y, velocity.x);
    prevMouse = { x: x, y: y };
}

function onDragEnd() {
    isDragging = false;
    document.body.classList.remove('dragging');
}

function setupEvents() {
    // ----- Mouse -----
    window.addEventListener('mousedown', function(e) {
        onDragStart(e.clientX, e.clientY, e.target);
    });

    window.addEventListener('mousemove', function(e) {
        onDragMove(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', onDragEnd);

    // ----- Touch -----
    // On a phone one finger can do two things: scroll the text inside a face,
    // or rotate the cube. So we wait for the first small movement and decide:
    //   - up/down swipe on a face that has more text  -> scroll the face
    //   - anything else (side swipe, or outside faces) -> rotate the cube
    window.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        const face = e.target.closest('.cube-face');

        touchStart = { x: touch.clientX, y: touch.clientY };
        touchOnScrollableFace = (face !== null) && (face.scrollHeight > face.clientHeight);
        touchMode = null;
    }, { passive: true });

    window.addEventListener('touchmove', function(e) {
        const touch = e.touches[0];

        if (touchMode === null) {
            const moveX = Math.abs(touch.clientX - touchStart.x);
            const moveY = Math.abs(touch.clientY - touchStart.y);

            if (moveX < 6 && moveY < 6) return;   // moved very little, decide later

            if (touchOnScrollableFace && moveY > moveX) {
                touchMode = 'scroll';
            } else {
                touchMode = 'rotate';
                startDrag(touchStart.x, touchStart.y);
            }
        }

        if (touchMode === 'rotate') {
            e.preventDefault();   // stops the page from scrolling while the cube rotates
            onDragMove(touch.clientX, touch.clientY);
        }
        // in 'scroll' mode we do nothing, the browser scrolls the face by itself
    }, { passive: false });

    window.addEventListener('touchend', function() {
        onDragEnd();
        touchMode = null;
    });

    window.addEventListener('touchcancel', function() {
        onDragEnd();
        touchMode = null;
    });

    // ----- Navbar links -----
    // One listener for all links, so it also works for links inside every face
    document.addEventListener('click', function(e) {
        const link = e.target.closest('[data-face]');
        if (link) {
            e.preventDefault();
            goToFace(link.dataset.face);
        }
    });

    // ----- Mouse wheel (zoom) -----
    window.addEventListener('wheel', function(e) {
        if (e.target.closest && e.target.closest('.cube-face')) return;
        zoom += e.deltaY * 1.2;
        zoom = Math.max(-300, Math.min(1000, zoom));
        updateCameraDistance();
    }, { passive: true });

    // ----- Window resize -----
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        updateCubeSize();
    });
}


// =====================
// Animation Loop
// =====================

function animate() {
    requestAnimationFrame(animate);

    if (isSnapping) {
        // slerp = move a little bit from the current rotation towards the target rotation
        cubeGroup.quaternion.slerp(targetQuaternion, 0.12);

        // close enough, so stop and fix it exactly on the target
        if (cubeGroup.quaternion.angleTo(targetQuaternion) < 0.002) {
            cubeGroup.quaternion.copy(targetQuaternion);
            isSnapping = false;
        }
    } else if (!isDragging) {
        velocity.x *= 0.88;
        velocity.y *= 0.88;

        if (Math.abs(velocity.x) > 0.0001 || Math.abs(velocity.y) > 0.0001) {
            rotateCube(velocity.y, velocity.x);
        }
    }

    renderer.render(scene, camera);
}

setupCubeFaces();
setupEvents();
animate();
