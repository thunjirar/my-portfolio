// =============================================================
// 1. DATA STATE & DEFAULT CONFIGURATIONS
// =============================================================

const ADMIN_PASSCODE = '1234';
const DEFAULT_AVATAR_URL = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';

const defaultProfile = {
    th_name: 'นางสาว ธัญจิรา เรืองเกษา',
    en_name: 'Ms. Thunjira Runkesa',
    bio_th: '"สวัสดีค่ะ! ดิฉันเป็นนักศึกษาสาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) ผู้มีความหลงใหลในการพัฒนา Modern Web Application ที่ทั้งสวยงาม น่ารัก ใช้งานง่าย และมีประสิทธิภาพสูง"',
    bio_en: '"Hello! I am an Information and Communication Technology (ICT) student passionate about building delightful, fast, and scalable Modern Web Applications."',
    gpax: 3.85,
    email: 'thunjira.run@gmail.com',
    phone: '061-556-1427',
    university: 'มหาวิทยาลัยเทคโนโลยีสารสนเทศและการสื่อสาร (ICT)'
};

const defaultProjects = [
    {
        id: 1,
        title: 'Pang Organic',
        category: 'fullstack',
        description: 'เว็บไซต์เกี่ยวกับอาหารและสินค้าสุขภาพ ที่เน้นความเป็น “ออร์แกนิก” โดยเลือกใช้วัตถุดิบจากธรรมชาติ ปลอดสาร เคมี และไม่ใส่สารกันเสีย เพื่อให้ผู้บริโภคได้รับสิ่งที่ดีที่สุดต่อร่างกาย',
        image_url: '1.png',
        project_url: 'https://pang-organic.onrender.com/'
    }
];

const samplePdfData = "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iajw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+ZW5kb2JqCjIgMCBvYmo8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PmVuZG9iagozIDAgb2JqPDwvVHlwZS1QYWdlL1BhcmVudCAyIDAgUi9NZWRpYUJveFswIDAgNTk1IDg0Ml0vQ29udGVudHMgNCAwIFI+PmVuZG9iago0IDAgb2JqPDwvTGVuZ3RoIDY5Pj5zdHJlYW0KQVQvRjEgMjQgVGYgMTAwIDcwMCBUZCAoVGh1bmppcmEgUnVua2VzYSAtIElDVCBDZXJ0aWZpY2F0ZSkgVGoKRVRKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj5lbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAwNjAgMDAwMDAgbiAKMDAwMDAwMDExMSAwMDAwMCBuIAowMDAwMDAwMTkyIDAwMDAwIG4gCjAwMDAwMDAzMTEgMDAwMDAgbiAKdHJhaWxlcjw8L1NpemUgNi9Sb290IDEgMCBSPj4Kc3RhcnR4cmVmCjM4NQolJUVPRg==";

const defaultCerts = [
    {
        id: 2,
        title: 'AWS Generative AI Foundation Program including Party Rock Challenge',
        issuer: 'AWS / ERT (The Enterprise Resources Training Co., Ltd.)',
        issue_date: '2026-09',
        pdf_url: '2.jpg' // เปลี่ยนเป็น .jpg
    },
    {
        id: 3,
        title: 'Meet The Youth Cyber Guardians Thailand 2025',
        issuer: 'หน่วยบัญชาการไซเบอร์ทหาร กองบัญชาการกองทัพไทย',
        issue_date: '2025-09',
        pdf_url: '3.jpg' // เปลี่ยนเป็น .jpg
    }
];

// ดึงข้อมูลจาก LocalStorage
let savedProjects = JSON.parse(localStorage.getItem('thunjira_projects'));
let projectsData = (savedProjects && savedProjects.length > 0) ? savedProjects : [ ...defaultProjects ];

let savedCerts = JSON.parse(localStorage.getItem('thunjira_certs'));
let certsData = (savedCerts && savedCerts.length > 0) ? savedCerts : [ ...defaultCerts ];

let profileData = JSON.parse(localStorage.getItem('thunjira_profile')) || { ...defaultProfile };
let currentProjectFilter = 'all';
let currentLang = 'th';

// =============================================================
// 2. DICTIONARY & MULTILINGUAL SYSTEM (TH / EN)
// =============================================================
const dict = {
    th: {
        "nav.subtitle": "ICT Student Portfolio",
        "nav.hero": "1. ข้อมูลส่วนตัว",
        "nav.skills": "2. ทักษะ",
        "nav.projects": "3. ผลงาน",
        "nav.certs": "4. ใบรับรอง",
        "nav.adminBtn": "ระบบหลังบ้าน (Admin)",
        "nav.editBtnShort": "แก้ไขข้อมูล",
        "hero.statusBadge": "🟢 พร้อมรับโอกาสฝึกงานและร่วมงาน (Open for Internship & Work)",
        "hero.changeAvatarBtn": "📷 เปลี่ยนรูปภาพโปรไฟล์",
        "hero.greeting": "สวัสดีค่ะ 👋 ฉันชื่อ",
        "hero.rolePrefix": "สายงานและความสนใจ:",
        "hero.bioText": '"สวัสดีค่ะ! ดิฉันเป็นนักศึกษาสาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) ผู้มีความหลงใหลในการพัฒนา Modern Web Application ที่ทั้งสวยงาม น่ารัก ใช้งานง่าย และมีประสิทธิภาพสูง"',
        "pills.gpax": "GPAX สะสม",
        "pills.phone": "เบอร์โทรศัพท์",
        "pills.email": "อีเมล",
        "pills.uni": "มหาวิทยาลัย",
        "skills.tag": "02. ทักษะความสามารถ (SKILLS)",
        "skills.heading": "ทักษะเฉพาะด้าน 4 หมวดหมู่",
        "projects.tag": "03. ผลงานของฉัน (MY PROJECTS)",
        "projects.heading": "ผลงานพัฒนาเว็บแอปพลิเคชัน",
        "projects.addBtn": "เพิ่มผลงานใหม่",
        "filter.all": "ทั้งหมด",
        "filter.fullstack": "Full-Stack",
        "filter.frontend": "Frontend",
        "filter.backend": "Backend",
        "certs.tag": "04. การฝึกอบรมและใบรับรอง (CERTIFICATIONS)",
        "certs.heading": "ใบประกาศนียบัตร & ทักษะวิชาชีพ",
        "certs.addBtn": "เพิ่มใบรับรองใหม่"
    },
    en: {
        "nav.subtitle": "ICT Student Portfolio",
        "nav.hero": "1. About Me",
        "nav.skills": "2. Skills",
        "nav.projects": "3. Projects",
        "nav.certs": "4. Certifications",
        "nav.adminBtn": "Backend CMS (Admin)",
        "nav.editBtnShort": "Edit Info",
        "hero.statusBadge": "🟢 Open for Internship & Work Opportunities",
        "hero.changeAvatarBtn": "📷 Change Profile Picture",
        "hero.greeting": "Hello! 👋 I am",
        "hero.rolePrefix": "Focus & Interests:",
        "hero.bioText": '"Hello! I am an Information and Communication Technology (ICT) student passionate about building delightful, fast, and scalable Modern Web Applications."',
        "pills.gpax": "Cumulative GPA",
        "pills.phone": "Phone Number",
        "pills.email": "Email Address",
        "pills.uni": "University",
        "skills.tag": "02. TECHNICAL SKILLS",
        "skills.heading": "4 Specialized Domains",
        "projects.tag": "03. MY PROJECTS",
        "projects.heading": "Web Application Repositories",
        "projects.addBtn": "Add New Project",
        "filter.all": "All",
        "filter.fullstack": "Full-Stack",
        "filter.frontend": "Frontend",
        "filter.backend": "Backend",
        "certs.tag": "04. CERTIFICATIONS & AWARDS",
        "certs.heading": "Certificates & Skill Qualifications",
        "certs.addBtn": "Add New Certificate"
    }
};

function switchLanguage(lang) {
    currentLang = lang;
    const thBtn = document.getElementById('langThBtn');
    const enBtn = document.getElementById('langEnBtn');
    
    if (lang === 'th') {
        if (thBtn) thBtn.className = 'px-2 py-1 rounded-lg bg-pink-500 text-white font-semibold shadow-sm';
        if (enBtn) enBtn.className = 'px-2 py-1 rounded-lg text-gray-400 hover:text-white';
        if (document.getElementById('navThName')) document.getElementById('navThName').innerText = profileData.th_name;
        if (document.getElementById('heroThName')) document.getElementById('heroThName').innerText = profileData.th_name;
        if (document.getElementById('heroEnName')) document.getElementById('heroEnName').innerText = profileData.en_name;
        if (document.getElementById('footerThName')) document.getElementById('footerThName').innerText = profileData.th_name;
        if (document.getElementById('heroBioText')) document.getElementById('heroBioText').innerText = profileData.bio_th;
    } else {
        if (enBtn) enBtn.className = 'px-2 py-1 rounded-lg bg-pink-500 text-white font-semibold shadow-sm';
        if (thBtn) thBtn.className = 'px-2 py-1 rounded-lg text-gray-400 hover:text-white';
        if (document.getElementById('navThName')) document.getElementById('navThName').innerText = profileData.en_name;
        if (document.getElementById('heroThName')) document.getElementById('heroThName').innerText = profileData.en_name;
        if (document.getElementById('heroEnName')) document.getElementById('heroEnName').innerText = '';
        if (document.getElementById('footerThName')) document.getElementById('footerThName').innerText = profileData.en_name;
        if (document.getElementById('heroBioText')) document.getElementById('heroBioText').innerText = profileData.bio_en;
    }

    if (document.getElementById('heroGpax')) document.getElementById('heroGpax').innerText = profileData.gpax;
    if (document.getElementById('heroPhone')) {
        document.getElementById('heroPhone').innerText = profileData.phone;
        document.getElementById('heroPhone').href = `tel:${profileData.phone.replace(/[^0-9+]/g, '')}`;
    }
    if (document.getElementById('heroEmail')) {
        document.getElementById('heroEmail').innerText = profileData.email;
        document.getElementById('heroEmail').href = `mailto:${profileData.email}`;
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[lang] && dict[lang][key]) {
            el.innerText = dict[lang][key];
        }
    });
}

// =============================================================
// 3. ADMIN AUTHENTICATION
// =============================================================
function openAdminModal() {
    const authModal = document.getElementById('adminAuthModal');
    const passInput = document.getElementById('adminPasscode');
    if (passInput) passInput.value = '';
    if (authModal) authModal.classList.remove('hidden');
}

function closeAdminAuthModal() {
    const authModal = document.getElementById('adminAuthModal');
    if (authModal) authModal.classList.add('hidden');
}

function verifyAdminPasscode(e) {
    if (e) e.preventDefault();
    const passInput = document.getElementById('adminPasscode');
    const enteredCode = passInput ? passInput.value.trim() : '';

    if (enteredCode === ADMIN_PASSCODE) {
        closeAdminAuthModal();
        const adminModal = document.getElementById('adminModal');
        if (adminModal) adminModal.classList.remove('hidden');
        showToast('เข้าสู่ระบบหลังบ้านสำเร็จ!');
    } else {
        showToast('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง', 'error');
        if (passInput) passInput.value = '';
    }
}

function closeAdminModal() {
    const adminModal = document.getElementById('adminModal');
    if (adminModal) adminModal.classList.add('hidden');
}

function exportDataJson() {
    const data = {
        profile: profileData,
        projects: projectsData,
        certs: certsData
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('ส่งออกไฟล์ข้อมูลสำรอง JSON สำเร็จ');
}

function resetDefaultData() {
    if (confirm('คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้นใช่หรือไม่?')) {
        localStorage.clear();
        location.reload();
    }
}

// =============================================================
// 4. TYPING ANIMATION & UI EFFECTS
// =============================================================
const typingRoles = [
    "Full-Stack Web Developer",
    "Frontend & UI/UX Specialist",
    "Cloudflare Workers & D1 Architect",
    "ICT Student @ University"
];
let roleIdx = 0, charIdx = 0, isDeleting = false;

function typeEffect() {
    const el = document.getElementById('typingElement');
    if (!el) return;
    
    const currentRole = typingRoles[roleIdx];
    if (isDeleting) {
        el.innerText = currentRole.substring(0, charIdx - 1);
        charIdx--;
    } else {
        el.innerText = currentRole.substring(0, charIdx + 1);
        charIdx++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentRole.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % typingRoles.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `pointer-events-auto px-4 py-2.5 rounded-2xl text-xs font-semibold text-white shadow-xl flex items-center gap-2 transition-all transform translate-y-2 opacity-0 border border-white/20 ${type === 'success' ? 'bg-gradient-to-r from-emerald-600 to-teal-500' : 'bg-gradient-to-r from-rose-600 to-pink-500'}`;
    toast.innerHTML = `<span>${type === 'success' ? '✨' : '⚠️'}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Background Canvas Stars
const canvas = document.getElementById('starsCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Star {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 8 + 4;
            this.alpha = Math.random();
            this.speed = Math.random() * 0.02 + 0.005;
            this.color = Math.random() > 0.3 ? '#ffb7c5' : '#ffd700';
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.font = `${this.size}px serif`;
            ctx.fillText('✦', this.x, this.y);
            ctx.restore();
        }
        update() {
            this.alpha += this.speed;
            if (this.alpha >= 1 || this.alpha <= 0) this.speed = -this.speed;
            this.y -= 0.2;
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
        }
    }
    for (let i = 0; i < 45; i++) stars.push(new Star());

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => { star.update(); star.draw(); });
        requestAnimationFrame(animateStars);
    }
    animateStars();
}

// =============================================================
// 5. PROFILE MANAGEMENT & AUTO-COMPRESSED AVATAR UPLOAD
// =============================================================
function loadProfileAvatar() {
    const avatarImg = document.getElementById('heroAvatarImg');
    if (!avatarImg) return;
    
    const savedImg = localStorage.getItem('thunjira_profile_img');
    avatarImg.src = savedImg || '4.jpg'; // เปลี่ยนเป็น 4.jpg ให้ตรงกับไฟล์ใน GitHub
}

function processAndSaveAvatar(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            const maxDimension = 500;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxDimension) {
                    height *= maxDimension / width;
                    width = maxDimension;
                }
            } else {
                if (height > maxDimension) {
                    width *= maxDimension / height;
                    height = maxDimension;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);

            try {
                localStorage.setItem('thunjira_profile_img', compressedDataUrl);
                const avatarImg = document.getElementById('heroAvatarImg');
                if (avatarImg) avatarImg.src = compressedDataUrl;
                if (callback) callback(true);
            } catch (err) {
                console.error("Storage Limit Exceeded:", err);
                showToast('ขนาดไฟล์รูปภาพใหญ่เกินไป ไม่สามารถบันทึกได้', 'error');
                if (callback) callback(false);
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function handleAvatarUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    processAndSaveAvatar(file, (success) => {
        if (success) showToast('อัปโหลดรูปภาพโปรไฟล์ใหม่เรียบร้อยแล้ว!');
    });
}

function openEditProfileModal() {
    if (document.getElementById('editThName')) document.getElementById('editThName').value = profileData.th_name || '';
    if (document.getElementById('editEnName')) document.getElementById('editEnName').value = profileData.en_name || '';
    if (document.getElementById('editBioTh')) document.getElementById('editBioTh').value = profileData.bio_th || '';
    if (document.getElementById('editGpax')) document.getElementById('editGpax').value = profileData.gpax || '';
    if (document.getElementById('editPhone')) document.getElementById('editPhone').value = profileData.phone || '';
    if (document.getElementById('editEmail')) document.getElementById('editEmail').value = profileData.email || '';
    if (document.getElementById('modalAvatarInput')) document.getElementById('modalAvatarInput').value = '';

    const modal = document.getElementById('editProfileModal');
    if (modal) modal.classList.remove('hidden');
}

function closeEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    if (modal) modal.classList.add('hidden');
}

function handleProfileSubmit(e) {
    if (e) e.preventDefault();

    profileData.th_name = document.getElementById('editThName').value.trim();
    profileData.en_name = document.getElementById('editEnName').value.trim();
    profileData.bio_th = document.getElementById('editBioTh').value.trim();
    profileData.gpax = parseFloat(document.getElementById('editGpax').value) || profileData.gpax;
    profileData.phone = document.getElementById('editPhone').value.trim();
    profileData.email = document.getElementById('editEmail').value.trim();

    const avatarFile = document.getElementById('modalAvatarInput')?.files[0];

    const saveAndClose = () => {
        localStorage.setItem('thunjira_profile', JSON.stringify(profileData));
        switchLanguage(currentLang);
        closeEditProfileModal();
        showToast('อัปเดตข้อมูลส่วนตัวเรียบร้อยแล้ว!');
    };

    if (avatarFile) {
        processAndSaveAvatar(avatarFile, () => {
            saveAndClose();
        });
    } else {
        saveAndClose();
    }
}

// =============================================================
// 6. PROJECTS CRUD MANAGEMENT
// =============================================================
function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = currentProjectFilter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === currentProjectFilter);

    filtered.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'relative group rounded-3xl p-0.5 bg-gradient-to-b from-pink-400/40 via-purple-500/20 to-pink-500/40 shadow-[0_0_20px_rgba(236,72,153,0.2)] hover:shadow-[0_0_30px_rgba(236,72,153,0.45)] transition-all';
        
        const demoBtn = proj.project_url ? `<a href="${proj.project_url}" target="_blank" class="px-3 py-1.5 bg-pink-500/80 hover:bg-pink-500 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"><i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Open Link</a>` : '';

        card.innerHTML = `
            <span class="absolute -top-2.5 -left-2 text-sm z-10 filter drop-shadow-[0_0_6px_rgba(244,114,182,0.9)] animate-bounce">💖</span>
            <div class="bg-[#1c1226]/90 backdrop-blur-md rounded-[22px] p-5 h-full flex flex-col justify-between border border-pink-300/10">
                <div>
                    <div class="relative overflow-hidden rounded-2xl mb-4 border border-pink-500/20 group-hover:border-pink-400/50 transition-colors">
                        <img src="${proj.image_url}" alt="${proj.title}" class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300">
                        <span class="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-pink-950/90 text-pink-300 border border-pink-400/30 flex items-center gap-1">
                            <span>✨</span> ${proj.category.toUpperCase()}
                        </span>
                        
                        <label for="pImg_${proj.id}" class="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-black/70 hover:bg-pink-500 text-white text-[11px] font-semibold cursor-pointer backdrop-blur-sm transition-colors flex items-center gap-1 shadow-sm">
                            <i class="fa-solid fa-camera"></i> <span>📷 เปลี่ยนรูป</span>
                        </label>
                        <input type="file" id="pImg_${proj.id}" accept="image/*" class="hidden" onchange="handleCardImageChange(${proj.id}, event)">
                    </div>

                    <h3 class="text-base font-bold text-white mb-1 flex items-center justify-between">
                        <span>${proj.title}</span>
                        <span class="text-xs text-pink-300">💕</span>
                    </h3>
                    <p class="text-xs text-gray-300 mb-4 leading-relaxed">${proj.description}</p>
                </div>

                <div>
                    <div class="flex items-center justify-between gap-2 pt-3 border-t border-white/10">
                        ${demoBtn}
                        <div class="flex gap-1.5 ml-auto">
                            <button onclick="editProject(${proj.id})" class="p-1.5 bg-amber-400/80 hover:bg-amber-400 text-white rounded-lg text-xs transition-all cursor-pointer"><i class="fa-solid fa-pen"></i></button>
                            <button onclick="deleteProject(${proj.id})" class="p-1.5 bg-rose-500/80 hover:bg-rose-500 text-white rounded-lg text-xs transition-all cursor-pointer"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterProjects(category) {
    currentProjectFilter = category;
    document.querySelectorAll('.project-filter-btn').forEach(btn => {
        btn.className = 'project-filter-btn px-4 py-1.5 rounded-full text-xs font-medium bg-[#1c1226]/80 border border-pink-500/30 text-gray-300 hover:text-pink-200 hover:border-pink-400/80 hover:shadow-[0_0_10px_rgba(244,114,182,0.3)] hover:scale-105 transition-all flex items-center gap-1.5';
    });

    const activeBtn = document.getElementById(`filter${category.charAt(0).toUpperCase() + category.slice(1)}`);
    if (activeBtn) {
        activeBtn.className = 'project-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-pink-500 text-white shadow-[0_0_12px_rgba(244,114,182,0.6)] border border-pink-300/50 hover:scale-105 transition-all flex items-center gap-1.5';
    }

    renderProjects();
}

function saveProjectsLocal() {
    localStorage.setItem('thunjira_projects', JSON.stringify(projectsData));
}

function openProjectModal() {
    const projectForm = document.getElementById('projectForm');
    const projId = document.getElementById('projId');
    const projectModalTitle = document.getElementById('projectModalTitle');
    const projectModal = document.getElementById('projectModal');

    if (projectForm) projectForm.reset();
    if (projId) projId.value = '';
    if (projectModalTitle) projectModalTitle.innerHTML = '<span>เพิ่มผลงานใหม่</span>';
    if (projectModal) projectModal.classList.remove('hidden');
}

function closeProjectModal() {
    const projectModal = document.getElementById('projectModal');
    if (projectModal) projectModal.classList.add('hidden');
}

function editProject(id) {
    const p = projectsData.find(item => item.id == id);
    if (!p) return;
    if (document.getElementById('projId')) document.getElementById('projId').value = p.id;
    if (document.getElementById('projTitle')) document.getElementById('projTitle').value = p.title;
    if (document.getElementById('projCategory')) document.getElementById('projCategory').value = p.category;
    if (document.getElementById('projDesc')) document.getElementById('projDesc').value = p.description;
    if (document.getElementById('projImageUrl')) document.getElementById('projImageUrl').value = p.image_url || '';
    if (document.getElementById('projDemoUrl')) document.getElementById('projDemoUrl').value = p.project_url || '';
    if (document.getElementById('projectModalTitle')) document.getElementById('projectModalTitle').innerHTML = '<span>แก้ไขผลงาน</span>';
    if (document.getElementById('projectModal')) document.getElementById('projectModal').classList.remove('hidden');
}

function handleProjectSubmit(e) {
    if (e) e.preventDefault();

    const projId = document.getElementById('projId') ? document.getElementById('projId').value : '';
    const title = document.getElementById('projTitle') ? document.getElementById('projTitle').value.trim() : '';
    const category = document.getElementById('projCategory') ? document.getElementById('projCategory').value : 'fullstack';
    const description = document.getElementById('projDesc') ? document.getElementById('projDesc').value.trim() : '';
    const imageFileInput = document.getElementById('projImageFile');
    const imageUrlInput = document.getElementById('projImageUrl');
    const demoUrlInput = document.getElementById('projDemoUrl');

    const demoUrl = demoUrlInput ? demoUrlInput.value.trim() : '';
    let imageUrl = imageUrlInput ? imageUrlInput.value.trim() : '';
    const defaultProjImg = '1.png';

    if (!title || !description) {
        showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
        return;
    }

    const saveAndRender = (finalImg) => {
        if (projId) {
            const proj = projectsData.find(p => p.id == projId);
            if (proj) {
                proj.title = title;
                proj.category = category;
                proj.description = description;
                if (finalImg) proj.image_url = finalImg;
                proj.project_url = demoUrl;
            }
        } else {
            const newProject = {
                id: Date.now(),
                title: title,
                category: category,
                description: description,
                image_url: finalImg || defaultProjImg,
                project_url: demoUrl
            };
            projectsData.push(newProject);
        }

        saveProjectsLocal();
        renderProjects();
        closeProjectModal();
        showToast(projId ? 'แก้ไขผลงานเรียบร้อยแล้ว!' : 'เพิ่มผลงานใหม่เรียบร้อยแล้ว!');
    };

    if (imageFileInput && imageFileInput.files && imageFileInput.files[0]) {
        const file = imageFileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(evt) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 600;
                canvas.height = (img.height * 600) / img.width;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                saveAndRender(canvas.toDataURL('image/jpeg', 0.8));
            };
            img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        if (!imageUrl && projId) {
            const existingProj = projectsData.find(p => p.id == projId);
            if (existingProj) imageUrl = existingProj.image_url;
        }
        saveAndRender(imageUrl || defaultProjImg);
    }
}

function deleteProject(id) {
    if (confirm('คุณต้องการลบผลงานนี้ใช่หรือไม่?')) {
        projectsData = projectsData.filter(p => p.id != id);
        saveProjectsLocal();
        renderProjects();
        showToast('ลบผลงานเรียบร้อยแล้ว');
    }
}

function handleCardImageChange(projId, event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 600;
            canvas.height = (img.height * 600) / img.width;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const proj = projectsData.find(p => p.id === projId);
            if (proj) {
                proj.image_url = canvas.toDataURL('image/jpeg', 0.8);
                try {
                    saveProjectsLocal();
                    renderProjects();
                    showToast('อัปเดตรูปภาพผลงานสำเร็จ!');
                } catch (err) {
                    showToast('ขนาดไฟล์เกินโควต้า LocalStorage', 'error');
                }
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// =============================================================
// 7. CERTIFICATIONS CRUD MANAGEMENT & PDF PREVIEW
// =============================================================
function saveCertsLocal() {
    localStorage.setItem('thunjira_certs', JSON.stringify(certsData));
}

function renderCerts() {
    const grid = document.getElementById('certsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    certsData.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'relative group rounded-3xl p-0.5 bg-gradient-to-b from-pink-500/30 via-purple-500/20 to-pink-500/30 shadow-lg hover:shadow-pink-500/20 transition-all';

        const isPdf = cert.pdf_url && cert.pdf_url.toLowerCase().endsWith('.pdf');

        const displayMedia = cert.pdf_url && !isPdf
            ? `<div class="overflow-hidden rounded-xl mb-3 border border-pink-500/20 bg-black/40 h-36 flex items-center justify-center">
                 <img src="${cert.pdf_url}" alt="${cert.title}" class="w-full h-full object-cover">
               </div>`
            : `<div class="overflow-hidden rounded-xl mb-3 border border-pink-500/20 bg-white/5 h-36 flex items-center justify-center text-pink-300 font-semibold text-xs">
                 <i class="fa-solid fa-file-pdf text-3xl mr-2"></i> เอกสาร PDF
               </div>`;

        card.innerHTML = `
            <div class="bg-[#1c1226]/90 backdrop-blur-md rounded-[22px] p-6 h-full flex flex-col justify-between border border-pink-300/10">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white shadow-md">
                            <i class="fa-solid fa-award text-lg"></i>
                        </div>
                        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-pink-950/80 text-pink-300 border border-pink-500/30">
                            ${cert.issue_date || 'N/A'}
                        </span>
                    </div>

                    ${displayMedia}

                    <h3 class="text-base font-bold text-white mb-2 leading-snug">
                        ${cert.title}
                    </h3>
                    <p class="text-xs text-pink-200/80 mb-6 font-medium">
                        ${cert.issuer}
                    </p>
                </div>

                <div>
                    <div class="grid grid-cols-2 gap-2 pt-4 border-t border-white/10 mb-3">
                        <button onclick="viewCertPdf(${cert.id})" 
                                class="px-3 py-2 bg-pink-500/80 hover:bg-pink-500 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer">
                            <i class="fa-solid fa-file-pdf"></i>
                            <span>เปิดดู PDF/รูป</span>
                        </button>

                        <label for="cPdf_${cert.id}" 
                               class="px-3 py-2 bg-white/10 hover:bg-white/20 text-gray-200 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/10">
                            <i class="fa-solid fa-paperclip"></i>
                            <span>แนบไฟล์</span>
                        </label>
                        <input type="file" id="cPdf_${cert.id}" accept="application/pdf,image/*" class="hidden" onchange="handlePdfUpload(${cert.id}, event)">
                    </div>

                    <div class="flex items-center justify-end gap-1.5">
                        <button onclick="editCert(${cert.id})" class="px-3 py-1 bg-amber-400/20 hover:bg-amber-400/40 text-amber-300 rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer">
                            <i class="fa-solid fa-pen text-[10px]"></i> แก้ไข
                        </button>
                        <button onclick="deleteCert(${cert.id})" class="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer">
                            <i class="fa-solid fa-trash text-[10px]"></i> ลบ
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function viewCertPdf(id) {
    const cert = certsData.find(c => c.id === id);
    if (cert && cert.pdf_url) {
        openPdfModal(cert.pdf_url);
    } else {
        showToast('ไม่พบไฟล์เอกสารของใบรับรองนี้', 'error');
    }
}

function openPdfModal(pdfUrl) {
    const pdfModal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfPreviewIframe');
    if (!pdfModal || !iframe) return;

    iframe.src = dataURLtoBlobUrl(pdfUrl);
    pdfModal.classList.remove('hidden');
}

function closePdfModal() {
    const pdfModal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfPreviewIframe');
    if (iframe) iframe.src = '';
    if (pdfModal) pdfModal.classList.add('hidden');
}

function openCertModal() {
    const certForm = document.getElementById('certForm');
    const certId = document.getElementById('certId');
    const certModalTitle = document.getElementById('certModalTitle');
    const certModal = document.getElementById('certModal');

    if (certForm) certForm.reset();
    if (certId) certId.value = '';
    if (certModalTitle) certModalTitle.innerHTML = '<i class="fa-solid fa-award text-pink-400"></i> <span>เพิ่มใบรับรองใหม่</span>';
    if (certModal) certModal.classList.remove('hidden');
}

function closeCertModal() {
    const certModal = document.getElementById('certModal');
    if (certModal) certModal.classList.add('hidden');
}

function editCert(id) {
    const c = certsData.find(item => item.id == id);
    if (!c) return;
    if (document.getElementById('certId')) document.getElementById('certId').value = c.id;
    if (document.getElementById('certTitle')) document.getElementById('certTitle').value = c.title;
    if (document.getElementById('certIssuer')) document.getElementById('certIssuer').value = c.issuer;
    if (document.getElementById('certDate')) document.getElementById('certDate').value = c.issue_date;
    if (document.getElementById('certModalTitle')) {
        document.getElementById('certModalTitle').innerHTML = '<i class="fa-solid fa-pen text-amber-400"></i> <span>แก้ไขข้อมูลใบรับรอง</span>';
    }
    const certModal = document.getElementById('certModal');
    if (certModal) certModal.classList.remove('hidden');
}

function handleCertSubmit(e) {
    if (e) e.preventDefault();

    const idInput = document.getElementById('certId');
    const titleInput = document.getElementById('certTitle');
    const issuerInput = document.getElementById('certIssuer');
    const dateInput = document.getElementById('certDate');
    const pdfFileInput = document.getElementById('certPdfFile');

    const certId = idInput ? idInput.value : '';
    const title = titleInput ? titleInput.value.trim() : '';
    const issuer = issuerInput ? issuerInput.value.trim() : '';
    const issue_date = dateInput ? dateInput.value : '';

    if (!title || !issuer) {
        showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
        return;
    }

    const finalizeSave = (pdfData) => {
        if (certId) {
            const cert = certsData.find(c => c.id == certId);
            if (cert) {
                cert.title = title;
                cert.issuer = issuer;
                cert.issue_date = issue_date || cert.issue_date;
                if (pdfData) cert.pdf_url = pdfData;
            }
        } else {
            const newCert = {
                id: Date.now(),
                title: title,
                issuer: issuer,
                issue_date: issue_date || '2026-09',
                pdf_url: pdfData || samplePdfData
            };
            certsData.push(newCert);
        }

        try {
            saveCertsLocal();
        } catch (err) {
            console.error("LocalStorage Error:", err);
            showToast('ไฟล์มีขนาดใหญ่เกินโควต้า LocalStorage', 'error');
        }

        renderCerts();
        closeCertModal();
        showToast('บันทึกข้อมูลใบรับรองเรียบร้อยแล้ว!');
    };

    if (pdfFileInput && pdfFileInput.files && pdfFileInput.files[0]) {
        const file = pdfFileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(evt) {
            if (file.type.startsWith('image/')) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = 600;
                    canvas.height = (img.height * 600) / img.width;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    finalizeSave(canvas.toDataURL('image/jpeg', 0.8));
                };
                img.src = evt.target.result;
            } else {
                finalizeSave(evt.target.result);
            }
        };
        reader.readAsDataURL(file);
    } else {
        let existingPdf = samplePdfData;
        if (certId) {
            const cert = certsData.find(c => c.id == certId);
            if (cert) existingPdf = cert.pdf_url;
        }
        finalizeSave(existingPdf);
    }
}

function handlePdfUpload(certId, event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const cert = certsData.find(c => c.id === certId);
        if (!cert) return;

        if (file.type.startsWith('image/')) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 600;
                canvas.height = (img.height * 600) / img.width;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                cert.pdf_url = canvas.toDataURL('image/jpeg', 0.8);
                try {
                    saveCertsLocal();
                    renderCerts();
                    showToast('อัปโหลดรูปภาพใบรับรองสำเร็จ!');
                } catch (err) {
                    showToast('ขนาดไฟล์เกินโควต้า LocalStorage', 'error');
                }
            };
            img.src = e.target.result;
        } else {
            cert.pdf_url = e.target.result;
            try {
                saveCertsLocal();
                renderCerts();
                showToast('แนบไฟล์ PDF สำเร็จ!');
            } catch (err) {
                showToast('ขนาดไฟล์เกินโควต้า LocalStorage', 'error');
            }
        }
    };
    reader.readAsDataURL(file);
}

function deleteCert(id) {
    if (confirm('คุณต้องการลบใบรับรองนี้ใช่หรือไม่?')) {
        certsData = certsData.filter(c => c.id != id);
        saveCertsLocal();
        renderCerts();
        showToast('ลบใบรับรองเรียบร้อยแล้ว');
    }
}

function dataURLtoBlobUrl(dataUrl) {
    try {
        if (!dataUrl || !dataUrl.startsWith('data:')) return dataUrl;
        
        const arr = dataUrl.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        const blob = new Blob([u8arr], { type: mime });
        return URL.createObjectURL(blob);
    } catch (err) {
        console.error("Error converting Data URL to Blob:", err);
        return dataUrl;
    }
}

// =============================================================
// 8. INITIALIZATION ON DOM READY
// =============================================================
document.addEventListener('DOMContentLoaded', () => {
    switchLanguage(currentLang);
    loadProfileAvatar();
    renderProjects();
    renderCerts();
    typeEffect();
});
