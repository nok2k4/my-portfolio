import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext';
import { Link } from 'react-router-dom';

function Admin() {
  const { data, updateData } = useContext(DataContext);
  const [lang, setLang] = useState('vi');
  const [formData, setFormData] = useState(data);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const currentData = formData[lang];

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === '0345626882Aa@') {
      setIsAuthenticated(true);
    } else {
      alert('Mật khẩu không chính xác!');
    }
  };

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [lang]: { ...currentData, hero: { ...currentData.hero, [name]: value } } 
    });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [lang]: { ...currentData, contact: { ...currentData.contact, [name]: value } } 
    });
  };

  const handleArrayChange = (section, index, field, value) => {
    const newArray = [...currentData[section]];
    newArray[index] = { ...newArray[index], [field]: value };
    setFormData({ 
      ...formData, 
      [lang]: { ...currentData, [section]: newArray } 
    });
  };

  const handleAddItem = (section, defaultObj) => {
    const newArray = [...currentData[section], { id: Date.now(), ...defaultObj }];
    setFormData({ 
      ...formData, 
      [lang]: { ...currentData, [section]: newArray } 
    });
  };

  const handleRemoveItem = (section, index) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mục này không?")) {
      const newArray = currentData[section].filter((_, i) => i !== index);
      setFormData({ 
        ...formData, 
        [lang]: { ...currentData, [section]: newArray } 
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Giới hạn dung lượng file khoảng 2MB để tránh lỗi quota localStorage
      if (file.size > 2 * 1024 * 1024) {
        alert("Ảnh quá lớn! Vui lòng chọn ảnh dưới 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ 
          ...formData, 
          [lang]: { ...currentData, hero: { ...currentData.hero, avatarUrl: reader.result } } 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    updateData(lang, 'hero', currentData.hero);
    updateData(lang, 'contact', currentData.contact);
    updateData(lang, 'experience', currentData.experience);
    updateData(lang, 'skills', currentData.skills);
    updateData(lang, 'projects', currentData.projects);
    alert(`Đã lưu toàn bộ thông tin cho ngôn ngữ: ${lang === 'vi' ? 'Tiếng Việt' : 'Tiếng Anh'}`);
  };

  const inputStyle = { width: '100%', padding: '0.8rem', borderRadius: '5px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-color)', marginBottom: '0.5rem' };
  const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--accent-color)' };
  const cardStyle = { background: 'var(--card-bg)', padding: '2rem', borderRadius: '15px', marginBottom: '2rem' };
  const deleteBtnStyle = { background: '#ef4444', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '0.9rem', float: 'right' };
  const addBtnStyle = { background: '#10b981', color: 'white', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', display: 'block', width: '100%', marginTop: '1rem' };

  if (!isAuthenticated) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-color)' }}>
        <form onSubmit={handleLogin} style={cardStyle}>
          <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Đăng nhập Quản Trị</h2>
          <input 
            type="password" 
            placeholder="Nhập mật khẩu..." 
            value={passwordInput} 
            onChange={(e) => setPasswordInput(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={{ ...addBtnStyle, marginTop: '1rem', background: 'var(--accent-color)' }}>Đăng nhập</button>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/" style={{ color: 'var(--text-color)', textDecoration: 'none', opacity: 0.7 }}>← Quay lại trang chủ</Link>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', color: 'var(--text-color)', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Quản Trị Viên (Admin Panel)</h2>
        <Link to="/" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 'bold' }}>← Quay lại Trang Chủ</Link>
      </div>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <strong>Chọn ngôn ngữ để chỉnh sửa:</strong>
        <button 
          onClick={() => setLang('vi')} 
          style={{ padding: '0.5rem 1rem', background: lang === 'vi' ? 'var(--accent-color)' : 'var(--card-bg)', color: lang === 'vi' ? 'white' : 'var(--text-color)', border: '1px solid var(--card-border)', borderRadius: '5px', cursor: 'pointer' }}
        >
          Tiếng Việt
        </button>
        <button 
          onClick={() => setLang('en')} 
          style={{ padding: '0.5rem 1rem', background: lang === 'en' ? 'var(--accent-color)' : 'var(--card-bg)', color: lang === 'en' ? 'white' : 'var(--text-color)', border: '1px solid var(--card-border)', borderRadius: '5px', cursor: 'pointer' }}
        >
          Tiếng Anh
        </button>
      </div>
      
      <div style={cardStyle}>
        <h3 style={{ marginBottom: '1rem' }}>1. Giới Thiệu (Hero Section)</h3>
        <div>
          <label style={labelStyle}>Ảnh đại diện:</label>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <input type="text" name="avatarUrl" value={currentData.hero.avatarUrl || ''} onChange={handleHeroChange} style={{...inputStyle, marginBottom: 0, flex: 1, minWidth: '200px'}} placeholder="Nhập link ảnh (URL)..." />
            <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
              <button style={{ background: 'var(--accent-color)', color: 'white', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>
                📁 Tải ảnh lên từ máy
              </button>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ position: 'absolute', top: 0, right: 0, minWidth: '100%', minHeight: '100%', fontSize: '100px', textAlign: 'right', filter: 'alpha(opacity=0)', opacity: 0, outline: 'none', background: 'white', cursor: 'pointer', display: 'block' }} />
            </div>
          </div>

          <label style={labelStyle}>Họ và Tên:</label>
          <input type="text" name="name" value={currentData.hero.name} onChange={handleHeroChange} style={inputStyle} />
          
          <label style={labelStyle}>Chức danh:</label>
          <input type="text" name="role" value={currentData.hero.role} onChange={handleHeroChange} style={inputStyle} />
          
          <label style={labelStyle}>Mô tả ngắn:</label>
          <textarea name="description" value={currentData.hero.description} onChange={handleHeroChange} rows="3" style={inputStyle} />
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ marginBottom: '1rem' }}>2. Thông Tin Liên Hệ & Chat</h3>
        <div>
          <label style={labelStyle}>Số điện thoại:</label>
          <input type="text" name="phone" value={currentData.contact.phone} onChange={handleContactChange} style={inputStyle} />
          
          <label style={labelStyle}>Email:</label>
          <input type="text" name="email" value={currentData.contact.email} onChange={handleContactChange} style={inputStyle} />
          
          <label style={labelStyle}>Địa chỉ:</label>
          <input type="text" name="address" value={currentData.contact.address} onChange={handleContactChange} style={inputStyle} />
          
          <label style={labelStyle}>LinkedIn:</label>
          <input type="text" name="linkedin" value={currentData.contact.linkedin} onChange={handleContactChange} style={inputStyle} />

          <label style={labelStyle}>Facebook Page ID (Để bật Ô Chat Messenger):</label>
          <input type="text" name="fbPageId" value={currentData.contact.fbPageId || ''} onChange={handleContactChange} style={inputStyle} placeholder="Ví dụ: 10423456789 (Xem hướng dẫn lấy ID ở Facebook)" />
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ marginBottom: '1rem' }}>3. Học Vấn & Kinh Nghiệm</h3>
        {currentData.experience.map((exp, index) => (
          <div key={exp.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--card-border)', borderRadius: '5px', position: 'relative' }}>
            <button onClick={() => handleRemoveItem('experience', index)} style={deleteBtnStyle}>Xóa</button>
            <input type="text" value={exp.title} onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)} placeholder="Tên trường / Công ty" style={{...inputStyle, width: 'calc(100% - 80px)'}} />
            <input type="text" value={exp.date} onChange={(e) => handleArrayChange('experience', index, 'date', e.target.value)} placeholder="Thời gian (VD: 2022 - 2024)" style={inputStyle} />
            <textarea value={exp.desc} onChange={(e) => handleArrayChange('experience', index, 'desc', e.target.value)} placeholder="Mô tả chi tiết" rows="2" style={inputStyle} />
          </div>
        ))}
        <button onClick={() => handleAddItem('experience', {title: '', date: '', desc: ''})} style={addBtnStyle}>+ Thêm Kinh Nghiệm / Học Vấn</button>
      </div>

      <div style={cardStyle}>
        <h3 style={{ marginBottom: '1rem' }}>4. Kỹ Năng Chuyên Môn</h3>
        {currentData.skills.map((skill, index) => (
          <div key={skill.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--card-border)', borderRadius: '5px', position: 'relative' }}>
            <button onClick={() => handleRemoveItem('skills', index)} style={deleteBtnStyle}>Xóa</button>
            <input type="text" value={skill.title} onChange={(e) => handleArrayChange('skills', index, 'title', e.target.value)} placeholder="Tên nhóm kỹ năng" style={{...inputStyle, width: 'calc(100% - 80px)'}} />
            <textarea value={skill.desc} onChange={(e) => handleArrayChange('skills', index, 'desc', e.target.value)} placeholder="Chi tiết kỹ năng (cách nhau bằng dấu phẩy)" rows="2" style={inputStyle} />
          </div>
        ))}
        <button onClick={() => handleAddItem('skills', {title: '', desc: ''})} style={addBtnStyle}>+ Thêm Kỹ Năng</button>
      </div>

      <div style={cardStyle}>
        <h3 style={{ marginBottom: '1rem' }}>5. Dự Án Nổi Bật</h3>
        {currentData.projects.map((proj, index) => (
          <div key={proj.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--card-border)', borderRadius: '5px', position: 'relative' }}>
            <button onClick={() => handleRemoveItem('projects', index)} style={deleteBtnStyle}>Xóa</button>
            <input type="text" value={proj.title} onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)} placeholder="Tên dự án" style={{...inputStyle, width: 'calc(100% - 80px)'}} />
            <input type="text" value={proj.link || ''} onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)} placeholder="Link dự án (nếu có)" style={inputStyle} />
            <textarea value={proj.desc} onChange={(e) => handleArrayChange('projects', index, 'desc', e.target.value)} placeholder="Mô tả dự án" rows="3" style={inputStyle} />
          </div>
        ))}
        <button onClick={() => handleAddItem('projects', {title: '', desc: '', link: ''})} style={addBtnStyle}>+ Thêm Dự Án</button>
      </div>

      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        <button 
          onClick={saveChanges} 
          className="btn btn-primary" 
          style={{ padding: '1rem 3rem', fontSize: '1.2rem', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.6)' }}
        >
          💾 LƯU TOÀN BỘ THAY ĐỔI
        </button>
      </div>
    </div>
  );
}

export default Admin;
