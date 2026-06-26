// builder.js - Core UI and State Management

// Define the 26 Modules
const MODULES = {
    // Basic
    'heading': { id: 'heading', name: 'Heading', icon: 'fa-solid fa-heading', category: 'basic', defaultData: { content: 'This is a heading', tag: 'h2' }, defaultStyles: { color: '#1e293b', fontSize: '32px', textAlign: 'left', fontWeight: 'bold', margin: '0 0 16px 0' } },
    'paragraph': { id: 'paragraph', name: 'Paragraph', icon: 'fa-solid fa-paragraph', category: 'basic', defaultData: { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.' }, defaultStyles: { color: '#475569', fontSize: '16px', textAlign: 'left', margin: '0 0 16px 0', lineHeight: '1.6' } },
    'button': { id: 'button', name: 'Button', icon: 'fa-solid fa-square-caret-right', category: 'basic', defaultData: { content: 'Click Me', link: '#' }, defaultStyles: { width: 'fit-content', backgroundColor: '#3b82f6', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', fontSize: '16px', fontWeight: '500', display: 'inline-block', textAlign: 'center', textDecoration: 'none', margin: '0 0 16px 0' } },
    'divider': { id: 'divider', name: 'Divider', icon: 'fa-solid fa-minus', category: 'basic', defaultData: {}, defaultStyles: { borderBottom: '1px solid #cbd5e1', margin: '24px 0', height: '1px' } },
    'spacer': { id: 'spacer', name: 'Spacer', icon: 'fa-solid fa-arrows-up-down', category: 'basic', defaultData: {}, defaultStyles: { height: '40px' } },
    'list': { id: 'list', name: 'List', icon: 'fa-solid fa-list', category: 'basic', defaultData: { items: ['First Item', 'Second Item', 'Third Item'] }, defaultStyles: { color: '#475569', fontSize: '16px', margin: '0 0 16px 0', paddingLeft: '20px' } },
    'quote': { id: 'quote', name: 'Blockquote', icon: 'fa-solid fa-quote-left', category: 'basic', defaultData: { text: 'The best way to predict the future is to invent it.', author: '- Alan Kay' }, defaultStyles: { borderLeft: '4px solid #3b82f6', padding: '16px 24px', backgroundColor: '#f8fafc', color: '#1e293b', fontStyle: 'italic', margin: '0 0 16px 0' } },

    // Media
    'image': { id: 'image', name: 'Image', icon: 'fa-regular fa-image', category: 'media', defaultData: { src: 'https://via.placeholder.com/600x400', alt: 'Placeholder' }, defaultStyles: { width: '100%', height: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '8px', display: 'block', margin: '0 0 16px 0' } },
    'video': { id: 'video', name: 'Video', icon: 'fa-brands fa-youtube', category: 'media', defaultData: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }, defaultStyles: { width: '100%', height: '315px', borderRadius: '8px', margin: '0 0 16px 0' } },
    'gallery': { id: 'gallery', name: 'Gallery', icon: 'fa-solid fa-images', category: 'media', defaultData: { images: ['https://via.placeholder.com/300','https://via.placeholder.com/300','https://via.placeholder.com/300'] }, defaultStyles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '0 0 16px 0' } },
    'audio': { id: 'audio', name: 'Audio', icon: 'fa-solid fa-music', category: 'media', defaultData: { url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }, defaultStyles: { width: '100%', margin: '0 0 16px 0' } },
    
    // Advanced
    'navbar': { id: 'navbar', name: 'Navbar', icon: 'fa-solid fa-compass', category: 'advanced', defaultData: { brand: 'BrandName', links: [{label:'Home', url:'#'}, {label:'About', url:'#'}] }, defaultStyles: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #eee' } },
    'contact': { id: 'contact', name: 'Contact Form', icon: 'fa-solid fa-envelope', category: 'advanced', defaultData: { emailTo: 'test@example.com', btnText: 'Send Message' }, defaultStyles: { background: '#ffffff', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' } },
    'socials': { id: 'socials', name: 'Social Icons', icon: 'fa-solid fa-share-nodes', category: 'advanced', defaultData: { links: [{icon:'fa-brands fa-facebook', url:'#'}, {icon:'fa-brands fa-twitter', url:'#'}, {icon:'fa-brands fa-instagram', url:'#'}] }, defaultStyles: { display: 'flex', gap: '16px', fontSize: '24px', color: '#3b82f6', justifyContent: 'center' } },
    'map': { id: 'map', name: 'Google Map', icon: 'fa-solid fa-map-location-dot', category: 'advanced', defaultData: { address: 'New York, NY' }, defaultStyles: { width: '100%', height: '300px', borderRadius: '8px' } },
    'skills': { id: 'skills', name: 'Skills Bar', icon: 'fa-solid fa-bars-progress', category: 'advanced', defaultData: { skillName: 'HTML/CSS', percentage: 90 }, defaultStyles: { margin: '0 0 16px 0' } },
    'features': { id: 'features', name: 'Feature Box', icon: 'fa-solid fa-star', category: 'advanced', defaultData: { icon: 'fa-solid fa-bolt', title: 'Fast Performance', desc: 'Optimized for speed.' }, defaultStyles: { textAlign: 'center', padding: '24px', background: '#f8fafc', borderRadius: '8px' } },
    'faq': { id: 'faq', name: 'FAQ Accordion', icon: 'fa-solid fa-clipboard-question', category: 'advanced', defaultData: { questions: [{q: 'How does this work?', a: 'It is a drag and drop builder.'}, {q: 'Is it responsive?', a: 'Yes, absolutely.'}] }, defaultStyles: { border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#fff' } },
    'testimonial': { id: 'testimonial', name: 'Testimonial', icon: 'fa-solid fa-comment-quote', category: 'advanced', defaultData: { quote: 'This builder is amazing!', author: 'John Doe', role: 'CEO' }, defaultStyles: { background: '#f1f5f9', padding: '24px', borderRadius: '8px', fontStyle: 'italic' } },
    'download': { id: 'download', name: 'Download', icon: 'fa-solid fa-download', category: 'advanced', defaultData: { text: 'Download PDF', fileUrl: '#' }, defaultStyles: { backgroundColor: '#10b981', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', fontSize: '16px', fontWeight: '500', display: 'inline-block', textAlign: 'center', textDecoration: 'none', margin: '0 0 16px 0' } },
    'products': { id: 'products', name: 'Product Card', icon: 'fa-solid fa-cart-shopping', category: 'advanced', defaultData: { image: 'https://via.placeholder.com/300x200', title: 'Awesome Product', price: '$99.00', btnText: 'Add to Cart' }, defaultStyles: { border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', textAlign: 'center', background: '#fff', paddingBottom: '16px' } },
    'slider': { id: 'slider', name: 'Slider', icon: 'fa-solid fa-panorama', category: 'advanced', defaultData: { images: ['https://via.placeholder.com/800x400?text=Slide+1', 'https://via.placeholder.com/800x400?text=Slide+2'] }, defaultStyles: { width: '100%', height: '400px', display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', gap: '10px' } },
    'stats': { id: 'stats', name: 'Stats Counter', icon: 'fa-solid fa-arrow-trend-up', category: 'advanced', defaultData: { number: '500+', label: 'Happy Clients' }, defaultStyles: { textAlign: 'center', padding: '24px' } },
    'html': { id: 'html', name: 'Raw HTML', icon: 'fa-solid fa-code', category: 'advanced', defaultData: { code: '<div style="color:red">Custom Code</div>' }, defaultStyles: { margin: '0 0 16px 0' } },
    'table': { id: 'table', name: 'Table', icon: 'fa-solid fa-table', category: 'advanced', defaultData: { headers: ['Item', 'Price'], rows: [['Basic Plan', '$10'], ['Pro Plan', '$20']] }, defaultStyles: { width: '100%', borderCollapse: 'collapse', margin: '0 0 16px 0' } },
    'badges': { id: 'badges', name: 'Badges', icon: 'fa-solid fa-tags', category: 'advanced', defaultData: { tags: ['Design', 'Development', 'Marketing'] }, defaultStyles: { display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '0 0 16px 0' } }
};

// Global State
let layoutData = [];
let targetInsertSectionId = null;
let targetInsertColIndex = null;
let currentInsertIndex = -1; // -1 means append

// INIT UI
document.addEventListener('DOMContentLoaded', () => {
    renderModuleList();
    loadLayoutData();
    
    // Save button event
    document.getElementById('saveBtn').addEventListener('click', () => {
        saveLayoutData();
        alert('Layout Saved Locally!');
    });
});

// Render Sidebar Module List
function renderModuleList() {
    const cats = { basic: document.getElementById('modules-basic'), media: document.getElementById('modules-media'), advanced: document.getElementById('modules-advanced') };
    
    Object.values(MODULES).forEach(mod => {
        if(!cats[mod.category]) return;
        
        const btn = document.createElement('button');
        btn.className = 'module-item flex flex-col items-center justify-center gap-2 bg-slate-800 border border-slate-700 p-3 rounded text-slate-300 hover:text-white';
        btn.innerHTML = `<i class="${mod.icon} text-xl mb-1"></i><span class="text-xs font-medium">${mod.name}</span>`;
        btn.onclick = () => {
            if(targetInsertSectionId && targetInsertColIndex !== null) {
                addWidgetToColumn(targetInsertSectionId, targetInsertColIndex, mod.id);
            } else {
                alert('Please select a column (click + on canvas) first!');
            }
        };
        cats[mod.category].appendChild(btn);
    });
}

// Tab Switching
window.switchTab = function(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tab-btn[onclick="switchTab('${tab}')"]`).classList.add('active');
    
    document.getElementById('tab-elements').classList.add('hidden');
    document.getElementById('tab-settings').classList.add('hidden');
    document.getElementById(`tab-${tab}`).classList.remove('hidden');
}

// Device Preview
window.setCanvasWidth = function(width) {
    document.getElementById('canvas-frame').style.width = width;
    document.getElementById('canvas-frame').style.margin = width !== '100%' ? '0 auto' : '0';
}

// ----------------- LAYOUT MANAGEMENT -----------------

window.openLayoutModal = function(insertIndex = -1) {
    currentInsertIndex = insertIndex;
    document.getElementById('layout-modal').classList.remove('hidden');
}

window.closeLayoutModal = function() {
    document.getElementById('layout-modal').classList.add('hidden');
}

window.addSection = function(colWidths) {
    const newSection = {
        id: 'sec_' + Date.now().toString(36),
        styles: { backgroundColor: '#ffffff', padding: '40px 20px' },
        columns: colWidths.map(w => ({ width: w, widgets: [], styles: {} }))
    };

    if (currentInsertIndex === -1 || currentInsertIndex >= layoutData.length) {
        layoutData.push(newSection);
    } else {
        layoutData.splice(currentInsertIndex + 1, 0, newSection);
    }
    
    syncToCanvas();
    closeLayoutModal();
}

window.setTargetColumn = function(sectionId, colIndex) {
    targetInsertSectionId = sectionId;
    targetInsertColIndex = colIndex;
    switchTab('elements');
    document.getElementById('no-selection-msg').classList.add('hidden');
    document.getElementById('modules-container').classList.remove('hidden');
}

window.addWidgetToColumn = function(sectionId, colIndex, moduleTypeId) {
    const mod = MODULES[moduleTypeId];
    const sec = layoutData.find(s => s.id === sectionId);
    if(sec) {
        const col = sec.columns[colIndex];
        const newWidget = {
            id: 'wid_' + Date.now().toString(36),
            type: moduleTypeId,
            data: JSON.parse(JSON.stringify(mod.defaultData)),
            styles: JSON.parse(JSON.stringify(mod.defaultStyles))
        };
        col.widgets.push(newWidget);
        syncToCanvas();
        
        // Select it immediately
        selectWidget(sectionId, colIndex, newWidget);
    }
}

// ----------------- WIDGET RENDERING ENGINE -----------------
// This is called by canvas.js to get HTML output for widgets
window.renderWidgetHTML = function(widget) {
    const data = widget.data;
    switch(widget.type) {
        // Basic
        case 'heading': return `<${data.tag}>${data.content}</${data.tag}>`;
        case 'paragraph': return `<p>${data.content.replace(/\n/g, '<br>')}</p>`;
        case 'button': return `<a href="${data.link}" style="display:inline-block">${data.content}</a>`;
        case 'divider': return `<div style="width:100%; border-bottom: inherit;"></div>`; 
        case 'spacer': return `<div style="width:100%; height: inherit;"></div>`; 
        case 'list': return `<ul>${data.items.map(i => `<li style="margin-bottom:8px">${i}</li>`).join('')}</ul>`;
        case 'quote': return `<div><div style="font-size:1.1em; margin-bottom:8px">"${data.text}"</div><div style="font-weight:600; font-size:0.9em">${data.author}</div></div>`;
        
        // Media
        case 'image': return `<img src="${data.src}" alt="${data.alt || ''}" style="width:100%; height:100%; object-fit:${widget.styles?.objectFit || 'cover'}; display:block; border-radius:inherit;">`;
        case 'video': return `<iframe src="${data.url}" frameborder="0" allowfullscreen style="width:100%; height:100%;"></iframe>`;
        case 'gallery': return data.images.map(img => `<img src="${img}" style="width:100%; border-radius:4px; aspect-ratio:1/1; object-fit:cover;">`).join('');
        case 'audio': return `<audio controls src="${data.url}" style="width:100%;"></audio>`;
        
        // Advanced
        case 'navbar': 
            return `<div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
                <div style="font-weight:bold; font-size:24px;">${data.brand}</div>
                <div style="display:flex; gap:16px;">
                    ${data.links.map(l => `<a href="${l.url}" style="text-decoration:none; color:inherit;">${l.label}</a>`).join('')}
                </div>
            </div>`;
        case 'contact':
            return `<form onsubmit="event.preventDefault()">
                <div style="margin-bottom:12px"><input type="text" placeholder="Name" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:4px;"></div>
                <div style="margin-bottom:12px"><input type="email" placeholder="Email" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:4px;"></div>
                <div style="margin-bottom:12px"><textarea placeholder="Message" rows="4" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:4px;"></textarea></div>
                <button type="submit" style="background:#3b82f6; color:white; border:none; padding:12px 24px; border-radius:4px; cursor:pointer; font-weight:bold;">${data.btnText}</button>
            </form>`;
        case 'socials':
            return data.links.map(l => `<a href="${l.url}" style="color:inherit; text-decoration:none;"><i class="${l.icon}"></i></a>`).join('');
        case 'map':
            const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
            return `<iframe src="${mapSrc}" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" style="width:100%; height:100%; border-radius:inherit;"></iframe>`;
        case 'skills':
            return `
                <div style="margin-bottom: 8px; display:flex; justify-content:space-between; font-weight:600; font-size:14px;">
                    <span>${data.skillName}</span><span>${data.percentage}%</span>
                </div>
                <div style="background:#e2e8f0; height:8px; border-radius:4px; overflow:hidden;">
                    <div style="background:#3b82f6; width:${data.percentage}%; height:100%;"></div>
                </div>`;
        case 'features':
            return `
                <i class="${data.icon}" style="font-size:32px; color:#3b82f6; margin-bottom:16px;"></i>
                <h3 style="font-size:20px; font-weight:bold; margin-bottom:8px; margin-top:0;">${data.title}</h3>
                <p style="margin:0; color:#64748b; font-size:14px;">${data.desc}</p>
            `;
        case 'faq':
            return data.questions.map(q => `
                <div style="margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 12px;">
                    <div style="font-weight:600; font-size:16px; margin-bottom:4px;">${q.q}</div>
                    <div style="color:#475569; font-size:14px;">${q.a}</div>
                </div>
            `).join('');
        case 'testimonial':
            return `
                <div style="font-size:16px; margin-bottom:16px; color:#334155; font-style:italic;">"${data.quote}"</div>
                <div style="font-weight:600;">${data.author}</div>
                <div style="font-size:12px; color:#64748b;">${data.role}</div>
            `;
        case 'download':
            return `<a href="${data.fileUrl}" download style="display:inline-block"><i class="fa-solid fa-download" style="margin-right:8px;"></i>${data.text}</a>`;
        case 'products':
            return `
                <img src="${data.image}" style="width:100%; height:auto; display:block; margin-bottom:16px;">
                <h3 style="margin:0 0 8px 0; font-size:18px;">${data.title}</h3>
                <div style="font-weight:bold; color:#3b82f6; margin-bottom:16px; font-size:16px;">${data.price}</div>
                <button style="background:#3b82f6; color:white; border:none; padding:8px 16px; border-radius:4px; cursor:pointer;">${data.btnText}</button>
            `;
        case 'slider':
            return data.images.map(img => `<img src="${img}" style="width:100%; height:100%; flex: 0 0 100%; object-fit:cover; scroll-snap-align: start;">`).join('');
        case 'stats':
            return `
                <div style="font-size:48px; font-weight:bold; color:#3b82f6; margin-bottom:8px;">${data.number}</div>
                <div style="font-size:16px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:1px;">${data.label}</div>
            `;
        case 'html':
            return data.code;
        case 'table':
            return `
                <table style="width:100%; border-collapse:collapse;">
                    <thead>
                        <tr style="background:#f1f5f9; border-bottom:2px solid #cbd5e1;">
                            ${data.headers.map(h => `<th style="padding:12px; text-align:left;">${h}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${data.rows.map(row => `
                            <tr style="border-bottom:1px solid #e2e8f0;">
                                ${row.map(cell => `<td style="padding:12px;">${cell}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        case 'badges':
            return data.tags.map(tag => `<span style="background:#3b82f6; color:white; padding:4px 12px; border-radius:16px; font-size:12px; font-weight:600;">${tag}</span>`).join('');
            
        default:
            return `<div style="padding:20px; background:#f87171; color:white;">Unknown Widget: ${widget.type}</div>`;
    }
}

// ----------------- SETTINGS ENGINE -----------------

let currentSelection = null; // {type: 'widget'|'section', sectionId, colIndex?, element: widget|sectionObject}

window.selectWidget = function(sectionId, colIndex, widgetId) {
    const sec = layoutData.find(s => s.id === sectionId);
    if (!sec) return;
    const widget = sec.columns[colIndex].widgets.find(w => w.id === widgetId);
    if (!widget) return;

    currentSelection = { type: 'widget', sectionId, colIndex, element: widget };
    document.getElementById('empty-settings').classList.add('hidden');
    document.getElementById('active-settings').classList.remove('hidden');
    document.getElementById('setting-title').textContent = MODULES[widget.type].name + ' Settings';
    
    switchTab('settings');
    buildSettingsForm(widget);
};

window.selectSection = function(section) {
    currentSelection = { type: 'section', sectionId: section.id, element: section };
    document.getElementById('empty-settings').classList.add('hidden');
    document.getElementById('active-settings').classList.remove('hidden');
    document.getElementById('setting-title').textContent = 'Section Settings';
    
    switchTab('settings');
    buildSettingsForm(section, 'section');
};

window.selectColumn = function(sectionId, colIndex) {
    const sec = layoutData.find(s => s.id === sectionId);
    if (!sec) return;
    const col = sec.columns[colIndex];
    
    currentSelection = { type: 'column', sectionId, colIndex, element: col };
    document.getElementById('empty-settings').classList.add('hidden');
    document.getElementById('active-settings').classList.remove('hidden');
    document.getElementById('setting-title').textContent = 'Column Settings';
    
    switchTab('settings');
    buildSettingsForm(col, 'column');
};

window.deleteWidget = function(sectionId, colIndex, widgetId) {
    const sec = layoutData.find(s => s.id === sectionId);
    if(sec) {
        sec.columns[colIndex].widgets = sec.columns[colIndex].widgets.filter(w => w.id !== widgetId);
        syncToCanvas();
        if(currentSelection && currentSelection.element.id === widgetId) {
            document.getElementById('empty-settings').classList.remove('hidden');
            document.getElementById('active-settings').classList.add('hidden');
        }
    }
};

window.deleteSelected = function() {
    if(!currentSelection) return;
    if(currentSelection.type === 'widget') {
        window.deleteWidget(currentSelection.sectionId, currentSelection.colIndex, currentSelection.element.id);
    } else {
        layoutData = layoutData.filter(s => s.id !== currentSelection.sectionId);
        syncToCanvas();
    }
    document.getElementById('empty-settings').classList.remove('hidden');
    document.getElementById('active-settings').classList.add('hidden');
};

function buildSettingsForm(element, mode = 'widget') {
    const container = document.getElementById('setting-controls');
    container.innerHTML = '';
    
    // 1. DATA CONTROLS (Only for widgets)
    if(mode === 'widget') {
        const dataGroup = document.createElement('div');
        dataGroup.className = 'mb-6';
        dataGroup.innerHTML = '<h4 class="text-xs font-bold text-slate-400 mb-2 border-b border-slate-700 pb-1">CONTENT</h4>';
        
        Object.keys(element.data).forEach(key => {
            const val = element.data[key];
            const wrap = document.createElement('div');
            wrap.className = 'mb-3';
            
            const label = document.createElement('label');
            label.className = 'block text-xs text-slate-300 mb-1 capitalize';
            label.innerText = key;
            wrap.appendChild(label);
            
            let input;
            
            if (Array.isArray(val) && val.length > 0 && Array.isArray(val[0])) {
                // Array of Arrays (e.g. Table Rows)
                input = document.createElement('div');
                input.className = 'space-y-2 border border-slate-700 p-2 rounded bg-slate-800';
                const renderList = () => {
                    input.innerHTML = '';
                    val.forEach((rowArr, index) => {
                        const row = document.createElement('div');
                        row.className = 'flex gap-1 pb-2 mb-2 border-b border-slate-700 last:border-0 last:mb-0 last:pb-0 relative pt-4';
                        
                        const delBtn = document.createElement('button');
                        delBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
                        delBtn.className = 'absolute top-0 right-0 text-red-400 hover:text-red-300 text-[10px]';
                        delBtn.onclick = () => {
                            val.splice(index, 1);
                            renderList();
                            syncToCanvas();
                        };
                        row.appendChild(delBtn);

                        rowArr.forEach((cellVal, cIdx) => {
                            const f = document.createElement('input');
                            f.className = 'flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs text-white w-0';
                            f.value = cellVal;
                            f.oninput = (e) => {
                                val[index][cIdx] = e.target.value;
                                syncToCanvas();
                            };
                            row.appendChild(f);
                        });
                        input.appendChild(row);
                    });
                    const addBtn = document.createElement('button');
                    addBtn.className = 'w-full py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-300 mt-2';
                    addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Row';
                    addBtn.onclick = () => {
                        const newRow = new Array(val[0].length).fill('');
                        val.push(newRow);
                        renderList();
                        syncToCanvas();
                    };
                    input.appendChild(addBtn);
                };
                renderList();
            } else if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'object') {
                // Array of Objects (e.g. Navbar Links, FAQ, Socials)
                input = document.createElement('div');
                input.className = 'space-y-2 border border-slate-700 p-2 rounded bg-slate-800';
                const renderList = () => {
                    input.innerHTML = '';
                    val.forEach((item, index) => {
                        const row = document.createElement('div');
                        row.className = 'flex flex-col gap-1 pb-2 mb-2 border-b border-slate-700 last:border-0 last:mb-0 last:pb-0 relative pt-3';
                        
                        const delBtn = document.createElement('button');
                        delBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
                        delBtn.className = 'absolute top-0 right-0 text-red-400 hover:text-red-300 text-[10px]';
                        delBtn.onclick = () => {
                            val.splice(index, 1);
                            renderList();
                            syncToCanvas();
                        };
                        row.appendChild(delBtn);

                        Object.keys(item).forEach(k => {
                            const f = document.createElement('div');
                            f.className = 'flex items-center gap-2 pr-4';
                            f.innerHTML = `<span class="text-[10px] text-slate-400 w-10 truncate capitalize">${k}</span>
                                           <input type="text" class="flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs text-white" value="${item[k]}">`;
                            f.querySelector('input').oninput = (e) => {
                                item[k] = e.target.value;
                                syncToCanvas();
                            };
                            row.appendChild(f);
                        });
                        input.appendChild(row);
                    });
                    const addBtn = document.createElement('button');
                    addBtn.className = 'w-full py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-300 mt-2';
                    addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
                    addBtn.onclick = () => {
                        const newItem = {};
                        Object.keys(val[0]).forEach(k => newItem[k] = '');
                        val.push(newItem);
                        renderList();
                        syncToCanvas();
                    };
                    input.appendChild(addBtn);
                };
                renderList();
            } else if (Array.isArray(val)) {
                // Array of Strings (e.g. List, Tags, Gallery URLs)
                input = document.createElement('textarea');
                input.rows = 4;
                input.className = 'w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-xs text-white focus:border-blue-500 outline-none leading-relaxed';
                input.placeholder = "Enter one item per line...";
                input.value = val.join('\n');
                input.oninput = (e) => {
                    element.data[key] = e.target.value.split('\n').map(s => s.trim()).filter(s => s.length > 0);
                    syncToCanvas();
                };
            } else if (typeof val === 'string' && val.length > 50 && key !== 'src' && key !== 'url' && key !== 'image') {
                // Long Text -> Textarea
                input = document.createElement('textarea');
                input.rows = 3;
                input.className = 'w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-xs text-white focus:border-blue-500 outline-none';
                input.value = val;
                input.oninput = (e) => {
                    element.data[key] = e.target.value;
                    syncToCanvas();
                };
            } else if (key === 'src' || key === 'url' || key === 'image' || key.toLowerCase().includes('image')) {
                // Image/Media URL with File Picker
                input = document.createElement('div');
                input.innerHTML = `
                    <input type="file" accept="image/*,video/*,audio/*" class="w-full text-[10px] text-slate-300 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-500 bg-slate-800 border border-slate-700 rounded p-1 mb-2">
                    <input type="text" placeholder="Or enter URL" class="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-xs text-white" value="${val}">
                `;
                const fileIn = input.querySelector('input[type="file"]');
                const textIn = input.querySelector('input[type="text"]');
                
                fileIn.onchange = (e) => {
                    const file = e.target.files[0];
                    if(file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                            element.data[key] = ev.target.result;
                            textIn.value = ''; // visually clear text input
                            syncToCanvas();
                        };
                        reader.readAsDataURL(file);
                    }
                };
                textIn.oninput = (e) => {
                    element.data[key] = e.target.value;
                    syncToCanvas();
                };
            } else {
                // Standard short input
                input = document.createElement('input');
                input.type = typeof val === 'number' ? 'number' : 'text';
                input.className = 'w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-xs text-white focus:border-blue-500 outline-none';
                input.value = val;
                input.oninput = (e) => {
                    element.data[key] = input.type === 'number' ? Number(e.target.value) : e.target.value;
                    syncToCanvas();
                };
            }
            
            wrap.appendChild(input);
            dataGroup.appendChild(wrap);
        });
        container.appendChild(dataGroup);
    }
    
    // 2. STYLE CONTROLS
    const styleGroup = document.createElement('div');
    styleGroup.innerHTML = '<h4 class="text-xs font-bold text-slate-400 mb-2 border-b border-slate-700 pb-1">STYLES</h4>';
    
    const stylesDef = [
        { key: 'containerWidth', label: 'Max Width', type: 'text' },
        { key: 'color', label: 'Text Color', type: 'color' },
        { key: 'backgroundColor', label: 'Background', type: 'color' },
        { key: 'fontSize', label: 'Font Size', type: 'text' },
        { key: 'textAlign', label: 'Alignment', type: 'select', options: ['left', 'center', 'right', 'justify'] },
        { key: 'padding', label: 'Padding', type: 'text' },
        { key: 'margin', label: 'Margin', type: 'text' },
        { key: 'borderRadius', label: 'Border Radius', type: 'text' },
        { key: 'width', label: 'Width', type: 'text' },
        { key: 'height', label: 'Height', type: 'text' },
        { key: 'maxHeight', label: 'Max Height', type: 'text' },
        { key: 'aspectRatio', label: 'Aspect Ratio', type: 'text' },
        { key: 'objectFit', label: 'Object Fit', type: 'select', options: ['fill', 'contain', 'cover', 'none', 'scale-down'] }
    ];
    
    stylesDef.forEach(def => {
        if(!element.styles) element.styles = {};
        if(element.styles[def.key] !== undefined || mode !== 'widget') {
            let currentVal = element.styles[def.key] || '';
            
            const wrap = document.createElement('div');
            wrap.className = 'mb-3 flex items-center justify-between gap-2';
            
            const label = document.createElement('label');
            label.className = 'text-xs text-slate-300 w-1/3';
            label.innerText = def.label;
            wrap.appendChild(label);
            
            let input;
            if(def.type === 'select') {
                input = document.createElement('select');
                input.className = 'w-2/3 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs text-white outline-none';
                input.innerHTML = `<option value="">Default</option>`;
                def.options.forEach(opt => {
                    input.innerHTML += `<option value="${opt}" ${currentVal === opt ? 'selected' : ''}>${opt}</option>`;
                });
            } else if (def.type === 'color') {
                input = document.createElement('input');
                input.type = 'color';
                input.className = 'w-8 h-6 bg-transparent border-0 cursor-pointer p-0';
                input.value = currentVal;
            } else {
                input = document.createElement('input');
                input.type = 'text';
                input.className = 'w-2/3 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs text-white outline-none';
                input.value = currentVal;
            }
            
            input.oninput = (e) => {
                element.styles[def.key] = e.target.value;
                syncToCanvas();
            };
            
            wrap.appendChild(input);
            styleGroup.appendChild(wrap);
        }
    });
    
    container.appendChild(styleGroup);
}

// ----------------- SYNC AND STATE -----------------

window.updateLayoutData = function(data) {
    layoutData = data;
    saveLayoutData();
};

window.syncToCanvas = function() {
    const iframe = document.getElementById('canvas-frame');
    if(iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'SYNC_LAYOUT', data: layoutData }, '*');
    }
    saveLayoutData();
}

function saveLayoutData() {
    localStorage.setItem('getshere_builder_draft', JSON.stringify(layoutData));
}

function loadLayoutData() {
    const saved = localStorage.getItem('getshere_builder_draft');
    if(saved) {
        try {
            layoutData = JSON.parse(saved);
        } catch(e) { console.error('Failed to parse layout', e); }
    }
    
    // Initial sync
    setTimeout(syncToCanvas, 500);
}

// Global Deselect
document.getElementById('canvas-frame').addEventListener('load', () => {
    syncToCanvas();
    const doc = document.getElementById('canvas-frame').contentDocument;
    if(doc) {
        doc.addEventListener('click', () => {
            currentSelection = null;
            document.getElementById('empty-settings').classList.remove('hidden');
            document.getElementById('active-settings').classList.add('hidden');
            document.getElementById('canvas-frame').contentWindow.postMessage({ type: 'DESELECT' }, '*');
        });
    }
});


