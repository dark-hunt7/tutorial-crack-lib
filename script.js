window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        } else {
            section.style.opacity = 0;
            section.style.transform = 'translateY(20px)';
        }
    });
});

async function fetchCredentials() {
    const response = await fetch('https://pastebin.com/raw/abc123'); // Ganti dengan URL paste yang sesuai
    const data = await response.text();
    return data.split('\n').reduce((acc, line) => {
        const [username, password] = line.split(':');
        acc[username.trim()] = password.trim();
        return acc;
    }, {});
}

async function login() {
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');

    // Reset pesan kesalahan
    errorMessage.style.display = 'none';

    // Cek apakah username dan password tidak kosong
    if (usernameInput === '' || passwordInput === '') {
        errorMessage.textContent = 'Please enter both username and password.';
        errorMessage.style.display = 'block';
        return;
    }

    // Ambil kredensial dari Pastebin
    const credentials = await fetchCredentials();

    // Validasi username dan password
    if (credentials[usernameInput] === passwordInput) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'tutorial.html'; // Ganti dengan nama file halaman utama Anda
    } else {
        errorMessage.textContent = 'Invalid username or password.';
        errorMessage.style.display = 'block';
    }
}