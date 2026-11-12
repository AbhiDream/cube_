// =====================
// Settings and variables
// =====================

let CUBE_SIZE = 500;            // size of one face in px (becomes smaller on small screens)
let HALF = CUBE_SIZE / 2;

let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let velocity = { x: 0, y: 0 };

let isSnapping = false;         // true while the cube is turning to a face after a navbar click
let targetRotation = { x: 0, y: 0 };   // the rotation where the cube should stop

let zoom = 0;                   // how much the mouse wheel moved the camera
let touchedFace = null;         // the face under the finger (null = finger is on the dark background)

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
        const activeClass = (item.face === activeFace) ? 'active' : '';
        // onclick turns the cube to that face, "return false" stops the page from jumping to the top
        linksHTML += `<li><a href="#" class="${activeClass}" onclick="goToFace('${item.face}'); return false;">${item.label}</a></li>`;
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

// The camera goes far or near according to the screen height,
// so the front face always looks in its real size (1.2 is a number I found by trying).
function updateCameraDistance() {
    camera.position.z = window.innerHeight * 1.2 + HALF + zoom;
}


// =====================
// Turning the cube to a face (navbar)
// =====================

function goToFace(faceName) {
    const face = cubeFaces.find(function(f) {
        return f.name === faceName;
    });
    if (!face) return;

    // To bring a face in front, the cube must turn opposite to the rotation of that face
    targetRotation.x = -face.rotation[0];
    targetRotation.y = -face.rotation[1];

    velocity = { x: 0, y: 0 };
    isSnapping = true;
}


// =====================
// Mouse and touch events
// =====================

const interactiveTags = ['INPUT', 'TEXTAREA', 'BUTTON', 'A', 'SELECT', 'LABEL'];

function onDragStart(x, y, target) {
    if (interactiveTags.includes(target.tagName) || (target.closest && target.closest('a, button'))) {
        return;
    }
    isDragging = true;
    isSnapping = false;     // stop the navbar animation if it is running
    prevMouse = { x: x, y: y };
    velocity = { x: 0, y: 0 };
    document.body.classList.add('dragging');
}

function onDragMove(x, y) {
    if (!isDragging) return;
    const deltaX = x - prevMouse.x;
    const deltaY = y - prevMouse.y;
    velocity.y = deltaX * 0.006;
    velocity.x = deltaY * 0.006;
    cubeGroup.rotation.y += velocity.y;
    cubeGroup.rotation.x += velocity.x;
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

    // ----- Touch (phone) -----
    // finger on a face            -> scroll the text of that face
    // finger on the dark background -> rotate the cube
    // (to change the face on a phone, use the navbar)
    window.addEventListener('touchstart', function(e) {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;

        touchedFace = e.target.closest('.cube-face');
        prevMouse = { x: x, y: y };

        if (touchedFace === null) {
            onDragStart(x, y, e.target);
        }
    }, { passive: true });

    window.addEventListener('touchmove', function(e) {
        e.preventDefault();     // the page itself should not scroll
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;

        if (touchedFace !== null) {
            touchedFace.scrollTop -= (y - prevMouse.y);   // finger goes up -> text goes up
            prevMouse = { x: x, y: y };
        } else {
            onDragMove(x, y);
        }
    }, { passive: false });

    window.addEventListener('touchend', onDragEnd);

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
        // every frame move 10% of the remaining distance (starts fast, ends slowly)
        cubeGroup.rotation.x += (targetRotation.x - cubeGroup.rotation.x) * 0.1;
        cubeGroup.rotation.y += (targetRotation.y - cubeGroup.rotation.y) * 0.1;

        const diffX = Math.abs(targetRotation.x - cubeGroup.rotation.x);
        const diffY = Math.abs(targetRotation.y - cubeGroup.rotation.y);

        // close enough, so stop and fix it exactly on the target
        if (diffX < 0.001 && diffY < 0.001) {
            cubeGroup.rotation.x = targetRotation.x;
            cubeGroup.rotation.y = targetRotation.y;
            isSnapping = false;
        }
    } else if (!isDragging) {
        velocity.x *= 0.88;
        velocity.y *= 0.88;

        if (Math.abs(velocity.x) > 0.0001 || Math.abs(velocity.y) > 0.0001) {
            cubeGroup.rotation.x += velocity.x;
            cubeGroup.rotation.y += velocity.y;
        }
    }

    renderer.render(scene, camera);
}

setupCubeFaces();
setupEvents();
animate();
