import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ComputersCanvas = () => {
    const canvasRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const geometry = new THREE.IcosahedronGeometry(1, 0);

        const material = new THREE.MeshBasicMaterial({ color: 0x00aaff, wireframe: true, transparent: true, opacity: 0.5 });

        const icosahedron = new THREE.Mesh(geometry, material);
        scene.add(icosahedron);

        camera.position.z = 5;

        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(newWidth, newHeight);
        };

        const animate = () => {
            requestAnimationFrame(animate);

            icosahedron.rotation.x += 0.01;
            icosahedron.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        window.addEventListener('resize', handleResize);

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="w-full h-screen overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full bg-transparent mt-20"></canvas>
        </div>
    );
};

export default ComputersCanvas;