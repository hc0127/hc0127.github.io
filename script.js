function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 12000)
camera.position.z = 100;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})


var geometry = new THREE.BoxGeometry(100, 100, 100);
var material = new THREE.MeshLambertMaterial({ color: 0x000000 });
var mesh = new THREE.Mesh(geometry, material);
mesh.userData = { URL: "http://stackoverflow.com" };
scene.add(mesh);

var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0, 0, 0);
scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
light.position.set(0, 0, 25);
scene.add(light);


let text1 = new THREE.Group();
(function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const text_string = 'It starts with you';
    const draw_font = 'bold 256px Helvetica';
    const padding = 16;

    // measure the text and size the canvas to fit it
    ctx.font = draw_font;
    const metrics = ctx.measureText(text_string);
    const text_size = new THREE.Vector2();
    new THREE.Box2(
        new THREE.Vector2(metrics.actualBoundingBoxLeft - padding, -metrics.fontBoundingBoxDescent - padding),
        new THREE.Vector2(metrics.actualBoundingBoxRight + padding, metrics.fontBoundingBoxAscent + padding)
    ).getSize(text_size);
    canvas.width = Math.ceil(text_size.x);
    canvas.height = Math.ceil(text_size.y);
    // draw the texture on canvas
    ctx.fillStyle = '#000000';
    ctx.font = draw_font;
    ctx.fillText(text_string, 0, text_size.y - metrics.fontBoundingBoxDescent - padding);
    // ctx.strokeStyle = '#ffffff';
    // ctx.strokeRect(0, 0, text_size.x, text_size.y);

    // now slap it on a plane 🛫
    text1 = new THREE.Mesh(
        //new THREE.PlaneGeometry(1, 1, 1, 1),
        new THREE.PlaneGeometry(text_size.x * 1.0, text_size.y * 1.0, 1, 1),
        new THREE.MeshBasicMaterial({
            transparent: true,
            map: new THREE.Texture(canvas),
            side: THREE.DoubleSide,
        })
    );
    text1.material.map.needsUpdate = true;
    // Example usage
    if (isMobile()) {
        text1.position.set(0, 900, 1100);
    } else {
        text1.position.set(-1000, 900, 1100);
    }
    text1.rotateX(Math.PI);
    scene.add(text1);
})();

var render = function () {
    requestAnimationFrame(render);

	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {

		intersects[ i ].object.material.color.set( 0xff0000 );

	}

    renderer.render(scene, camera);
}

let text2 = new THREE.Group();
(function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const text_string = 'carbondotink';
    const draw_font = 'bold 250px Helvetica';
    const padding = 16;

    // measure the text and size the canvas to fit it
    ctx.font = draw_font;
    const metrics = ctx.measureText(text_string);
    const text_size = new THREE.Vector2();
    new THREE.Box2(
        new THREE.Vector2(metrics.actualBoundingBoxLeft - padding, -metrics.fontBoundingBoxDescent - padding),
        new THREE.Vector2(metrics.actualBoundingBoxRight + padding, metrics.fontBoundingBoxAscent + padding)
    ).getSize(text_size);
    canvas.width = Math.ceil(text_size.x);
    canvas.height = Math.ceil(text_size.y);
    // draw the texture on canvas
    ctx.fillStyle = '#000000';
    ctx.font = draw_font;
    ctx.fillText(text_string, 0, text_size.y - metrics.fontBoundingBoxDescent - padding);


    // now slap it on a plane 🛫
    text2 = new THREE.Mesh(

        new THREE.PlaneGeometry(text_size.x * 1.0, text_size.y * 1.0, 1, 1),
        new THREE.MeshBasicMaterial({
            transparent: true,
            map: new THREE.Texture(canvas),
            side: THREE.DoubleSide,
        })
    );
    text2.material.map.needsUpdate = true;
    // Example usage
    if (isMobile()) {
        text2.position.set(0, 2000, 10);
    } else {
        text2.position.set(-2000, 2000, 10);
    }
    text2.rotateX(Math.PI);
    scene.add(text2);
})();

var render = function () {
    requestAnimationFrame(render);


    renderer.render(scene, camera);
}


function onClick(linkToBeOpen) {
    TweenMax.to(camera.position, 3, {
        z: 100, ease: Sine.easeInOut, onComplete: function () {
            open(linkToBeOpen)
        }
    });

}

//Seperate Function to load links inside the page
function loadSameLink(linkToBeOpen) {
    TweenMax.to(camera.position, 3, {
        z: 100, ease: Sine.easeInOut, onComplete: function () {
            window.location.href = linkToBeOpen
        }
    });
}

function loadPage(event) {
    event.preventDefault();

    TweenMax.to(camera.position, 2, { z: 12000, ease: Sine.easeInOut }).delay(2);


}


function linkListener() {
    // For selecting links, that needed to be opened in sperate page (external links)
    let linkElem = document.querySelectorAll(".a-link");
    // Selects the links thats needed to be opened inside the same page (internal links)
    let internalLinkElem = document.querySelectorAll(".i-link")

    linkElem.forEach((e) => {
        e.addEventListener("click", function () {
            onClick(this.getAttribute("data-href"));
        });
    });

    internalLinkElem.forEach((ele) => {
        ele.addEventListener("click", function () {
            loadSameLink(this.getAttribute("data-href"))
        })
    })

}
linkListener()
window.addEventListener('load', loadPage);


function loader(css, js) {
    // (A) TOTAL NUMBER OF SCRIPTS
    var total = css.length + js.length,
        now = 0, s;

    // (B) READY?
    var ready = () => {
        now++;
        // if (now==total) { document.getElementById("loading").remove(); }

        // FOR THIS DEMO ONLY.
        // PAGE LOAD IS SO FAST YOU WON'T EVEN SEE THE SPINNER.
        // SO WE DELAY IT BY 2 SECONDS.
        if (now == total) {
            window.setTimeout(() => {
                document.getElementById("loading").remove();
            }, 1500);
        }
    };

    // (C) INSERT <LINK> INTO <HEAD>
    css.forEach((url, i) => {
        s = document.createElement("link");
        s.rel = "stylesheet";
        s.href = url;
        s.onload = ready; s.onerror = ready;
        document.head.appendChild(s);
    });

    // (D) INSERT <SCRIPT> INTO <HEAD>
    js.forEach((url, i) => {
        s = document.createElement("script");
        s.src = url;
        s.onload = ready; s.onerror = ready;
        document.head.appendChild(s);
    });
}

projector = new THREE.Projector();
mouseVector = new THREE.Vector3();
const mouse = new THREE.Vector2();

// User interaction
window.addEventListener('click', onMouseClick, false);
window.addEventListener('resize', onWindowResize, false);
// And go!
animate();

function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);

    // Handle intersections
    if (intersects.length > 0) {
        // Change color of the first intersected object
        intersects[0].object.material.color.set(0xff0000);

        // Optionally, perform an action, e.g., open a URL
        if (intersects[0].object.userData.URL) {
            window.open(intersects[0].object.userData.URL, '_blank');
        }
    }
}

function onWindowResize(e) {
    containerWidth = container.clientWidth;
    containerHeight = container.clientHeight;
    renderer.setSize(containerWidth, containerHeight);
    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
}
function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
