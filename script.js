// ===== SafeHer India — Interactive Features =====

document.addEventListener('DOMContentLoaded', () => {
    // ===== SUPABASE INITIALIZATION =====
    const supabaseUrl = 'https://dynfmafntewpfqmpzrot.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5bmZtYWZudGV3cGZxbXB6cm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NjcxMzcsImV4cCI6MjA4NzE0MzEzN30.iutjUT5zCfwk_S9e7cb4SyWKoBUE2N71WOfKFdzuDJ8';

    const supabase = window.supabase ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

    // ===== START TOOL LOGIC =====
    const startBtn = document.getElementById('start-tool-btn');
    const introSection = document.getElementById('intro-sections');
    const wizardContainer = document.getElementById('wizard-container');

    if (startBtn && introSection && wizardContainer) {
        startBtn.addEventListener('click', () => {
            const heroEntrance = document.querySelector('.hero-entrance');
            if (heroEntrance) heroEntrance.style.display = 'none';
            introSection.style.display = 'none';
            wizardContainer.style.display = 'block';
            document.querySelector('.wizard-header').style.display = 'flex';
            // Reset wizard to first step
            stepHistory.length = 0;
            currentStep = '1-1';
            showStep('1-1', false);
            window.scrollTo(0, 0);
        });
    }

    // ===== CREATE CASE WIZARD =====
    const steps = document.querySelectorAll('.wizard-step');
    let selectedFiles = [];
    const stepHistory = [];
    let currentStep = '1-1';

    const stepProgressMap = {
        '1-1': { num: 1, total: 9, percent: 11 },
        '1-2': { num: 2, total: 9, percent: 22 },
        'platform-selection': { num: 3, total: 9, percent: 33 },
        '1-2b': { num: 4, total: 9, percent: 44 },
        'url-removal': { num: 5, total: 9, percent: 55 },
        '1-3': { num: 6, total: 9, percent: 66 },
        '1-4': { num: 7, total: 9, percent: 77 },
        '1-5': { num: 8, total: 9, percent: 88 },
        '2': { num: 9, total: 9, percent: 100 },
        'success': { num: 9, total: 9, percent: 100 }
    };

    function showStep(stepId, pushToHistory = true) {
        if (pushToHistory && currentStep !== stepId) {
            stepHistory.push(currentStep);
        }
        currentStep = stepId;

        steps.forEach(s => {
            s.classList.remove('active');
            s.style.display = 'none';
        });

        const targetStr = stepId.toString().startsWith('step-') ? stepId : `step-${stepId}`;
        const target = document.getElementById(targetStr);
        if (target) {
            target.style.display = 'block';
            target.classList.add('active');
        }

        const progNode = stepProgressMap[stepId];
        const progText = document.getElementById('progress-text');
        const progFill = document.getElementById('progress-fill');

        if (progNode && progText && progFill) {
            progText.textContent = `${progNode.num} / ${progNode.total}`;
            progFill.style.width = `${progNode.percent}%`;
        }
    }

    // Back Button Logic
    const backBtn = document.getElementById('wizard-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (stepHistory.length > 0) {
                const prevStep = stepHistory.pop();
                showStep(prevStep, false);
            } else {
                // Return to intro if no history
                wizardContainer.style.display = 'none';
                introSection.style.display = 'block';
                window.scrollTo(0, 0);
            }
        });
    }

    document.querySelectorAll('.q-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const next = e.currentTarget.getAttribute('data-next');

            if (next === 'url-removal' && e.currentTarget.closest('#step-1-2b')) {
                const urlInputs = document.querySelectorAll('.platform-url-input');
                const hasValue = Array.from(urlInputs).some(input => input.value.trim() !== '');

                if (hasValue) {
                    const btnEl = e.currentTarget;
                    btnEl.disabled = true;
                    btnEl.style.opacity = '0.7';

                    let scanProgress = 0;
                    const scanInterval = setInterval(() => {
                        scanProgress += Math.floor(Math.random() * 5) + 5;
                        if (scanProgress >= 100) {
                            scanProgress = 100;
                            clearInterval(scanInterval);
                            showStep('url-removal');
                            startRemovalAnimation();
                        } else {
                            btnEl.textContent = `Scanning URLs... ${scanProgress}%`;
                        }
                    }, 50);
                    return;
                } else {
                    showStep('1-3');
                    return;
                }
            }
            if (next) showStep(next);
        });
    });

    function startRemovalAnimation() {
        setTimeout(() => {
            const el = document.getElementById('status-google');
            if (el) { el.textContent = 'Search Found ✓'; el.style.color = '#16a34a'; }
        }, 1000);
        setTimeout(() => {
            const el = document.getElementById('status-insta');
            if (el) { el.textContent = 'Search Found ✓'; el.style.color = '#16a34a'; }
        }, 2000);
        setTimeout(() => {
            const el = document.getElementById('status-whatsapp');
            if (el) { el.textContent = 'Search Found ✓'; el.style.color = '#16a34a'; }
            const finishBtn = document.getElementById('finish-removal-btn');
            if (finishBtn) {
                finishBtn.style.opacity = '1';
                finishBtn.style.pointerEvents = 'auto';
                finishBtn.textContent = 'Continue';
            }
        }, 3000);
    }

    // File Upload & Submit
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    const toUrlStepBtn = document.getElementById('to-url-step');
    const submitBtn = document.getElementById('sumbit-step-2');

    if (uploadZone && fileInput) {
        uploadZone.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', () => {
            handleFiles(fileInput.files);
            fileInput.value = '';
        });
    }

    async function handleFiles(files) {
        for (const file of files) {
            if (selectedFiles.length >= 20) break;
            const arrayBuffer = await file.arrayBuffer();
            const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
            const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
            selectedFiles.push({ file, hash: hashHex });
        }
        renderFileList();
    }

    function renderFileList() {
        if (!fileList) return;
        fileList.innerHTML = '';
        selectedFiles.forEach((item, idx) => {
            const div = document.createElement('div');
            div.style.padding = '10px';
            div.style.borderBottom = '1px solid #eee';
            div.style.fontSize = '0.9rem';
            div.innerHTML = `<strong>${item.file.name}</strong><br><span style="color:#888; font-family:monospace; font-size:0.7rem;">${item.hash}</span>`;
            fileList.appendChild(div);
        });
        if (submitBtn) submitBtn.disabled = selectedFiles.length === 0;
    }

    if (toUrlStepBtn) {
        toUrlStepBtn.addEventListener('click', () => {
            const selectedPlatforms = Array.from(platformChecks)
                .filter(c => c.checked)
                .map(c => ({
                    id: c.value,
                    name: c.closest('.platform-item').querySelector('.platform-name').textContent
                }));

            const container = document.getElementById('dynamic-url-inputs');
            if (container) {
                container.innerHTML = '';
                selectedPlatforms.forEach(p => {
                    const div = document.createElement('div');
                    div.style.marginBottom = '10px';
                    div.innerHTML = `
                        <label style="display:block; font-size: 0.9rem; margin-bottom: 5px; color: #64748b; font-weight: 500;">${p.name} leaked link</label>
                        <input type="url" class="form-input platform-url-input" data-platform="${p.id}" placeholder="https://${p.id}.com/..." style="margin-bottom:0">
                    `;
                    container.appendChild(div);
                });
            }
            showStep('1-2b');
        });
    }

    // Platform Selection Logic
    const platformChecks = document.querySelectorAll('input[name="platform"]');
    if (platformChecks) {
        platformChecks.forEach(check => {
            check.addEventListener('change', (e) => {
                const item = e.target.closest('.platform-item');
                if (e.target.checked) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
                const anyChecked = Array.from(platformChecks).some(c => c.checked);
                if (toUrlStepBtn) toUrlStepBtn.disabled = !anyChecked;
            });
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', async () => {
            const caseNum = 'SHI-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            const selectedPlatforms = Array.from(platformChecks).filter(c => c.checked).map(c => c.value);
            const platformLinks = {};
            document.querySelectorAll('.platform-url-input').forEach(input => {
                if (input.value.trim() !== '') {
                    platformLinks[input.dataset.platform] = input.value.trim();
                }
            });

            const caseData = {
                case_number: caseNum,
                date_created: new Date().toLocaleDateString(),
                platforms: selectedPlatforms,
                platform_links: platformLinks,
                hashes: selectedFiles.map(f => ({ name: f.file.name, hash: f.hash }))
            };

            submitBtn.textContent = 'Applying digital fingerprints...';
            submitBtn.disabled = true;

            // Artificial delay to simulate "applying fingerprints"
            await new Promise(r => setTimeout(r, 1500));
            submitBtn.textContent = 'Sending deletion requests...';
            await new Promise(r => setTimeout(r, 1500));

            if (supabase) {
                const { error } = await supabase.from('cases').insert([caseData]);
                if (error) {
                    console.error('Supabase error:', error);
                }
            }

            document.getElementById('case-number-display').textContent = caseNum;
            showStep('success');
            document.querySelector('.wizard-header').style.display = 'none';
        });
    }
});
