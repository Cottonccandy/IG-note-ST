(function() {
    function createNotes() {
        if (document.getElementById('ig-notes-bar')) return;
        
        const chatContainer = document.querySelector('.chat-container');
        if (!chatContainer) return;

        const bar = document.createElement('div');
        bar.id = 'ig-notes-bar';
        bar.style = "position:sticky; top:0; z-index:100; width:100%; background:rgba(255,255,255,0.9); padding:10px 0; display:flex; justify-content:center; gap:25px; border-bottom:1px solid #ddd;";
        
        // ใช้ฟังก์ชันดึงค่าจาก SillyTavern โดยตรง
        bar.innerHTML = `
            <div style="text-align:center; width:85px;">
                <div style="background:white; border-radius:12px; padding:5px; font-size:11px; box-shadow:0 2px 5px rgba(0,0,0,0.1); min-height:35px; display:flex; align-items:center; justify-content:center;">{{getvar::char_note}}</div>
                <img src="{{char_avatar}}" style="width:50px; height:50px; border-radius:50%; border:2px solid #e1306c; margin-top:8px; object-fit:cover;">
                <div style="font-size:10px; font-weight:bold;">{{char}}</div>
            </div>
            <div style="text-align:center; width:85px;">
                <input type="text" id="user_note_input" placeholder="แชร์โน๊ต..." style="width:100%; border-radius:12px; padding:5px; font-size:11px; border:1px solid #ddd; text-align:center;">
                <img src="{{user_avatar}}" style="width:50px; height:50px; border-radius:50%; border:2px solid #ccc; margin-top:8px; object-fit:cover;">
                <div style="font-size:10px;">คุณ</div>
            </div>
        `;

        chatContainer.prepend(bar);

        // ดักจับตอนพิมพ์เปลี่ยนโน๊ต
        const input = bar.querySelector('#user_note_input');
        input.value = localStorage.getItem('user_note') || "";
        input.onchange = (e) => {
            SillyTavern.postCommand('/setvar name=user_note value=' + e.target.value);
            localStorage.setItem('user_note', e.target.value);
        };
    }

    // รันทุกครั้งที่มีการเปลี่ยนหน้าหรือโหลดแชท
    setInterval(createNotes, 2000);
})();
