// simple_builder.js - Standalone logic without iframe

document.addEventListener('DOMContentLoaded', () => {
    
    const canvasArea = document.getElementById('canvas-area');

    window.switchTab = function(tabName) {
        document.getElementById('layouts-panel').classList.add('hidden');
        document.getElementById('patterns-panel').classList.add('hidden');
        document.getElementById('elements-panel').classList.add('hidden');
        document.getElementById('image-settings-panel').classList.add('hidden');
        
        document.getElementById('tab-layouts').className = 'flex-1 bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold py-2 px-2 rounded text-sm transition-colors border border-slate-700';
        document.getElementById('tab-patterns').className = 'flex-1 bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold py-2 px-2 rounded text-sm transition-colors border border-slate-700';
        
        if (tabName === 'layouts') {
            document.getElementById('layouts-panel').classList.remove('hidden');
            document.getElementById('tab-layouts').className = 'flex-1 bg-blue-600 text-white font-bold py-2 px-2 rounded text-sm transition-colors';
        } else if (tabName === 'patterns') {
            document.getElementById('patterns-panel').classList.remove('hidden');
            document.getElementById('tab-patterns').className = 'flex-1 bg-blue-600 text-white font-bold py-2 px-2 rounded text-sm transition-colors';
        }
    };

    window.addPattern = function(type) {
        if(type === 'hero') {
            const row = window.addSplitContainer([50, 50]);
            
            // Col 1
            let wrap = row.children[0].querySelector('div[contenteditable="false"]');
            window.activeContentWrap = wrap;
            window.activeCol = row.children[0];
            window.activeAddElementBtn = wrap.querySelector('button');
            window.injectElement('heading');
            window.injectElement('paragraph');
            
            // Col 2
            wrap = row.children[1].querySelector('div[contenteditable="false"]');
            window.activeContentWrap = wrap;
            window.activeCol = row.children[1];
            window.activeAddElementBtn = wrap.querySelector('button');
            window.injectElement('image', true); // pass true for mock
            
            window.cancelElementSelect();
            window.switchTab('patterns');
        } else if (type === 'features') {
            const row = window.addSplitContainer([33.33, 33.33, 33.33]);
            for(let i=0; i<3; i++) {
                let wrap = row.children[i].querySelector('div[contenteditable="false"]');
                window.activeContentWrap = wrap;
                window.activeCol = row.children[i];
                window.activeAddElementBtn = wrap.querySelector('button');
                window.injectElement('image', true);
                window.injectElement('heading');
                window.injectElement('paragraph');
            }
            window.cancelElementSelect();
            window.switchTab('patterns');
        } else if (type === 'cta') {
            const row = window.addSplitContainer([100]);
            let wrap = row.children[0].querySelector('div[contenteditable="false"]');
            window.activeContentWrap = wrap;
            window.activeCol = row.children[0];
            window.activeAddElementBtn = wrap.querySelector('button');
            window.injectElement('heading');
            window.injectElement('paragraph');
            window.cancelElementSelect();
            window.switchTab('patterns');
        }
    };

    window.activeContentWrap = null;
    window.activeCol = null;
    window.activeAddElementBtn = null;
    window.activeImageWrap = null;
    window.activeImageElement = null;

    window.updateImageStyle = function(prop, value) {
        if(window.activeImageElement) {
            window.activeImageElement.style[prop] = value;
        }
    };
    
    window.updateImageWrapStyle = function(prop, value) {
        if(window.activeImageWrap) {
            window.activeImageWrap.style[prop] = value;
        }
    };

    window.updateImageAttribute = function(attr, value) {
        if(window.activeImageElement) {
            window.activeImageElement.setAttribute(attr, value);
        }
    };

    window.updateImageWrapBorder = function() {
        if(window.activeImageWrap) {
            const width = document.getElementById('img-border-width').value + 'px';
            const color = document.getElementById('img-border-color').value;
            window.activeImageWrap.style.border = `${width} solid ${color}`;
            if(width === '0px') {
                window.activeImageWrap.style.border = 'none';
            }
        }
    };
    
    window.triggerImageUpload = function() {
        if(window.activeImageElement) {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.onchange = (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (readerEvent) => {
                        window.activeImageElement.src = readerEvent.target.result;
                        document.getElementById('img-src').value = readerEvent.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            };
            fileInput.click();
        }
    };
    
    window.deleteActiveImage = function() {
        if(window.activeImageWrap) {
            window.activeImageWrap.remove();
            window.closeImageSettings();
        }
    };
    
    window.closeImageSettings = function() {
        if(window.activeImageWrap) {
            window.activeImageWrap.classList.remove('ring-4', 'ring-blue-500');
        }
        window.activeImageWrap = null;
        window.activeImageElement = null;
        document.getElementById('image-settings-panel').classList.add('hidden');
        document.getElementById('layouts-panel').classList.remove('hidden');
    };

    window.injectElement = function(type, mockImage = false) {
        if (!window.activeContentWrap) return;
        
        const contentWrap = window.activeContentWrap;
        const addElementBtn = window.activeAddElementBtn;
        const col = window.activeCol;
        
        if (type === 'heading') {
            const h = document.createElement('h2');
            h.className = 'text-2xl font-bold w-full mb-2 outline-none break-words text-left shrink-0';
            h.contentEditable = 'true';
            h.innerText = 'Heading';
            contentWrap.insertBefore(h, addElementBtn);
            contentWrap.classList.remove('justify-center');
            contentWrap.classList.add('justify-start');
            col.classList.remove('justify-center');
            col.classList.add('justify-start');
        } else if (type === 'paragraph') {
            const p = document.createElement('p');
            p.className = 'text-base text-slate-600 w-full mb-2 outline-none break-words text-left shrink-0';
            p.contentEditable = 'true';
            p.innerText = 'Type your paragraph here...';
            contentWrap.insertBefore(p, addElementBtn);
            contentWrap.classList.remove('justify-center');
            contentWrap.classList.add('justify-start');
            col.classList.remove('justify-center');
            col.classList.add('justify-start');
        } else if (type === 'image') {
            
            const createImageNode = (src) => {
                const imgWrap = document.createElement('div');
                imgWrap.className = 'w-full mb-2 shrink-0 cursor-pointer transition-colors';
                imgWrap.innerHTML = `<img src="${src}" class="w-full h-auto object-cover rounded shadow-sm" alt="Image">`;
                
                imgWrap.onclick = (e) => {
                    e.stopPropagation();
                    if(window.activeCol) window.cancelElementSelect(); // close col selector if open
                    if(window.activeImageWrap) {
                        window.activeImageWrap.classList.remove('ring-4', 'ring-blue-500');
                    }
                    window.activeImageWrap = imgWrap;
                    window.activeImageElement = imgWrap.querySelector('img');
                    imgWrap.classList.add('ring-4', 'ring-blue-500');
                    
                    // Initialize controls if needed
                    document.getElementById('img-src').value = window.activeImageElement.src || '';
                    document.getElementById('img-alt').value = window.activeImageElement.alt || '';
                    
                    document.getElementById('img-width').value = parseInt(window.activeImageElement.style.width) || 100;
                    document.getElementById('img-height').value = parseInt(window.activeImageElement.style.height) || 0;
                    
                    document.getElementById('img-bg').value = '#000000'; // cannot easily extract exact rgb to hex reliably for input type=color
                    document.getElementById('img-padding').value = parseInt(window.activeImageWrap.style.padding) || 0;
                    document.getElementById('img-margin').value = parseInt(window.activeImageWrap.style.margin) || 0;
                    document.getElementById('img-border-width').value = parseInt(window.activeImageWrap.style.borderWidth) || 0;
                    document.getElementById('img-radius').value = parseInt(window.activeImageWrap.style.borderRadius) || 0;
                    
                    const currentShadow = window.activeImageWrap.style.boxShadow;
                    if(currentShadow) {
                        if(currentShadow.includes('0 1px 2px')) document.getElementById('img-shadow').value = "0 1px 2px 0 rgb(0 0 0 / 0.05)";
                        else if(currentShadow.includes('0 4px 6px')) document.getElementById('img-shadow').value = "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
                        else if(currentShadow.includes('0 10px 15px')) document.getElementById('img-shadow').value = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
                        else if(currentShadow.includes('0 25px 50px')) document.getElementById('img-shadow').value = "0 25px 50px -12px rgb(0 0 0 / 0.25)";
                        else document.getElementById('img-shadow').value = "none";
                    } else {
                        document.getElementById('img-shadow').value = "none";
                    }
                    
                    document.getElementById('img-opacity').value = window.activeImageWrap.style.opacity || 1;
                    document.getElementById('img-fit').value = window.activeImageElement.style.objectFit || 'cover';
                    
                    document.getElementById('layouts-panel').classList.add('hidden');
                    document.getElementById('elements-panel').classList.add('hidden');
                    document.getElementById('patterns-panel').classList.add('hidden');
                    document.getElementById('image-settings-panel').classList.remove('hidden');
                };

                contentWrap.insertBefore(imgWrap, addElementBtn);
                contentWrap.classList.remove('justify-center');
                contentWrap.classList.add('justify-start');
                col.classList.remove('justify-center');
                col.classList.add('justify-start');
            };

            if (mockImage) {
                createImageNode('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80');
            } else {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.onchange = (event) => {
                    const file = event.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (readerEvent) => {
                            createImageNode(readerEvent.target.result);
                        };
                        reader.readAsDataURL(file);
                    }
                };
                fileInput.click();
            }
        }
        
        if(!mockImage) {
            window.cancelElementSelect();
        }
    };

    window.cancelElementSelect = function() {
        if(window.activeCol) {
            window.activeCol.classList.remove('ring-4', 'ring-blue-500', 'ring-inset');
        }
        window.activeContentWrap = null;
        window.activeCol = null;
        window.activeAddElementBtn = null;
        document.getElementById('layouts-panel').classList.remove('hidden');
        document.getElementById('elements-panel').classList.add('hidden');
    };

    window.addSplitContainer = function(colWidths) {
        // Create the main container row (100% width, 500px height)
        const row = document.createElement('div');
        row.className = 'w-full flex bg-slate-100 rounded border-2 border-dashed border-slate-300 overflow-hidden';
        row.style.height = '500px';

        function createColumn(w) {
            const col = document.createElement('div');
            col.style.width = w + '%';
            col.style.flex = `0 0 ${w}%`;
            col.style.maxWidth = w + '%';
            col.className = 'flex flex-col items-center justify-center p-2 outline-none hover:bg-slate-200 transition-colors relative group min-w-0 overflow-hidden';
            // Instead of contenteditable on the whole column, we manage elements inside
            const contentWrap = document.createElement('div');
            contentWrap.className = 'w-full grow flex flex-col items-center justify-center relative';
            contentWrap.setAttribute('contenteditable', 'false');

            const addElementBtn = document.createElement('button');
            addElementBtn.className = 'w-10 h-10 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition-colors shrink-0 my-4';
            addElementBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
            
            addElementBtn.onclick = (e) => {
                e.stopPropagation();
                if(window.activeCol) {
                    window.cancelElementSelect();
                }
                window.activeContentWrap = contentWrap;
                window.activeCol = col;
                window.activeAddElementBtn = addElementBtn;
                
                col.classList.add('ring-4', 'ring-blue-500', 'ring-inset');
                
                document.getElementById('layouts-panel').classList.add('hidden');
                document.getElementById('elements-panel').classList.remove('hidden');
            };
            
            contentWrap.appendChild(addElementBtn);
            col.appendChild(contentWrap);

            // Wrapper for buttons (shows on hover)
            const btnWrap = document.createElement('div');
            btnWrap.className = 'absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity';
            btnWrap.setAttribute('contenteditable', 'false');

            // Move Left Button (<)
            const leftBtn = document.createElement('button');
            leftBtn.className = 'text-blue-400 hover:text-blue-600 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow';
            leftBtn.innerHTML = '<i class="fa-solid fa-arrow-left text-[10px]"></i>';
            leftBtn.onclick = (e) => {
                e.stopPropagation();
                if (col.previousElementSibling) {
                    row.insertBefore(col, col.previousElementSibling);
                    updateVisuals();
                }
            };

            // Move Right Button (>)
            const rightBtn = document.createElement('button');
            rightBtn.className = 'text-blue-400 hover:text-blue-600 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow';
            rightBtn.innerHTML = '<i class="fa-solid fa-arrow-right text-[10px]"></i>';
            rightBtn.onclick = (e) => {
                e.stopPropagation();
                if (col.nextElementSibling) {
                    row.insertBefore(col.nextElementSibling, col);
                    updateVisuals();
                }
            };

            // Add Column button (+)
            const addBtn = document.createElement('button');
            addBtn.className = 'text-green-500 hover:text-green-700 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow';
            addBtn.innerHTML = '<i class="fa-solid fa-plus text-xs"></i>';
            addBtn.onclick = (e) => {
                e.stopPropagation();
                let currentWidth = parseFloat(col.style.width) || 100;
                let halfWidth = currentWidth / 2;
                
                col.style.width = halfWidth + '%';
                col.style.flex = `0 0 ${halfWidth}%`;
                col.style.maxWidth = halfWidth + '%';
                
                const newCol = createColumn(halfWidth); 
                row.insertBefore(newCol, col.nextSibling); 
                
                updateVisuals();
            };

            // Delete Column button (x)
            const delBtn = document.createElement('button');
            delBtn.className = 'text-red-400 hover:text-red-600 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow';
            delBtn.innerHTML = '<i class="fa-solid fa-times text-xs"></i>';
            delBtn.onclick = (e) => {
                e.stopPropagation();
                if (confirm('Delete this column?')) {
                    let currentWidth = parseFloat(col.style.width) || 100;
                    let targetSibling = col.previousElementSibling || col.nextElementSibling;
                    
                    if (targetSibling) {
                        let siblingWidth = parseFloat(targetSibling.style.width) || 0;
                        let newW = siblingWidth + currentWidth;
                        targetSibling.style.width = newW + '%';
                        targetSibling.style.flex = `0 0 ${newW}%`;
                        targetSibling.style.maxWidth = newW + '%';
                        col.remove();
                    } else {
                        row.remove();
                    }
                    
                    updateVisuals();
                }
            };
            
            btnWrap.appendChild(leftBtn);
            btnWrap.appendChild(rightBtn);
            btnWrap.appendChild(addBtn);
            btnWrap.appendChild(delBtn);
            col.appendChild(btnWrap);
            
            return col;
        }

        function updateVisuals() {
            const currentCols = Array.from(row.children);
            currentCols.forEach((c, i) => {
                // Fix borders
                c.classList.remove('border-r', 'border-slate-300');
                if (i < currentCols.length - 1) {
                    c.classList.add('border-r', 'border-slate-300');
                }
                
                // Update heading text
                const heading = c.querySelector('h2');
                if (heading) {
                    let w = parseFloat(c.style.width) || 0;
                    heading.innerText = parseFloat(w.toFixed(1)) + '% Column';
                }
            });
        }

        // Initialize columns
        colWidths.forEach(w => {
            row.appendChild(createColumn(w));
        });
        
        // Run an initial recalculation to set borders properly
        updateVisuals();

        // Add the row to the canvas
        canvasArea.appendChild(row);
        
        // Auto-scroll to bottom
        canvasArea.parentElement.scrollTop = canvasArea.parentElement.scrollHeight;
    };

    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear the canvas?')) {
                canvasArea.innerHTML = '';
            }
        });
    }
});
