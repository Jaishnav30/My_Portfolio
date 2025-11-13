// Theme toggle
document.querySelectorAll('#themeToggle, #themeToggleTop').forEach(btn => {
    btn?.addEventListener('click', () => {
        const isLight = !document.body.classList.contains('light');
        setTheme(isLight);
        btn.textContent = isLight ? '🌞' : '🌙';
    })
});


// initialize theme
setTheme(localStorage.getItem('lightMode') === 'true');


// Download resume + confetti
const downloadBtn = document.getElementById('downloadResume');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // download file if present
        const url = 'assets/resume.pdf';
        fetch(url).then(res => {
            if (!res.ok) throw new Error('No PDF');
            return res.blob();
        }).then(blob => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'Jai_Resume.pdf';
            document.body.appendChild(a); a.click(); a.remove();
            // tiny confetti
            smallConfetti();
        }).catch(() => {
            alert('Resume PDF not found in /assets. You can still save the page as PDF from the browser.');
        });
    });
}


// Minimal confetti without library
function smallConfetti() {
    for (let i = 0; i < 20; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = (20 + Math.random() * 60) + '%';
        c.style.background = `hsl(${Math.random() * 360} 70% 60%)`;
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 1600);
    }
}


// Add confetti styles dynamically
const style = document.createElement('style');
style.textContent = `
.confetti{position:fixed;top:20%;width:10px;height:14px;border-radius:2px;opacity:0.9;transform:translateY(0);animation:fall 1.4s linear forwards}
@keyframes fall{to{transform:translateY(520px) rotate(600deg);opacity:0}}
`;
document.head.appendChild(style);


// little easter-egg: press 'g' to open GitHub profile
window.addEventListener('keydown', e => { if (e.key === 'g') window.open('https://github.com/your-username', '_blank') });