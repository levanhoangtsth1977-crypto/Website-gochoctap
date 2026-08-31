'use client';

import { useMemo, useState } from 'react';

const RULES = [
  ['🗺️', 'Địa giới hành chính', 'Cập nhật khi có nguồn dữ liệu chuẩn; không tự đoán.'],
  ['💻', 'Năng lực số', 'Chỉ bổ sung khi phù hợp với yêu cầu của bài.'],
  ['🌐', 'Công dân số', 'Bổ sung theo ngữ cảnh, không ép buộc.'],
  ['🏝️', 'Biển đảo', 'Chỉ tích hợp khi nội dung bài có liên quan.'],
  ['🌱', 'Môi trường / BĐKH', 'Chỉ tích hợp khi có căn cứ sư phạm.'],
  ['📘', 'CTGDPT 2018 + TT27', 'Rà soát yêu cầu, phẩm chất, năng lực và đánh giá.'],
];

export default function Home() {
  const [mode, setMode] = useState('suggest');
  const [files, setFiles] = useState([]);
  const [checks, setChecks] = useState(Object.fromEntries(RULES.map((r) => [r[1], true])));
  const [status, setStatus] = useState('Sẵn sàng tiếp nhận giáo án');

  const fileSummary = useMemo(() => {
    if (!files.length) return 'Chưa có tệp nào';
    return `${files.length} tệp đã chọn · ${files.map(f => f.name).join(' · ')}`;
  }, [files]);

  function onFiles(event) {
    const chosen = Array.from(event.target.files || []);
    const accepted = chosen.filter(f => /\.(docx|zip)$/i.test(f.name));
    setFiles(accepted);
    setStatus(accepted.length ? `Đã nhận ${accepted.length} tệp đầu vào. Chưa thực thi sửa. Bản 0.1 đang ở chế độ kiểm tra giao diện.` : 'Chỉ nhận .docx hoặc .zip');
  }

  function toggle(name) {
    setChecks(c => ({...c, [name]: !c[name]}));
  }

  function run() {
    if (!files.length) {
      setStatus('⚠️ Hãy chọn ít nhất một file .docx hoặc .zip trước khi phân tích.');
      return;
    }
    const enabled = Object.entries(checks).filter(([,v]) => v).map(([k]) => k);
    setStatus(`✅ Đã tạo phiên phân tích: ${files.length} tệp · chế độ ${mode === 'inspect' ? 'Kiểm tra' : mode === 'suggest' ? 'Đề xuất' : 'Tự động sửa'} · ${enabled.length} nhóm quy tắc.`);
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">📚 GOCHOCTAP · EDUCATION TOOLS</div>
          <h1>GIÁO ÁN MASTER EDITOR <span>2026</span></h1>
          <p>Phần mềm chuyên kiểm tra, đề xuất và chuẩn hóa giáo án Word mà không phá cấu trúc giáo án gốc.</p>
        </div>
        <div className="version">v0.1 · SAFE EDIT</div>
      </header>

      <section className="grid">
        <div className="card upload-card">
          <div className="section-title"><span>📂</span> 01 · Đầu vào</div>
          <label className="dropzone">
            <input type="file" multiple accept=".docx,.zip" onChange={onFiles} />
            <div className="drop-icon">↥</div>
            <strong>Chọn giáo án Word hoặc ZIP cả tuần</strong>
            <span>Hỗ trợ .docx · .zip · chưa gửi dữ liệu ra ngoài ở bản 0.1</span>
          </label>
          <div className="fileline">{fileSummary}</div>
        </div>

        <div className="card mode-card">
          <div className="section-title"><span>⚙️</span> 02 · Chế độ xử lý</div>
          <div className="modes">
            {[['inspect','🔎','Kiểm tra'],['suggest','💡','Đề xuất'],['auto','🚀','Tự động sửa']].map(([value,icon,label]) => (
              <button key={value} className={`mode ${mode===value?'active':''}`} onClick={() => setMode(value)}>
                <span>{icon}</span><b>{label}</b><small>{value==='inspect'?'Không thay đổi file':value==='suggest'?'Duyệt trước khi sửa':'Chạy theo luật khóa'}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="card rules-card">
        <div className="section-title"><span>🛡️</span> 03 · Bộ luật bảo vệ giáo án</div>
        <div className="rule-grid">
          {RULES.map(([icon,name,desc]) => (
            <button className={`rule ${checks[name] ? 'on':''}`} key={name} onClick={() => toggle(name)}>
              <div className="rule-head"><span>{icon}</span><b>{name}</b><span className="switch">{checks[name] ? 'BẬT' : 'TẮT'}</span></div>
              <p>{desc}</p>
            </button>
          ))}
        </div>
        <div className="protection">
          <b>🔒 KHÓA AN TOÀN:</b> không xóa nội dung gốc · không viết lại toàn giáo án · không tự ý đổi hoạt động · phần bổ sung sau này sẽ <em>in nghiêng + tô màu</em> · có nhật ký thay đổi.
        </div>
      </section>

      <section className="action-row">
        <div className="status"><span className="dot" /> {status}</div>
        <button className="run" onClick={run}>🚀 PHÂN TÍCH GIÁO ÁN</button>
      </section>

      <section className="card roadmap">
        <div className="section-title"><span>🧩</span> 04 · Lộ trình kỹ thuật</div>
        <div className="road-grid">
          <div><b>Đã dựng</b><span>Giao diện · cấu hình luật · upload .docx/.zip · chế độ xử lý · bảo vệ phạm vi sửa</span></div>
          <div><b>Đang chuẩn bị</b><span>Parser DOCX · nhật ký thay đổi · diff từng đoạn · xuất Word</span></div>
          <div><b>Bước tiếp theo</b><span>Gemini API · database hành chính 34 tỉnh/thành · validator chống sửa ngoài phạm vi</span></div>
        </div>
      </section>

      <footer>Thiết kế cho giáo viên Tiểu học · CTGDPT 2018 · ưu tiên bảo toàn giáo án gốc</footer>
    </main>
  );
}
