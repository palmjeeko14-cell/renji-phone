const appWindow = document.getElementById('appWindow');
const appContent = document.getElementById('appContent');
const appTitle = document.getElementById('appTitle');
const screen = document.querySelector('.screen');
const labels = {
  messages: 'Messages', social: 'Social', photos: 'Photos',
  notes: 'Notes', contacts: 'Contacts', settings: 'Settings'
};

function renderApp(app) {
  appTitle.textContent = labels[app] || 'App';
  const savedNotes = localStorage.getItem('phone-notes') || '';
  const templates = {
    messages: `<div class="panel"><h3>แชตตัวอย่าง</h3><p><b>เจเจ</b></p><p>หวัดดี วันนี้เป็นไงบ้าง?</p><p class="muted">นี่เป็นข้อความตัวอย่างในเครื่องนี้</p></div><div class="panel"><h3>ส่งข้อความทดลอง</h3><div id="messageList"></div><input id="messageInput" class="field" placeholder="พิมพ์ข้อความ..."><button class="primary" id="sendMessage">ส่งข้อความ</button></div>`,
    social: `<div class="panel"><h3>ฟีดของฉัน</h3><p>วันนี้เป็นวันที่ดี ☁️</p><button class="primary" id="likeButton">♡ ถูกใจ <span id="likeCount">0</span></button></div><div class="panel"><h3>สร้างโพสต์</h3><textarea id="postInput" class="field" placeholder="คุณกำลังคิดอะไรอยู่?"></textarea><button class="primary" id="postButton">โพสต์</button><div id="posts"></div></div>`,
    photos: `<div class="panel"><h3>Photos</h3><p>อัลบั้มรูปตัวอย่าง</p><div style="font-size:52px">🌷 🌅 🌙</div><p class="muted">เพิ่มรูปของคุณได้ในเวอร์ชันถัดไป</p></div>`,
    notes: `<div class="panel"><h3>โน้ตของฉัน</h3><textarea id="noteInput" class="field" rows="7" placeholder="เขียนโน้ต...">${escapeHtml(savedNotes)}</textarea><button class="primary" id="saveNote">บันทึกโน้ต</button><p id="noteStatus" class="muted"></p></div>`,
    contacts: `<div class="panel"><h3>รายชื่อตัวละคร</h3><p>🧑🏻 เจเจ</p><p class="muted">เพื่อน · ตัวละครตัวอย่าง</p><hr><p>👩🏻 มีนา</p><p class="muted">เพื่อน · ตัวละครตัวอย่าง</p></div>`,
    settings: `<div class="panel"><h3>การตั้งค่า</h3><p>My Phone · เวอร์ชันเริ่มต้น</p><p class="muted">โปรเจกต์ต้นแบบสำหรับต่อยอด</p><button class="primary" id="resetNotes">ลบโน้ตที่บันทึกไว้</button><p id="settingStatus" class="muted"></p></div>`
  };
  appContent.innerHTML = templates[app] || '<div class="panel">ไม่พบแอปนี้</div>';
  appWindow.hidden = false;
  screen.hidden = true;
  if (app === 'messages') {
    document.getElementById('sendMessage').onclick = () => {
      const input = document.getElementById('messageInput');
      const value = input.value.trim();
      if (!value) return;
      const p = document.createElement('p');
      p.textContent = 'คุณ: ' + value;
      document.getElementById('messageList').appendChild(p);
      input.value = '';
    };
  }
  if (app === 'social') {
    let count = 0;
    document.getElementById('likeButton').onclick = () => {
      count++;
      document.getElementById('likeCount').textContent = count;
    };
    document.getElementById('postButton').onclick = () => {
      const input = document.getElementById('postInput');
      if (!input.value.trim()) return;
      const p = document.createElement('p');
      p.textContent = input.value.trim();
      const card = document.createElement('div');
      card.className = 'panel';
      card.appendChild(p);
      document.getElementById('posts').prepend(card);
      input.value = '';
    };
  }
  if (app === 'notes') {
    document.getElementById('saveNote').onclick = () => {
      localStorage.setItem('phone-notes', document.getElementById('noteInput').value);
      document.getElementById('noteStatus').textContent = 'บันทึกแล้วในเบราว์เซอร์นี้';
    };
  }
  if (app === 'settings') {
    document.getElementById('resetNotes').onclick = () => {
      localStorage.removeItem('phone-notes');
      document.getElementById('settingStatus').textContent = 'ลบโน้ตที่บันทึกไว้แล้ว';
    };
  }
}
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
document.querySelectorAll('[data-app]').forEach(button => {
  button.addEventListener('click', () => renderApp(button.dataset.app));
});
document.getElementById('backButton').addEventListener('click', () => {
  appWindow.hidden = true;
  screen.hidden = false;
});
const now = new Date();
document.getElementById('statusTime').textContent = now.toLocaleTimeString('th-TH', {hour:'2-digit', minute:'2-digit'});
document.getElementById('dateLabel').textContent = now.toLocaleDateString('th-TH', {weekday:'long', day:'numeric', month:'long'});
