var cubeSize = 500;
var half = cubeSize / 2;

var dragging = false;
var lastX = 0;
var lastY = 0;
var speedX = 0;
var speedY = 0;

var snapping = false;
var targetX = 0;
var targetY = 0;

var zoom = 0;
var touchFace = null;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

var renderer = new THREE.CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('cube-container').appendChild(renderer.domElement);

var cube = new THREE.Group();
scene.add(cube);

var navNames = ['home', 'education', 'skills', 'projects', 'activities', 'contact'];
var navLabels = ['Home', 'Education', 'Skills', 'Projects', 'Activities', 'Contact'];

function getNavbar(current) {
    var links = '';
    for (var i = 0; i < navNames.length; i++) {
        var cls = '';
        if (navNames[i] == current) {
            cls = 'active';
        }
        links += '<li><a href="#" class="' + cls + '" onclick="goToFace(\'' + navNames[i] + '\'); return false;">' + navLabels[i] + '</a></li>';
    }

    return '<nav class="navbar">' +
        '<span class="site-name">Abhishek Saini</span>' +
        '<ul class="nav-links">' + links + '</ul>' +
        '</nav>';
}

function homePage() {
    return getNavbar('home') + `
    <div class="hero-section">
        <img src="https://github.com/AbhiDream.png" alt="Abhishek Saini">
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

function educationPage() {
    return getNavbar('education') + `
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

function skillsPage() {
    return getNavbar('skills') + `
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

function projectsPage() {
    return getNavbar('projects') + `
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

function contactPage() {
    return getNavbar('contact') + `
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

function activitiesPage() {
    return getNavbar('activities') + `
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

var faces = [];

function makeFaces() {
    var data = [
        { name: 'home',       html: homePage(),       dir: [0, 0, 1],  rot: [0, 0, 0] },
        { name: 'contact',    html: contactPage(),    dir: [0, 0, -1], rot: [0, Math.PI, 0] },
        { name: 'education',  html: educationPage(),  dir: [1, 0, 0],  rot: [0, Math.PI / 2, 0] },
        { name: 'skills',     html: skillsPage(),     dir: [-1, 0, 0], rot: [0, -Math.PI / 2, 0] },
        { name: 'projects',   html: projectsPage(),   dir: [0, 1, 0],  rot: [-Math.PI / 2, 0, 0] },
        { name: 'activities', html: activitiesPage(), dir: [0, -1, 0], rot: [Math.PI / 2, 0, 0] }
    ];

    for (var i = 0; i < data.length; i++) {
        var div = document.createElement('div');
        div.className = 'cube-face';
        div.innerHTML = data[i].html;

        var obj = new THREE.CSS3DObject(div);
        obj.rotation.set(data[i].rot[0], data[i].rot[1], data[i].rot[2]);
        cube.add(obj);

        faces.push({
            name: data[i].name,
            div: div,
            obj: obj,
            dir: data[i].dir,
            rot: data[i].rot
        });
    }

    setSize();
}

function setSize() {
    cubeSize = Math.min(500, window.innerWidth - 40, window.innerHeight - 100);
    if (cubeSize < 260) {
        cubeSize = 260;
    }
    half = cubeSize / 2;

    for (var i = 0; i < faces.length; i++) {
        var f = faces[i];
        f.div.style.width = cubeSize + 'px';
        f.div.style.height = cubeSize + 'px';
        f.obj.position.set(f.dir[0] * half, f.dir[1] * half, f.dir[2] * half);
    }

    setCamera();
}

function setCamera() {
    camera.position.z = window.innerHeight * 1.2 + half + zoom;
}

function nearestAngle(current, target) {
    while (target - current > Math.PI) {
        target -= Math.PI * 2;
    }
    while (target - current < -Math.PI) {
        target += Math.PI * 2;
    }
    return target;
}

function goToFace(name) {
    for (var i = 0; i < faces.length; i++) {
        if (faces[i].name == name) {
            targetX = nearestAngle(cube.rotation.x, -faces[i].rot[0]);
            targetY = nearestAngle(cube.rotation.y, -faces[i].rot[1]);
            speedX = 0;
            speedY = 0;
            snapping = true;
        }
    }
}

function startDrag(x, y, target) {
    if (target.closest('a, button')) {
        return;
    }
    dragging = true;
    snapping = false;
    lastX = x;
    lastY = y;
    speedX = 0;
    speedY = 0;
    document.body.classList.add('dragging');
}

function moveDrag(x, y) {
    if (!dragging) {
        return;
    }
    speedY = (x - lastX) * 0.006;
    speedX = (y - lastY) * 0.006;
    cube.rotation.y += speedY;
    cube.rotation.x += speedX;
    lastX = x;
    lastY = y;
}

function endDrag() {
    dragging = false;
    document.body.classList.remove('dragging');
}

function addEvents() {
    window.addEventListener('mousedown', function(e) {
        startDrag(e.clientX, e.clientY, e.target);
    });

    window.addEventListener('mousemove', function(e) {
        moveDrag(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', endDrag);

    window.addEventListener('touchstart', function(e) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        touchFace = e.target.closest('.cube-face');
        lastX = x;
        lastY = y;
        if (touchFace == null) {
            startDrag(x, y, e.target);
        }
    });

    window.addEventListener('touchmove', function(e) {
        e.preventDefault();
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        if (touchFace != null) {
            touchFace.scrollTop -= (y - lastY);
            lastX = x;
            lastY = y;
        } else {
            moveDrag(x, y);
        }
    }, { passive: false });

    window.addEventListener('touchend', endDrag);

    window.addEventListener('wheel', function(e) {
        if (e.target.closest('.cube-face')) {
            return;
        }
        zoom += e.deltaY * 1.2;
        if (zoom < -300) {
            zoom = -300;
        }
        if (zoom > 1000) {
            zoom = 1000;
        }
        setCamera();
    });

    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        setSize();
    });
}

function animate() {
    requestAnimationFrame(animate);

    if (snapping) {
        cube.rotation.x += (targetX - cube.rotation.x) * 0.1;
        cube.rotation.y += (targetY - cube.rotation.y) * 0.1;

        if (Math.abs(targetX - cube.rotation.x) < 0.001 && Math.abs(targetY - cube.rotation.y) < 0.001) {
            cube.rotation.x = targetX;
            cube.rotation.y = targetY;
            snapping = false;
        }
    } else if (!dragging) {
        speedX *= 0.88;
        speedY *= 0.88;
        cube.rotation.x += speedX;
        cube.rotation.y += speedY;
    }

    renderer.render(scene, camera);
}

makeFaces();
addEvents();
animate();
