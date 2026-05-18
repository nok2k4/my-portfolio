import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const defaultData = {
  vi: {
    hero: {
      name: "QUÁCH VĂN NGỌC",
      role: "Nhân Viên IT & Sinh Viên AI tại UIT",
      description: "Chuyên ngành Ứng dụng phần mềm & Xử lý dữ liệu. Đam mê Trí tuệ nhân tạo (AI), phát triển web, quản trị hệ thống và tự động hóa."
    },
    experience: [
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
      linkedin: "linkedin.com/in/ngọc-quách"
    }
  },
  en: {
    hero: {
      name: "QUACH VAN NGOC",
      role: "IT Staff & AI Student at UIT",
      description: "Majoring in Software Application & Data Processing. Passionate about Artificial Intelligence (AI), web development, system administration, and automation."
    },
    experience: [
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
      linkedin: "linkedin.com/in/ngọc-quách"
    }
  }
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('portfolioDataV2');
    return savedData ? JSON.parse(savedData) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioDataV2', JSON.stringify(data));
  }, [data]);

  const updateData = (lang, section, newData) => {
    setData(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [section]: newData
      }
    }));
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};
