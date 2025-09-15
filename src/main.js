<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>浙江省交互地图</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Helvetica Neue', Arial, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #f9f7f7 0%, #dbe2ef 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            color: #333;
        }
        
        header {
            text-align: center;
            margin-bottom: 30px;
            width: 100%;
        }
        
        h1 {
            color: #3f72af;
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .subtitle {
            color: #769fcd;
            font-size: 1.2rem;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 30px;
            max-width: 1200px;
            width: 100%;
        }
        
        .map-container {
            flex: 1;
            min-width: 500px;
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }
        
        .info-panel {
            flex: 1;
            min-width: 300px;
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .city-info {
            text-align: center;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
            display: none;
        }
        
        .city-info.active {
            opacity: 1;
            transform: translateY(0);
            display: block;
        }
        
        .city-name {
            color: #3f72af;
            font-size: 2rem;
            margin-bottom: 15px;
        }
        
        .city-image {
            width: 100%;
            height: 200px;
            border-radius: 10px;
            object-fit: cover;
            margin-bottom: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .city-description {
            color: #555;
            line-height: 1.6;
            font-size: 1rem;
        }
        
        .default-message {
            text-align: center;
            color: #769fcd;
        }
        
        .default-message h2 {
            margin-bottom: 15px;
        }
        
        .zhejiang-map {
            width: 100%;
            height: 500px;
        }
        
        .city {
            fill: #a5c0dd;
            stroke: #fff;
            stroke-width: 1;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .city:hover {
            fill: #769fcd;
            transform: translateY(-2px);
        }
        
        .city.active {
            fill: #3f72af;
            filter: drop-shadow(0 0 5px rgba(63, 114, 175, 0.5));
        }
        
        .city-label {
            font-size: 10px;
            fill: #333;
            pointer-events: none;
            text-anchor: middle;
            font-weight: bold;
        }
        
        footer {
            margin-top: 30px;
            text-align: center;
            color: #769fcd;
            font-size: 0.9rem;
        }
        
        .map-legend {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 15px;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.9rem;
        }
        
        .legend-color {
            width: 15px;
            height: 15px;
            border-radius: 3px;
        }
        
        .controls {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        
        .control-btn {
            padding: 8px 15px;
            background: #3f72af;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .control-btn:hover {
            background: #285d9e;
        }
        
        @media (max-width: 900px) {
            .container {
                flex-direction: column;
            }
            
            .map-container, .info-panel {
                min-width: 100%;
            }
            
            .zhejiang-map {
                height: 400px;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>诗意浙江 · 魅力之旅</h1>
        <p class="subtitle">点击地图上的城市，探索浙江的自然美景与人文风情</p>
    </header>
    
    <div class="container">
        <div class="map-container">
            <svg class="zhejiang-map" viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
                <!-- 简化版浙江省地图 -->
                <path id="hangzhou" class="city" d="M380,220 L420,240 L410,280 L370,260 Z" />
                <text class="city-label" x="400" y="250">杭州</text>
                
                <path id="ningbo" class="city" d="M450,300 L490,320 L480,350 L440,330 Z" />
                <text class="city-label" x="465" y="325">宁波</text>
                
                <path id="wenzhou" class="city" d="M420,400 L460,420 L450,450 L410,430 Z" />
                <text class="city-label" x="435" y="425">温州</text>
                
                <path id="jiaxing" class="city" d="M350,200 L390,220 L380,250 L340,230 Z" />
                <text class="city-label" x="365" y="235">嘉兴</text>
                
                <path id="huzhou" class="city" d="M320,230 L360,250 L350,280 L310,260 Z" />
                <text class="city-label" x="335" y="265">湖州</text>
                
                <path id="shaoxing" class="city" d="M410,280 L450,300 L440,330 L400,310 Z" />
                <text class="city-label" x="425" y="305">绍兴</text>
                
                <path id="jinhua" class="city" d="M370,330 L410,350 L400,380 L360,360 Z" />
                <text class="city-label" x="385" y="355">金华</text>
                
                <path id="quzhou" class="city" d="M310,350 L350,370 L340,400 L300,380 Z" />
                <text class="city-label" x="325" y="375">衢州</text>
                
                <path id="zhoushan" class="city" d="M500,320 L530,340 L520,360 L490,340 Z" />
                <text class="city-label" x="510" y="350">舟山</text>
                
                <path id="taizhou" class="city" d="M450,360 L490,380 L480,410 L440,390 Z" />
                <text class="city-label" x="465" y="385">台州</text>
                
                <path id="lishui" class="city" d="M380,380 L420,400 L410,430 L370,410 Z" />
                <text class="city-label" x="395" y="405">丽水</text>
            </svg>
        </div>
        
        <div class="info-panel">
            <div class="city-info active" id="default-info">
                <div class="default-message">
                    <h2><i class="fas fa-map-marked-alt"></i> 欢迎探索浙江</h2>
                    <p>浙江省位于中国东南沿海，素有"鱼米之乡、丝茶之府、文物之邦、旅游胜地"的美誉。</p>
                    <p>点击左侧地图上的城市，了解该城市的风景与文化。</p>
                </div>
            </div>
            
            <div class="city-info" id="hangzhou-info">
                <h2 class="city-name"><i class="fas fa-lake"></i> 杭州</h2>
                <img class="city-image" src="https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="杭州西湖">
                <p class="city-description">杭州是浙江省省会，以西湖闻名于世。"上有天堂，下有苏杭"表达了古往今来人们对这座美丽城市的由衷赞美。西湖文化景观已被列入世界遗产名录。</p>
                <div class="controls">
                    <button class="control-btn"><i class="fas fa-share"></i> 分享</button>
                    <button class="control-btn"><i class="fas fa-heart"></i> 收藏</button>
                </div>
            </div>
            
            <div class="city-info" id="ningbo-info">
                <h2 class="city-name"><i class="fas fa-ship"></i> 宁波</h2>
                <img class="city-image" src="https://images.unsplash.com/photo-1583997055156-1ac12318b7c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="宁波港口">
                <p class="city-description">宁波是浙江省第二大城市，世界第四大港口城市。拥有悠久的历史文化，著名的天一阁是中国现存最古老的私家藏书楼。宁波也是著名的"院士之乡"。</p>
                <div class="controls">
                    <button class="control-btn"><i class="fas fa-share"></i> 分享</button>
                    <button class="control-btn"><i class="fas fa-heart"></i> 收藏</button>
                </div>
            </div>
            
            <div class="city-info" id="wenzhou-info">
                <h2 class="city-name"><i class="fas fa-building"></i> 温州</h2>
                <img class="city-image" src="https://images.unsplash.com/photo-1581338834647-b0fb40704e21?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="温州城市">
                <p class="city-description">温州位于浙江省东南部，以"温州模式"、温州商人和温州方言闻名。温州人被誉为"东方犹太人"，以善于经商著称。雁荡山是世界地质公园。</p>
                <div class="controls">
                    <button class="control-btn"><i class="fas fa-share"></i> 分享</button>
                    <button class="control-btn"><i class="fas fa-heart"></i> 收藏</button>
                </div>
            </div>
        </div>
    </div>
    
    <div class="map-legend">
        <div class="legend-item">
            <div class="legend-color" style="background-color: #a5c0dd;"></div>
            <span>普通城市</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: #769fcd;"></div>
            <span>悬停状态</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: #3f72af;"></div>
            <span>选中状态</span>
        </div>
    </div>
    
    <footer>
        <p>© 2023 浙江省交互地图 | 数据仅供参考</p>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // 获取所有城市元素和信息元素
            const cities = document.querySelectorAll('.city');
            const cityInfos = document.querySelectorAll('.city-info');
            const defaultInfo = document.getElementById('default-info');
            
            // 城市数据
            const cityData = {
                'hangzhou': {
                    name: '杭州',
                    image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                    description: '杭州是浙江省省会，以西湖闻名于世。"上有天堂，下有苏杭"表达了古往今来人们对这座美丽城市的由衷赞美。西湖文化景观已被列入世界遗产名录。'
                },
                'ningbo': {
                    name: '宁波',
                    image: 'https://images.unsplash.com/photo-1583997055156-1ac12318b7c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                    description: '宁波是浙江省第二大城市，世界第四大港口城市。拥有悠久的历史文化，著名的天一阁是中国现存最古老的私家藏书楼。宁波也是著名的"院士之乡"。'
                },
                'wenzhou': {
                    name: '温州',
                    image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                    description: '温州位于浙江省东南部，以"温州模式"、温州商人和温州方言闻名。温州人被誉为"东方犹太人"，以善于经商著称。雁荡山是世界地质公园。'
                },
                'jiaxing': {
                    name: '嘉兴',
                    image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                    description: '嘉兴位于浙江省东北部，是中国共产党诞生地，也是长三角城市群的重要城市。以南湖和乌镇古镇闻名，素有"鱼米之乡"、"丝绸之府"的美誉。'
                },
                'huzhou': {
                    name: '湖州',
                    image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                    description: '湖州位于浙江省北部，太湖南岸，因湖得名。是一座具有2300多年历史的江南古城，也是湖笔文化的发祥地。莫干山是著名的避暑胜地。'
                }
            };
            
            // 为每个城市添加点击事件
            cities.forEach(city => {
                city.addEventListener('click', function() {
                    const cityId = this.id;
                    
                    // 移除所有城市的active类
                    cities.forEach(c => c.classList.remove('active'));
                    // 添加当前城市的active类
                    this.classList.add('active');
                    
                    // 隐藏所有信息
                    cityInfos.forEach(info => {
                        info.classList.remove('active');
                    });
                    
                    // 显示当前城市信息或默认信息
                    const cityInfo = document.getElementById(`${cityId}-info`);
                    if (cityInfo) {
                        cityInfo.classList.add('active');
                    } else if (cityData[cityId]) {
                        // 动态创建信息面板
                        createCityInfo(cityData[cityId]);
                    } else {
                        defaultInfo.classList.add('active');
                    }
                });
            });
            
            // 动态创建城市信息
            function createCityInfo(data) {
                // 隐藏所有现有信息
                cityInfos.forEach(info => {
                    info.classList.remove('active');
                });
                
                // 创建新的信息元素
                const infoDiv = document.createElement('div');
                infoDiv.className = 'city-info active';
                infoDiv.innerHTML = `
                    <h2 class="city-name"><i class="fas fa-city"></i> ${data.name}</h2>
                    <img class="city-image" src="${data.image}" alt="${data.name}">
                    <p class="city-description">${data.description}</p>
                    <div class="controls">
                        <button class="control-btn"><i class="fas fa-share"></i> 分享</button>
                        <button class="control-btn"><i class="fas fa-heart"></i> 收藏</button>
                    </div>
                `;
                
                // 添加到信息面板
                document.querySelector('.info-panel').appendChild(infoDiv);
                
                // 为按钮添加事件
                infoDiv.querySelectorAll('.control-btn').forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        alert(`已${this.textContent.trim()} ${data.name} 信息`);
                    });
                });
            }
            
            // 