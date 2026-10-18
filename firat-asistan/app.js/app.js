document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const cardsContainer = document.getElementById('cards-container');

    // Sohbet ekranına mesaj ekleme fonksiyonu
    function addMessage(text, isUser = false, sources = null) {
        const msgDiv = document.createElement('div');
        // Kullanıcıysa sağa, botsa sola yasla
        msgDiv.className = `p-3 rounded-lg max-w-[80%] ${isUser ? 'bg-red-900 text-white self-end ml-auto' : 'bg-gray-100 text-gray-800'}`;

        let content = `<p>${text}</p>`;

        // Eğer A kişisinden kaynak (sources) gelirse, mesajın altına referans olarak ekle
        if (sources && sources.length > 0) {
            content += `<div class="mt-2 text-xs border-t ${isUser ? 'border-red-700' : 'border-gray-300'} pt-2 opacity-80">`;
            sources.forEach(src => {
                content += `<span class="block font-semibold">📍 ${src.kaynak} - ${src.madde}</span>`;
            });
            content += `</div>`;
        }

        msgDiv.innerHTML = content;
        chatBox.appendChild(msgDiv);
        
        // Yeni mesaj gelince en alta kaydır
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Gönder butonuna basıldığında çalışacak ana fonksiyon
    function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        // 1. Kullanıcının mesajını ekrana bas
        addMessage(text, true);
        chatInput.value = '';

        // 2. Yükleniyor efekti ekle
        const loadingId = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.id = loadingId;
        loadingDiv.className = 'bg-gray-100 p-3 rounded-lg max-w-sm text-gray-500 italic text-sm';
        loadingDiv.innerText = 'Gemma 4 yönetmelikleri tarıyor...';
        chatBox.appendChild(loadingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        // 3. A'nın API'si (Backend) hazır olana kadar sahte (mock) cevap simüle ediyoruz (1.5 saniye bekleme)
        setTimeout(() => {
            // Yükleniyor yazısını sil
            document.getElementById(loadingId).remove();

            // A'nın API sözleşmesindeki JSON formatına birebir uygun sahte veri
            const mockResponse = {
                known: true,
                answer: "Fırat Üniversitesi yönetmeliğine göre mazeretsiz olarak teorik derslerin %30'una katılmayan öğrenciler devamsızlıktan kalır ve final sınavına giremezler.",
                sources: [
                    { kaynak: "FÜ Önlisans ve Lisans Eğitim-Öğretim Yönetmeliği", madde: "Madde 22", metin: "Devam zorunluluğu %70'tir.", score: 0.95 }
                ]
            };

            // Botun cevabını ve kaynağını ekrana bas
            addMessage(mockResponse.answer, false, mockResponse.sources);

        }, 1500);
    }

    // Buton tıklaması ve Enter tuşu ile gönderme tetikleyicileri
    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});