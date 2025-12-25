// 主应用脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子背景
    initParticles();
    
    // 初始化图表
    initChart();
    
    // 绑定事件
    bindEvents();
    
    // 开始模拟
    startSimulation();
});

// 初始化粒子背景
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#00ff88' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00ff88',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' }
                }
            },
            retina_detect: true
        });
    }
}

// 初始化网络图表
function initChart() {
    const ctx = document.getElementById('network-chart').getContext('2d');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: '网络流量',
                data: [1.2, 2.1, 1.8, 3.2, 2.7, 2.4],
                borderColor: '#00ff88',
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    labels: { 
                        color: '#fff',
                        font: { size: 12 }
                    } 
                }
            },
            scales: {
                x: { 
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }, 
                    ticks: { color: '#b0b0c0' } 
                },
                y: { 
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }, 
                    ticks: { color: '#b0b0c0' } 
                }
            }
        }
    });
}

// 绑定所有事件
function bindEvents() {
    // 量子模拟器滑块
    const superposition = document.getElementById('superposition');
    const entanglement = document.getElementById('entanglement');
    
    superposition.addEventListener('input', function() {
        const value = this.value + '%';
        document.getElementById('superposition-value').textContent = value;
        updateQuantumVisual();
    });
    
    entanglement.addEventListener('input', function() {
        const value = this.value + '%';
        document.getElementById('entanglement-value').textContent = value;
        updateQuantumVisual();
    });
    
    // 按钮事件
    document.getElementById('apply-gate').addEventListener('click', applyQuantumGate);
    document.getElementById('reset-state').addEventListener('click', resetQuantumState);
    
    // 算法按钮
    document.querySelectorAll('[data-algo]').forEach(btn => {
        btn.addEventListener('click', function() {
            const algo = this.dataset.algo;
            runAlgorithm(algo);
        });
    });
}

// 更新量子视觉效果
function updateQuantumVisual() {
    const superposition = document.getElementById('superposition').value;
    const entanglement = document.getElementById('entanglement').value;
    
    // 更新保真度显示
    const fidelity = 100 - Math.abs(50 - superposition) / 2;
    document.getElementById('fidelity').textContent = fidelity.toFixed(1) + '%';
    
    // 调用Three.js更新
    if (window.updateQuantumSphere) {
        window.updateQuantumSphere(superposition / 100, entanglement / 100);
    }
}

// 应用量子门
function applyQuantumGate() {
    const superposition = document.getElementById('superposition');
    const entanglement = document.getElementById('entanglement');
    
    // 模拟量子门效果
    let newSuper = parseInt(superposition.value) + 20;
    let newEnt = parseInt(entanglement.value) + 15;
    
    if (newSuper > 100) newSuper = 100;
    if (newEnt > 100) newEnt = 100;
    
    superposition.value = newSuper;
    entanglement.value = newEnt;
    
    document.getElementById('superposition-value').textContent = newSuper + '%';
    document.getElementById('entanglement-value').textContent = newEnt + '%';
    
    updateQuantumVisual();
    addLog('应用Hadamard量子门');
    
    // 按钮反馈
    const btn = document.getElementById('apply-gate');
    btn.innerHTML = '<i class="fas fa-check"></i> 已应用';
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-bolt"></i> 应用量子门';
    }, 1000);
}

// 重置量子状态
function resetQuantumState() {
    document.getElementById('superposition').value = 50;
    document.getElementById('entanglement').value = 50;
    
    document.getElementById('superposition-value').textContent = '50%';
    document.getElementById('entanglement-value').textContent = '50%';
    
    updateQuantumVisual();
    addLog('重置量子状态');
}

// 运行量子算法
function runAlgorithm(algo) {
    const algorithms = {
        grover: { name: 'Grover搜索算法', qubits: 2 },
        shor: { name: 'Shor因数分解', qubits: 4 },
        qnn: { name: '量子神经网络', qubits: 3 }
    };
    
    const algoInfo = algorithms[algo];
    if (!algoInfo) return;
    
    addLog(`启动${algoInfo.name}`);
    
    // 更新量子比特数
    const qubitElement = document.getElementById('qubit-count');
    qubitElement.textContent = algoInfo.qubits;
    
    // 更新容器实例数
    const containerElement = document.getElementById('container-count');
    const current = parseInt(containerElement.textContent);
    containerElement.textContent = current + 1;
    
    // 按钮状态反馈
    const btn = document.querySelector(`[data-algo="${algo}"]`);
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 计算中';
    btn.disabled = true;
    
    // 模拟计算时间
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> 完成';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            addLog(`${algoInfo.name}计算完成`);
        }, 1500);
    }, 2000);
}

// 开始系统模拟
function startSimulation() {
    // 更新云负载
    setInterval(() => {
        const cloudLoad = document.getElementById('cloud-load');
        const load = Math.floor(Math.random() * 30 + 35);
        cloudLoad.textContent = load + '%';
        
        // 随机添加日志
        if (Math.random() > 0.7) {
            const logs = [
                '量子态同步完成',
                '边缘节点数据同步',
                '网络连接状态正常',
                '容器健康检查通过',
                '量子门优化计算'
            ];
            addLog(logs[Math.floor(Math.random() * logs.length)]);
        }
        
        // 随机更新吞吐量
        if (Math.random() > 0.5) {
            const throughput = document.getElementById('throughput');
            const speed = (2 + Math.random() * 1).toFixed(1);
            throughput.textContent = speed + ' Gbps';
        }
    }, 3000);
}

// 添加日志
function addLog(message) {
    const logsContainer = document.getElementById('logs');
    const time = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log';
    logEntry.textContent = `[${time}] ${message}`;
    
    logsContainer.prepend(logEntry);
    
    // 限制日志数量
    if (logsContainer.children.length > 10) {
        logsContainer.removeChild(logsContainer.lastChild);
    }
}