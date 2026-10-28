document.getElementById("year").textContent = new Date().getFullYear();

// JAR dosyası downloads/TWLDAntiCheat-Paper-1.21.11.jar yolunda bulunmalıdır.
const downloadButton = document.getElementById("downloadButton");
const downloadHint = document.getElementById("downloadHint");
downloadButton.addEventListener("click", function () {
  // Dosya yoksa tarayıcı genellikle 404 sayfası açar; gerçek JAR dosyasını eklemeyi unutmayın.
  downloadHint.textContent = "İndirme başlamadıysa downloads klasörüne gerçek TWLDAntiCheat-Paper-1.21.11.jar dosyasını eklediğini kontrol et.";
});


// TWLD destek sohbeti: hazır sorun giderme akışlarıyla çalışır; harici AI API kullanmaz.
(function () {
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");
  if (!form || !input || !messages) return;

  function addMessage(text, who) {
    const node = document.createElement("div");
    node.className = "message " + (who === "user" ? "user-message" : "bot-message");
    const label = document.createElement("span");
    label.className = "message-label";
    label.textContent = who === "user" ? "SEN" : "TWLD ASİSTAN";
    node.appendChild(label);
    node.appendChild(document.createTextNode(text));
    messages.appendChild(node);
    messages.scrollTop = messages.scrollHeight;
  }

  function getReply(raw) {
    const q = raw.toLocaleLowerCase("tr-TR");
    if (q.includes("indir") || q.includes("download") || q.includes("404") || q.includes("buton")) {
      return "İndirme butonu dosyayı şu konumda arar:\\n downloads/TWLDAntiCheat-Paper-1.21.11.jar\\n\\n1) downloads klasörünün index.html ile aynı seviyede olduğundan emin ol.\\n2) Dosya adını harf harf kontrol et.\\n3) Siteyi yeniden yükle/yayınla.\\n\\nGerçek .jar dosyası eklenmediyse buton eklenti oluşturmaz. Hâlâ olmuyorsa tarayıcıda gördüğün hata mesajını gönder.";
    }
    if (q.includes("plugin") || q.includes("yüklen") || q.includes("load") || q.includes("enable") || q.includes("jar")) {
      return "Plugin yüklenmiyorsa şu kontrolleri sırayla yap:\\n\\n1) .jar dosyasını Paper sunucunun ana klasöründeki plugins klasörüne koy.\\n2) Sunucunun gerçekten Paper 1.21.11 ile açıldığını kontrol et.\\n3) Sunucuyu tamamen yeniden başlat.\\n4) Konsoldaki kırmızı hata satırlarını incele.\\n\\nEklenti klasörde görünmüyorsa veya konsolda hata varsa hata mesajını buraya kopyala; ona göre daha net yönlendirebilirim.";
    }
    if (q.includes("paper") || q.includes("sürüm") || q.includes("1.21") || q.includes("uyum")) {
      return "Sürüm uyumluluğunu kontrol etmek için:\\n1) Konsolda /version komutunu çalıştır.\\n2) Eklentinin açıklamasında desteklenen Minecraft/Paper sürümlerini kontrol et.\\n3) Konsoldaki 'unsupported version' veya benzeri uyarıyı paylaş.\\n\\nDosya adında 1.21.11 yazması tek başına uyumluluğu garanti etmez; pluginin gerçekten bu sürüm için derlenmiş olması gerekir.";
    }
    if (q.includes("config") || q.includes("ayar") || q.includes("reload") || q.includes("tac")) {
      return "Ayarlar veya komutlar çalışmıyorsa:\\n1) Sunucu açılışında pluginin başarıyla yüklendiğini kontrol et.\\n2) plugins klasöründe TWLDAntiCheat için oluşan config dosyasına bak.\\n3) Komut ve izin adlarının plugin sürümünün dokümantasyonuyla eşleştiğini doğrula.\\n\\nKullandığın komutu ve konsoldaki hata mesajını gönderirsen birlikte inceleyebiliriz.";
    }
    if (q.includes("hata") || q.includes("error") || q.includes("exception") || q.includes("çalışm")) {
      return "Sorunu birlikte bulalım. Şunları gönderir misin?\\n1) Konsoldaki hatanın tam metni (özellikle ilk 'ERROR' veya 'Caused by' satırları).\\n2) Sunucu sürümü (/version çıktısı).\\n3) Hatanın ne zaman çıktığı: açılışta mı, komut kullanınca mı?\\n\\nŞifre, token veya özel erişim bilgisi paylaşma. Hata metnini kişisel bilgileri çıkararak gönderebilirsin.";
    }
    return "Yardım edeyim! Daha doğru çözüm için hatanın tam metnini, ne yaparken çıktığını ve Paper sürümünü yaz.\\n\\nÖrnek: 'Sunucuyu açınca Plugin could not be enabled hatası alıyorum.'\\n\\nBu sohbet şu anda sık karşılaşılan sorunlar için hazır yanıtlar verir; gerçek zamanlı bir yapay zekâ servisine bağlı değildir.";
  }

  function send(text) {
    const clean = (text || "").trim();
    if (!clean) return;
    addMessage(clean, "user");
    input.value = "";
    window.setTimeout(function () { addMessage(getReply(clean), "bot"); }, 220);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    send(input.value);
  });
  document.querySelectorAll("[data-question]").forEach(function (button) {
    button.addEventListener("click", function () { send(button.getAttribute("data-question")); });
  });
})();
