// enhanced-features.js - 增强功能模块

// ==================== 量子随机数生成器 ====================
class QuantumRandomGenerator {
    constructor() {
        this.generatedCount = 0;
        this.history = [];
        this.maxHistory = 10;
    }
    
    // 生成真正的随机位（模拟量子随机性）
    generateBit() {
        // 使用高精度时间戳 + Math.random + 鼠标位置创建更强的随机性
        const timestamp = Date.now();
        const mouseX = Math.random() * window.innerWidth;
        const entropy = (timestamp + Math.random() + mouseX) % 1;
        return entropy > 0.5 ? '1' : '0';
    }
    
    // 生成多个量子位
    generateBits(numBits) {
        let bits = '';
        for (let i = 0; i < numBits; i++) {
            bits += this.generateBit();
        }
        
        // 格式化显示：每4位加空格
        const formattedBits = bits.match(/.{1,4}/g).join(' ');
        
        // 更新显示
        document.getElementById('random-bits').textContent = formattedBits;
        
        // 更新统计
        this.generatedCount++;
        document.getElementById('generated-count').textContent = this.generatedCount;
        
        // 计算熵值（模拟）
        const entropy = 0.95 + Math.random() * 0.05;
        document.getElementById('entropy').textContent = entropy.toFixed(2);
        
        // 添加到历史
        this.addToHistory(bits, numBits);
        
        // 添加到系统日志
        addLog(`生成${numBits}位量子随机数: ${bits}`);
        
        // 动画效果
        this.animateRandomGeneration();
        
        return bits;
    }
    
    // 添加到历史记录
    addToHistory(bits, numBits) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.textContent = `[${timeStr}] ${bits} (${numBits}位)`;
        
        const historyList = document.getElementById('random-history');
        historyList.prepend(historyItem);
        
        this.history.unshift({bits, time: timeStr});
        
        // 限制历史记录数量
        if (historyList.children.length > this.maxHistory) {
            historyList.removeChild(historyList.lastChild);
        }
    }
    
    // 清除历史
    clearHistory() {
        document.getElementById('random-history').innerHTML = '';
        document.getElementById('random-bits').textContent = '0000 0000';
        document.getElementById('generated-count').textContent = '0';
        this.history = [];
        this.generatedCount = 0;
        addLog('清除量子随机数历史');
    }
    
    // 动画效果
    animateRandomGeneration() {
        const display = document.getElementById('random-bits');
        display.style.transform = 'scale(1.1)';
        display.style.color = '#ff00ff';
        
        setTimeout(() => {
            display.style.transform = 'scale(1)';
            display.style.color = '#00ff88';
        }, 300);
    }
}

// ==================== 量子态概率分布 ====================
class ProbabilityVisualizer {
    constructor() {
        this.canvas = document.getElementById('probability-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.prob0 = 0.5; // |0⟩的概率
        this.updateCanvas();
    }
    
    // 更新概率值
    updateProbability(prob0) {
        this.prob0 = prob0 / 100; // 转换为0-1范围
        const prob1 = 1 - this.prob0;
        
        // 更新显示
        document.getElementById('prob-0').textContent = `${(this.prob0 * 100).toFixed(1)}%`;
        document.getElementById('prob-1').textContent = `${(prob1 * 100).toFixed(1)}%`;
        
        // 更新滑块值显示
        document.getElementById('prob-value').textContent = `${(this.prob0 * 100).toFixed(0)}%`;
        
        // 重新绘制
        this.updateCanvas();
        
        // 更新系统日志
        addLog(`设置量子态概率: |0⟩=${(this.prob0*100).toFixed(1)}%, |1⟩=${(prob1*100).toFixed(1)}%`);
    }
    
    // 绘制概率分布图
    updateCanvas() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.4;
        
        // 清除画布
        ctx.clearRect(0, 0, width, height);
        
        // 绘制|0⟩部分
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2 * this.prob0);
        ctx.fillStyle = 'rgba(0, 255, 136, 0.7)';
        ctx.fill();
        
        // 绘制|1⟩部分
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, Math.PI * 2 * this.prob0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 0, 255, 0.7)';
        ctx.fill();
        
        // 绘制分隔线
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        const angle = Math.PI * 2 * this.prob0;
        ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 绘制中心圆
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(10, 10, 15, 0.9)';
        ctx.fill();
        
        // 绘制文字
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('P(|ψ⟩)', centerX, centerY);
        
        // 绘制动画效果
        this.drawAnimation();
    }
    
    // 绘制动画效果
    drawAnimation() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.45;
        
        // 绘制旋转粒子
        const time = Date.now() * 0.001;
        const particleCount = 8;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2 + time * 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = i < particleCount * this.prob0 ? 
                'rgba(0, 255, 136, 0.8)' : 'rgba(255, 0, 255, 0.8)';
            ctx.fill();
        }
    }
    
    // 模拟量子测量
    measure() {
        // 根据概率进行测量
        const result = Math.random() < this.prob0 ? '|0⟩' : '|1⟩';
        
        // 动画效果
        this.animateMeasurement(result);
        
        // 添加到系统日志
        addLog(`量子测量结果: ${result}`);
        
        return result;
    }
    
    // 测量动画
    animateMeasurement(result) {
        const canvas = this.canvas;
        canvas.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.5)';
        
        setTimeout(() => {
            canvas.style.boxShadow = '';
        }, 500);
    }
}

// ==================== 量子纠缠演示器 ====================
class EntanglementDemo {
    constructor() {
        this.entanglementStrength = 1.0; // 0-1范围
        this.particleAState = '|0⟩';
        this.particleBState = '|1⟩';
        this.isEntangled = true;
        
        this.init();
    }
    
    init() {
        this.updateDisplay();
    }
    
    // 更新纠缠强度
    updateStrength(value) {
        this.entanglementStrength = value / 100;
        this.updateDisplay();
        
        // 更新连线动画
        const connection = document.querySelector('.connection');
        if (connection) {
            connection.style.opacity = this.entanglementStrength;
        }
        
        // 更新信息
        const info = document.getElementById('entanglement-info');
        if (this.entanglementStrength > 0.7) {
            info.textContent = '强纠缠态：测量一个会立即决定另一个';
        } else if (this.entanglementStrength > 0.3) {
            info.textContent = '中等纠缠：相关性较强';
        } else if (this.entanglementStrength > 0) {
            info.textContent = '弱纠缠：存在一定相关性';
        } else {
            info.textContent = '无纠缠：两个量子比特独立';
        }
    }
    
    // 创建纠缠
    createEntanglement() {
        this.isEntangled = true;
        this.entanglementStrength = 1.0;
        document.getElementById('entanglement-strength').value = 100;
        
        // 设置相反的自旋
        this.particleAState = '|0⟩';
        this.particleBState = '|1⟩';
        
        this.updateDisplay();
        addLog('创建量子纠缠对');
        
        // 动画效果
        this.animateEntanglement();
    }
    
    // 测量粒子A
    measureA() {
        if (!this.isEntangled || this.entanglementStrength < 0.5) {
            // 如果不是强纠缠，独立测量
            const random = Math.random() > 0.5 ? '|0⟩' : '|1⟩';
            this.particleAState = random;
            addLog(`测量量子比特A: ${random}`);
        } else {
            // 如果是强纠缠，测量A会立即决定B
            const result = Math.random() > 0.5 ? '|0⟩' : '|1⟩';
            this.particleAState = result;
            this.particleBState = result === '|0⟩' ? '|1⟩' : '|0⟩'; // 相反状态
            addLog(`测量纠缠态A→B: A=${result}, B=${this.particleBState}`);
        }
        
        this.updateDisplay();
        this.animateMeasurement('particle-a');
    }
    
    // 测量粒子B
    measureB() {
        if (!this.isEntangled || this.entanglementStrength < 0.5) {
            const random = Math.random() > 0.5 ? '|0⟩' : '|1⟩';
            this.particleBState = random;
            addLog(`测量量子比特B: ${random}`);
        } else {
            const result = Math.random() > 0.5 ? '|0⟩' : '|1⟩';
            this.particleBState = result;
            this.particleAState = result === '|0⟩' ? '|1⟩' : '|0⟩';
            addLog(`测量纠缠态B→A: B=${result}, A=${this.particleAState}`);
        }
        
        this.updateDisplay();
        this.animateMeasurement('particle-b');
    }
    
    // 重置
    reset() {
        this.isEntangled = true;
        this.entanglementStrength = 1.0;
        document.getElementById('entanglement-strength').value = 100;
        this.particleAState = '|0⟩';
        this.particleBState = '|1⟩';
        
        this.updateDisplay();
        addLog('重置量子纠缠演示器');
    }
    
    // 更新显示
    updateDisplay() {
        document.getElementById('state-a').textContent = this.particleAState;
        document.getElementById('state-b').textContent = this.particleBState;
        
        // 更新自旋方向
        const spinA = document.querySelector('#particle-a .particle-spin');
        const spinB = document.querySelector('#particle-b .particle-spin');
        
        if (spinA && spinB) {
            spinA.textContent = this.particleAState === '|0⟩' ? '↑' : '↓';
            spinB.textContent = this.particleBState === '|0⟩' ? '↑' : '↓';
            
            // 如果纠缠强，添加动画
            if (this.isEntangled && this.entanglementStrength > 0.7) {
                spinA.classList.add('spin-animation');
                spinB.classList.add('spin-animation');
            } else {
                spinA.classList.remove('spin-animation');
                spinB.classList.remove('spin-animation');
            }
        }
    }
    
    // 动画效果
    animateEntanglement() {
        const line = document.querySelector('.entanglement-line');
        line.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
            line.style.transform = 'scale(1)';
        }, 500);
    }
    
    animateMeasurement(particleId) {
        const particle = document.getElementById(particleId);
        if (particle) {
            particle.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.8)';
            
            setTimeout(() => {
                particle.style.boxShadow = '';
            }, 800);
        }
    }
}

// ==================== 云边任务调度模拟 ====================
class TaskScheduler {
    constructor() {
        this.tasks = [];
        this.cloudQueue = [];
        this.edgeQueue = [];
        this.completedTasks = [];
        this.isRunning = false;
        this.schedulerInterval = null;
        this.taskIdCounter = 1;
        
        this.init();
    }
    
    init() {
        this.updateStats();
    }
    
    // 添加任务
    addTask(name, type) {
        if (!name.trim()) {
            name = `${type}任务${this.taskIdCounter}`;
        }
        
        const task = {
            id: this.taskIdCounter++,
            name: name,
            type: type,
            status: 'waiting',
            addedAt: new Date(),
            startedAt: null,
            completedAt: null,
            assignedTo: null,
            latency: null
        };
        
        this.tasks.push(task);
        this.updateTaskDisplay();
        this.updateStats();
        
        addLog(`添加任务: ${name} (${type})`);
        
        return task;
    }
    
    // 开始调度
    startScheduling() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        addLog('开始云边任务调度');
        
        // 每2秒处理一次任务
        this.schedulerInterval = setInterval(() => {
            this.processTasks();
        }, 2000);
    }
    
    // 停止调度
    stopScheduling() {
        this.isRunning = false;
        if (this.schedulerInterval) {
            clearInterval(this.schedulerInterval);
            this.schedulerInterval = null;
        }
        addLog('停止任务调度');
    }
    
    // 处理任务
    processTasks() {
        if (this.tasks.length === 0) return;
        
        // 分配任务到云或边
        this.assignTasks();
        
        // 处理云队列中的任务
        this.processQueue('cloud');
        
        // 处理边缘队列中的任务
        this.processQueue('edge');
        
        this.updateTaskDisplay();
        this.updateStats();
    }
    
    // 分配任务到队列
    assignTasks() {
        const waitingTasks = this.tasks.filter(t => t.status === 'waiting');
        
        waitingTasks.forEach(task => {
            // 根据任务类型分配到不同队列
            if (task.type === 'quantum' || task.type === 'ai') {
                // 复杂任务分配到云
                task.status = 'processing';
                task.assignedTo = 'cloud';
                task.startedAt = new Date();
                this.cloudQueue.push(task);
            } else {
                // 简单任务分配到边缘
                task.status = 'processing';
                task.assignedTo = 'edge';
                task.startedAt = new Date();
                this.edgeQueue.push(task);
            }
        });
    }
    
    // 处理队列中的任务
    processQueue(queueType) {
        const queue = queueType === 'cloud' ? this.cloudQueue : this.edgeQueue;
        const completed = [];
        
        // 模拟处理任务
        for (let i = queue.length - 1; i >= 0; i--) {
            const task = queue[i];
            
            // 随机决定任务是否完成
            if (Math.random() > 0.7) { // 70%概率完成
                task.status = 'completed';
                task.completedAt = new Date();
                task.latency = task.completedAt - task.startedAt;
                
                // 移到完成列表
                completed.push(task);
                queue.splice(i, 1);
                this.completedTasks.push(task);
                
                addLog(`完成任务: ${task.name} (延迟: ${task.latency}ms)`);
            }
        }
    }
    
    // 清除所有任务
    clearAllTasks() {
        this.tasks = [];
        this.cloudQueue = [];
        this.edgeQueue = [];
        this.completedTasks = [];
        this.taskIdCounter = 1;
        
        this.updateTaskDisplay();
        this.updateStats();
        addLog('清除所有任务');
    }
    
    // 更新任务显示
    updateTaskDisplay() {
        this.updateQueueDisplay('cloud-queue', this.cloudQueue);
        this.updateQueueDisplay('edge-queue', this.edgeQueue);
        this.updateQueueDisplay('completed-tasks', this.completedTasks.slice(-10)); // 只显示最近10个
    }
    
    // 更新队列显示
    updateQueueDisplay(elementId, tasks) {
        const container = document.getElementById(elementId);
        if (!container) return;
        
        container.innerHTML = '';
        
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.type}`;
            
            const latencyText = task.latency ? ` (${task.latency}ms)` : '';
            
            taskElement.innerHTML = `
                <div>
                    <strong>${task.name}</strong>
                    <div style="font-size: 0.8rem; color: #b0b0c0; margin-top: 2px;">
                        ${task.type}${latencyText}
                    </div>
                </div>
                <span class="task-status">${task.status}</span>
            `;
            
            container.appendChild(taskElement);
        });
    }
    
    // 更新统计信息
    updateStats() {
        const waiting = this.tasks.filter(t => t.status === 'waiting').length;
        const processing = this.cloudQueue.length + this.edgeQueue.length;
        const completed = this.completedTasks.length;
        
        // 计算平均延迟
        const completedWithLatency = this.completedTasks.filter(t => t.latency);
        const avgLatency = completedWithLatency.length > 0 
            ? Math.round(completedWithLatency.reduce((sum, t) => sum + t.latency, 0) / completedWithLatency.length)
            : 0;
        
        document.getElementById('waiting-tasks').textContent = waiting;
        document.getElementById('processing-tasks').textContent = processing;
        document.getElementById('completed-count').textContent = completed;
        document.getElementById('avg-latency').textContent = `${avgLatency}ms`;
    }
}

// ==================== 主题切换 ====================
class ThemeManager {
    constructor() {
        this.isDarkMode = true;
        this.init();
    }
    
    init() {
        // 检查本地存储的主题设置
        const savedTheme = localStorage.getItem('quantum-theme');
        if (savedTheme) {
            this.isDarkMode = savedTheme === 'dark';
            this.applyTheme();
        }
        
        // 设置切换按钮
        this.setupToggleButton();
    }
    
    setupToggleButton() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;
        
        toggleBtn.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        this.updateToggleIcon();
    }
    
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        this.updateToggleIcon();
        
        // 保存到本地存储
        localStorage.setItem('quantum-theme', this.isDarkMode ? 'dark' : 'light');
        
        addLog(`切换到${this.isDarkMode ? '暗色' : '亮色'}主题`);
    }
    
    applyTheme() {
        const root = document.documentElement;
        
        if (this.isDarkMode) {
            // 暗色主题
            root.style.setProperty('--dark-bg', '#0a0a0f');
            root.style.setProperty('--darker-bg', '#050508');
            root.style.setProperty('--card-bg', 'rgba(20, 20, 30, 0.8)');
            root.style.setProperty('--text-color', '#ffffff');
            root.style.setProperty('--text-muted', '#b0b0c0');
            document.body.style.background = 'linear-gradient(135deg, #0a0a0f, #050508)';
        } else {
            // 亮色主题
            root.style.setProperty('--dark-bg', '#f0f2f5');
            root.style.setProperty('--darker-bg', '#e4e7eb');
            root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.9)');
            root.style.setProperty('--text-color', '#1a1a2e');
            root.style.setProperty('--text-muted', '#4a5568');
            document.body.style.background = 'linear-gradient(135deg, #f0f2f5, #e4e7eb)';
        }
    }
    
    updateToggleIcon() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;
        
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.className = this.isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// ==================== 全局辅助函数 ====================
function addLog(message) {
    const logsContainer = document.getElementById('logs');
    if (!logsContainer) return;
    
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

// ==================== 初始化所有功能 ====================
document.addEventListener('DOMContentLoaded', function() {
    // 等待主页面加载完成
    setTimeout(() => {
        console.log('正在初始化增强功能...');
        
        // 1. 初始化量子随机数生成器
        const randomGenerator = new QuantumRandomGenerator();
        
        // 2. 初始化概率分布可视化
        const probabilityVisualizer = new ProbabilityVisualizer();
        
        // 3. 初始化量子纠缠演示器
        const entanglementDemo = new EntanglementDemo();
        
        // 4. 初始化任务调度器
        const taskScheduler = new TaskScheduler();
        
        // 5. 初始化主题管理器
        const themeManager = new ThemeManager();
        
        // ==================== 绑定事件 ====================
        
        // 量子随机数生成器事件
        document.getElementById('generate-1bit')?.addEventListener('click', () => {
            randomGenerator.generateBits(8);
        });
        
        document.getElementById('generate-8bits')?.addEventListener('click', () => {
            randomGenerator.generateBits(32);
        });
        
        document.getElementById('clear-random')?.addEventListener('click', () => {
            randomGenerator.clearHistory();
        });
        
        // 概率分布事件
        const probSlider = document.getElementById('prob-slider');
        if (probSlider) {
            probSlider.addEventListener('input', function() {
                probabilityVisualizer.updateProbability(this.value);
            });
            
            // 初始更新
            probabilityVisualizer.updateProbability(probSlider.value);
        }
        
        // 量子纠缠事件
        const entanglementSlider = document.getElementById('entanglement-strength');
        if (entanglementSlider) {
            entanglementSlider.addEventListener('input', function() {
                entanglementDemo.updateStrength(this.value);
            });
        }
        
        document.getElementById('measure-a')?.addEventListener('click', () => {
            entanglementDemo.measureA();
        });
        
        document.getElementById('measure-b')?.addEventListener('click', () => {
            entanglementDemo.measureB();
        });
        
        document.getElementById('entangle')?.addEventListener('click', () => {
            entanglementDemo.createEntanglement();
        });
        
        document.getElementById('reset-entanglement')?.addEventListener('click', () => {
            entanglementDemo.reset();
        });
        
        // 任务调度事件
        document.getElementById('add-task')?.addEventListener('click', function() {
            const taskName = document.getElementById('task-name').value;
            const taskType = document.getElementById('task-type').value;
            
            if (!taskName.trim()) {
                // 使用默认名称
                taskScheduler.addTask('', taskType);
            } else {
                taskScheduler.addTask(taskName, taskType);
            }
            
            // 清空输入
            document.getElementById('task-name').value = '';
        });
        
        // 回车键添加任务
        document.getElementById('task-name')?.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('add-task').click();
            }
        });
        
        document.getElementById('schedule-tasks')?.addEventListener('click', () => {
            taskScheduler.startScheduling();
        });
        
        document.getElementById('clear-tasks')?.addEventListener('click', () => {
            taskScheduler.stopScheduling();
            taskScheduler.clearAllTasks();
        });
        
        // 主题切换事件已在ThemeManager中处理
        
        console.log('✅ 增强功能初始化完成！');
        addLog('增强功能模块加载完成');
        
    }, 1000);
});