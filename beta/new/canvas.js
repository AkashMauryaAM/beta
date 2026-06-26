// canvas.js - Runs inside the iframe

let layoutData = []; // The source of truth array
let activeTarget = null; // Can be a section index, or {sectionId, colIndex} for adding widgets
let selectedWidget = null; // {sectionId, colIndex, widgetId}

// Render the entire layout from JSON
function renderLayout() {
    const root = document.getElementById('render-root');
    root.innerHTML = '';

    if (layoutData.length === 0) {
        root.innerHTML = `
            <div class="empty-canvas">
                <i class="fa-regular fa-map" style="font-size: 48px; opacity: 0.5;"></i>
                <h2 style="margin-top: 16px; margin-bottom: 0;">Start Building Your Page</h2>
                <p style="margin-top: 8px; font-size: 14px;">Add a section to begin designing.</p>
                <button onclick="parent.openLayoutModal(-1)"><i class="fa-solid fa-plus"></i> Add New Section</button>
            </div>
        `;
        return;
    }

    layoutData.forEach((section, sIdx) => {
        const secEl = document.createElement('section');
        secEl.className = 'g-section';
        secEl.id = section.id;
        
        // Apply Section Styles
        if(section.styles) {
            Object.assign(secEl.style, section.styles);
        }

        // Section Controls Overlay
        const controls = document.createElement('div');
        controls.className = 'sec-controls';
        controls.innerHTML = `
            <i class="fa-solid fa-arrow-up" title="Move Up" onclick="moveSection(${sIdx}, -1)"></i>
            <i class="fa-solid fa-arrow-down" title="Move Down" onclick="moveSection(${sIdx}, 1)"></i>
            <i class="fa-solid fa-gear" title="Section Settings" onclick="editSection('${section.id}')"></i>
            <i class="fa-solid fa-trash" title="Delete Section" onclick="deleteSection('${section.id}')"></i>
        `;
        secEl.appendChild(controls);

        const container = document.createElement('div');
        container.className = 'g-container';
        if(section.styles && section.styles.containerWidth) {
            container.style.maxWidth = section.styles.containerWidth;
        }
        const row = document.createElement('div');
        row.className = 'g-row';

        section.columns.forEach((col, cIdx) => {
            const colEl = document.createElement('div');
            colEl.className = 'g-col';
            colEl.style.width = col.width + '%';
            if (col.styles) {
                Object.assign(colEl.style, col.styles);
                if (col.styles.height || col.styles.maxHeight) {
                    colEl.style.overflow = 'hidden';
                }
            }
            if(col.widgets && col.widgets.length > 0) {
                colEl.classList.add('has-widgets');
            }

            // Column Controls Overlay
            const colCtrl = document.createElement('div');
            colCtrl.className = 'col-controls';
            colCtrl.innerHTML = `<i class="fa-solid fa-gear" title="Column Settings" onclick="event.stopPropagation(); parent.selectColumn('${section.id}', ${cIdx})"></i>`;
            colEl.appendChild(colCtrl);

            // Render Widgets
            if(col.widgets) {
                col.widgets.forEach((widget, wIdx) => {
                    const widEl = renderWidget(widget, section.id, cIdx);
                    colEl.appendChild(widEl);
                });
            }

            // Add Widget Button for this column
            const addBtn = document.createElement('div');
            addBtn.className = 'col-add-btn';
            addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
            addBtn.onclick = () => {
                parent.setTargetColumn(section.id, cIdx);
            };
            colEl.appendChild(addBtn);

            row.appendChild(colEl);
        });

        container.appendChild(row);
        secEl.appendChild(container);
        
        // Bottom add section button
        const addSecBottom = document.createElement('div');
        addSecBottom.style.cssText = "position: absolute; bottom: -14px; left: 50%; transform: translateX(-50%); z-index: 5;";
        addSecBottom.innerHTML = `<button onclick="parent.openLayoutModal(${sIdx})" style="background: #3b82f6; color: white; border: none; width: 28px; height: 28px; border-radius: 50%; cursor: pointer; display: none; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"><i class="fa-solid fa-plus"></i></button>`;
        secEl.addEventListener('mouseenter', () => addSecBottom.querySelector('button').style.display = 'flex');
        secEl.addEventListener('mouseleave', () => addSecBottom.querySelector('button').style.display = 'none');
        secEl.appendChild(addSecBottom);

        root.appendChild(secEl);
    });
}

function renderWidget(widget, sectionId, colIndex) {
    const wrap = document.createElement('div');
    wrap.className = 'g-widget';
    wrap.id = widget.id;
    
    // Check if selected
    if(selectedWidget && selectedWidget.widgetId === widget.id) {
        wrap.classList.add('is-selected');
    }

    // Apply styles
    if(widget.styles) {
        Object.assign(wrap.style, widget.styles);
    }

    // Controls
    const controls = document.createElement('div');
    controls.className = 'wid-controls';
    controls.innerHTML = `
        <i class="fa-solid fa-trash" title="Delete Widget" onclick="event.stopPropagation(); parent.deleteWidget('${sectionId}', ${colIndex}, '${widget.id}')"></i>
    `;
    wrap.appendChild(controls);

    // Inner Content based on type
    const inner = document.createElement('div');
    inner.innerHTML = parent.renderWidgetHTML(widget);
    
    wrap.appendChild(inner);

    // Click to select
    wrap.onclick = (e) => {
        e.stopPropagation();
        selectedWidget = {sectionId, colIndex, widgetId: widget.id};
        renderLayout(); // re-render to apply selection highlight
        parent.selectWidget(sectionId, colIndex, widget.id);
    };

    return wrap;
}

// Actions
function deleteSection(id) {
    layoutData = layoutData.filter(s => s.id !== id);
    parent.updateLayoutData(layoutData);
    renderLayout();
}

function moveSection(index, dir) {
    if(index + dir < 0 || index + dir >= layoutData.length) return;
    const temp = layoutData[index];
    layoutData[index] = layoutData[index + dir];
    layoutData[index + dir] = temp;
    parent.updateLayoutData(layoutData);
    renderLayout();
}

function editSection(id) {
    const sec = layoutData.find(s => s.id === id);
    parent.selectSection(sec);
}

// Receive messages from parent
window.addEventListener('message', (e) => {
    if(e.data.type === 'SYNC_LAYOUT') {
        layoutData = e.data.data;
        renderLayout();
    }
    if(e.data.type === 'DESELECT') {
        selectedWidget = null;
        renderLayout();
    }
});

// Initialize empty if nothing loaded yet
document.addEventListener('DOMContentLoaded', () => {
    renderLayout();
});
