// 量子云模拟器 - 3D量子球体
let scene, camera, renderer, quantumSphere;
let is3DInitialized = false;

// 初始化3D场景
function initThreeJS() {
    console.log("正在初始化量子3D场景...");
    
    const container = document.getElementById('quantum-canvas');
    if (!container) {
        console.error("错误：找不到量子画布容器");
        return;
    }
    
    // 检查Three.js是否加载
    if (typeof THREE === 'undefined') {
        console.error("错误：Three.js库未加载");
        showFallbackMessage(container, "Three.js库加载失败，请刷新页面");
        return;
    }
    
    try {
        // 1. 创建场景
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a0f); // 深色背景
        
        // 2. 创建相机
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 8; // 相机位置
        
        // 3. 创建渲染器
        renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.innerHTML = ''; // 清空容器
        container.appendChild(renderer.domElement);
        
        // 4. 添加光源
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0x00ff88, 1, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);
        
        // 5. 创建量子球体
        createQuantumSphere();
        
        // 6. 创建环绕粒子
        createParticles();
        
        // 7. 添加窗口大小调整监听
        window.addEventListener('resize', handleWindowResize);
        
        // 8. 开始动画循环
        is3DInitialized = true;
        animate();
        
        console.log("✅ 量子3D场景初始化成功！");
        
    } catch (error) {
        console.error("❌ 3D场景初始化失败:", error);
        showFallbackMessage(container, "3D渲染失败，使用2D替代");
    }
}

// 创建量子球体
function createQuantumSphere() {
    // 创建几何体（球体）
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    
    // 创建材质 - 使用基本材质，确保兼容性
    const material = new THREE.MeshPhongMaterial({
        color: 0x00ff88,      // 量子绿色
        shininess: 100,       // 光泽度
        transparent: true,    // 透明
        opacity: 0.8,         // 透明度
        wireframe: true       // 线框模式
    });
    
    // 创建球体网格
    quantumSphere = new THREE.Mesh(geometry, material);
    scene.add(quantumSphere);
    
    // 添加额外的线框效果
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00ff88,
        linewidth: 1
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    quantumSphere.add(wireframe);
}

// 创建粒子效果
function createParticles() {
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    
    // 在球体周围随机分布粒子
    for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = 2.5 + Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        color: 0x00ff88,
        size: 0.03,
        transparent: true,
        opacity: 0.6
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

// 处理窗口大小变化
function handleWindowResize() {
    if (!camera || !renderer) return;
    
    const container = document.getElementById('quantum-canvas');
    if (!container) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// 动画循环
function animate() {
    if (!is3DInitialized) return;
    
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001; // 当前时间（秒）
    
    // 旋转量子球体
    if (quantumSphere) {
        quantumSphere.rotation.y = time * 0.3; // Y轴旋转
        quantumSphere.rotation.x = time * 0.15; // X轴旋转
        
        // 脉动效果
        const pulse = Math.sin(time * 2) * 0.05 + 1; // 0.95 到 1.05
        quantumSphere.scale.set(pulse, pulse, pulse);
    }
    
    // 渲染场景
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// 更新量子球体外观（从滑块调用）
window.updateQuantumSphere = function(superposition, entanglement) {
    if (!quantumSphere || !quantumSphere.material) return;
    
    // 根据叠加态和纠缠度更新颜色和透明度
    const material = quantumSphere.material;
    
    // 颜色变化：从绿色到蓝色
    const r = 0; // 固定红色分量
    const g = 1 - (superposition * 0.5); // 绿色随叠加态减少
    const b = entanglement; // 蓝色随纠缠度增加
    
    // 转换为Three.js颜色
    material.color.setRGB(r, g, b);
    
    // 透明度变化：叠加态越高越透明
    material.opacity = 0.5 + (1 - superposition) * 0.3;
    
    // 线框颜色也更新
    if (quantumSphere.children[0] && quantumSphere.children[0].material) {
        quantumSphere.children[0].material.color.setRGB(r, g, b);
    }
};

// 显示备用信息（当3D失败时）
function showFallbackMessage(container, message) {
    container.innerHTML = `
        <div style="
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 136, 255, 0.1));
            border-radius: 10px;
            border: 2px dashed rgba(0, 255, 136, 0.3);
            color: #00ff88;
            text-align: center;
            padding: 20px;
        ">
            <div style="font-size: 48px; margin-bottom: 10px;">⚛️</div>
            <h3 style="margin: 10px 0;">量子模拟器</h3>
            <p style="color: #b0b0c0; font-size: 14px; margin: 10px 0;">
                ${message || "正在加载3D效果..."}
            </p>
            <p style="color: #888; font-size: 12px; margin-top: 20px;">
                请使用最新版Chrome/Firefox/Edge浏览器
            </p>
        </div>
    `;
}

// 等待页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // 延迟一点确保所有资源加载
        setTimeout(initThreeJS, 500);
    });
} else {
    // 如果文档已经加载完成
    setTimeout(initThreeJS, 500);
}