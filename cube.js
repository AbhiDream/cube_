const CUBE_SIZE = 500;
const HALF = CUBE_SIZE / 2;

let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let velocity = { x: 0, y: 0 };

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1200;

const renderer = new THREE.CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('cube-container').appendChild(renderer.domElement);

const cubeGroup = new THREE.Group();
scene.add(cubeGroup);

const navbarHTML = `
    <div class="navbar">
        <span class="site-name">Abhishek Saini</span>
        <ul class="nav-links">
            <li><a href="#">About</a></li>
            <li><a href="#">Skills</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </div>`;

function getHomeHTML() {
    return navbarHTML + `
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
    return navbarHTML + `
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
    </div>
    <div class="section">
        <h2><span class="material-icons">groups</span> Societies &amp; Activities</h2>
        <div class="card">
            <h3>Technical Society - IIIT Sonepat</h3>
            <p><b>Role:</b> Technical Team Core Member</p>
            <p>Organizing technical events, hackathons, and coding competitions.
               Volunteered in Codathon and Hackathon.</p>
        </div>
        <div class="card">
            <h3>Impact Club - IIIT Sonepat</h3>
            <p><b>Role:</b> Social Media Manager</p>
            <p>Creating content and managing club's social media presence.</p>
        </div>
        <div class="card">
            <h3>Team Lead | Smart India Hackathon 2026</h3>
            <p>Led a team at SIH 2026 (Govt. of India). Built a working prototype and won the hackathon.</p>
        </div>
    </div>`;
}

function getSkillsHTML() {
    return navbarHTML + `
    <div class="section">
        <h2><span class="material-icons">code</span> Skills</h2>

        <h3>Tech Stack</h3>
        <div>
            <span class="skill-tag">HTML</span>
            <span class="skill-tag">CSS</span>
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
    return navbarHTML + `
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

        <div class="card">
            <h3>3. Freelance Video Editing</h3>
            <p>In class 11th I did freelancing - edited podcasts for a client from Mumbai.</p>
        </div>
    </div>`;
}

function getContactHTML() {
    return navbarHTML + `
    <div class="section">
        <h2><span class="material-icons">email</span> Contact Me</h2>

        <div class="contact-row">
            <span class="material-icons">phone</span>
            <span>+91 6396612008</span>
        </div>
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
    return navbarHTML + `
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

function createFaceElement(htmlContent) {
    const div = document.createElement('div');
    div.className = 'cube-face';
    div.innerHTML = htmlContent;
    return div;
}

function setupCubeFaces() {
    const faces = [
        { html: getHomeHTML(),       position: [0, 0, HALF],  rotation: [0, 0, 0] },
        { html: getContactHTML(),    position: [0, 0, -HALF], rotation: [0, Math.PI, 0] },
        { html: getEducationHTML(),  position: [HALF, 0, 0],  rotation: [0, Math.PI / 2, 0] },
        { html: getSkillsHTML(),     position: [-HALF, 0, 0], rotation: [0, -Math.PI / 2, 0] },
        { html: getProjectsHTML(),   position: [0, HALF, 0],  rotation: [-Math.PI / 2, 0, 0] },
        { html: getActivitiesHTML(), position: [0, -HALF, 0], rotation: [Math.PI / 2, 0, 0] }
    ];

    faces.forEach(function(face) {
        const element = createFaceElement(face.html);
        const cssObject = new THREE.CSS3DObject(element);
        cssObject.position.set(face.position[0], face.position[1], face.position[2]);
        cssObject.rotation.set(face.rotation[0], face.rotation[1], face.rotation[2]);
        cubeGroup.add(cssObject);
    });
}

const interactiveTags = ['INPUT', 'TEXTAREA', 'BUTTON', 'A', 'SELECT', 'LABEL'];

function onDragStart(x, y, target) {
    if (interactiveTags.includes(target.tagName) || (target.closest && target.closest('a, button'))) {
        return;
    }
    isDragging = true;
    prevMouse = { x: x, y: y };
    velocity = { x: 0, y: 0 };
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
}

function setupEvents() {
    window.addEventListener('mousedown', function(e) {
        onDragStart(e.clientX, e.clientY, e.target);
    });

    window.addEventListener('mousemove', function(e) {
        onDragMove(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', onDragEnd);

    window.addEventListener('touchstart', function(e) {
        onDragStart(e.touches[0].clientX, e.touches[0].clientY, e.target);
    }, { passive: true });

    window.addEventListener('touchmove', function(e) {
        e.preventDefault();
        onDragMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    window.addEventListener('touchend', onDragEnd);

    window.addEventListener('wheel', function(e) {
        if (e.target.closest && e.target.closest('.cube-face')) return;
        camera.position.z += e.deltaY * 1.2;
        camera.position.z = Math.max(600, Math.min(2500, camera.position.z));
    }, { passive: true });

    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}


// =====================
// Animation Loop
// =====================

function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
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
