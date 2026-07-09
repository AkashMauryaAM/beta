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
    'code': { id: 'code', name: 'Code', icon: 'fa-solid fa-code', category: 'basic', defaultData: { code: 'console.log("Hello");' }, defaultStyles: { backgroundColor: '#1e293b', color: '#a5b4fc', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', margin: '0 0 16px 0', whiteSpace: 'pre-wrap' } },
    'details': { id: 'details', name: 'Details', icon: 'fa-solid fa-chevron-down', category: 'basic', defaultData: { summary: 'More info', content: 'Hidden details here.' }, defaultStyles: { margin: '0 0 16px 0', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#fff' } },
    'pullquote': { id: 'pullquote', name: 'Pullquote', icon: 'fa-solid fa-quote-right', category: 'basic', defaultData: { quote: 'An amazing quote', author: 'Author' }, defaultStyles: { borderTop: '2px solid #3b82f6', borderBottom: '2px solid #3b82f6', padding: '24px 0', textAlign: 'center', fontSize: '24px', fontStyle: 'italic', margin: '0 0 16px 0' } },
    'tip': { id: 'tip', name: 'Tip', icon: 'fa-solid fa-lightbulb', category: 'basic', defaultData: { content: 'Pro tip: do this!' }, defaultStyles: { backgroundColor: '#fef3c7', color: '#92400e', padding: '16px', borderLeft: '4px solid #f59e0b', margin: '0 0 16px 0', borderRadius: '0 4px 4px 0' } },
    'time_to_read': { id: 'time_to_read', name: 'Time to Read', icon: 'fa-solid fa-clock', category: 'basic', defaultData: { text: '3 min read' }, defaultStyles: { color: '#64748b', fontSize: '14px', margin: '0 0 16px 0' } },
    'page_break': { id: 'page_break', name: 'Page Break', icon: 'fa-solid fa-scissors', category: 'basic', defaultData: {}, defaultStyles: { borderBottom: '2px dashed #cbd5e1', margin: '40px 0', position: 'relative', textAlign: 'center' } },

    // Media
    'image': { id: 'image', name: 'Image', icon: 'fa-regular fa-image', category: 'media', defaultData: { src: 'https://via.placeholder.com/600x400', alt: 'Placeholder' }, defaultStyles: { width: '100%', height: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '8px', display: 'block', margin: '0 0 16px 0' } },
    'video': { id: 'video', name: 'Video', icon: 'fa-brands fa-youtube', category: 'media', defaultData: { embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%;"></iframe>' }, defaultStyles: { width: '100%', height: '315px', borderRadius: '8px', margin: '0 0 16px 0' } },
    'gallery': { id: 'gallery', name: 'Gallery', icon: 'fa-solid fa-images', category: 'media', defaultData: { columns: 3, images: ['https://via.placeholder.com/300','https://via.placeholder.com/300','https://via.placeholder.com/300'] }, defaultStyles: { margin: '0 0 16px 0' } },
    'audio': { id: 'audio', name: 'Audio', icon: 'fa-solid fa-music', category: 'media', defaultData: { url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }, defaultStyles: { width: '100%', margin: '0 0 16px 0' } },
    'cover': { id: 'cover', name: 'Cover', icon: 'fa-solid fa-image', category: 'media', defaultData: { src: 'https://via.placeholder.com/1200x600', title: 'Cover Title' }, defaultStyles: { width: '100%', height: '400px', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '48px', fontWeight: 'bold', margin: '0 0 16px 0', position: 'relative' } },
    'file': { id: 'file', name: 'File', icon: 'fa-solid fa-file', category: 'media', defaultData: { filename: 'document.pdf', url: '#', icon: 'fa-solid fa-file-pdf' }, defaultStyles: { display: 'flex', alignItems: 'center', gap: '8px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', margin: '0 0 16px 0' } },
    'icon': { id: 'icon', name: 'Icon', icon: 'fa-solid fa-icons', category: 'media', defaultData: { iconClass: 'fa-solid fa-star' }, defaultStyles: { fontSize: '32px', color: '#3b82f6', textAlign: 'center', margin: '0 0 16px 0' } },
    'story': { id: 'story', name: 'Story', icon: 'fa-solid fa-mobile', category: 'media', defaultData: { image: 'https://via.placeholder.com/300x500', text: 'Story caption' }, defaultStyles: { width: '300px', height: '500px', position: 'relative', overflow: 'hidden', borderRadius: '12px', margin: '0 auto 16px auto', backgroundSize: 'cover', backgroundPosition: 'center' } },
    'tiled_gallery': { id: 'tiled_gallery', name: 'Tiled Gallery', icon: 'fa-solid fa-border-all', category: 'media', defaultData: { columns: 3, images: ['https://via.placeholder.com/400x300', 'https://via.placeholder.com/300x400', 'https://via.placeholder.com/400x400'] }, defaultStyles: { margin: '0 0 16px 0' } },
    'pinterest': { id: 'pinterest', name: 'Pinterest', icon: 'fa-brands fa-pinterest', category: 'media', defaultData: { url: 'https://www.pinterest.com/pin/12345/' }, defaultStyles: { margin: '0 0 16px 0', width: '100%' } },
    'avatar': { id: 'avatar', name: 'Avatar', icon: 'fa-solid fa-user-circle', category: 'media', defaultData: { src: 'https://via.placeholder.com/100', name: 'User' }, defaultStyles: { width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', margin: '0 0 16px 0' } },
    'smart_frame': { id: 'smart_frame', name: 'Smart Frame', icon: 'fa-solid fa-window-maximize', category: 'media', defaultData: { url: 'https://example.com' }, defaultStyles: { width: '100%', height: '400px', border: 'none', margin: '0 0 16px 0' } },
    
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
    'badges': { id: 'badges', name: 'Badges', icon: 'fa-solid fa-tags', category: 'advanced', defaultData: { tags: ['Design', 'Development', 'Marketing'] }, defaultStyles: { display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '0 0 16px 0' } },
    'sitelogo': { id: 'sitelogo', name: 'Site Logo', icon: 'fa-solid fa-shield-halved', category: 'advanced', defaultData: { src: 'https://via.placeholder.com/150x50?text=LOGO' }, defaultStyles: { height: '50px', objectFit: 'contain', margin: '0 0 16px 0' } },
    'site_title': { id: 'site_title', name: 'Site Title', icon: 'fa-solid fa-heading', category: 'advanced', defaultData: { text: 'My Awesome Site' }, defaultStyles: { fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' } },
    'site_tagline': { id: 'site_tagline', name: 'Site Tagline', icon: 'fa-solid fa-quote-right', category: 'advanced', defaultData: { text: 'Just another visual builder site' }, defaultStyles: { fontSize: '14px', color: '#64748b', margin: '0 0 16px 0' } },
    'navigation': { id: 'navigation', name: 'Navigation', icon: 'fa-solid fa-bars', category: 'advanced', defaultData: { links: [{label:'Home', url:'#'}, {label:'Services', url:'#'}, {label:'Contact', url:'#'}] }, defaultStyles: { display: 'flex', gap: '24px', margin: '0 0 16px 0' } },
    'archive': { id: 'archive', name: 'Archive', icon: 'fa-solid fa-box-archive', category: 'advanced', defaultData: { months: ['January 2026', 'February 2026', 'March 2026'] }, defaultStyles: { margin: '0 0 16px 0' } },
    'page_list': { id: 'page_list', name: 'Page List', icon: 'fa-solid fa-list-ul', category: 'advanced', defaultData: { pages: ['About Us', 'Our Team', 'Careers'] }, defaultStyles: { margin: '0 0 16px 0' } },
    'whatsapp': { id: 'whatsapp', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', category: 'advanced', defaultData: { phone: '1234567890', text: 'Chat with us' }, defaultStyles: { display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: 'white', padding: '12px 24px', borderRadius: '50px', textDecoration: 'none', margin: '0 0 16px 0' } },
    'sharing_buttons': { id: 'sharing_buttons', name: 'Sharing', icon: 'fa-solid fa-share-nodes', category: 'advanced', defaultData: { networks: ['Facebook', 'Twitter', 'LinkedIn'] }, defaultStyles: { display: 'flex', gap: '12px', margin: '0 0 16px 0' } },
    'star_rating': { id: 'star_rating', name: 'Star Rating', icon: 'fa-solid fa-star-half-stroke', category: 'advanced', defaultData: { rating: 4 }, defaultStyles: { color: '#fbbf24', fontSize: '24px', margin: '0 0 16px 0' } },
    'search': { id: 'search', name: 'Search', icon: 'fa-solid fa-magnifying-glass', category: 'advanced', defaultData: { placeholder: 'Search...' }, defaultStyles: { display: 'flex', width: '100%', margin: '0 0 16px 0' } },
    'dropdown_field': { id: 'dropdown_field', name: 'Dropdown', icon: 'fa-solid fa-caret-down', category: 'advanced', defaultData: { label: 'Select Option', options: ['Option 1', 'Option 2'] }, defaultStyles: { margin: '0 0 16px 0', width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' } },
    'checkbox': { id: 'checkbox', name: 'Checkbox', icon: 'fa-solid fa-check-square', category: 'advanced', defaultData: { label: 'I agree to terms' }, defaultStyles: { display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px 0' } },
    'email_field': { id: 'email_field', name: 'Email', icon: 'fa-solid fa-at', category: 'advanced', defaultData: { placeholder: 'Enter email...' }, defaultStyles: { width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', margin: '0 0 16px 0' } },
    'table_of_contents': { id: 'table_of_contents', name: 'TOC', icon: 'fa-solid fa-list-ol', category: 'advanced', defaultData: { links: ['Introduction', 'Chapter 1', 'Conclusion'] }, defaultStyles: { backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', margin: '0 0 16px 0' } }
};

const PATTERNS = {
    'Hero': [{
        id: 'pat_hero_1', name: 'Standard Hero',
        section: {
            styles: { backgroundColor: '#f1f5f9', padding: '80px 20px', display: 'flex', alignItems: 'center' },
            columns: [
                { width: 50, styles: { paddingRight: '40px' }, widgets: [
                    { id: 'pat_uid_1', type: 'heading', data: { content: 'Build Something Amazing', tag: 'h1' }, styles: { fontSize: '48px', fontWeight: 'bold', color: '#0f172a', marginBottom: '20px' } },
                    { id: 'pat_uid_2', type: 'paragraph', data: { content: 'This is a pre-designed hero section. Customize this text to fit your needs.' }, styles: { fontSize: '18px', color: '#475569', marginBottom: '30px' } },
                    { id: 'pat_uid_3', type: 'button', data: { content: 'Get Started', link: '#' }, styles: { backgroundColor: '#3b82f6', color: 'white', padding: '16px 32px', borderRadius: '8px', textDecoration: 'none', display: 'inline-block', fontWeight: 'bold' } }
                ]},
                { width: 50, styles: {}, widgets: [
                    { id: 'pat_uid_4', type: 'image', data: { src: 'https://via.placeholder.com/600x400', alt: 'Hero Image' }, styles: { width: '100%', borderRadius: '12px' } }
                ]}
            ]
        }
    }],
    'Pricing': [{
        id: 'pat_pricing_1', name: '3-Tier Pricing',
        section: {
            styles: { backgroundColor: '#ffffff', padding: '80px 20px' },
            columns: [
                { width: 33.33, styles: { padding: '10px' }, widgets: [
                    { id: 'pat_uid_5', type: 'heading', data: { content: 'Basic', tag: 'h3' }, styles: { textAlign: 'center' } },
                    { id: 'pat_uid_6', type: 'heading', data: { content: '$19/mo', tag: 'h2' }, styles: { textAlign: 'center', color: '#3b82f6' } },
                    { id: 'pat_uid_7', type: 'button', data: { content: 'Buy Basic', link: '#' }, styles: { width: '100%', display: 'block' } }
                ]},
                { width: 33.33, styles: { padding: '10px' }, widgets: [
                    { id: 'pat_uid_8', type: 'heading', data: { content: 'Pro', tag: 'h3' }, styles: { textAlign: 'center' } },
                    { id: 'pat_uid_9', type: 'heading', data: { content: '$49/mo', tag: 'h2' }, styles: { textAlign: 'center', color: '#3b82f6' } },
                    { id: 'pat_uid_10', type: 'button', data: { content: 'Buy Pro', link: '#' }, styles: { width: '100%', display: 'block' } }
                ]},
                { width: 33.33, styles: { padding: '10px' }, widgets: [
                    { id: 'pat_uid_11', type: 'heading', data: { content: 'Enterprise', tag: 'h3' }, styles: { textAlign: 'center' } },
                    { id: 'pat_uid_12', type: 'heading', data: { content: '$99/mo', tag: 'h2' }, styles: { textAlign: 'center', color: '#3b82f6' } },
                    { id: 'pat_uid_13', type: 'button', data: { content: 'Contact Us', link: '#' }, styles: { width: '100%', display: 'block' } }
                ]}
            ]
        }
    }],
    'Testimonials': [{
        id: 'pat_test_1', name: 'Client Reviews',
        section: {
            styles: { backgroundColor: '#f8fafc', padding: '60px 20px' },
            columns: [
                { width: 50, styles: { padding: '15px' }, widgets: [{ id: 'uid', type: 'testimonial', data: { quote: 'Amazing service!', author: 'Jane Doe', role: 'CTO' }, styles: {} }] },
                { width: 50, styles: { padding: '15px' }, widgets: [{ id: 'uid', type: 'testimonial', data: { quote: 'Highly recommended.', author: 'John Smith', role: 'CEO' }, styles: {} }] }
            ]
        }
    }],
    'Footers': [{
        id: 'pat_foot_1', name: 'Standard Footer',
        section: {
            styles: { backgroundColor: '#0f172a', padding: '60px 20px', color: '#94a3b8' },
            columns: [
                { width: 33.33, styles: {}, widgets: [
                    { id: 'uid', type: 'heading', data: { content: 'Company', tag: 'h4' }, styles: { color: 'white' } },
                    { id: 'uid', type: 'paragraph', data: { content: 'We build great things.' }, styles: {} }
                ]},
                { width: 33.33, styles: {}, widgets: [
                    { id: 'uid', type: 'heading', data: { content: 'Links', tag: 'h4' }, styles: { color: 'white' } },
                    { id: 'uid', type: 'list', data: { items: ['Home', 'About', 'Contact'] }, styles: {} }
                ]},
                { width: 33.33, styles: {}, widgets: [
                    { id: 'uid', type: 'heading', data: { content: 'Follow Us', tag: 'h4' }, styles: { color: 'white' } },
                    { id: 'uid', type: 'socials', data: { links: [{icon:'fa-brands fa-twitter',url:'#'},{icon:'fa-brands fa-github',url:'#'}] }, styles: {} }
                ]}
            ]
        }
    }],
    'Contact': [{
        id: 'pat_contact_1', name: 'Contact Section',
        section: {
            styles: { backgroundColor: '#ffffff', padding: '60px 20px' },
            columns: [
                { width: 50, styles: {}, widgets: [
                    { id: 'uid', type: 'heading', data: { content: 'Get in Touch', tag: 'h2' }, styles: {} },
                    { id: 'uid', type: 'paragraph', data: { content: 'Fill out the form and we will get back to you shortly.' }, styles: {} }
                ]},
                { width: 50, styles: {}, widgets: [
                    { id: 'uid', type: 'contact', data: { emailTo: 'info@site.com', btnText: 'Send Message' }, styles: {} }
                ]}
            ]
        }
    }],
    '404 Template': [{
        id: 'pat_404_1', name: 'Standard 404',
        section: {
            styles: { backgroundColor: '#ffffff', padding: '100px 20px', textAlign: 'center' },
            columns: [
                { width: 100, styles: {}, widgets: [
                    { id: 'uid', type: 'heading', data: { content: '404', tag: 'h1' }, styles: { fontSize: '120px', color: '#3b82f6', marginBottom: '0' } },
                    { id: 'uid', type: 'heading', data: { content: 'Page Not Found', tag: 'h2' }, styles: { fontSize: '32px', marginBottom: '20px' } },
                    { id: 'uid', type: 'paragraph', data: { content: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.' }, styles: { fontSize: '18px', color: '#64748b', marginBottom: '30px' } },
                    { id: 'uid', type: 'button', data: { content: 'Go Home', link: '/' }, styles: {} }
                ]}
            ]
        }
    }],
    'About': [{
        id: 'pat_about_1', name: 'About Company',
        section: {
            styles: { backgroundColor: '#f8fafc', padding: '80px 20px', display: 'flex', alignItems: 'center' },
            columns: [
                { width: 50, styles: { paddingRight: '40px' }, widgets: [
                    { id: 'uid', type: 'heading', data: { content: 'Our Story', tag: 'h2' }, styles: { fontSize: '36px', marginBottom: '20px' } },
                    { id: 'uid', type: 'paragraph', data: { content: 'Founded in 2026, we started with a simple idea: make the web easier to build. Today, we are proud to serve thousands of happy customers around the world.' }, styles: { fontSize: '16px', lineHeight: '1.8' } },
                    { id: 'uid', type: 'stats', data: { number: '10k+', label: 'Active Users' }, styles: { textAlign: 'left', marginTop: '20px' } }
                ]},
                { width: 50, styles: {}, widgets: [
                    { id: 'uid', type: 'image', data: { src: 'https://via.placeholder.com/600x600', alt: 'About Us' }, styles: { borderRadius: '12px' } }
                ]}
            ]
        }
    }],
    'Blog Posts': [{
        id: 'pat_blog_1', name: 'Recent Posts Grid',
        section: {
            styles: { padding: '80px 20px' },
            columns: [
                { width: 100, styles: {}, widgets: [
                    { id: 'uid', type: 'heading', data: { content: 'Latest News', tag: 'h2' }, styles: { textAlign: 'center', marginBottom: '40px', fontSize: '36px' } }
                ]},
                { width: 33.33, styles: { padding: '10px' }, widgets: [
                    { id: 'uid', type: 'products', data: { image: 'https://via.placeholder.com/400x250', title: 'Top 10 Design Tips', price: 'Read More', btnText: 'Read Post' }, styles: {} }
                ]},
                { width: 33.33, styles: { padding: '10px' }, widgets: [
                    { id: 'uid', type: 'products', data: { image: 'https://via.placeholder.com/400x250', title: 'The Future of AI', price: 'Read More', btnText: 'Read Post' }, styles: {} }
                ]},
                { width: 33.33, styles: { padding: '10px' }, widgets: [
                    { id: 'uid', type: 'products', data: { image: 'https://via.placeholder.com/400x250', title: 'Building Scalable Apps', price: 'Read More', btnText: 'Read Post' }, styles: {} }
                ]}
            ]
        }
    }],
    'Forms': [{
        id: 'pat_forms_1', name: 'Newsletter Signup',
        section: {
            styles: { backgroundColor: '#3b82f6', padding: '60px 20px', color: 'white', textAlign: 'center' },
            columns: [
                { width: 100, styles: { maxWidth: '600px', margin: '0 auto' }, widgets: [
                    { id: 'uid', type: 'heading', data: { content: 'Subscribe to our Newsletter', tag: 'h3' }, styles: { color: 'white', marginBottom: '16px' } },
                    { id: 'uid', type: 'paragraph', data: { content: 'Get the latest updates right in your inbox.' }, styles: { color: '#bfdbfe', marginBottom: '24px' } },
                    { id: 'uid', type: 'email_field', data: { placeholder: 'Enter your email address' }, styles: { marginBottom: '16px', borderRadius: '30px', padding: '16px' } },
                    { id: 'uid', type: 'button', data: { content: 'Subscribe Now', link: '#' }, styles: { backgroundColor: '#1e293b', color: 'white', width: '100%', borderRadius: '30px' } }
                ]}
            ]
        }
    }],
    'Gallery': [{
        id: 'pat_gallery_1', name: 'Masonry Gallery',
        section: {
            styles: { padding: '60px 20px' },
            columns: [
                { width: 100, styles: {}, widgets: [
                    { id: 'uid', type: 'heading', data: { content: 'Our Work', tag: 'h2' }, styles: { textAlign: 'center', marginBottom: '40px' } },
                    { id: 'uid', type: 'tiled_gallery', data: { images: ['https://via.placeholder.com/600x400', 'https://via.placeholder.com/400x600', 'https://via.placeholder.com/500x500', 'https://via.placeholder.com/600x300'] }, styles: {} }
                ]}
            ]
        }
    }],
    'Headers': [{
        id: 'pat_headers_1', name: 'Main Navigation Header',
        section: {
            styles: { padding: '20px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' },
            columns: [
                { width: 100, styles: {}, widgets: [
                    { id: 'uid', type: 'navbar', data: { brand: 'MyBrand', links: [{label:'Home',url:'#'},{label:'Features',url:'#'},{label:'Pricing',url:'#'},{label:'Contact',url:'#'}] }, styles: {} }
                ]}
            ]
        }
    }],
    'Link in Bio': [{
        id: 'pat_linkbio_1', name: 'Social Link Tree',
        section: {
            styles: { backgroundColor: '#f1f5f9', padding: '80px 20px', minHeight: '100vh' },
            columns: [
                { width: 100, styles: { maxWidth: '400px', margin: '0 auto', textAlign: 'center' }, widgets: [
                    { id: 'uid', type: 'avatar', data: { src: 'https://via.placeholder.com/150', name: 'Creator' }, styles: { margin: '0 auto 20px auto' } },
                    { id: 'uid', type: 'heading', data: { content: '@creator', tag: 'h3' }, styles: { marginBottom: '8px' } },
                    { id: 'uid', type: 'paragraph', data: { content: 'Digital Artist & Content Creator' }, styles: { marginBottom: '32px' } },
                    { id: 'uid', type: 'button', data: { content: 'My Portfolio', link: '#' }, styles: { width: '100%', marginBottom: '16px', borderRadius: '50px' } },
                    { id: 'uid', type: 'button', data: { content: 'Latest Video', link: '#' }, styles: { width: '100%', marginBottom: '16px', borderRadius: '50px', backgroundColor: '#ef4444' } },
                    { id: 'uid', type: 'socials', data: { links: [{icon:'fa-brands fa-instagram',url:'#'},{icon:'fa-brands fa-youtube',url:'#'}] }, styles: { marginTop: '24px' } }
                ]}
            ]
        }
    }],
    'Location': [{
        id: 'pat_loc_1', name: 'Map & Address',
        section: {
            styles: { padding: '60px 20px' },
            columns: [
                { width: 50, styles: { paddingRight: '30px' }, widgets: [
                    { id: 'uid', type: 'heading', data: { content: 'Visit Us', tag: 'h2' }, styles: {} },
                    { id: 'uid', type: 'paragraph', data: { content: '123 Main Street<br>New York, NY 10001<br><br><strong>Hours:</strong><br>Mon-Fri: 9am - 5pm' }, styles: {} },
                    { id: 'uid', type: 'button', data: { content: 'Get Directions', link: '#' }, styles: {} }
                ]},
                { width: 50, styles: {}, widgets: [
                    { id: 'uid', type: 'map', data: { address: 'Empire State Building, NY' }, styles: { height: '300px' } }
                ]}
            ]
        }
    }],
    'Menu': [{
        id: 'pat_menu_1', name: 'Restaurant Menu',
        section: {
            styles: { backgroundColor: '#fff7ed', padding: '80px 20px' },
            columns: [
                { width: 100, styles: {}, widgets: [
                    { id: 'uid', type: 'heading', data: { content: 'Our Menu', tag: 'h2' }, styles: { textAlign: 'center', marginBottom: '40px' } },
                    { id: 'uid', type: 'table', data: { headers: ['Dish', 'Description', 'Price'], rows: [['Margherita Pizza', 'Classic tomato and cheese', '$12'], ['Truffle Pasta', 'Fresh pasta with truffles', '$18']] }, styles: {} }
                ]}
            ]
        }
    }],
    'Page Title': [{
        id: 'pat_pagetitle_1', name: 'Simple Page Header',
        section: {
            styles: { backgroundColor: '#1e293b', color: 'white', padding: '60px 20px', textAlign: 'center' },
            columns: [
                { width: 100, styles: {}, widgets: [
                    { id: 'uid', type: 'heading', data: { content: 'Services', tag: 'h1' }, styles: { color: 'white', marginBottom: '10px' } },
                    { id: 'uid', type: 'paragraph', data: { content: 'What we offer to help your business grow.' }, styles: { color: '#94a3b8' } },
                    { id: 'uid', type: 'divider', data: {}, styles: { width: '50px', margin: '20px auto', borderBottom: '2px solid #3b82f6' } }
                ]}
            ]
        }
    }],
    'Pages': [{
        id: 'pat_pages_1', name: 'Content Page Layout',
        section: {
            styles: { padding: '60px 20px' },
            columns: [
                { width: 70, styles: { paddingRight: '40px' }, widgets: [
                    { id: 'uid', type: 'heading', data: { content: 'Main Article', tag: 'h2' }, styles: {} },
                    { id: 'uid', type: 'image', data: { src: 'https://via.placeholder.com/800x400', alt: 'Article Image' }, styles: { marginBottom: '24px' } },
                    { id: 'uid', type: 'paragraph', data: { content: 'Lorem ipsum dolor sit amet. Here is the main content area for a long page.' }, styles: {} }
                ]},
                { width: 30, styles: { backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px' }, widgets: [
                    { id: 'uid', type: 'heading', data: { content: 'Sidebar', tag: 'h4' }, styles: {} },
                    { id: 'uid', type: 'search', data: { placeholder: 'Search site...' }, styles: {} },
                    { id: 'uid', type: 'page_list', data: { pages: ['Home', 'About', 'Contact'] }, styles: { marginTop: '24px' } }
                ]}
            ]
        }
    }],
    'Portfolio': [{
        id: 'pat_portfolio_1', name: 'Project Grid',
        section: {
            styles: { padding: '80px 20px', backgroundColor: '#0f172a' },
            columns: [
                { width: 100, styles: {}, widgets: [
                    { id: 'uid', type: 'heading', data: { content: 'Our Projects', tag: 'h2' }, styles: { color: 'white', textAlign: 'center', marginBottom: '40px' } }
                ]},
                { width: 50, styles: { padding: '10px' }, widgets: [
                    { id: 'uid', type: 'cover', data: { src: 'https://via.placeholder.com/600x400', title: 'Project Alpha' }, styles: { height: '300px' } }
                ]},
                { width: 50, styles: { padding: '10px' }, widgets: [
                    { id: 'uid', type: 'cover', data: { src: 'https://via.placeholder.com/600x400', title: 'Project Beta' }, styles: { height: '300px' } }
                ]}
            ]
        }
    }],
    'Services': [{
        id: 'pat_services_1', name: 'Features/Services',
        section: {
            styles: { padding: '80px 20px', backgroundColor: '#ffffff' },
            columns: [
                { width: 33.33, styles: { padding: '15px' }, widgets: [
                    { id: 'uid', type: 'features', data: { icon: 'fa-solid fa-code', title: 'Web Dev', desc: 'Custom coded solutions.' }, styles: {} }
                ]},
                { width: 33.33, styles: { padding: '15px' }, widgets: [
                    { id: 'uid', type: 'features', data: { icon: 'fa-solid fa-pen-nib', title: 'Design', desc: 'Beautiful UI/UX.' }, styles: {} }
                ]},
                { width: 33.33, styles: { padding: '15px' }, widgets: [
                    { id: 'uid', type: 'features', data: { icon: 'fa-solid fa-chart-line', title: 'Marketing', desc: 'Grow your audience.' }, styles: {} }
                ]}
            ]
        }
    }],
    'Team': [{
        id: 'pat_team_1', name: 'Meet the Team',
        section: {
            styles: { padding: '80px 20px', backgroundColor: '#f1f5f9' },
            columns: [
                { width: 100, styles: {}, widgets: [
                    { id: 'uid', type: 'heading', data: { content: 'Our Team', tag: 'h2' }, styles: { textAlign: 'center', marginBottom: '40px' } }
                ]},
                { width: 33.33, styles: { textAlign: 'center', padding: '15px' }, widgets: [
                    { id: 'uid', type: 'avatar', data: { src: 'https://via.placeholder.com/150', name: 'Alice' }, styles: { margin: '0 auto 16px auto' } },
                    { id: 'uid', type: 'heading', data: { content: 'Alice', tag: 'h4' }, styles: {} },
                    { id: 'uid', type: 'paragraph', data: { content: 'Lead Designer' }, styles: { color: '#64748b' } }
                ]},
                { width: 33.33, styles: { textAlign: 'center', padding: '15px' }, widgets: [
                    { id: 'uid', type: 'avatar', data: { src: 'https://via.placeholder.com/150', name: 'Bob' }, styles: { margin: '0 auto 16px auto' } },
                    { id: 'uid', type: 'heading', data: { content: 'Bob', tag: 'h4' }, styles: {} },
                    { id: 'uid', type: 'paragraph', data: { content: 'Developer' }, styles: { color: '#64748b' } }
                ]},
                { width: 33.33, styles: { textAlign: 'center', padding: '15px' }, widgets: [
                    { id: 'uid', type: 'avatar', data: { src: 'https://via.placeholder.com/150', name: 'Charlie' }, styles: { margin: '0 auto 16px auto' } },
                    { id: 'uid', type: 'heading', data: { content: 'Charlie', tag: 'h4' }, styles: {} },
                    { id: 'uid', type: 'paragraph', data: { content: 'Product Manager' }, styles: { color: '#64748b' } }
                ]}
            ]
        }
    }],
    'Uncategorized': [{
        id: 'pat_uncat_1', name: 'Blank Section',
        section: {
            styles: { padding: '60px 20px', border: '1px dashed #cbd5e1' },
            columns: [
                { width: 100, styles: {}, widgets: [
                    { id: 'uid', type: 'paragraph', data: { content: 'Start building here...' }, styles: { textAlign: 'center', color: '#94a3b8' } }
                ]}
            ]
        }
    }]
};

// Global State
let layoutData = [];
let targetInsertSectionId = null;
let targetInsertColIndex = null;
let currentInsertIndex = -1; // -1 means append

// History State
let historyStack = [];
let historyIndex = -1;
let isUndoRedoAction = false;

// INIT UI
document.addEventListener('DOMContentLoaded', () => {
    renderModuleList();
    renderPatternList();
    loadLayoutData();
    
    // Save button event
    document.getElementById('saveBtn').addEventListener('click', () => {
        saveLayoutData();
        alert('Layout Saved Locally!');
    });

    // Export button event
    const exportBtn = document.getElementById('exportBtn');
    if(exportBtn) exportBtn.addEventListener('click', exportHTML);

    // Undo/Redo buttons
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    if(undoBtn) undoBtn.addEventListener('click', undo);
    if(redoBtn) redoBtn.addEventListener('click', redo);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if(e.ctrlKey || e.metaKey) {
            if(e.key === 'z') { e.preventDefault(); undo(); }
            if(e.key === 'y') { e.preventDefault(); redo(); }
        }
    });
});

// Render Sidebar Module List
function renderModuleList() {
    const cats = { basic: document.getElementById('modules-basic'), media: document.getElementById('modules-media'), advanced: document.getElementById('modules-advanced') };
    
    Object.values(MODULES).forEach(mod => {
        if(!cats[mod.category]) return;
        
        const btn = document.createElement('div'); // changed to div for better drag support
        btn.className = 'module-item flex flex-col items-center justify-center gap-2 bg-slate-800 border border-slate-700 p-3 rounded text-slate-300 hover:text-white cursor-grab';
        btn.draggable = true;
        btn.innerHTML = `<i class="${mod.icon} text-xl mb-1 pointer-events-none"></i><span class="text-xs font-medium pointer-events-none">${mod.name}</span>`;
        
        btn.ondragstart = (e) => {
            e.dataTransfer.setData('moduleTypeId', mod.id);
            e.dataTransfer.effectAllowed = 'copy';
        };
        
        btn.onclick = () => {
            if(targetInsertSectionId && targetInsertColIndex !== null) {
                addWidgetToColumn(targetInsertSectionId, targetInsertColIndex, mod.id);
            } else {
                alert('Please select a column (click + on canvas) or drag and drop a module onto the canvas!');
            }
        };
        cats[mod.category].appendChild(btn);
    });
}

function renderPatternList() {
    const container = document.getElementById('patterns-container');
    if (!container) return;
    
    Object.keys(PATTERNS).forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.innerHTML = `<h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-4">${cat}</h3>`;
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 gap-2';
        
        PATTERNS[cat].forEach(pat => {
            const btn = document.createElement('button');
            btn.className = 'bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 rounded p-3 text-left transition w-full';
            btn.innerHTML = `<div class="text-sm font-medium text-slate-200 mb-1">${pat.name}</div><div class="text-xs text-slate-500">Click to insert</div>`;
            btn.onclick = () => insertPattern(cat, pat.id);
            grid.appendChild(btn);
        });
        
        catDiv.appendChild(grid);
        container.appendChild(catDiv);
    });
}

window.insertPattern = function(catName, patId) {
    const patGroup = PATTERNS[catName];
    if(!patGroup) return;
    const pat = patGroup.find(p => p.id === patId);
    if(!pat) return;
    
    // Deep clone the section structure
    const newSection = JSON.parse(JSON.stringify(pat.section));
    
    // Assign fresh unique IDs to the section and all its nested widgets so we don't duplicate IDs
    newSection.id = 'sec_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    newSection.columns.forEach(col => {
        col.widgets.forEach(w => {
            w.id = 'wid_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        });
    });
    
    layoutData.push(newSection);
    syncToCanvas();
    
    // Optional: Auto-scroll canvas to bottom where it was added
    alert(`Inserted "${pat.name}" at the bottom of the page.`);
}

// Tab Switching
window.switchTab = function(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tab-btn[onclick="switchTab('${tab}')"]`).classList.add('active');
    
    document.getElementById('tab-elements').classList.add('hidden');
    document.getElementById('tab-patterns').classList.add('hidden');
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
        styles: { backgroundColor: '#ffffff', padding: '0', containerWidth: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
        columns: colWidths.map(w => ({ width: w, widgets: [], styles: { height: '100%', display: 'flex', flexCol: 'column', alignItems: 'center', justifyContent: 'center' } }))
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

window.moveWidgetToColumn = function(widgetId, targetSectionId, targetColIndex) {
    let sourceWidget = null;
    let sourceSecIdx = -1;
    let sourceColIdx = -1;
    let sourceWidgetIdx = -1;

    // Find widget
    for(let s=0; s<layoutData.length; s++) {
        for(let c=0; c<layoutData[s].columns.length; c++) {
            const col = layoutData[s].columns[c];
            const wIdx = col.widgets.findIndex(w => w.id === widgetId);
            if(wIdx !== -1) {
                sourceWidget = col.widgets[wIdx];
                sourceSecIdx = s;
                sourceColIdx = c;
                sourceWidgetIdx = wIdx;
                break;
            }
        }
        if(sourceWidget) break;
    }

    if(sourceWidget) {
        const targetSec = layoutData.find(s => s.id === targetSectionId);
        if(targetSec) {
            const targetCol = targetSec.columns[targetColIndex];
            // Remove from source
            layoutData[sourceSecIdx].columns[sourceColIdx].widgets.splice(sourceWidgetIdx, 1);
            // Add to target
            targetCol.widgets.push(sourceWidget);
            syncToCanvas();
            selectWidget(targetSectionId, targetColIndex, widgetId);
        }
    }
}

window.updateWidgetData = function(widgetId, dataKey, dataValue) {
    for(let s=0; s<layoutData.length; s++) {
        for(let c=0; c<layoutData[s].columns.length; c++) {
            const col = layoutData[s].columns[c];
            const wIdx = col.widgets.findIndex(w => w.id === widgetId);
            if(wIdx !== -1) {
                col.widgets[wIdx].data[dataKey] = dataValue;
                if(currentSelection && currentSelection.type === 'widget' && currentSelection.element.id === widgetId) {
                    buildSettingsForm(col.widgets[wIdx]);
                }
                saveLayoutData();
                return;
            }
        }
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
        case 'video': return data.embedCode || `<iframe src="${data.url}" frameborder="0" allowfullscreen style="width:100%; height:100%;"></iframe>`;
        case 'gallery': 
        case 'tiled_gallery':
            const gCols = data.columns || 3;
            return `<div style="column-count: 1; column-gap: 16px;">` + data.images.map(img => `<div style="margin-bottom: 16px; break-inside: avoid;"><img src="${img}" style="width:100%; max-width:100%; height:auto; border-radius:4px; display:block;"></div>`).join('') + `</div>
            <style>@media(min-width: 768px) { #${widget.id} > div { column-count: ${gCols} !important; } }</style>`;
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
            const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(data.address || 'New York, NY')}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
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
            
        // New Blocks
        case 'code': return `<pre style="margin:0;"><code style="font-family:monospace; color:inherit;">${data.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
        case 'details': return `<details><summary style="cursor:pointer; font-weight:bold; outline:none;">${data.summary}</summary><div style="margin-top:12px; color:#475569;">${data.content}</div></details>`;
        case 'pullquote': return `<div>${data.quote}</div><div style="font-size:0.6em; margin-top:16px; font-weight:bold; color:#64748b; text-transform:uppercase;">${data.author}</div>`;
        case 'tip': return `<div><strong>Tip:</strong> ${data.content}</div>`;
        case 'time_to_read': return `<div><i class="fa-solid fa-clock" style="margin-right:6px;"></i>${data.text}</div>`;
        case 'page_break': return `<div style="position:absolute; top:-10px; left:50%; transform:translateX(-50%); background:white; padding:0 16px; color:#94a3b8; font-size:12px; font-weight:bold; letter-spacing:2px;">PAGE BREAK</div>`;
        case 'cover': return `<div style="position:absolute; inset:0; background:rgba(0,0,0,0.4); border-radius:inherit;"></div><div style="position:relative; z-index:1;">${data.title}</div>`;
        case 'file': return `<i class="${data.icon || 'fa-solid fa-file'}" style="font-size:24px; color:#ef4444;"></i><a href="${data.url}" download style="text-decoration:none; color:#1e293b; font-weight:500; flex:1;">${data.filename}</a><a href="${data.url}" download style="background:#f1f5f9; padding:8px 12px; border-radius:4px; color:#3b82f6; text-decoration:none; font-size:14px; font-weight:bold;">Download</a>`;
        case 'icon': return `<i class="${data.iconClass}"></i>`;
        case 'story': return `<div style="position:absolute; inset:0; background-image:url(${data.image}); background-size:cover; background-position:center; border-radius:inherit;"></div><div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding:24px; display:flex; flex-direction:column; justify-content:flex-end; color:white; border-radius:inherit;"><div style="font-weight:bold; font-size:18px;">${data.text}</div></div>`;
        case 'tiled_gallery': return data.images.map(img => `<div style="flex:1 1 30%; min-width:100px;"><img src="${img}" style="width:100%; height:100%; object-fit:cover; border-radius:4px; display:block;"></div>`).join('');
        case 'pinterest': return `<iframe src="${data.url}" height="300" width="100%" frameborder="0" scrolling="no"></iframe>`;
        case 'avatar': return `<img src="${data.src}" alt="${data.name}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
        case 'smart_frame': return `<iframe src="${data.url}" width="100%" height="100%" frameborder="0"></iframe>`;
        case 'sitelogo': return `<img src="${data.src}" style="height:100%; object-fit:contain;">`;
        case 'site_title': return `<div>${data.text}</div>`;
        case 'site_tagline': return `<div>${data.text}</div>`;
        case 'navigation': return data.links.map(l => `<a href="${l.url}" style="text-decoration:none; color:inherit; font-weight:500;">${l.label}</a>`).join('');
        case 'archive': return `<ul style="margin:0; padding-left:20px; color:#3b82f6;">${data.months.map(m => `<li style="margin-bottom:8px;"><a href="#" style="color:inherit; text-decoration:none;">${m}</a></li>`).join('')}</ul>`;
        case 'page_list': return `<ul style="margin:0; padding-left:20px; color:#3b82f6;">${data.pages.map(p => `<li style="margin-bottom:8px;"><a href="#" style="color:inherit; text-decoration:none;">${p}</a></li>`).join('')}</ul>`;
        case 'whatsapp': return `<i class="fa-brands fa-whatsapp" style="font-size:20px;"></i> <span>${data.text}</span>`;
        case 'sharing_buttons': return data.networks.map(n => `<div style="background:#f1f5f9; padding:8px 16px; border-radius:20px; font-size:14px; font-weight:600; cursor:pointer;">${n}</div>`).join('');
        case 'star_rating': 
            let stars = '';
            for(let i=0; i<5; i++) stars += `<i class="${i < data.rating ? 'fa-solid' : 'fa-regular'} fa-star" style="margin-right:4px;"></i>`;
            return stars;
        case 'search': return `<div style="display:flex; width:100%; border:1px solid #ccc; border-radius:4px; overflow:hidden;"><input type="text" placeholder="${data.placeholder}" style="flex:1; border:none; padding:12px; outline:none;"><button style="background:#f8fafc; border:none; border-left:1px solid #ccc; padding:0 16px; cursor:pointer;"><i class="fa-solid fa-magnifying-glass"></i></button></div>`;
        case 'dropdown_field': return `<label style="display:block; font-size:14px; font-weight:600; margin-bottom:8px;">${data.label}</label><select style="width:100%; padding:12px; border:1px solid #ccc; border-radius:4px; outline:none;">${data.options.map(o => `<option>${o}</option>`).join('')}</select>`;
        case 'checkbox': return `<input type="checkbox" style="width:18px; height:18px; cursor:pointer;"> <span style="font-size:14px;">${data.label}</span>`;
        case 'email_field': return `<input type="email" placeholder="${data.placeholder}" style="width:100%; padding:12px; border:none; outline:none; background:transparent;">`;
        case 'table_of_contents': return `<div style="font-weight:bold; font-size:18px; margin-bottom:12px;">Table of Contents</div><ol style="margin:0; padding-left:20px; color:#3b82f6;">${data.links.map(l => `<li style="margin-bottom:8px;"><a href="#" style="color:inherit; text-decoration:none;">${l}</a></li>`).join('')}</ol>`;

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

window.splitColumn = function(sectionId, colIndex) {
    const sec = layoutData.find(s => s.id === sectionId);
    if(sec) {
        const col = sec.columns[colIndex];
        const currentWidth = col.width;
        const halfWidth = parseFloat((currentWidth / 2).toFixed(1));
        col.width = halfWidth;
        
        const newCol = { width: currentWidth - halfWidth, widgets: [], styles: Object.assign({}, col.styles) };
        sec.columns.splice(colIndex + 1, 0, newCol);
        
        syncToCanvas();
        if (currentSelection && currentSelection.type === 'column' && currentSelection.sectionId === sectionId && currentSelection.colIndex === colIndex) {
            buildSettingsForm(col, 'column');
        }
    }
};

window.deleteColumn = function(sectionId, colIndex) {
    const sec = layoutData.find(s => s.id === sectionId);
    if(sec) {
        const col = sec.columns[colIndex];
        if(sec.columns.length <= 1) {
            layoutData = layoutData.filter(s => s.id !== sectionId);
        } else {
            const siblingIndex = colIndex > 0 ? colIndex - 1 : colIndex + 1;
            sec.columns[siblingIndex].width += col.width;
            sec.columns.splice(colIndex, 1);
        }
        
        syncToCanvas();
        if (currentSelection && currentSelection.type === 'column' && currentSelection.sectionId === sectionId && currentSelection.colIndex === colIndex) {
            document.getElementById('empty-settings').classList.remove('hidden');
            document.getElementById('active-settings').classList.add('hidden');
            currentSelection = null;
        }
    }
};

function buildSettingsForm(element, mode = 'widget') {
    const container = document.getElementById('setting-controls');
    container.innerHTML = '';
    
    // 1. DATA CONTROLS (Only for widgets or columns)
    if(mode === 'column') {
        const colGroup = document.createElement('div');
        colGroup.className = 'mb-6';
        colGroup.innerHTML = '<h4 class="text-xs font-bold text-slate-400 mb-2 border-b border-slate-700 pb-1">COLUMN LAYOUT</h4>';
        
        const wrap = document.createElement('div');
        wrap.className = 'mb-3 flex items-center justify-between gap-2';
        wrap.innerHTML = `<label class="text-xs text-slate-300 w-1/3">Width (%)</label>
                          <input type="number" min="5" max="100" class="w-2/3 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs text-white outline-none" value="${element.width}">`;
        
        wrap.querySelector('input').oninput = (e) => {
            element.width = Number(e.target.value);
            syncToCanvas();
        };
        colGroup.appendChild(wrap);

        const actionGroup = document.createElement('div');
        actionGroup.className = 'mt-4 flex gap-2';
        
        const splitBtn = document.createElement('button');
        splitBtn.className = 'flex-1 py-1.5 text-[10px] bg-green-600 hover:bg-green-500 rounded text-white font-bold flex items-center justify-center gap-1 shadow';
        splitBtn.innerHTML = '<i class="fa-solid fa-arrows-split-up-and-left"></i> Split';
        splitBtn.onclick = () => {
            window.splitColumn(currentSelection.sectionId, currentSelection.colIndex);
        };
        
        const delBtn = document.createElement('button');
        delBtn.className = 'flex-1 py-1.5 text-[10px] bg-red-600 hover:bg-red-500 rounded text-white font-bold flex items-center justify-center gap-1 shadow';
        delBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Delete';
        delBtn.onclick = () => {
            window.deleteColumn(currentSelection.sectionId, currentSelection.colIndex);
        };

        actionGroup.appendChild(splitBtn);
        actionGroup.appendChild(delBtn);
        colGroup.appendChild(actionGroup);

        container.appendChild(colGroup);
    } else if(mode === 'widget') {
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
                    const btnsRow = document.createElement('div');
                    btnsRow.className = 'flex gap-2 mt-2';
                    
                    const addRowBtn = document.createElement('button');
                    addRowBtn.className = 'flex-1 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-300';
                    addRowBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Row';
                    addRowBtn.onclick = () => {
                        const newRow = new Array(val[0].length).fill('New');
                        val.push(newRow);
                        renderList();
                        syncToCanvas();
                    };
                    
                    const addColBtn = document.createElement('button');
                    addColBtn.className = 'flex-1 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-300';
                    addColBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Col';
                    addColBtn.onclick = () => {
                        val.forEach(r => r.push('New'));
                        if (element.data.headers) element.data.headers.push('New');
                        buildSettingsForm(element, mode); // full re-render
                        syncToCanvas();
                    };

                    const delColBtn = document.createElement('button');
                    delColBtn.className = 'flex-1 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-300';
                    delColBtn.innerHTML = '<i class="fa-solid fa-minus"></i> Del Col';
                    delColBtn.onclick = () => {
                        if(val[0].length > 1) {
                            val.forEach(r => r.pop());
                            if (element.data.headers) element.data.headers.pop();
                            buildSettingsForm(element, mode); // full re-render
                            syncToCanvas();
                        }
                    };

                    btnsRow.appendChild(addRowBtn);
                    btnsRow.appendChild(addColBtn);
                    btnsRow.appendChild(delColBtn);
                    input.appendChild(btnsRow);
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
                if (key.toLowerCase().includes('image')) {
                    // Array of Images (e.g. Gallery)
                    input = document.createElement('div');
                    input.className = 'space-y-2 border border-slate-700 p-2 rounded bg-slate-800';
                    const renderList = () => {
                        input.innerHTML = '';
                        val.forEach((imgSrc, index) => {
                            const row = document.createElement('div');
                            row.className = 'flex flex-col gap-1 pb-2 mb-2 border-b border-slate-700 last:border-0 last:mb-0 last:pb-0 relative pt-4';
                            
                            const delBtn = document.createElement('button');
                            delBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
                            delBtn.className = 'absolute top-0 right-0 text-red-400 hover:text-red-300 text-[10px]';
                            delBtn.onclick = () => {
                                val.splice(index, 1);
                                renderList();
                                syncToCanvas();
                            };
                            row.appendChild(delBtn);
                            
                            const fileIn = document.createElement('input');
                            fileIn.type = 'file';
                            fileIn.accept = 'image/*';
                            fileIn.className = 'w-full text-[10px] text-slate-300 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-500 bg-slate-800 border border-slate-700 rounded p-1';
                            
                            fileIn.onchange = (e) => {
                                const file = e.target.files[0];
                                if(file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                        val[index] = ev.target.result;
                                        syncToCanvas();
                                        renderList(); 
                                    };
                                    reader.readAsDataURL(file);
                                }
                            };
                            
                            row.appendChild(fileIn);
                            // We completely remove the URL text input per user request
                            input.appendChild(row);
                        });
                        const addBtn = document.createElement('button');
                        addBtn.className = 'w-full py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-300 mt-2';
                        addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Image';
                        addBtn.onclick = () => {
                            val.push('https://via.placeholder.com/300');
                            renderList();
                            syncToCanvas();
                        };
                        input.appendChild(addBtn);
                    };
                    renderList();
                } else {
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
                }
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
                // Image/Media URL with File Picker only
                input = document.createElement('div');
                input.innerHTML = `
                    <div class="mb-2 text-[10px] text-slate-400">Current file loaded. Choose a new one below:</div>
                    <input type="file" accept="image/*,video/*,audio/*" class="w-full text-[10px] text-slate-300 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-500 bg-slate-800 border border-slate-700 rounded p-1 mb-2">
                `;
                const fileIn = input.querySelector('input[type="file"]');
                
                fileIn.onchange = (e) => {
                    const file = e.target.files[0];
                    if(file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                            element.data[key] = ev.target.result;
                            syncToCanvas();
                        };
                        reader.readAsDataURL(file);
                    }
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
        { key: 'containerWidth', label: 'Max Width', type: 'select', options: ['100%', '1200px', '960px', '800px', '600px'] },
        { key: 'color', label: 'Text Color', type: 'color' },
        { key: 'backgroundColor', label: 'Background', type: 'color' },
        { key: 'fontSize', label: 'Font Size', type: 'text' },
        { key: 'textAlign', label: 'Alignment', type: 'select', options: ['left', 'center', 'right', 'justify'] },
        { key: 'padding', label: 'Padding', type: 'text' },
        { key: 'margin', label: 'Margin', type: 'text' },
        { key: 'border', label: 'Border', type: 'text' },
        { key: 'borderRadius', label: 'Border Radius', type: 'text' },
        { key: 'boxShadow', label: 'Box Shadow', type: 'text' },
        { key: 'opacity', label: 'Opacity', type: 'text' },
        { key: 'width', label: 'Width', type: 'text' },
        { key: 'height', label: 'Height', type: 'text' },
        { key: 'maxHeight', label: 'Max Height', type: 'text' },
        { key: 'aspectRatio', label: 'Aspect Ratio', type: 'text' },
        { key: 'objectFit', label: 'Object Fit', type: 'select', options: ['fill', 'contain', 'cover', 'none', 'scale-down'] }
    ];
    
    stylesDef.forEach(def => {
        if(!element.styles) element.styles = {};
        const alwaysShow = ['padding', 'margin', 'border', 'borderRadius', 'boxShadow', 'opacity', 'backgroundColor'];
        if(element.styles[def.key] !== undefined || mode !== 'widget' || alwaysShow.includes(def.key)) {
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
    syncToCanvas();
};

window.syncToCanvas = function(skipHistory = false) {
    const iframe = document.getElementById('canvas-frame');
    if(iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'SYNC_LAYOUT', data: layoutData }, '*');
    }
    saveLayoutData();
    
    if(!skipHistory && !isUndoRedoAction) {
        pushHistory();
    }
    isUndoRedoAction = false;
}

function saveLayoutData() {
    localStorage.setItem('getshere_builder_draft', JSON.stringify(layoutData));
}

// ----------------- HISTORY & EXPORT -----------------

function pushHistory() {
    const stateStr = JSON.stringify(layoutData);
    // don't push if unchanged
    if(historyIndex >= 0 && historyStack[historyIndex] === stateStr) return;
    
    // If we are not at the end of the stack, truncate future history
    if(historyIndex < historyStack.length - 1) {
        historyStack = historyStack.slice(0, historyIndex + 1);
    }
    
    historyStack.push(stateStr);
    historyIndex = historyStack.length - 1;
    updateUndoRedoUI();
}

function undo() {
    if(historyIndex > 0) {
        historyIndex--;
        isUndoRedoAction = true;
        layoutData = JSON.parse(historyStack[historyIndex]);
        syncToCanvas();
        updateUndoRedoUI();
    }
}

function redo() {
    if(historyIndex < historyStack.length - 1) {
        historyIndex++;
        isUndoRedoAction = true;
        layoutData = JSON.parse(historyStack[historyIndex]);
        syncToCanvas();
        updateUndoRedoUI();
    }
}

function updateUndoRedoUI() {
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    if(undoBtn) {
        if(historyIndex > 0) { undoBtn.removeAttribute('disabled'); undoBtn.classList.remove('disabled:opacity-30', 'disabled:cursor-not-allowed'); }
        else { undoBtn.setAttribute('disabled', 'true'); undoBtn.classList.add('disabled:opacity-30', 'disabled:cursor-not-allowed'); }
    }
    if(redoBtn) {
        if(historyIndex < historyStack.length - 1) { redoBtn.removeAttribute('disabled'); redoBtn.classList.remove('disabled:opacity-30', 'disabled:cursor-not-allowed'); }
        else { redoBtn.setAttribute('disabled', 'true'); redoBtn.classList.add('disabled:opacity-30', 'disabled:cursor-not-allowed'); }
    }
}

function exportHTML() {
    // Generate clean HTML without builder UI elements
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Page</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background-color: #f8fafc; color: #1e293b; line-height: 1.6; }
        * { box-sizing: border-box; }
        .g-section { position: relative; padding: 40px 20px; }
        .g-container { max-width: 1200px; margin: 0 auto; width: 100%; height: 100%; }
        .g-row { display: flex; flex-wrap: wrap; margin: 0 -15px; height: 100%; }
        .g-col { padding: 0 15px; display: flex; flex-direction: column; position: relative; height: 100%; }
        .g-widget { position: relative; margin-bottom: 20px; }
    </style>
</head>
<body>
`;

    layoutData.forEach(section => {
        let secStyle = section.styles ? Object.entries(section.styles).map(([k,v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}:${v}`).join(';') : '';
        htmlContent += `  <section class="g-section" style="${secStyle}">\n`;
        htmlContent += `    <div class="g-container" style="max-width: ${section.styles?.containerWidth || '1200px'}">\n`;
        htmlContent += `      <div class="g-row">\n`;
        
        section.columns.forEach(col => {
            let colStyle = col.styles ? Object.entries(col.styles).map(([k,v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}:${v}`).join(';') : '';
            htmlContent += `        <div class="g-col" style="width: ${col.width}%; ${colStyle}">\n`;
            
            if(col.widgets) {
                col.widgets.forEach(widget => {
                    let widStyle = widget.styles ? Object.entries(widget.styles).map(([k,v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}:${v}`).join(';') : '';
                    htmlContent += `          <div class="g-widget" style="${widStyle}">\n`;
                    htmlContent += `            ${window.renderWidgetHTML(widget)}\n`;
                    htmlContent += `          </div>\n`;
                });
            }
            
            htmlContent += `        </div>\n`;
        });
        
        htmlContent += `      </div>\n`;
        htmlContent += `    </div>\n`;
        htmlContent += `  </section>\n`;
    });

    htmlContent += `</body>\n</html>`;

    // Download the file
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_page.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function loadLayoutData() {
    const saved = localStorage.getItem('getshere_builder_draft');
    if(saved) {
        try {
            layoutData = JSON.parse(saved);
        } catch(e) { console.error('Failed to parse layout', e); }
    }
    
    // Initial sync
    setTimeout(() => {
        syncToCanvas();
        pushHistory(); // push initial state
    }, 500);
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


