import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const defaultData = {
  vi: {
    hero: {
      name: "QUÁCH VĂN NGỌC",
      role: "Nhân Viên IT & Sinh Viên AI tại UIT",
      description: "Chuyên ngành Ứng dụng phần mềm & Xử lý dữ liệu. Đam mê Trí tuệ nhân tạo (AI), phát triển web, quản trị hệ thống và tự động hóa.",
      avatarUrl: "/avatar.jpg"
    },
    experience: [
      { id: 0, title: "Freelancer (Làm việc tự do)", date: "Hiện tại", desc: "Làm việc tự do tại nhà. Thực hiện công việc đào tạo và huấn luyện Trí tuệ nhân tạo (AI Training) trên nền tảng TCS, Lark." },
      { id: 1, title: "Đại học Công nghệ Thông tin (UIT)", date: "Hiện tại", desc: "Đang theo học chuyên ngành Trí tuệ nhân tạo (AI)." },
      { id: 2, title: "Mở hộ kinh doanh đồng giá 18K Mimi Mart", date: "10/2024 - 10/2025", desc: "Kinh doanh offline và quản lý gian hàng sàn thương mại điện tử (Tiktok, Shopee, Lazada)." },
      { id: 3, title: "Nhân viên kỹ thuật IT - Laptop Trần Khanh", date: "07/2024", desc: "Sửa lỗi, bảo trì hệ thống và hỗ trợ khách hàng về phần mềm & phần cứng máy tính." },
      { id: 4, title: "Cao Đẳng FPT Polytechnic", date: "2022 - 2024", desc: "Tốt nghiệp chuyên ngành Ứng dụng phần mềm. Tham gia xây dựng website bán hàng, quảng bá sản phẩm." },
      { id: 5, title: "Cao đẳng Cơ giới và Thuỷ lợi", date: "2019 - 2022", desc: "Tốt nghiệp loại Giỏi chuyên ngành Xử lý dữ liệu." }
    ],
    skills: [
      { id: 1, title: "Lập Trình & Web", desc: "C++, Python, HTML, React, Wordpress" },
      { id: 2, title: "Hệ Thống & Mạng", desc: "Quản trị mạng máy tính, VMWare, cài đặt Windows, Linux, IT Helpdesk" },
      { id: 3, title: "Phần Mềm & Công Cụ", desc: "Odoo CRM (tùy chỉnh & triển khai), Figma, Photoshop, Adobe Illustrator" },
      { id: 4, title: "Khác", desc: "Phân tích dữ liệu, Quản lý sàn TMĐT (Shopee, Tiktok, Lazada), Làm việc nhóm" }
    ],
    projects: [
      { id: 1, title: "paprovn.com", desc: "Website giới thiệu và cung cấp dịch vụ chuyên nghiệp. Tích hợp các công nghệ hiện đại, tối ưu hóa SEO và mang lại trải nghiệm người dùng tốt nhất.", link: "https://paprovn.com" },
      { id: 2, title: "Website TMĐT Bán Hàng", desc: "Đồ án thực tế tại FPT Polytechnic. Xây dựng hệ thống website thương mại điện tử, quản lý sản phẩm, đơn hàng và quảng bá thương hiệu.", link: "" }
    ],
    contact: {
      address: "Tân Chánh Hiệp, Quận 12, TP.HCM",
      phone: "0345-626-882",
      email: "ngocqv.it@gmail.com",
      linkedin: "linkedin.com/in/ngọc-quách",
      github: "nok2k4",
      fbPageId: ""
    }
  },
  en: {
    hero: {
      name: "QUACH VAN NGOC",
      role: "IT Staff & AI Student at UIT",
      description: "Majoring in Software Application & Data Processing. Passionate about Artificial Intelligence (AI), web development, system administration, and automation.",
      avatarUrl: "/avatar.jpg"
    },
    experience: [
      { id: 0, title: "Freelancer", date: "Present", desc: "Working as a freelancer from home. Performing AI Training tasks on TCS and Lark platforms." },
      { id: 1, title: "University of Information Technology (UIT)", date: "Present", desc: "Currently studying Artificial Intelligence (AI)." },
      { id: 2, title: "Mimi Mart (18K Fixed Price Store)", date: "10/2024 - 10/2025", desc: "Offline business and e-commerce store management (Tiktok, Shopee, Lazada)." },
      { id: 3, title: "IT Technician - Laptop Tran Khanh", date: "07/2024", desc: "Troubleshooting, system maintenance, and customer support for software & hardware." },
      { id: 4, title: "FPT Polytechnic College", date: "2022 - 2024", desc: "Graduated in Software Application. Participated in building e-commerce websites and brand promotion." },
      { id: 5, title: "Mechanics and Irrigation College", date: "2019 - 2022", desc: "Graduated with Excellence in Data Processing." }
    ],
    skills: [
      { id: 1, title: "Programming & Web", desc: "C++, Python, HTML, React, Wordpress" },
      { id: 2, title: "Systems & Network", desc: "Computer Network Admin, VMWare, Windows setup, Linux, IT Helpdesk" },
      { id: 3, title: "Software & Tools", desc: "Odoo CRM (Customization & Deployment), Figma, Photoshop, Adobe Illustrator" },
      { id: 4, title: "Others", desc: "Data Analysis, E-commerce Management (Shopee, Tiktok, Lazada), Teamwork" }
    ],
    projects: [
      { id: 1, title: "paprovn.com", desc: "Professional service and portfolio website. Integrated modern technologies, SEO optimization, and best user experience.", link: "https://paprovn.com" },
      { id: 2, title: "E-commerce Website", desc: "Practical project at FPT Polytechnic. Built an e-commerce website system, managed products, orders, and brand promotion.", link: "" }
    ],
    contact: {
      address: "Tan Chanh Hiep, District 12, HCMC",
      phone: "0345-626-882",
      email: "ngocqv.it@gmail.com",
      linkedin: "linkedin.com/in/ngọc-quách",
      github: "nok2k4",
      fbPageId: ""
    }
  }
};

export const sortExperiences = (list) => {
  if (!list || !Array.isArray(list)) return [];
  
  const parseDateStr = (dateStr) => {
    if (!dateStr) return { end: 0, start: 0 };
    const str = dateStr.trim().toLowerCase();
    
    // Split by common range separators like '-', 'to', 'đến'
    const parts = str.split(/[-–—]|đến|to/).map(p => p.trim());
    
    const parsePart = (part) => {
      if (!part) return 0;
      if (part === 'hiện tại' || part === 'present' || part.includes('hiện tại') || part.includes('present')) {
        return Infinity; // Represents current/ongoing date
      }
      
      // Match MM/YYYY (e.g., 10/2024)
      const monthYearMatch = part.match(/(\d{1,2})\/(\d{4})/);
      if (monthYearMatch) {
        const month = parseInt(monthYearMatch[1], 10);
        const year = parseInt(monthYearMatch[2], 10);
        return year * 12 + month;
      }
      
      // Match YYYY (e.g., 2024)
      const yearMatch = part.match(/(\d{4})/);
      if (yearMatch) {
        const year = parseInt(yearMatch[1], 10);
        return year * 12 + 6; // Mid-year approximation for years without month
      }
      
      return 0;
    };
    
    const startVal = parsePart(parts[0]);
    const endVal = parts.length > 1 ? parsePart(parts[1]) : startVal;
    
    return { end: endVal, start: startVal };
  };

  return [...list].sort((a, b) => {
    const valA = parseDateStr(a.date);
    const valB = parseDateStr(b.date);
    
    // Sort descending by end date (newest first)
    if (valB.end !== valA.end) {
      return valB.end - valA.end;
    }
    // If end dates are identical, sort descending by start date
    return valB.start - valA.start;
  });
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('portfolioDataV3');
    const parsed = savedData ? JSON.parse(savedData) : defaultData;
    
    // Tự động bổ sung các trường mới từ defaultData nếu localStorage cũ thiếu
    if (parsed.vi) {
      if (!parsed.vi.contact.github) {
        parsed.vi.contact.github = defaultData.vi.contact.github || "";
      }
      if (parsed.vi.contact.showGithub === undefined) {
        parsed.vi.contact.showGithub = true;
      }
      if (parsed.vi.contact.hiddenRepos === undefined) {
        parsed.vi.contact.hiddenRepos = "";
      }
      if (parsed.vi.experience) {
        parsed.vi.experience = sortExperiences(parsed.vi.experience);
      }
    }
    if (parsed.en) {
      if (!parsed.en.contact.github) {
        parsed.en.contact.github = defaultData.en.contact.github || "";
      }
      if (parsed.en.contact.showGithub === undefined) {
        parsed.en.contact.showGithub = true;
      }
      if (parsed.en.contact.hiddenRepos === undefined) {
        parsed.en.contact.hiddenRepos = "";
      }
      if (parsed.en.experience) {
        parsed.en.experience = sortExperiences(parsed.en.experience);
      }
    }
    return parsed;
  });

  useEffect(() => {
    localStorage.setItem('portfolioDataV3', JSON.stringify(data));
  }, [data]);

  const updateData = (lang, section, newData) => {
    setData(prev => {
      let processedData = newData;
      if (section === 'experience') {
        processedData = sortExperiences(newData);
      }
      
      const otherLang = lang === 'vi' ? 'en' : 'vi';
      let updatedState = {
        ...prev,
        [lang]: {
          ...prev[lang],
          [section]: processedData
        }
      };

      // Tự động đồng bộ hóa ảnh đại diện (avatarUrl) sang ngôn ngữ còn lại
      if (section === 'hero') {
        updatedState[otherLang] = {
          ...updatedState[otherLang],
          hero: {
            ...updatedState[otherLang].hero,
            avatarUrl: processedData.avatarUrl
          }
        };
      }
      
      // Tự động đồng bộ hóa toàn bộ thông tin liên hệ sang ngôn ngữ còn lại
      if (section === 'contact') {
        updatedState[otherLang] = {
          ...updatedState[otherLang],
          contact: {
            ...processedData
          }
        };
      }

      return updatedState;
    });
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};
