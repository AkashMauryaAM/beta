// editor.js - Live Visual Editor Logic

let pageConfig = null;
let currentListKey = '';
let activeTab = 'tab-identity';
let iframeLoaded = false;
let reloadDebounceTimeout = null;

// Template lists categorized by layout type
const TEMPLATE_OPTIONS = [
  { value: 'personal1', text: 'Personal Theme 1 - Creative Portfolio' },
  { value: 'personal2', text: 'Personal Theme 2 - Minimal Grid' },
  { value: 'personal3', text: 'Personal Theme 3 - Dark Mode Developer' },
  { value: 'personal4', text: 'Personal Theme 4 - Elegant Designer' },
  { value: 'personal5', text: 'Personal Theme 5 - Typographic Resume' },
  { value: 'personal6', text: 'Personal Theme 6 - Neon Cyberpunk' },
  { value: 'personal7', text: 'Personal Theme 7 - Clean Corporate' },
  { value: 'shop1', text: 'Shop Theme 1 - Modern E-Commerce' },
  { value: 'shop2', text: 'Shop Theme 2 - Boutique Showcase' },
  { value: 'shop3', text: 'Shop Theme 3 - Farm Fresh Organic' },
  { value: 'shop4', text: 'Shop Theme 4 - Electronics Digital' },
  { value: 'shop5', text: 'Shop Theme 5 - Elegant Artisan' },
  { value: 'school1', text: 'School Theme 1 - Classic Academy' },
  { value: 'school2', text: 'School Theme 2 - Tech Institute' },
  { value: 'school3', text: 'School Theme 3 - Kindergarten & Playhouse' },
  { value: 'school4', text: 'School Theme 4 - Higher Education' },
  { value: 'school5', text: 'School Theme 5 - Music & Arts Academy' },
  { value: 'cv1', text: 'CV Theme 1 - Professional Resume Grid' }
];

// Initialize Editor
window.addEventListener('DOMContentLoaded', () => {
  initTemplateDropdown();
  loadPageConfig();
  setupEventListeners();
  renderPresets();
  
  // Listen for visual message communications from iframe
  window.addEventListener('message', handleIframeMessages);
});

// Setup template selection options
function initTemplateDropdown() {
  const select = document.getElementById('field-template');
  select.innerHTML = TEMPLATE_OPTIONS.map(opt => `<option value="${opt.value}">${opt.text}</option>`).join('');
}

// Load draft or queue item from localStorage
function loadPageConfig() {
  const queueItem = localStorage.getItem('getshere_import_queue');
  
  if (queueItem) {
    pageConfig = JSON.parse(queueItem);
    localStorage.removeItem('getshere_import_queue'); // Consume queue item
  } else {
    // Check if there is an unsaved draft
    const draft = localStorage.getItem('getshere_editor_draft');
    if (draft) {
      pageConfig = JSON.parse(draft);
    } else {
      // Create new page default setup
      pageConfig = generateDefaultPageConfig();
    }
  }

  // Populate Sidebar Inputs
  syncConfigToSidebar();
  
  // Save to Session Storage for Preview iframe
  updatePreviewData();
}

function generateDefaultPageConfig() {
  const randId = Math.random().toString(36).substring(2, 7);
  return {
    slug: `new-page-${randId}`,
    created_date: new Date().toISOString(),
    update_date: new Date().toISOString(),
    update_version: 1,
    status: "active",
    plan: "free",
    template: "personal1",
    basic_identity: {
      name: "Your Name",
      tagline: "Your Professional Tagline",
      logo: "MyBrand.",
      banner_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200",
      avatar: "https://i.ibb.co/9vX19pX/developer-cartoon.png"
    },
    contact_section: {
      email: "hello@example.com",
      phone: "+91 99999 88888",
      address: "Mumbai, Maharashtra, India",
      google_map_link: "https://maps.google.com"
    },
    social_links: {
      facebook: "https://facebook.com",
      instagram: "https://instagram",
      linkedin: "https://linkedin.com"
    },
    website_content: {
      about_us: "I am a creator and innovator. This is my live profile build where I display my work.",
      skills: [
        { "name": "Web Design", "level": "90" },
        { "name": "Interaction", "level": "80" }
      ],
      experience: [
        { "title": "Developer", "company": "Work Co.", "year": "2023-Present", "desc": "Designing user interfaces and web layouts." }
      ],
      education: [],
      projects: [
        { "title": "Project Alpha", "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600", "desc": "Product", "short_desc": "Visual portfolio design" }
      ],
      services: []
    },
    template_data: {
      accent_color: "#6366f1",
      stats: [
        { "value": "3+", "label": "Years Experience" }
      ]
    }
  };
}

// Write the current Page configuration into inputs
function syncConfigToSidebar() {
  document.getElementById('field-template').value = pageConfig.template || 'personal1';
  document.getElementById('field-name').value = pageConfig.basic_identity?.name || '';
  document.getElementById('field-slug').value = pageConfig.slug || '';
  document.getElementById('field-tagline').value = pageConfig.basic_identity?.tagline || '';
  document.getElementById('field-logo').value = pageConfig.basic_identity?.logo || '';
  document.getElementById('field-banner').value = pageConfig.basic_identity?.banner_image || '';
  document.getElementById('field-about').value = getAboutValue() || '';
  
  // Show avatar input for Personal & CV templates
  const isPersonalOrCV = pageConfig.template.startsWith('personal') || pageConfig.template.startsWith('cv');
  document.getElementById('group-avatar').style.display = isPersonalOrCV ? 'flex' : 'none';
  if (isPersonalOrCV) {
    document.getElementById('field-avatar').value = pageConfig.basic_identity?.avatar || '';
  }

  // Socials/Contacts
  document.getElementById('field-email').value = pageConfig.contact_section?.email || '';
  document.getElementById('field-phone').value = pageConfig.contact_section?.phone || '';
  document.getElementById('field-gmap').value = pageConfig.contact_section?.google_map_link || '';
  document.getElementById('field-address').value = pageConfig.contact_section?.address || '';

  document.getElementById('field-facebook').value = pageConfig.social_links?.facebook || '';
  document.getElementById('field-instagram').value = pageConfig.social_links?.instagram || '';
  document.getElementById('field-twitter').value = pageConfig.social_links?.twitter || '';
  document.getElementById('field-linkedin').value = pageConfig.social_links?.linkedin || '';
  document.getElementById('field-github').value = pageConfig.social_links?.github || '';

  // Theme accent color
  const accent = pageConfig.template_data?.accent_color || '#6366f1';
  document.getElementById('field-accent').value = accent;
  document.getElementById('field-accent-text').value = accent;

  // Initialize List Editor & Reorder lists
  populateListEditorSelector();
  rebuildReorderSectionList();
}

function getAboutValue() {
  if (pageConfig.template.startsWith('shop')) {
    return pageConfig.shop_content?.about || '';
  }
  return pageConfig.website_content?.about_us || '';
}

function setAboutValue(val) {
  if (pageConfig.template.startsWith('shop')) {
    if (!pageConfig.shop_content) pageConfig.shop_content = {};
    pageConfig.shop_content.about = val;
  } else {
    if (!pageConfig.website_content) pageConfig.website_content = {};
    pageConfig.website_content.about_us = val;
  }
}

// Push window.brandData to Session for iframe consumption and reload preview
function updatePreviewData(triggerReload = true) {
  sessionStorage.setItem('getshere_preview', JSON.stringify(pageConfig));
  
  if (triggerReload) {
    // Debounce preview iframe reloads to avoid lag during fast typing
    clearTimeout(reloadDebounceTimeout);
    reloadDebounceTimeout = setTimeout(() => {
      const iframe = document.getElementById('preview-frame');
      if (iframe) {
        iframeLoaded = false;
        iframe.src = iframe.src; // Reload
      }
      
      // Save local draft automatically
      localStorage.setItem('getshere_editor_draft', JSON.stringify(pageConfig));
      document.getElementById('saved-status').innerHTML = `
        <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--success);"></span>
        Draft saved locally
      `;
    }, 400);
  }
}

// Switch tabs inside editor sidebar
window.switchTab = function(tabId, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  
  btn.classList.add('active');
  document.getElementById(tabId).classList.add('active');
  activeTab = tabId;
  
  if (tabId === 'tab-reorder') {
    rebuildReorderSectionList();
  }
};

// Set Iframe device viewport width
window.setViewport = function(device, btn) {
  document.querySelectorAll('.viewport-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  const iframe = document.getElementById('preview-frame');
  iframe.className = device;
};

// Setup input hooks
function setupEventListeners() {
  // Save page state indicators on inputs
  const inputs = document.querySelectorAll('.sidebar-content input, .sidebar-content textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      document.getElementById('saved-status').innerHTML = `
        <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--danger);"></span>
        Unsaved changes...
      `;
    });
  });
}

// Basic Fields Sync
window.updateField = function(field, val) {
  if (field === 'name') pageConfig.basic_identity.name = val;
  else if (field === 'tagline') pageConfig.basic_identity.tagline = val;
  else if (field === 'logo') pageConfig.basic_identity.logo = val;
  else if (field === 'banner') pageConfig.basic_identity.banner_image = val;
  else if (field === 'avatar') pageConfig.basic_identity.avatar = val;
  else if (field === 'about') setAboutValue(val);
  else if (['email', 'phone', 'address', 'google_map_link'].includes(field)) {
    pageConfig.contact_section[field] = val;
  }

  // Update without full reload if it's text, we send postMessage
  updatePreviewData(true);
};

window.updateSocialLink = function(network, val) {
  if (!pageConfig.social_links) pageConfig.social_links = {};
  pageConfig.social_links[network] = val;
  updatePreviewData(true);
};

// Change Accent Color
window.changeAccentColor = function(color) {
  document.getElementById('field-accent').value = color;
  document.getElementById('field-accent-text').value = color;
  
  if (!pageConfig.template_data) pageConfig.template_data = {};
  pageConfig.template_data.accent_color = color;
  
  // Propagate styles dynamically to iframe without reloading
  const iframe = document.getElementById('preview-frame');
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage({
      type: 'APPLY_THEME_COLOR',
      color: color
    }, '*');
  }

  // Still save updated data
  updatePreviewData(false);
};

// Template switcher logic
window.updateTemplateSelection = function(newTemplate) {
  const oldTemplate = pageConfig.template || '';
  pageConfig.template = newTemplate;
  
  const oldType = getTemplateType(oldTemplate);
  const newType = getTemplateType(newTemplate);

  // If layout structure types changed (e.g. from personal to shop), normalize data schema!
  if (oldType !== newType) {
    normalizePageStructure(newType);
  }

  syncConfigToSidebar();
  updatePreviewData(true);
};

function getTemplateType(templateName) {
  if (templateName.startsWith('shop')) return 'shop';
  if (templateName.startsWith('school')) return 'school';
  if (templateName.startsWith('cv')) return 'cv';
  return 'personal';
}

// Convert JSON nodes to support new template type structure safely
function normalizePageStructure(type) {
  if (type === 'shop') {
    pageConfig.shop_content = {
      about: pageConfig.website_content?.about_us || '',
      currency: '₹',
      categories: ['Products'],
      products: [
        { name: 'Sample Product 1', price: '100', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600', desc: 'Sample description.' }
      ],
      offers: [],
      testimonials: [],
      gallery: [],
      features: [],
      services: []
    };
    delete pageConfig.website_content;
  } else {
    pageConfig.website_content = {
      about_us: pageConfig.shop_content?.about || '',
      skills: [],
      experience: [],
      education: [],
      projects: [],
      services: []
    };
    delete pageConfig.shop_content;
  }
}

// ==========================================
// List Editor Tab Logic
// ==========================================
// List Editor Tab Logic
// ==========================================
function populateListEditorSelector() {
  const selector = document.getElementById('list-selector');
  const type = getTemplateType(pageConfig.template);
  let options = [];

  if (type === 'personal') {
    options = [
      { value: 'skills', text: 'Skills List' },
      { value: 'experience', text: 'Work Experience' },
      { value: 'education', text: 'Education History' },
      { value: 'projects', text: 'Recent Projects' },
      { value: 'services', text: 'Provided Services' }
    ];
  } else if (type === 'shop') {
    options = [
      { value: 'products', text: 'Store Products' },
      { value: 'offers', text: 'Active Offers' },
      { value: 'testimonials', text: 'Client Testimonials' },
      { value: 'features', text: 'Store Features' },
      { value: 'services', text: 'Provided Services' },
      { value: 'gallery', text: 'Gallery Images' }
    ];
  } else if (type === 'school') {
    options = [
      { value: 'teachers', text: 'Staff Teachers' },
      { value: 'notices', text: 'School Notices' },
      { value: 'resources', text: 'Resources & Downloads' },
      { value: 'achievements', text: 'Key Achievements' },
      { value: 'facilities', text: 'School Facilities' },
      { value: 'testimonials', text: 'Student Reviews' },
      { value: 'services', text: 'Services' },
      { value: 'gallery', text: 'Gallery Images' },
      { value: 'sliders', text: 'Slide Banners' },
      { value: 'stats', text: 'Stats List' }
    ];
  } else if (type === 'cv') {
    options = [
      { value: 'skills', text: 'Skills' },
      { value: 'experience', text: 'Professional Experience' },
      { value: 'education', text: 'Education history' },
      { value: 'projects', text: 'Key Projects' }
    ];
  }

  selector.innerHTML = options.map(opt => `<option value="${opt.value}">${opt.text}</option>`).join('');
  
  // Set active editor list
  if (options.length > 0) {
    switchListEditor(options[0].value);
  }
}

window.switchListEditor = function(listKey) {
  currentListKey = listKey;
  const listTitle = document.getElementById('active-list-title');
  const option = document.querySelector(`#list-selector option[value="${listKey}"]`);
  listTitle.innerText = option ? option.text : 'Items List';
  
  renderListItems();
};

function getActiveListArray() {
  const type = getTemplateType(pageConfig.template);
  if (type === 'shop') {
    if (!pageConfig.shop_content) pageConfig.shop_content = {};
    if (!pageConfig.shop_content[currentListKey]) pageConfig.shop_content[currentListKey] = [];
    return pageConfig.shop_content[currentListKey];
  } else {
    if (!pageConfig.website_content) pageConfig.website_content = {};
    if (!pageConfig.website_content[currentListKey]) pageConfig.website_content[currentListKey] = [];
    return pageConfig.website_content[currentListKey];
  }
}

function renderListItems() {
  const container = document.getElementById('list-items-container');
  const arr = getActiveListArray();

  if (arr.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px;">No items in this list. Click Add Item to begin.</p>`;
    return;
  }

  container.innerHTML = arr.map((item, index) => {
    let fieldsHtml = '';
    
    // Generate edit inputs based on item field structures
    if (currentListKey === 'gallery' || currentListKey === 'sliders') {
      fieldsHtml = `
        <div class="form-group">
          <label>Image Resource</label>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="list-img-${currentListKey}-${index}" class="form-control" value="${item || ''}" oninput="updateListItemStringField(${index}, this.value)">
            <button onclick="triggerListItemStringFileUpload(${index}, 'list-img-${currentListKey}-${index}')" class="btn btn-secondary btn-sm" style="flex-shrink: 0; padding: 0 10px;" title="Upload Image">📁 Upload</button>
          </div>
        </div>
      `;
    } else if (currentListKey === 'skills') {
      fieldsHtml = `
        <div class="form-group">
          <label>Skill Name</label>
          <input type="text" class="form-control" value="${item.name || ''}" oninput="updateListItemField(${index}, 'name', this.value)">
        </div>
        <div class="form-group">
          <label>Expertise Level (1-100)</label>
          <input type="number" min="1" max="100" class="form-control" value="${item.level || '80'}" oninput="updateListItemField(${index}, 'level', this.value)">
        </div>
      `;
    } else if (currentListKey === 'experience') {
      fieldsHtml = `
        <div class="form-group">
          <label>Job Title</label>
          <input type="text" class="form-control" value="${item.title || ''}" oninput="updateListItemField(${index}, 'title', this.value)">
        </div>
        <div class="form-group">
          <label>Company</label>
          <input type="text" class="form-control" value="${item.company || ''}" oninput="updateListItemField(${index}, 'company', this.value)">
        </div>
        <div class="form-group">
          <label>Duration / Year</label>
          <input type="text" class="form-control" value="${item.year || ''}" placeholder="e.g. 2023 - Present" oninput="updateListItemField(${index}, 'year', this.value)">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" oninput="updateListItemField(${index}, 'desc', this.value)">${item.desc || ''}</textarea>
        </div>
      `;
    } else if (currentListKey === 'education') {
      fieldsHtml = `
        <div class="form-group">
          <label>Degree / Certificate</label>
          <input type="text" class="form-control" value="${item.degree || ''}" oninput="updateListItemField(${index}, 'degree', this.value)">
        </div>
        <div class="form-group">
          <label>School / University</label>
          <input type="text" class="form-control" value="${item.school || ''}" oninput="updateListItemField(${index}, 'school', this.value)">
        </div>
        <div class="form-group">
          <label>Year</label>
          <input type="text" class="form-control" value="${item.year || ''}" placeholder="e.g. 2017 - 2021" oninput="updateListItemField(${index}, 'year', this.value)">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" oninput="updateListItemField(${index}, 'desc', this.value)">${item.desc || ''}</textarea>
        </div>
      `;
    } else if (currentListKey === 'projects') {
      fieldsHtml = `
        <div class="form-group">
          <label>Project Title</label>
          <input type="text" class="form-control" value="${item.title || ''}" oninput="updateListItemField(${index}, 'title', this.value)">
        </div>
        <div class="form-group">
          <label>Cover Image</label>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="list-img-projects-${index}" class="form-control" value="${item.image || ''}" oninput="updateListItemField(${index}, 'image', this.value)">
            <button onclick="triggerListItemFileUpload(${index}, 'image', 'list-img-projects-${index}')" class="btn btn-secondary btn-sm" style="flex-shrink: 0; padding: 0 10px;" title="Upload Image">📁 Upload</button>
          </div>
        </div>
        <div class="form-group">
          <label>Category Label</label>
          <input type="text" class="form-control" value="${item.desc || ''}" placeholder="e.g. Graphic Design" oninput="updateListItemField(${index}, 'desc', this.value)">
        </div>
        <div class="form-group">
          <label>Brief Description</label>
          <textarea class="form-control" oninput="updateListItemField(${index}, 'short_desc', this.value)">${item.short_desc || ''}</textarea>
        </div>
      `;
    } else if (currentListKey === 'services' || currentListKey === 'features') {
      fieldsHtml = `
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="form-control" value="${item.title || ''}" oninput="updateListItemField(${index}, 'title', this.value)">
        </div>
        <div class="form-group">
          <label>FontAwesome Icon Class</label>
          <input type="text" class="form-control" value="${item.icon || 'fa-star'}" placeholder="e.g. fa-seedling" oninput="updateListItemField(${index}, 'icon', this.value)">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" oninput="updateListItemField(${index}, 'desc', this.value)">${item.desc || ''}</textarea>
        </div>
      `;
    } else if (currentListKey === 'products') {
      fieldsHtml = `
        <div class="form-group">
          <label>Product Name</label>
          <input type="text" class="form-control" value="${item.name || ''}" oninput="updateListItemField(${index}, 'name', this.value)">
        </div>
        <div class="form-group">
          <label>Price</label>
          <input type="text" class="form-control" value="${item.price || ''}" oninput="updateListItemField(${index}, 'price', this.value)">
        </div>
        <div class="form-group">
          <label>Product Image</label>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="list-img-products-${index}" class="form-control" value="${item.image || ''}" oninput="updateListItemField(${index}, 'image', this.value)">
            <button onclick="triggerListItemFileUpload(${index}, 'image', 'list-img-products-${index}')" class="btn btn-secondary btn-sm" style="flex-shrink: 0; padding: 0 10px;" title="Upload Image">📁 Upload</button>
          </div>
        </div>
        <div class="form-group">
          <label>Product Details</label>
          <textarea class="form-control" oninput="updateListItemField(${index}, 'desc', this.value)">${item.desc || ''}</textarea>
        </div>
      `;
    } else if (currentListKey === 'offers') {
      fieldsHtml = `
        <div class="form-group">
          <label>Offer Heading</label>
          <input type="text" class="form-control" value="${item.title || ''}" oninput="updateListItemField(${index}, 'title', this.value)">
        </div>
        <div class="form-group">
          <label>Badge Label</label>
          <input type="text" class="form-control" value="${item.badge || ''}" placeholder="e.g. 20% OFF" oninput="updateListItemField(${index}, 'badge', this.value)">
        </div>
        <div class="form-group">
          <label>Offer Details</label>
          <textarea class="form-control" oninput="updateListItemField(${index}, 'desc', this.value)">${item.desc || ''}</textarea>
        </div>
      `;
    } else if (currentListKey === 'testimonials') {
      fieldsHtml = `
        <div class="form-group">
          <label>Reviewer Name</label>
          <input type="text" class="form-control" value="${item.name || ''}" oninput="updateListItemField(${index}, 'name', this.value)">
        </div>
        <div class="form-group">
          <label>Subtitle / Role</label>
          <input type="text" class="form-control" value="${item.role || ''}" placeholder="e.g. Customer" oninput="updateListItemField(${index}, 'role', this.value)">
        </div>
        <div class="form-group">
          <label>Review Message</label>
          <textarea class="form-control" oninput="updateListItemField(${index}, 'text', this.value)">${item.text || ''}</textarea>
        </div>
      `;
    } else if (currentListKey === 'teachers') {
      fieldsHtml = `
        <div class="form-group">
          <label>Teacher Name</label>
          <input type="text" class="form-control" value="${item.name || ''}" oninput="updateListItemField(${index}, 'name', this.value)">
        </div>
        <div class="form-group">
          <label>Subject / Designation</label>
          <input type="text" class="form-control" value="${item.subject || item.role || ''}" oninput="updateListItemField(${index}, 'subject', this.value)">
        </div>
        <div class="form-group">
          <label>Photo</label>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="list-img-teachers-${index}" class="form-control" value="${item.image || ''}" oninput="updateListItemField(${index}, 'image', this.value)">
            <button onclick="triggerListItemFileUpload(${index}, 'image', 'list-img-teachers-${index}')" class="btn btn-secondary btn-sm" style="flex-shrink: 0; padding: 0 10px;" title="Upload Image">📁 Upload</button>
          </div>
        </div>
      `;
    } else if (currentListKey === 'stats') {
      fieldsHtml = `
        <div class="form-group">
          <label>Stat Value</label>
          <input type="text" class="form-control" value="${item.value || ''}" oninput="updateListItemField(${index}, 'value', this.value)">
        </div>
        <div class="form-group">
          <label>Stat Label</label>
          <input type="text" class="form-control" value="${item.label || ''}" oninput="updateListItemField(${index}, 'label', this.value)">
        </div>
      `;
    } else if (currentListKey === 'notices') {
      fieldsHtml = `
        <div class="form-group">
          <label>Notice Title</label>
          <input type="text" class="form-control" value="${item.title || ''}" oninput="updateListItemField(${index}, 'title', this.value)">
        </div>
        <div class="form-group">
          <label>Date</label>
          <input type="text" class="form-control" value="${item.date || ''}" placeholder="e.g. 25 June 2026" oninput="updateListItemField(${index}, 'date', this.value)">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" oninput="updateListItemField(${index}, 'desc', this.value)">${item.desc || ''}</textarea>
        </div>
        <div class="form-group">
          <label>Attachment URL / Link</label>
          <input type="text" class="form-control" value="${item.link || ''}" oninput="updateListItemField(${index}, 'link', this.value)">
        </div>
      `;
    } else if (currentListKey === 'resources') {
      fieldsHtml = `
        <div class="form-group">
          <label>Resource Title</label>
          <input type="text" class="form-control" value="${item.title || ''}" oninput="updateListItemField(${index}, 'title', this.value)">
        </div>
        <div class="form-group">
          <label>Download / Link URL</label>
          <input type="text" class="form-control" value="${item.link || ''}" oninput="updateListItemField(${index}, 'link', this.value)">
        </div>
      `;
    } else if (currentListKey === 'achievements') {
      fieldsHtml = `
        <div class="form-group">
          <label>Achievement Title</label>
          <input type="text" class="form-control" value="${item.title || ''}" oninput="updateListItemField(${index}, 'title', this.value)">
        </div>
        <div class="form-group">
          <label>Year</label>
          <input type="text" class="form-control" value="${item.year || ''}" oninput="updateListItemField(${index}, 'year', this.value)">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" oninput="updateListItemField(${index}, 'desc', this.value)">${item.desc || ''}</textarea>
        </div>
      `;
    } else if (currentListKey === 'facilities') {
      fieldsHtml = `
        <div class="form-group">
          <label>Facility Name</label>
          <input type="text" class="form-control" value="${item.title || ''}" oninput="updateListItemField(${index}, 'title', this.value)">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" oninput="updateListItemField(${index}, 'desc', this.value)">${item.desc || ''}</textarea>
        </div>
        <div class="form-group">
          <label>FontAwesome Icon Class</label>
          <input type="text" class="form-control" value="${item.icon || 'fa-building'}" oninput="updateListItemField(${index}, 'icon', this.value)">
        </div>
      `;
    } else {
      // Fallback inputs for simple items
      fieldsHtml = `
        <div class="form-group">
          <label>Item Name / Title</label>
          <input type="text" class="form-control" value="${item.title || item.name || ''}" oninput="updateListItemField(${index}, 'title', this.value)">
        </div>
      `;
    }

    return `
      <div class="list-item-card">
        <div style="font-size:13px; font-weight:700; color:var(--primary); margin-bottom:10px;">Item #${index + 1}</div>
        ${fieldsHtml}
        <div class="list-item-controls">
          <button title="Move Up" class="item-btn" onclick="moveListItem(${index}, -1)">▲</button>
          <button title="Move Down" class="item-btn" onclick="moveListItem(${index}, 1)">▼</button>
          <button title="Duplicate" class="item-btn" onclick="duplicateListItem(${index})">⧉</button>
          <button title="Delete" class="item-btn delete" onclick="deleteListItem(${index})">🗑</button>
        </div>
      </div>
    `;
  }).join('');
}

window.updateListItemField = function(index, field, value) {
  const arr = getActiveListArray();
  if (arr[index]) {
    arr[index][field] = value;
    updatePreviewData(true);
  }
};

window.updateListItemStringField = function(index, value) {
  const arr = getActiveListArray();
  arr[index] = value;
  updatePreviewData(true);
};

window.addNewListItem = function() {
  const arr = getActiveListArray();
  
  // Default templates for lists
  let newItem = {};
  if (currentListKey === 'skills') newItem = { name: 'New Skill', level: '80' };
  else if (currentListKey === 'experience') newItem = { title: 'Job Role', company: 'Company Name', year: '2024 - Present', desc: 'Short job description' };
  else if (currentListKey === 'education') newItem = { degree: 'Certificate Name', school: 'School Name', year: '2024', desc: '' };
  else if (currentListKey === 'projects') newItem = { title: 'Project Title', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600', desc: 'Category', short_desc: 'Details' };
  else if (currentListKey === 'services' || currentListKey === 'features') newItem = { title: 'Service Name', icon: 'fa-star', desc: 'Service summary details.' };
  else if (currentListKey === 'products') newItem = { name: 'Product Name', price: '99', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600', desc: '' };
  else if (currentListKey === 'offers') newItem = { title: 'Special Promo', badge: '10% OFF', desc: 'Get discount now.' };
  else if (currentListKey === 'testimonials') newItem = { name: 'Customer Name', role: 'Client', text: 'Great services!' };
  else if (currentListKey === 'teachers') newItem = { name: 'Teacher Name', subject: 'Mathematics', image: '' };
  else if (currentListKey === 'gallery' || currentListKey === 'sliders') newItem = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400';
  else if (currentListKey === 'stats') newItem = { value: '100%', label: 'Success Rate' };
  else if (currentListKey === 'notices') newItem = { title: 'New Notice', date: new Date().toLocaleDateString(), desc: 'Notice details here.', link: '#' };
  else if (currentListKey === 'resources') newItem = { title: 'Download Guide', link: '#' };
  else if (currentListKey === 'achievements') newItem = { title: 'First Place Award', year: '2025', desc: 'Achievement details.' };
  else if (currentListKey === 'facilities') newItem = { title: 'Modern Library', desc: 'Equipped with digital computers.', icon: 'fa-book' };
  
  arr.push(newItem);
  renderListItems();
  updatePreviewData(true);
};

window.deleteListItem = function(index) {
  const arr = getActiveListArray();
  arr.splice(index, 1);
  renderListItems();
  updatePreviewData(true);
};

window.duplicateListItem = function(index) {
  const arr = getActiveListArray();
  const item = arr[index];
  const copy = typeof item === 'object' ? JSON.parse(JSON.stringify(item)) : item;
  arr.splice(index + 1, 0, copy);
  renderListItems();
  updatePreviewData(true);
};

window.moveListItem = function(index, direction) {
  const arr = getActiveListArray();
  const targetIndex = index + direction;
  
  if (targetIndex >= 0 && targetIndex < arr.length) {
    // Swap elements
    const temp = arr[index];
    arr[index] = arr[targetIndex];
    arr[targetIndex] = temp;
    
    renderListItems();
    updatePreviewData(true);
  }
};

// ==========================================
// Section Reordering Logic
// ==========================================
function rebuildReorderSectionList() {
  const container = document.getElementById('sections-reorder-list');
  const iframe = document.getElementById('preview-frame');
  
  if (!iframe || !iframe.contentDocument) {
    container.innerHTML = `<p style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px;">Preview loading...</p>`;
    return;
  }

  const iframeDoc = iframe.contentDocument;
  
  // Find all sections or main layout components inside iframe
  let sectionNodes = Array.from(iframeDoc.querySelectorAll('main > section, #brand-root > section'));
  
  if (sectionNodes.length === 0) {
    // Fallback search
    sectionNodes = Array.from(iframeDoc.querySelectorAll('section'));
  }

  if (sectionNodes.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px;">No layout sections detected in this template.</p>`;
    return;
  }

  const sectionsList = sectionNodes.map(sec => {
    const id = sec.id || sec.className || sec.tagName.toLowerCase();
    // Beautiful human names
    let name = id.replace(/[-_]/g, ' ');
    name = name.charAt(0).toUpperCase() + name.slice(1);
    if (name.length > 20) name = name.substring(0, 20) + '...';
    
    return { id: id, name: name };
  });

  // Keep track of order inside templateData
  if (!pageConfig.template_data) pageConfig.template_data = {};
  if (!pageConfig.template_data.section_order) {
    pageConfig.template_data.section_order = sectionsList.map(s => s.id);
  }

  // Filter sections list to match current stored order if present
  const storedOrder = pageConfig.template_data.section_order;
  sectionsList.sort((a, b) => {
    const aIndex = storedOrder.indexOf(a.id);
    const bIndex = storedOrder.indexOf(b.id);
    return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
  });

  container.innerHTML = sectionsList.map((sec, index) => {
    return `
      <div class="reorder-item" data-section-id="${sec.id}">
        <div class="reorder-handle">
          <span style="color: var(--text-muted); font-size: 18px; cursor: grab;">☰</span>
          <span style="font-weight: 600; font-size: 14px;">${sec.name}</span>
        </div>
        <div class="reorder-btns">
          <button onclick="moveSectionNode(${index}, -1)" class="item-btn" style="width:24px; height:24px; font-size:10px;">▲</button>
          <button onclick="moveSectionNode(${index}, 1)" class="item-btn" style="width:24px; height:24px; font-size:10px;">▼</button>
        </div>
      </div>
    `;
  }).join('');
}

window.moveSectionNode = function(index, direction) {
  const order = pageConfig.template_data.section_order;
  const targetIndex = index + direction;

  if (targetIndex >= 0 && targetIndex < order.length) {
    const temp = order[index];
    order[index] = order[targetIndex];
    order[targetIndex] = temp;

    // Save configuration change
    updatePreviewData(false);

    // Repopulate Sidebar reorder list
    rebuildReorderSectionList();

    // Propagate reorder live in DOM inside iframe
    const iframe = document.getElementById('preview-frame');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'REORDER_SECTIONS',
        order: order
      }, '*');
    }
  }
};
// ==========================================
// Iframe Visual Messengers
// ==========================================
function setValByPath(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (current[part] === undefined) {
      current[part] = isNaN(parts[i+1]) ? {} : [];
    }
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
}

function handleIframeMessages(event) {
  // If the iframe notifies that it finished rendering
  if (event.data && event.data.type === 'PREVIEW_LOADED') {
    iframeLoaded = true;
    
    // Apply layout custom styles or accents
    const accentColor = pageConfig.template_data?.accent_color || '#6366f1';
    changeAccentColor(accentColor);
    
    // Apply section reordering if previously configured
    if (pageConfig.template_data?.section_order) {
      const iframe = document.getElementById('preview-frame');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'REORDER_SECTIONS',
          order: pageConfig.template_data.section_order
        }, '*');
      }
    }
  }

  // Open premium image picker modal on double click image
  if (event.data && event.data.type === 'OPEN_IMAGE_PICKER') {
    openImagePicker(event.data.currentSrc, event.data.path, event.data.customImageKey);
  }

  // Handle generic path visual edits from iframe
  if (event.data && event.data.type === 'INLINE_PATH_EDITED') {
    const path = event.data.path;
    const value = event.data.value;

    setValByPath(pageConfig, path, value);

    // Sync matching basic inputs
    let mappedFieldId = '';
    if (path === 'basic_identity.name') mappedFieldId = 'field-name';
    else if (path === 'basic_identity.tagline') mappedFieldId = 'field-tagline';
    else if (path === 'basic_identity.logo') mappedFieldId = 'field-logo';
    else if (path === 'basic_identity.banner_image') mappedFieldId = 'field-banner';
    else if (path === 'basic_identity.avatar') mappedFieldId = 'field-avatar';
    else if (path === 'website_content.about_us' || path === 'shop_content.about') mappedFieldId = 'field-about';
    else if (path === 'contact_section.email') mappedFieldId = 'field-email';
    else if (path === 'contact_section.phone') mappedFieldId = 'field-phone';
    else if (path === 'contact_section.address') mappedFieldId = 'field-address';
    else if (path === 'contact_section.google_map_link') mappedFieldId = 'field-gmap';

    if (mappedFieldId) {
      const input = document.getElementById(mappedFieldId);
      if (input) input.value = value;
    }

    // Refresh active List sidebar elements if edited item belongs to currentListKey
    if (path.includes(currentListKey)) {
      renderListItems();
    }

    // Save local draft without reloading iframe
    updatePreviewData(false);
  }

  // Handle custom text visual edits from iframe
  if (event.data && event.data.type === 'INLINE_CUSTOM_TEXT_EDITED') {
    const key = event.data.key;
    const value = event.data.value;

    if (!pageConfig.template_data) pageConfig.template_data = {};
    if (!pageConfig.template_data.custom_text) pageConfig.template_data.custom_text = {};
    pageConfig.template_data.custom_text[key] = value;

    // Save local draft without reloading iframe
    updatePreviewData(false);
  }

  // Handle custom image visual edits from iframe
  if (event.data && event.data.type === 'INLINE_CUSTOM_IMAGE_EDITED') {
    const key = event.data.key;
    const value = event.data.value;

    if (!pageConfig.template_data) pageConfig.template_data = {};
    if (!pageConfig.template_data.custom_images) pageConfig.template_data.custom_images = {};
    pageConfig.template_data.custom_images[key] = value;

    // Save local draft without reloading iframe
    updatePreviewData(false);
  }

  // Handle visual element styles selection from iframe
  if (event.data && event.data.type === 'ELEMENT_SELECTED') {
    handleElementSelectionMessage(event.data);
  }
}
// ==========================================
// Final Database Persistence
// ==========================================
window.savePageToDatabase = function() {
  const localList = localStorage.getItem('getshere_local_pages');
  let list = [];
  if (localList) {
    list = JSON.parse(localList);
  }

  // Update dates & version
  pageConfig.update_date = new Date().toISOString();
  pageConfig.update_version = (pageConfig.update_version || 1) + 1;

  const existingIndex = list.findIndex(p => p.slug === pageConfig.slug);
  if (existingIndex !== -1) {
    list[existingIndex] = pageConfig;
  } else {
    list.push(pageConfig);
  }

  // Write database to LocalStorage
  localStorage.setItem('getshere_local_pages', JSON.stringify(list));
  
  // Clear local temporary draft
  localStorage.removeItem('getshere_editor_draft');

  // Trigger Toast Notification
  const toast = document.getElementById('toast');
  document.getElementById('toast-message').innerText = `"${pageConfig.basic_identity.name}" saved successfully!`;
  toast.style.display = 'flex';
  
  // Confetti celebration
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }
  });

  setTimeout(() => {
    toast.style.display = 'none';
    window.location.href = 'mypage.html'; // Redirect
  }, 2200);
};

// ==========================================
// Image Upload & Selection Modal Picker Logic
// ==========================================
let activeUploadTargetType = '';
let activeFieldUploadId = '';
let activeFieldUploadName = '';
let activeListItemUploadIndex = -1;
let activeListItemUploadField = '';
let activeListItemUploadInputId = '';
let activePickerPath = '';
let activePickerCustomKey = '';

// Preset images list
const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
  'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400',
  'https://i.ibb.co/9vX19pX/developer-cartoon.png',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
];

let selectedPresetUrl = '';

window.selectPresetImage = function(url, imgEl) {
  selectedPresetUrl = url;
  
  // Highlight selected preset
  document.querySelectorAll('.modal-preset-thumb').forEach(el => {
    el.style.borderColor = 'var(--border)';
    el.style.transform = 'none';
  });
  imgEl.style.borderColor = 'var(--primary)';
  imgEl.style.transform = 'scale(1.05)';
  
  // Sync URL field
  document.getElementById('modal-url-input').value = url;
};

window.renderPresets = function() {
  const container = document.getElementById('modal-presets-grid');
  if (!container) return;
  
  container.innerHTML = PRESET_IMAGES.map(url => {
    return `
      <img src="${url}" 
           class="modal-preset-thumb" 
           style="width: 100%; height: 60px; object-fit: cover; border-radius: 6px; cursor: pointer; border: 2px solid var(--border); transition: all 0.2s;" 
           onclick="selectPresetImage('${url}', this)">
    `;
  }).join('');
};

window.openImagePicker = function(currentSrc, path, customImageKey) {
  activePickerPath = path;
  activePickerCustomKey = customImageKey;

  const modal = document.getElementById('image-picker-modal');
  const urlInput = document.getElementById('modal-url-input');
  
  if (urlInput) {
    urlInput.value = currentSrc.startsWith('data:') ? '' : currentSrc;
  }
  
  // Reset selected preset UI highlights
  document.querySelectorAll('.modal-preset-thumb').forEach(el => {
    el.style.borderColor = 'var(--border)';
    el.style.transform = 'none';
  });
  
  if (modal) {
    modal.style.display = 'flex';
  }
};

window.closeImagePickerModal = function() {
  const modal = document.getElementById('image-picker-modal');
  if (modal) {
    modal.style.display = 'none';
  }
};

window.saveModalImageSelection = function() {
  const urlInput = document.getElementById('modal-url-input');
  const imageUrl = urlInput ? urlInput.value.trim() : '';
  
  if (imageUrl === '') {
    alert('Please select, upload, or enter an image URL.');
    return;
  }
  
  // Set unsaved indicator
  document.getElementById('saved-status').innerHTML = `
    <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--danger);"></span>
    Unsaved changes...
  `;
  
  if (activePickerPath) {
    setValByPath(pageConfig, activePickerPath, imageUrl);
    
    // Sync matching basic inputs
    let mappedFieldId = '';
    if (activePickerPath === 'basic_identity.banner_image') mappedFieldId = 'field-banner';
    else if (activePickerPath === 'basic_identity.avatar') mappedFieldId = 'field-avatar';
    
    if (mappedFieldId) {
      const input = document.getElementById(mappedFieldId);
      if (input) input.value = imageUrl;
    }
  } else if (activePickerCustomKey) {
    if (!pageConfig.template_data) pageConfig.template_data = {};
    if (!pageConfig.template_data.custom_images) pageConfig.template_data.custom_images = {};
    pageConfig.template_data.custom_images[activePickerCustomKey] = imageUrl;
  }

  // Close modal
  closeImagePickerModal();
  
  // Save draft and reload iframe
  updatePreviewData(true);
};

window.handleModalImageUpload = function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    
    const urlInput = document.getElementById('modal-url-input');
    if (urlInput) urlInput.value = dataUrl;
    
    // Deselect presets
    document.querySelectorAll('.modal-preset-thumb').forEach(el => {
      el.style.borderColor = 'var(--border)';
      el.style.transform = 'none';
    });
  };
  reader.readAsDataURL(file);
};

// Sidebar elements file uploads
window.triggerSidebarFileUpload = function(fieldId, fieldName) {
  activeUploadTargetType = 'field';
  activeFieldUploadId = fieldId;
  activeFieldUploadName = fieldName;
  
  document.getElementById('global-image-uploader').click();
};

window.triggerListItemFileUpload = function(index, field, inputId) {
  activeUploadTargetType = 'list';
  activeListItemUploadIndex = index;
  activeListItemUploadField = field;
  activeListItemUploadInputId = inputId;
  
  document.getElementById('global-image-uploader').click();
};

window.triggerListItemStringFileUpload = function(index, inputId) {
  activeUploadTargetType = 'list-string';
  activeListItemUploadIndex = index;
  activeListItemUploadInputId = inputId;
  
  document.getElementById('global-image-uploader').click();
};

window.handleGlobalImageUpload = function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    
    // Set unsaved indicator
    document.getElementById('saved-status').innerHTML = `
      <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--danger);"></span>
      Unsaved changes...
    `;

    if (activeUploadTargetType === 'field') {
      const input = document.getElementById(activeFieldUploadId);
      if (input) input.value = dataUrl;
      updateField(activeFieldUploadName, dataUrl);
    } else if (activeUploadTargetType === 'list') {
      const input = document.getElementById(activeListItemUploadInputId);
      if (input) input.value = dataUrl;
      updateListItemField(activeListItemUploadIndex, activeListItemUploadField, dataUrl);
    } else if (activeUploadTargetType === 'list-string') {
      const input = document.getElementById(activeListItemUploadInputId);
      if (input) input.value = dataUrl;
      updateListItemStringField(activeListItemUploadIndex, dataUrl);
    }
  };
  reader.readAsDataURL(file);
};

// ==========================================
// Element Styling Controller Logic
// ==========================================
let selectedElementKey = '';
let selectedElementType = '';

function handleElementSelectionMessage(data) {
  // Determine unique key for pageConfig.template_data.custom_styles
  if (data.path) {
    selectedElementKey = `path:${data.path}`;
  } else if (data.customKey) {
    selectedElementKey = `custom:${data.customKey}`;
  } else if (data.customImageKey) {
    selectedElementKey = `custom-image:${data.customImageKey}`;
  } else {
    selectedElementKey = '';
    return;
  }

  selectedElementType = data.elementType;

  // Show styles controls panel
  document.getElementById('styles-no-selection').style.display = 'none';
  document.getElementById('styles-controls').style.display = 'flex';

  // Set selected element label
  let friendlyName = 'Text Block';
  if (data.elementType === 'image') {
    friendlyName = 'Image Component';
  } else if (data.path) {
    friendlyName = data.path.split('.').pop().replace(/_/g, ' ').toUpperCase();
  } else if (data.customKey) {
    friendlyName = `Static text "${data.customKey.substring(0, 15)}..."`;
  }
  document.getElementById('selected-element-name').innerText = friendlyName;

  // Toggle controls visibility based on element type
  const isImage = data.elementType === 'image';
  document.getElementById('style-group-size').style.display = isImage ? 'none' : 'flex';
  document.getElementById('style-group-color').style.display = isImage ? 'none' : 'flex';
  document.getElementById('style-group-align').style.display = isImage ? 'none' : 'flex';
  document.getElementById('style-group-radius').style.display = isImage ? 'flex' : 'none';

  // Populate style inputs
  const style = data.style;

  // Font Size
  if (!isImage && style.fontSize) {
    const sizeNum = parseInt(style.fontSize) || 16;
    document.getElementById('style-font-size-range').value = sizeNum;
    document.getElementById('style-font-size-val').innerText = sizeNum + 'px';
  }

  // Colors
  if (!isImage) {
    document.getElementById('style-color').value = style.color && style.color !== 'transparent' ? style.color : '#000000';
    document.getElementById('style-color-text').value = style.color || '';
  }
  document.getElementById('style-bg-color').value = style.backgroundColor && style.backgroundColor !== 'transparent' ? style.backgroundColor : '#ffffff';
  document.getElementById('style-bg-color-text').value = style.backgroundColor || '';

  // Alignment
  if (!isImage) {
    highlightAlignButton(style.textAlign || 'left');
  }

  // Border Radius
  if (isImage) {
    document.getElementById('style-border-radius').value = style.borderRadius || '0px';
  }

  // Animation
  document.getElementById('style-animation').value = style.animation || 'none';

  // Padding
  const padNum = parseInt(style.padding) || 0;
  document.getElementById('style-padding').value = padNum;
  document.getElementById('style-padding-val').innerText = padNum + 'px';

  // Automatically open the Styles tab
  const stylesTabBtn = document.querySelector('.tab-btn[onclick*="tab-styles"]');
  if (stylesTabBtn) {
    switchTab('tab-styles', stylesTabBtn);
  }
}

function highlightAlignButton(align) {
  document.querySelectorAll('.style-align-btn').forEach(btn => {
    if (btn.innerText.toLowerCase() === align.toLowerCase()) {
      btn.style.background = 'var(--primary)';
      btn.style.fontWeight = 'bold';
    } else {
      btn.style.background = 'transparent';
      btn.style.fontWeight = 'normal';
    }
  });
}

window.updateSelectedStyle = function(property, value) {
  if (!selectedElementKey) return;

  // Update visual state indicators in sidebar
  if (property === 'fontSize') {
    document.getElementById('style-font-size-val').innerText = value;
  } else if (property === 'padding') {
    document.getElementById('style-padding-val').innerText = value;
  } else if (property === 'color') {
    document.getElementById('style-color').value = value;
    document.getElementById('style-color-text').value = value;
  } else if (property === 'backgroundColor') {
    document.getElementById('style-bg-color').value = value === 'transparent' ? '#ffffff' : value;
    document.getElementById('style-bg-color-text').value = value;
  } else if (property === 'textAlign') {
    highlightAlignButton(value);
  }

  // Save to configuration JSON
  if (!pageConfig.template_data) pageConfig.template_data = {};
  if (!pageConfig.template_data.custom_styles) pageConfig.template_data.custom_styles = {};
  if (!pageConfig.template_data.custom_styles[selectedElementKey]) {
    pageConfig.template_data.custom_styles[selectedElementKey] = {};
  }
  
  pageConfig.template_data.custom_styles[selectedElementKey][property] = value;

  // Send update message to iframe for instant live updates without full reloads!
  const iframe = document.getElementById('preview-frame');
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage({
      type: 'UPDATE_STYLE',
      key: selectedElementKey,
      property: property,
      value: value
    }, '*');
  }

  // Save changes to localStorage draft without iframe full reload
  updatePreviewData(false);
};
